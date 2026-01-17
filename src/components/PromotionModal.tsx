'use client';

import { useState, useEffect } from 'react';
import { X, Youtube, Instagram, Send, Bell } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function PromotionModal() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Only show if not seen in this session
        const hasSeen = sessionStorage.getItem('hasSeenPromo');
        if (!hasSeen) {
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 3000); // Show after 3 seconds
            return () => clearTimeout(timer);
        }
    }, []);

    const closePromo = () => {
        setIsOpen(false);
        sessionStorage.setItem('hasSeenPromo', 'true');
    };

    const pathname = usePathname();
    const isAdmin = pathname?.startsWith('/admin');

    if (!isOpen || isAdmin) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden relative animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">

                {/* Close Button */}
                <button
                    onClick={closePromo}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition p-2 hover:bg-gray-100 rounded-full z-10"
                >
                    <X size={24} />
                </button>

                {/* Content */}
                <div className="p-8 text-center">
                    <div className="w-20 h-20 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Bell className="text-indigo-600" size={40} />
                    </div>

                    <h2 className="text-2xl font-black text-gray-900 mb-2 leading-tight">
                        Don't Miss Any <span className="text-orange-500">Job Update!</span>
                    </h2>
                    <p className="text-gray-600 mb-8 font-medium">
                        Join 10,000+ students getting daily job alerts directly on their phones.
                    </p>

                    <div className="space-y-3">
                        {/* Telegram Button */}
                        <a
                            href="https://t.me/MyJobGuide"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-3 w-full bg-[#229ED9] text-white font-bold py-4 rounded-2xl hover:bg-[#1c86ba] transition shadow-lg hover:shadow-xl active:scale-95"
                        >
                            <Send size={22} /> Join Telegram Channel
                        </a>

                        <div className="grid grid-cols-2 gap-3">
                            {/* YouTube */}
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 border-2 border-red-50 text-red-600 font-bold py-3 rounded-2xl hover:bg-red-50 transition active:scale-95"
                            >
                                <Youtube size={20} /> YouTube
                            </a>
                            {/* Instagram */}
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 border-2 border-pink-50 text-pink-600 font-bold py-3 rounded-2xl hover:bg-pink-50 transition active:scale-95"
                            >
                                <Instagram size={20} /> Instagram
                            </a>
                        </div>
                    </div>

                    <p className="mt-8 text-xs text-gray-400 font-medium">
                        Join your path to every job with MyJobGuide
                    </p>
                </div>
            </div>
        </div>
    );
}
