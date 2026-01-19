'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, Send, X, Youtube, Instagram } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { name: 'Home', href: '/' },
        { name: 'Government Jobs', href: '/category/Government Jobs' },
        { name: 'IT Jobs', href: '/category/IT Jobs' },
        { name: 'Service Desk Jobs', href: '/category/Service Desk Jobs' },
        { name: 'Postgraduate', href: '/category/Postgraduate' },
        { name: 'About Us', href: '/about' },
    ];

    return (
        <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20"> {/* Increased height from 16 to 20 */}

                    {/* Left: Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center gap-2 transform hover:scale-105 transition duration-300">
                            <Image
                                src="/logo.jpg"
                                alt="MyJobGuide Logo"
                                width={180}
                                height={60}
                                className="object-contain h-16 w-auto mix-blend-multiply"
                                priority
                            />
                        </Link>
                    </div>

                    {/* Center: Brand Name and Tagline */}
                    <div className="flex flex-col items-center justify-center flex-1 px-4 text-center">
                        <h1 className="text-xl md:text-3xl font-extrabold tracking-tight leading-none whitespace-nowrap text-blue-900">
                            MyJobGuide
                        </h1>
                        <p className="text-[8px] md:text-[11px] text-blue-900 font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] mt-1 md:mt-1.5 opacity-80">
                            Your <span className="text-orange-500">Path</span> to Every Job
                        </p>
                    </div>

                    {/* Right Section: Telegram + Hamburger (Mobile/Tab) */}
                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex">
                            <a
                                href="https://t.me/MyJobGuide"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-indigo-600 text-white px-5 py-2.5 rounded-full font-bold flex items-center gap-2 hover:bg-indigo-700 transition shadow-md hover:shadow-lg text-sm"
                            >
                                <Send size={16} /> Join Telegram
                            </a>
                            <a
                                href="https://youtube.com/@myjobguideindia?si=qd_OG2BT4zaB3YiM"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-red-600 text-white px-5 py-2.5 rounded-full font-bold flex items-center gap-2 hover:bg-red-700 transition shadow-md hover:shadow-lg text-sm"
                            >
                                <Youtube size={16} /> Subscribe
                            </a>
                        </div>

                        {/* Hamburger Menu Button (Now visible on all screens) */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-md text-gray-600 hover:text-indigo-600 focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Navigation Dropdown (Floating card on desktop, full-width on mobile) */}
            {isMenuOpen && (
                <div className="bg-white border-t lg:border border-gray-100 py-4 px-4 lg:px-6 shadow-xl animate-in slide-in-from-top duration-300 absolute left-0 right-0 lg:left-auto lg:right-8 lg:top-[calc(100%+12px)] lg:w-80 lg:max-h-[85vh] max-h-[calc(100vh-100px)] overflow-y-auto lg:rounded-2xl lg:shadow-2xl z-[100] scrollbar-hide">
                    <nav className="flex flex-col space-y-4 max-w-7xl mx-auto lg:max-w-none">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="text-gray-700 hover:text-indigo-600 font-medium text-lg border-b border-gray-50 pb-2"
                            >
                                {item.name}
                            </Link>
                        ))}
                        <a
                            href="https://www.instagram.com/myjobguide?igsh=MTV5bmV3dDV3YWVkNg=="
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-pink-600 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2"
                        >
                            <Instagram size={18} /> Instagram
                        </a>
                        <a
                            href="https://t.me/MyJobGuide"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 mt-4"
                        >
                            <Send size={18} /> Join Telegram
                        </a>
                        <a
                            href="https://youtube.com/@myjobguideindia?si=qd_OG2BT4zaB3YiM"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2"
                        >
                            <Youtube size={18} /> Subscribe on YouTube
                        </a>
                    </nav>
                </div>
            )}
        </header>
    );
}
