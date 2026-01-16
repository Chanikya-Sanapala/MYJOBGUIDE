'use client';

import { useState, useEffect } from 'react';
import { X, Send, Instagram, MessageCircle } from 'lucide-react';
import Image from 'next/image';

export default function SocialPopup() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Show popup after 3 seconds
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-10 fade-in duration-700">
            <div className="relative bg-white rounded-2xl shadow-2xl p-5 w-72 border border-gray-100 shadow-indigo-100/50">
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute -top-2 -right-2 bg-gray-100 rounded-full p-1 text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition shadow-sm"
                >
                    <X size={16} />
                </button>

                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-indigo-100 p-2 rounded-full animate-bounce">
                        <MessageCircle size={20} className="text-indigo-600" />
                    </div>
                    <div>
                        <h2 className="text-sm font-bold text-gray-900">Get Daily Updates</h2>
                        <p className="text-xs text-gray-500">Join our community!</p>
                    </div>
                </div>

                <div className="space-y-2">
                    <a
                        href="https://t.me/MyJobGuide"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold py-2.5 rounded-lg transition transform hover:scale-105 shadow-sm"
                    >
                        <Send size={14} />
                        Join Telegram
                    </a>

                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-xs font-bold py-2.5 rounded-lg transition transform hover:scale-105 shadow-sm"
                    >
                        <Instagram size={14} />
                        Follow on Instagram
                    </a>
                </div>
            </div>
        </div>
    );
}
