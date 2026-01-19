import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SocialPopup from '@/components/SocialPopup';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MyJobGuide - Find Your Dream Job',
  description: 'Latest jobs in IT, Government, and more.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <div className="bg-indigo-900 text-white text-center py-2 px-4 text-sm font-medium">
          <a href="https://t.me/MyJobGuide" target="_blank" rel="noopener noreferrer" className="hover:underline">
            📢 Daily Government & Private Job Updates | Exams | Results | Notifications | Admit Cards | Your Path to Every Job
          </a>
        </div>
        <Header />
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
        <Footer />
        <SocialPopup />
      </body>
    </html>
  );
}
