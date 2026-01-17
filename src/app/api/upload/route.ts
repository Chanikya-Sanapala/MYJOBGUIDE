import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { randomUUID } from 'crypto';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File | null;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create unique filename
        const filename = `${randomUUID()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
        const relativePath = `/uploads/notifications/${filename}`;
        const absolutePath = join(process.cwd(), 'public', 'uploads', 'notifications', filename);

        // Ensure directory exists (just in case)
        await mkdir(join(process.cwd(), 'public', 'uploads', 'notifications'), { recursive: true });

        // Save file
        await writeFile(absolutePath, buffer);

        console.log(`[Upload] File saved to ${absolutePath}`);

        return NextResponse.json({
            success: true,
            url: relativePath
        });
    } catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
    }
}
