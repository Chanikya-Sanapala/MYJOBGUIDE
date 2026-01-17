import { jobService } from '@/lib/jobService';
import JobCard from '@/components/JobCard';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const revalidate = 0; // Disable cache for now

export default async function Home() {
  let jobs = await jobService.getAll();

  // Filter expired (Include the entire deadline day)
  const now = new Date();
  now.setHours(0, 0, 0, 0); // Start of today
  jobs = jobs.filter(job => {
    const deadline = new Date(job.deadline);
    // If it's just a date (YYYY-MM-DD), it defaults to 00:00:00.
    // We want to keep it if it's >= today's start.
    return deadline >= now;
  });

  // Sort latest
  jobs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // Top categories for quick access
  const categories = [
    'Government Jobs', 'IT Jobs', 'Service Desk Jobs', 'Postgraduate'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
          Welcome to <span className="text-indigo-600">MyJobGuide</span>
        </h1>
        <p className="text-2xl font-semibold text-gray-700 mb-4">
          Find Your Dream Career Today
        </p>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Your one-stop destination for Government and Private Job Updates in India.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {categories.map(cat => (
            <Link
              key={cat}
              href={`/category/${cat}`}
              className="px-6 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:border-indigo-500 hover:text-indigo-600 transition shadow-sm"
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>

      {/* Scrolling Disclaimer */}
      <div className="mb-8 overflow-hidden bg-orange-50 border-y border-orange-100 py-2">
        <div className="whitespace-nowrap animate-marquee inline-block text-orange-800 font-medium text-sm">
          ⚠️ <span className="font-bold">Disclaimer:</span> We are not a government website and not affiliated with any organization. We only provide job information collected from official sources. Users must verify details on the official website before applying. —
          We are not a government website and not affiliated with any organization. We only provide job information collected from official sources. Users must verify details on the official website before applying.
        </div>
      </div>

      {/* Latest Jobs Grid */}
      <div className="mb-12">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Latest Jobs</h2>
          <Link href="/category/Government Jobs" className="text-indigo-600 font-medium hover:text-indigo-800 flex items-center gap-1">
            View All <ArrowRight size={18} />
          </Link>
        </div>

        {jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
            <p className="text-gray-500 text-lg">No active jobs found right now.</p>
          </div>
        )}
      </div>
    </div>
  );
}
