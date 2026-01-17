import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File | null;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        // Validate file type
        if (file.type !== 'application/pdf') {
            return NextResponse.json({ error: 'Only PDF files are allowed' }, { status: 400 });
        }

        // Upload to Vercel Blob
        const blob = await put(`notifications/${file.name}`, file, {
            access: 'public',
        });

        console.log(`[Upload] File uploaded to Vercel Blob: ${blob.url}`);

        return NextResponse.json({
            success: true,
            url: blob.url
        });
    } catch (error) {
        console.error('Error uploading file to Vercel Blob:', error);
        return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
    }
}
