'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import Editor from '@/components/Editor';

export default function EditJobPage({ params }: { params: Promise<{ slug: string }> }) {
    const router = useRouter();
    // ... rest of the component ...
    const { slug } = use(params);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        category: 'Postgraduate',
        description: '',
        content: '',
        applyLink: '',
        notificationUrl: '', // New field
        deadline: '',
        sections: [] as { title: string; content: string }[],
    });

    const addSection = () => {
        setFormData(prev => ({
            ...prev,
            sections: [...prev.sections, { title: '', content: '' }]
        }));
    };

    const removeSection = (index: number) => {
        setFormData(prev => ({
            ...prev,
            sections: prev.sections.filter((_, i) => i !== index)
        }));
    };

    const updateSection = (index: number, field: 'title' | 'content', value: string) => {
        setFormData(prev => ({
            ...prev,
            sections: prev.sections.map((s, i) => i === index ? { ...s, [field]: value } : s)
        }));
    };
    const [uploading, setUploading] = useState(false); // For PDF upload status

    useEffect(() => {
        fetch(`/api/jobs/${slug}`)
            .then(res => {
                if (!res.ok) throw new Error('Job not found');
                return res.json();
            })
            .then(data => {
                setFormData({
                    title: data.title,
                    slug: data.slug,
                    category: data.category,
                    description: data.description,
                    content: data.content,
                    applyLink: data.applyLink,
                    notificationUrl: data.notificationUrl || '', // New field
                    deadline: data.deadline.split('T')[0], // create date input format
                    sections: Array.isArray(data.sections) ? data.sections : [],
                });
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                alert('Failed to load job details');
                router.push('/admin/dashboard');
            });
    }, [slug, router]);

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            // Use original slug in URL, but send potentially new slug in body
            const res = await fetch(`/api/jobs/${slug}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                throw new Error(await res.text());
            }

            alert('Job updated successfully');
            router.push('/admin/dashboard');
        } catch (err: any) {
            console.error(err);
            alert(`Failed to update job: ${err.message}`);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8 text-center">Loading job details...</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                <Link href="/admin/dashboard" className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-6">
                    <ArrowLeft size={18} className="mr-2" />
                    Back to Dashboard
                </Link>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Job</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-gray-900"
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
                                        <div className="flex items-center gap-2">
                                            <p className="text-xs text-green-600 font-medium">✓ PDF Available</p>
                                            <a href={formData.notificationUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-600 hover:underline">
                                                View Current
                                            </a>
                                        </div>
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
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Job Description (Optional)</label>
                            <Editor
                                content={formData.content}
                                onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                            />
                        </div>

                        <div className="space-y-4 pt-4 border-t border-gray-100">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-bold text-gray-900">Job Content Sections (Manual TOC)</h2>
                                <button
                                    type="button"
                                    onClick={addSection}
                                    className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium text-sm px-3 py-1.5 rounded-lg border border-indigo-200 hover:bg-indigo-50 transition"
                                >
                                    <Plus size={16} /> Add Section
                                </button>
                            </div>
                            <p className="text-sm text-gray-500">Each section will appear in the Table of Contents on the job page.</p>

                            <div className="space-y-6">
                                {formData.sections.map((section, index) => (
                                    <div key={index} className="p-6 bg-gray-50 rounded-xl border border-gray-200 relative group animate-in fade-in slide-in-from-top-2">
                                        <button
                                            type="button"
                                            onClick={() => removeSection(index)}
                                            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 p-2 rounded-lg hover:bg-white border border-transparent hover:border-red-100 transition"
                                            title="Remove Section"
                                        >
                                            <Trash2 size={18} />
                                        </button>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
                                                <input
                                                    required
                                                    type="text"
                                                    value={section.title}
                                                    onChange={(e) => updateSection(index, 'title', e.target.value)}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 bg-white"
                                                    placeholder="e.g. Selection Process, Eligibility..."
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Section Content</label>
                                                <Editor
                                                    content={section.content}
                                                    onChange={(content) => updateSection(index, 'content', content)}
                                                    placeholder="Detailed information for this section..."
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {formData.sections.length === 0 && (
                                    <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                                        <p className="text-gray-500 text-sm">No sections added yet. Click &quot;Add Section&quot; to create a Table of Contents.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Apply Link</label>
                            <input
                                required
                                type="url"
                                value={formData.applyLink}
                                onChange={(e) => setFormData({ ...formData, applyLink: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900"
                            />
                        </div>

                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                disabled={saving}
                                className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
                            >
                                <Save size={18} />
                                {saving ? 'Saving...' : 'Update Job'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
