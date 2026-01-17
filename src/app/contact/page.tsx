'use client';

import { Mail, Phone, CheckCircle2, Loader2, Send, AlertCircle } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) {
            return;
        }

        setStatus('sending');

        try {
            const response = await fetch('/api/contact/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Contact form error:', error);
            setStatus('error');
        }

        // Reset status after 10 seconds if it was an error or success
        setTimeout(() => setStatus('idle'), 10000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Contact Us</h1>
                <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                    Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div className="space-y-8 text-center md:text-left flex flex-col justify-center">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition duration-300">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8 border-b border-gray-100 pb-4">Get in Touch</h2>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-indigo-50 p-3 rounded-xl text-indigo-600">
                                    <Mail size={24} />
                                </div>
                                <div className="text-left">
                                    <h3 className="font-bold text-gray-900">Email</h3>
                                    <p className="text-gray-900 font-medium">sanapalachanikya@gmail.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-indigo-50 p-3 rounded-xl text-indigo-600">
                                    <Phone size={24} />
                                </div>
                                <div className="text-left">
                                    <h3 className="font-bold text-gray-900">Phone</h3>
                                    <p className="text-gray-900 font-medium">+91 93905 44837</p>
                                    <p className="text-gray-500 text-sm">Mon-Fri from 9am to 6pm</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 lg:p-10">
                    {status === 'success' ? (
                        <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500 py-12">
                            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
                                <CheckCircle2 size={40} />
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                            <p className="text-gray-500 text-lg max-w-sm">
                                Thank you for reaching out. Your message has been sent directly to our support team.
                            </p>
                            <button
                                onClick={() => setStatus('idle')}
                                className="mt-10 px-8 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition shadow-lg"
                            >
                                Send Another Message
                            </button>
                        </div>
                    ) : (
                        <>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Send a Message</h2>
                            <p className="text-gray-700 mb-8 text-sm font-medium">Fill out the form below and we&apos;ll get back to you within 24 hours.</p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-900 mb-2">Name</label>
                                        <input
                                            required
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-gray-900 placeholder:text-gray-400"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-900 mb-2">Email</label>
                                        <input
                                            required
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-gray-900 placeholder:text-gray-400"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-900 mb-2">Message</label>
                                    <textarea
                                        required
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={5}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition resize-none text-gray-900 placeholder:text-gray-400"
                                        placeholder="How can we help you?"
                                    ></textarea>
                                </div>

                                {status === 'error' && (
                                    <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg border border-red-100 text-sm">
                                        <AlertCircle size={18} />
                                        <span>Failed to send message. Please try again later.</span>
                                    </div>
                                )}

                                <button
                                    disabled={status === 'sending'}
                                    type="submit"
                                    className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 transition shadow-lg hover:shadow-indigo-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {status === 'sending' ? (
                                        <>
                                            <Loader2 className="animate-spin" size={20} /> Sending...
                                        </>
                                    ) : (
                                        <>
                                            Send Message <Send size={18} />
                                        </>
                                    )}
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
