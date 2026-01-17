'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, ExternalLink } from 'lucide-react';
import { JobPost } from '@/lib/jobService';
import { formatDate } from '@/lib/formatDate';

export default function AdminDashboard() {
    const [jobs, setJobs] = useState<JobPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/jobs?admin=true', { cache: 'no-store' })
            .then(res => res.json())
            .then(data => {
                setJobs(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const handleDelete = async (slug: string) => {
        if (!confirm('Are you sure you want to delete this job?')) return;

        try {
            await fetch(`/api/jobs/${slug}`, { method: 'DELETE' });
            setJobs(jobs.filter(job => job.slug !== slug));
        } catch (err) {
            console.error(err);
            alert('Failed to delete job');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                    <Link
                        href="/admin/jobs/new"
                        className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-xl hover:bg-indigo-700 transition shadow-md w-full sm:w-auto justify-center"
                    >
                        <Plus size={20} />
                        Post New Job
                    </Link>
                </div>

                {loading ? (
                    <div className="text-center py-12">Loading...</div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left min-w-[700px]">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold text-gray-600">Title</th>
                                        <th className="px-6 py-4 font-semibold text-gray-600">Category</th>
                                        <th className="px-6 py-4 font-semibold text-gray-600">Deadline</th>
                                        <th className="px-6 py-4 font-semibold text-gray-600">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {jobs.map((job) => (
                                        <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-gray-900">{job.title}</div>
                                                <div className="text-xs text-gray-400 font-mono mt-0.5">{job.slug}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                                                    {job.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 font-medium">
                                                {formatDate(job.deadline)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <Link href={`/job/${job.slug}`} target="_blank" className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition" title="View Public Page">
                                                        <ExternalLink size={18} />
                                                    </Link>
                                                    <Link href={`/admin/jobs/${job.slug}/edit`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition" title="Edit Job">
                                                        <Edit size={18} />
                                                    </Link>
                                                    <button onClick={() => handleDelete(job.slug)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition" title="Delete Job">
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {jobs.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-20 text-center text-gray-500">
                                                <div className="flex flex-col items-center gap-2">
                                                    <p className="text-lg font-medium">No jobs posted yet.</p>
                                                    <p className="text-sm">Click the button above to create your first job post.</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
