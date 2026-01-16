import { jobService } from '@/lib/jobService';
import JobCard from '@/components/JobCard';

export const revalidate = 0;

interface Props {
    params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: Props) {
    const { category } = await params;
    // Decode the category, ensuring %20 becomes space
    const decodedCategory = decodeURIComponent(category);

    let jobs = await jobService.getAll();

    // Filter by category and active
    const now = new Date();
    jobs = jobs.filter(job =>
        job.category === decodedCategory && new Date(job.deadline) >= now
    );

    // Sort latest
    jobs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-12 border-b border-gray-200 pb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{decodedCategory}</h1>
                <p className="text-gray-500">
                    Browse the latest opportunities in {decodedCategory}.
                </p>
            </div>

            {jobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {jobs.map(job => (
                        <JobCard key={job.id} job={job} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
                    <p className="text-gray-500 text-lg">No active jobs found in this category.</p>
                </div>
            )}
        </div>
    );
}
