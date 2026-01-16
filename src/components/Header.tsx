import Link from 'next/link';
import Image from 'next/image';
import { Menu, Send } from 'lucide-react';

export default function Header() {
    const navItems = [
        { name: 'Home', href: '/' },
        { name: 'Fresher Jobs', href: '/category/Fresher Jobs' },
        { name: 'IT Jobs', href: '/category/IT Jobs' },
        { name: 'Service Desk Jobs', href: '/category/Service Desk Jobs' },
        { name: 'Government Jobs', href: '/category/Government Jobs' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16"> {/* Reduced height */}

                    {/* Left: Desktop Navigation (First 3 links) */}
                    <nav className="hidden md:flex space-x-6 flex-1 items-center">
                        {navItems.slice(0, 3).map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-gray-500 hover:text-indigo-600 font-medium transition duration-150 ease-in-out text-sm"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Center: Logo */}
                    <div className="flex-shrink-0 flex items-center justify-center flex-1">
                        <Link href="/" className="flex items-center gap-2 transform hover:scale-110 transition duration-300">
                            <Image
                                src="/logo.jpg"
                                alt="MyJobGuide Logo"
                                width={140}
                                height={50}
                                className="object-contain h-14 w-auto"
                            />
                        </Link>
                    </div>

                    {/* Right: Rest of Nav + Social */}
                    <div className="hidden md:flex items-center justify-end gap-6 flex-1">
                        <nav className="flex space-x-6 items-center">
                            {navItems.slice(3).map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-gray-500 hover:text-indigo-600 font-medium transition duration-150 ease-in-out text-sm"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                        <a
                            href="https://t.me/MyJobGuide"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-blue-500 text-white px-4 py-2 rounded-full font-bold flex items-center gap-2 hover:bg-blue-600 transition shadow-md hover:shadow-lg text-sm animate-pulse"
                        >
                            <Send size={16} /> Join Telegram
                        </a>
                    </div>

                    <div className="md:hidden flex-1 flex justify-end">
                        <Menu className="text-gray-500" />
                    </div>
                </div>
            </div>
        </header>
    );
}
