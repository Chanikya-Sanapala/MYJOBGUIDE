import Link from 'next/link';
import { Calendar, Tag, ArrowRight } from 'lucide-react';
import { JobPost } from '@/lib/jobService';

export default function JobCard({ job }: { job: JobPost }) {
    const isExpired = new Date(job.deadline) < new Date();

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition duration-300 overflow-hidden flex flex-col h-full group">
            <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
                        {job.category}
                    </span>
                    {isExpired && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700">
                            Expired
                        </span>
                    )}
                </div>

                <Link href={`/job/${job.slug}`} className="block">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition mb-2">
                        {job.title}
                    </h3>
                </Link>

                <p className="text-gray-500 text-sm mb-4 line-clamp-3">
                    {job.description}
                </p>
            </div>

            <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-between items-center">
                <div className="flex items-center text-gray-500 text-xs gap-1">
                    <Calendar size={14} />
                    <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                </div>

                <Link
                    href={`/job/${job.slug}`}
                    className="text-sm font-semibold text-indigo-600 flex items-center gap-1 hover:gap-2 transition-all"
                >
                    Details <ArrowRight size={14} />
                </Link>
            </div>
        </div>
    );
}
