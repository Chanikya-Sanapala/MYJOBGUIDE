import { NextResponse } from 'next/server';
import { jobService } from '@/lib/jobService';

export const dynamic = 'force-dynamic';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    const job = await jobService.getBySlug(slug);
    if (!job) {
        return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }
    return NextResponse.json(job);
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    await jobService.delete(slug);
    return NextResponse.json({ success: true });
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    const data = await request.json();
    const updated = await jobService.update(slug, data);
    if (!updated) {
        return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }
    return NextResponse.json(updated);
}
