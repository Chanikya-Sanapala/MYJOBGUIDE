import { MetadataRoute } from 'next';
import { jobService } from '@/lib/jobService';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://myjobguide.co.in';

    // Get all jobs for individual pages
    const jobs = await jobService.getAll();
    const jobUrls = jobs.map((job) => ({
        url: `${baseUrl}/job/${job.slug}`,
        lastModified: new Date(job.createdAt),
        changeFrequency: 'daily' as const,
        priority: 0.8,
    }));

    // Categories
    const categories = ['Government Jobs', 'IT Jobs', 'Service Desk Jobs', 'Postgraduate'];
    const categoryUrls = categories.map((cat) => ({
        url: `${baseUrl}/category/${encodeURIComponent(cat)}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.9,
    }));

    // High level pages
    const staticUrls = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'always' as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.5,
        },
        {
            url: `${baseUrl}/disclaimer`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.3,
        },
    ];

    return [...staticUrls, ...categoryUrls, ...jobUrls];
}
