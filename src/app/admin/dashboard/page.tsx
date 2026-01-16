'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, ExternalLink } from 'lucide-react';
import { JobPost } from '@/lib/jobService';

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
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                    <Link
                        href="/admin/jobs/new"
                        className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                    >
                        <Plus size={20} />
                        Post New Job
                    </Link>
                </div>

                {loading ? (
                    <div className="text-center py-12">Loading...</div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 font-medium text-gray-500">Title</th>
                                    <th className="px-6 py-4 font-medium text-gray-500">Category</th>
                                    <th className="px-6 py-4 font-medium text-gray-500">Deadline</th>
                                    <th className="px-6 py-4 font-medium text-gray-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {jobs.map((job) => (
                                    <tr key={job.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-gray-900">{job.title}</div>
                                            <div className="text-sm text-gray-500 truncate max-w-xs">{job.slug}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                                {job.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">
                                            {new Date(job.deadline).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <Link href={`/job/${job.slug}`} target="_blank" className="text-gray-400 hover:text-gray-600">
                                                    <ExternalLink size={18} />
                                                </Link>
                                                <Link href={`/admin/jobs/${job.slug}/edit`} className="text-blue-600 hover:text-blue-800">
                                                    <Edit size={18} />
                                                </Link>
                                                <button onClick={() => handleDelete(job.slug)} className="text-red-600 hover:text-red-800">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {jobs.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                                            No jobs posted yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
