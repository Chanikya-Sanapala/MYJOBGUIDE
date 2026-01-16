import { NextResponse } from 'next/server';
import { jobService } from '@/lib/jobService';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let jobs = await jobService.getAll();

    if (category) {
        jobs = jobs.filter(job => job.category === category);
    }

    // Filter out expired jobs for public view (unless admin param is present? No, keep simple)
    // Actually, let's filter expired by default. Admin might need another endpoint or param.
    const isAdmin = searchParams.get('admin') === 'true';

    if (!isAdmin) {
        const now = new Date();
        now.setHours(0, 0, 0, 0); // Start of today
        jobs = jobs.filter(job => {
            const deadline = new Date(job.deadline);
            return deadline >= now;
        });
    }

    // Sort by created desc
    jobs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json(jobs);
}

export async function POST(request: Request) {
    try {
        console.log('Processing POST request for new job...');
        const data = await request.json();
        // Basic validation
        if (!data.title || !data.slug || !data.category) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Ensure slug uniqueness
        let slug = data.slug;
        let counter = 1;
        while (await jobService.getBySlug(slug)) {
            slug = `${data.slug}-${counter}`;
            counter++;
        }
        data.slug = slug;

        // Ensure deadline is end of day if it's a date string
        if (data.deadline && !data.deadline.includes('T')) {
            data.deadline = `${data.deadline}T23:59:59Z`;
        }

        const job = await jobService.create(data);
        return NextResponse.json(job, { status: 201 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
