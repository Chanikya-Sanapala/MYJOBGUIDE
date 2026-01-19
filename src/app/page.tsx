import { jobService } from '@/lib/jobService';
import JobCard from '@/components/JobCard';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const revalidate = 0; // Disable cache for now

export default async function Home() {
  let jobs = await jobService.getAll();

  // Filter expired (Include the entire deadline day)
  const now = new Date();
  now.setHours(0, 0, 0, 0); // Start of today
  jobs = jobs.filter(job => {
    const deadline = new Date(job.deadline);
    // If it's just a date (YYYY-MM-DD), it defaults to 00:00:00.
    // We want to keep it if it's >= today's start.
    return deadline >= now;
  });

  // Sort latest
  jobs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // Top categories for quick access
  const categories = [
    'Government Jobs', 'IT Jobs', 'Service Desk Jobs', 'Postgraduate'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16 px-4">
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight leading-tight">
          Your Path to <span className="text-indigo-600">Every Job</span> Starts Here
        </h1>
        <p className="text-xl md:text-2xl font-medium text-gray-600 mb-8 max-w-3xl mx-auto">
          Daily updates on Government, IT, and Private sectors. We bring the best opportunities directly to you.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {categories.map(cat => (
            <Link
              key={cat}
              href={`/category/${cat}`}
              className="px-8 py-3 bg-white border border-gray-200 rounded-full text-base font-bold text-gray-800 hover:border-indigo-500 hover:text-indigo-600 transition shadow-sm hover:shadow-md"
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>

      {/* Scrolling Disclaimer */}
      <div className="mb-12 overflow-hidden bg-orange-50 border-y border-orange-100 py-3 rounded-xl">
        <div className="whitespace-nowrap animate-marquee inline-block text-orange-800 font-semibold text-sm">
          ⚠️ <span className="font-bold">Important Disclaimer:</span> MyJobGuide is an independent platform. We are not a government website and are not affiliated with any official organization. We aggregate job news from official public sources for your convenience. Please verify all details on official portals before applying. —
          ⚠️ <span className="font-bold">Warning:</span> Be cautious of fraudulent calls or emails. We never ask for money for job updates.
        </div>
      </div>

      {/* Latest Jobs Grid */}
      <div className="mb-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">Latest Opportunities</h2>
            <p className="text-gray-500 font-medium text-lg">Recently posted jobs across various sectors</p>
          </div>
          <Link href="/category/Government Jobs" className="hidden sm:flex text-indigo-600 font-bold hover:text-indigo-800 items-center gap-1 group">
            Explore All <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-[2rem] border-2 border-dashed border-gray-100">
            <p className="text-gray-400 text-xl font-medium">Currently updating latest job listings. Check back soon!</p>
          </div>
        )}
      </div>

      {/* About Section Homepage Snippet */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20 bg-indigo-50 rounded-[3rem] p-8 md:p-16">
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">Why Choose MyJobGuide?</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            We understand the struggle of finding authentic job notifications amidst the noise. Our mission is to provide a clean, organized, and reliable platform where you can find Government, IT, and Private sector jobs without confusion.
          </p>
          <Link href="/about" className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
            Learn More About Us
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-3xl shadow-sm">
            <div className="text-3xl font-black text-indigo-600 mb-2">Daily</div>
            <div className="text-gray-600 font-medium">Updates</div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm">
            <div className="text-3xl font-black text-indigo-600 mb-2">100%</div>
            <div className="text-gray-600 font-medium">Verified</div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm">
            <div className="text-3xl font-black text-indigo-600 mb-2">Direct</div>
            <div className="text-gray-600 font-medium">Apply Links</div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm">
            <div className="text-3xl font-black text-indigo-600 mb-2">Free</div>
            <div className="text-gray-600 font-medium">Of Cost</div>
          </div>
        </div>
      </div>

      {/* Newsletter / Social Section */}
      <div className="bg-gray-900 rounded-[3rem] p-8 md:p-16 text-center text-white mb-12">
        <h2 className="text-3xl md:text-5xl font-black mb-6">Never Miss an Update</h2>
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          Join 10,000+ candidates who get real-time job notifications on their phones.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="https://t.me/MyJobGuide" target="_blank" rel="noopener noreferrer" className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition shadow-xl shadow-blue-500/20 text-lg">
            Join Telegram Channel
          </a>
          <Link href="/contact" className="px-10 py-4 bg-white hover:bg-gray-100 text-gray-900 font-black rounded-2xl transition shadow-xl shadow-white/5 text-lg">
            Have Questions? Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
