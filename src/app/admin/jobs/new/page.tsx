'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import Editor from '@/components/Editor';

export default function NewJobPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        category: 'Postgraduate',
        description: '',
        content: '',
        applyLink: '',
        notificationUrl: '', // New field
        deadline: '',
    });
    // ... rest of the component state and logic ...
    const [uploading, setUploading] = useState(false); // For PDF upload status

    const generateSlug = (title: string) => {
        return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.type !== 'application/pdf') {
            alert('Please upload only PDF files.');
            return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) throw new Error('Upload failed');

            const data = await res.json();
            setFormData(prev => ({ ...prev, notificationUrl: data.url }));
        } catch (err) {
            console.error(err);
            alert('Failed to upload PDF. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        setFormData(prev => ({
            ...prev,
            title,
            slug: generateSlug(title)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/jobs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                throw new Error(await res.text());
            }

            router.push('/admin/dashboard');
        } catch (err: any) {
            console.error(err);
            alert(`Failed to create job: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                <Link href="/admin/dashboard" className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-6">
                    <ArrowLeft size={18} className="mr-2" />
                    Back to Dashboard
                </Link>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">Post New Job</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.title}
                                    onChange={handleTitleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-gray-900"
                                    placeholder="e.g. Junior Software Engineer"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900"
                                >
                                    <option value="Postgraduate">Postgraduate</option>
                                    <option value="IT Jobs">IT Jobs</option>
                                    <option value="Service Desk Jobs">Service Desk Jobs</option>
                                    <option value="Government Jobs">Government Jobs</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Application Deadline</label>
                                <input
                                    required
                                    type="date"
                                    value={formData.deadline}
                                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Official Notification (PDF)
                                    <span className="text-gray-400 font-normal ml-1">(Optional)</span>
                                </label>
                                <div className="flex flex-col gap-2">
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        onChange={handleFileChange}
                                        disabled={uploading}
                                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                                    />
                                    {uploading && <p className="text-xs text-indigo-600 animate-pulse">Uploading PDF...</p>}
                                    {formData.notificationUrl && !uploading && (
                                        <p className="text-xs text-green-600 font-medium">✓ PDF Uploaded successfully</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                            <textarea
                                required
                                rows={3}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900"
                                placeholder="Brief summary for the card view..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Job Description</label>
                            <Editor
                                content={formData.content}
                                onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                                placeholder="# Role Responsibilities&#10;Write detailed job requirements here..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Apply Link</label>
                            <input
                                required
                                type="url"
                                value={formData.applyLink}
                                onChange={(e) => setFormData({ ...formData, applyLink: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900"
                                placeholder="https://company.com/careers/apply/123"
                            />
                        </div>

                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
                            >
                                <Save size={18} />
                                {loading ? 'Posting...' : 'Post Job'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
