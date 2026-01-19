'use client';

import { useState, useEffect } from 'react';
import { Youtube, Instagram, Send, X } from 'lucide-react';

export default function SocialPopup() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const hasSeenPopup = sessionStorage.getItem('hasSeenSocialPopup');
        if (!hasSeenPopup) {
            setIsVisible(true);
        }
    }, []);

    const closePopup = () => {
        setIsVisible(false);
        sessionStorage.setItem('hasSeenSocialPopup', 'true');
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-in fade-in duration-300">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={closePopup}
            />

            {/* Modal Content */}
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 max-w-sm w-full relative z-10 animate-in zoom-in-95 duration-300">
                <button
                    onClick={closePopup}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition p-1 hover:bg-gray-100 rounded-full"
                >
                    <X size={24} />
                </button>

                <div className="flex flex-col items-center text-center">
                    <h3 className="text-2xl font-black text-gray-900 mb-2">Follow Us!</h3>
                    <p className="text-gray-500 mb-8 text-sm leading-relaxed">
                        Get the latest job updates directly on your social media. Never miss an opportunity!
                    </p>

                    <div className="grid grid-cols-3 gap-4 w-full">
                        <a
                            href="https://t.me/MyJobGuide"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center gap-3 group"
                        >
                            <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center group-hover:bg-blue-100 group-hover:scale-110 transition shadow-sm">
                                <Send size={28} />
                            </div>
                            <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wider">Telegram</span>
                        </a>

                        <a
                            href="https://www.instagram.com/myjobguide?igsh=MTV5bmV3dDV3YWVkNg=="
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center gap-3 group"
                        >
                            <div className="w-14 h-14 bg-pink-50 text-pink-500 rounded-2xl flex items-center justify-center group-hover:bg-pink-100 group-hover:scale-110 transition shadow-sm">
                                <Instagram size={28} />
                            </div>
                            <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wider">Instagram</span>
                        </a>

                        <a
                            href="https://youtube.com/@myjobguideindia?si=qd_OG2BT4zaB3YiM"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center gap-3 group"
                        >
                            <div className="w-14 h-14 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center group-hover:bg-red-100 group-hover:scale-110 transition shadow-sm">
                                <Youtube size={28} />
                            </div>
                            <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wider">YouTube</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
