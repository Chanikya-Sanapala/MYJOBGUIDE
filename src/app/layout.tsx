import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SocialPopup from '@/components/SocialPopup';
import GoogleAnalytics from '@/components/GoogleAnalytics';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MyJobGuide | Latest Government, IT & Private Job Updates',
  description: 'Your ultimate path to every job. Get daily notifications for Government jobs, IT sectors, Service Desk, and more across India.',
  keywords: ['Government Jobs', 'IT Jobs', 'Job Updates India', 'Sarkari Naukri', 'Service Desk Jobs', 'Career Guide'],
  verification: {
    google: 'z75O-K67BFvZpLKMT__fXYTmDwCo9PAKkssgPs6Fz8E',
  },
  icons: {
    icon: [
      { url: '/favicon.ico?v=1' },
      { url: '/logo.jpg?v=1', type: 'image/jpeg' },
    ],
    shortcut: ['/favicon.ico?v=1'],
    apple: [
      { url: '/logo.jpg?v=1', sizes: '180x180', type: 'image/jpeg' },
    ],
  },
  other: {
    'msapplication-TileImage': '/logo.jpg?v=1',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
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
