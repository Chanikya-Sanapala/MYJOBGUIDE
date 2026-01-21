import { jobService } from '@/lib/jobService';
import { notFound } from 'next/navigation';
import { Calendar, Tag, ExternalLink, ArrowLeft, FileText } from 'lucide-react';
import Link from 'next/link';
import { formatDate } from '@/lib/formatDate';
import type { Metadata } from 'next';

export const revalidate = 0;

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const job = await jobService.getBySlug(slug);

    if (!job) return {};

    const title = `${job.title} - MyJobGuide`;
    const description = job.description || `Apply for ${job.title} in the ${job.category} category. Latest job updates and official notifications at MyJobGuide.`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'article',
            url: `https://myjobguide.co.in/job/${slug}`,
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        },
    };
}

export default async function JobPage({ params }: Props) {
    const { slug } = await params;
    const job = await jobService.getBySlug(slug);

    if (!job) {
        notFound();
    }

    // JSON-LD Schema for JobPosting
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'JobPosting',
        title: job.title,
        description: job.description,
        datePosted: job.createdAt,
        validThrough: job.deadline,
        employmentType: 'FULL_TIME',
        hiringOrganization: {
            '@type': 'Organization',
            name: 'MyJobGuide',
            sameAs: 'https://myjobguide.co.in'
        },
        jobLocation: {
            '@type': 'Place',
            address: {
                '@type': 'PostalAddress',
                addressCountry: 'IN',
                addressRegion: 'India'
            }
        },
        url: `https://myjobguide.co.in/job/${slug}`
    };

    // Parse headers for Table of Contents from HTML
    const toc: { text: string; id: string }[] = [];
    const contentWithIds = job.content.replace(/<(h[23])>([^<]+)<\/\1>/g, (match, tag, text, offset) => {
        const id = `section-${offset}`;
        toc.push({ text, id });
        return `<${tag} id="${id}">${text}</${tag}>`;
    });

    return (
        <div className="bg-white min-h-screen pb-20">
            {/* Schema.org JobPosting Markup */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* Header / Title Section */}
            <div className="bg-gray-900 text-white py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition">
                        <ArrowLeft size={18} className="mr-2" /> Back to Jobs
                    </Link>
                    <div className="flex gap-2 mb-4">
                        <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase">
                            {job.category}
                        </span>
                        {new Date(job.deadline) < new Date() && (
                            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase">Expired</span>
                        )}
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">{job.title}</h1>
                    <div className="flex items-center text-gray-400 text-sm gap-6">
                        <div className="flex items-center gap-2">
                            <Calendar size={18} />
                            <span>Posted: {formatDate(job.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar size={18} />
                            <span>Deadline: {formatDate(job.deadline)}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
                <div className="flex flex-col md:flex-row gap-8">

                    {/* Main Content */}
                    <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                        {/* Table of Contents Mobile/Inline */}
                        {toc.length > 0 && (
                            <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-100 md:hidden">
                                <h3 className="font-bold text-gray-900 mb-4">Table of Contents</h3>
                                <ul className="space-y-2">
                                    {toc.map(item => (
                                        <li key={item.id}>
                                            <a href={`#${item.id}`} className="text-indigo-600 hover:underline">{item.text}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div
                            className="prose prose-indigo max-w-none text-gray-700 leading-relaxed font-sans"
                            dangerouslySetInnerHTML={{ __html: contentWithIds }}
                        />
                    </div>

                    {/* Sidebar (Desktop TOC + Apply) */}
                    <div className="md:w-80">
                        <div className="sticky top-24 space-y-6 h-fit">
                            {/* Apply Card */}
                            <div className="bg-white rounded-xl shadow-lg border border-indigo-100 p-6 z-20">
                                <h3 className="font-bold text-gray-900 mb-2">Ready to Apply?</h3>
                                <p className="text-gray-500 text-sm mb-6">Continue to the official website to submit your application.</p>

                                <a
                                    href={job.applyLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full bg-indigo-600 text-white text-center font-bold py-3 rounded-xl hover:bg-indigo-700 transition shadow-md hover:shadow-lg flex justify-center items-center gap-2"
                                >
                                    Apply Now <ExternalLink size={18} />
                                </a>
                            </div>

                            {/* Notification PDF Card (Conditional) */}
                            {job.notificationUrl && (
                                <div className="bg-orange-50 rounded-xl border border-orange-100 p-6 z-20">
                                    <h3 className="font-bold text-orange-900 mb-2">Official Notification</h3>
                                    <p className="text-orange-800 text-sm mb-4">View the official gazette or recruitment notice.</p>
                                    <a
                                        href={job.notificationUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full bg-white text-orange-600 border border-orange-200 text-center font-bold py-3 rounded-xl hover:bg-orange-100 transition shadow-sm flex justify-center items-center gap-2"
                                    >
                                        <FileText size={18} /> View Notification PDF
                                    </a>
                                </div>
                            )}

                            {/* Desktop TOC */}
                            {toc.length > 0 && (
                                <div className="hidden md:block bg-gray-50 rounded-xl p-6 z-10">
                                    <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider text-gray-500">Contents</h3>
                                    <ul className="space-y-3 text-sm border-l-2 border-gray-200 pl-4">
                                        {toc.map(item => (
                                            <li key={item.id}>
                                                <a href={`#${item.id}`} className="text-gray-600 hover:text-indigo-600 hover:border-l-2 hover:border-indigo-600 -ml-[18px] pl-[14px] transition block py-1">
                                                    {item.text}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
