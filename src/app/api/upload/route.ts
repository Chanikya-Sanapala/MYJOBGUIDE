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
        const isPDF = file.type === 'application/pdf';
        const isImage = file.type.startsWith('image/');

        if (!isPDF && !isImage) {
            return NextResponse.json({ error: 'Only PDF and image files are allowed' }, { status: 400 });
        }

        // Upload to Vercel Blob
        const folder = isImage ? 'images' : 'notifications';
        const blob = await put(`${folder}/${file.name}`, file, {
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
