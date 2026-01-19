import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const { name, email, message } = await req.json();

        // Validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Name, email, and message are required' },
                { status: 400 }
            );
        }

        // Check for missing environment variables
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.error('[Contact API Error]: Missing EMAIL_USER or EMAIL_PASS environment variables.');
            return NextResponse.json(
                { error: 'Email service is not configured on the server.' },
                { status: 500 }
            );
        }

        // Initialize Nodemailer transporter
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // Use STARTTLS
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Verify connection configuration
        try {
            await transporter.verify();
        } catch (verifyError) {
            console.error('[Contact API Transporter Error]:', verifyError);
            throw new Error('Could not connect to the email service.');
        }

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'chatmyjobguide@gmail.com',
            replyTo: email,
            subject: `New Contact Form Message from ${name}`,
            text: `
                Name: ${name}
                Email: ${email}
                
                Message:
                ${message}
            `,
            html: `
                <div style="font-family: sans-serif; padding: 20px; color: #333;">
                    <h2 style="color: #4f46e5;">New Contact Message</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin-top: 10px;">
                        <p style="white-space: pre-wrap;">${message}</p>
                    </div>
                </div>
            `,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true, message: 'Email sent successfully' });
    } catch (error: any) {
        console.error('[Contact API Error]:', {
            message: error.message,
            code: error.code,
            command: error.command,
            stack: error.stack
        });
        return NextResponse.json(
            {
                error: 'Failed to send email.',
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            },
            { status: 500 }
        );
    }
}
