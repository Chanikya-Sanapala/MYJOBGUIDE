import Link from 'next/link';
import { Home, Briefcase } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 text-center bg-white p-10 rounded-xl shadow-lg border border-gray-100">
                <div>
                    <h2 className="mt-6 text-9xl font-extrabold text-indigo-600">404</h2>
                    <p className="mt-2 text-3xl font-bold text-gray-900 tracking-tight">Page not found</p>
                    <p className="mt-4 text-gray-500">
                        Sorry, we couldn't find the page you're looking for. It might have been removed, renamed, or doesn't exist.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:text-lg transition-colors"
                    >
                        <Home size={20} />
                        Go Home
                    </Link>
                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 md:text-lg transition-colors"
                    >
                        <Briefcase size={20} />
                        Browse Jobs
                    </Link>
                </div>
            </div>
        </div>
    );
}
