import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Send } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">MyJobGuide</h3>
                        <p className="text-gray-400">
                            Connecting freshers and professionals with their dream jobs across IT, Government, and Service sectors.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li><Link href="/" className="hover:text-white transition">Home</Link></li>
                            <li><Link href="/category/Fresher Jobs" className="hover:text-white transition">Fresher Jobs</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition">Contact Us</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li><Link href="#" className="hover:text-white transition">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-white transition">Terms of Service</Link></li>
                        </ul>
                    </div>
                    {/* New Social Media Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Social Media</h3>
                        <ul className="flex space-x-4 text-gray-400">
                            <li>
                                <Link href="#" className="hover:text-white transition">
                                    <Twitter size={24} />
                                </Link>
                            </li>
                            <li>
                                <a href="https://t.me/MyJobGuide" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
                                    <Send size={24} />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
                    &copy; {new Date().getFullYear()} MyJobGuide. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
