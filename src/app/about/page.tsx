export default function AboutPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* Hero Section */}
            <div className="text-center mb-16">
                <h1 className="text-5xl font-black text-gray-900 mb-6 tracking-tight">
                    Empowering Your <span className="text-indigo-600">Career Journey</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    At MyJobGuide, we believe that the right opportunity can change a life. We are dedicated to providing the most accurate, timely, and comprehensive job information to help you find your dream career.
                </p>
            </div>

            {/* Features Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                {[
                    { title: "Precision", description: "Vetted job postings from trusted sources across all sectors." },
                    { title: "Community", description: "Helping thousands of freshers and professionals every day." },
                    { title: "Resources", description: "Direct links to official applications and guide materials." },
                    { title: "Excellence", description: "Setting the standard for career guidance and job portals." }
                ].map((feature, idx) => (
                    <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition duration-300">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                ))}
            </div>

            {/* Detailed Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                    <h2 className="text-3xl font-black text-gray-900">What is MyJobGuide?</h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        MyJobGuide is a comprehensive career platform designed to simplify the job search process. We specialize in aggregating opportunities from diverse sectors including <strong>Government Jobs, IT & Software Development, Service Desk, </strong> and <strong>Postgraduate</strong> opportunities.
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        Our platform is built for the modern job seeker. Whether you are a recent graduate looking for your first role or an experienced professional seeking a career change, we provide the tools and information you need to succeed.
                    </p>
                    <ul className="space-y-4">
                        {[
                            "Daily updates on new job openings",
                            "Direct application links to official portals",
                            "Guidance for competitive exams and interviews",
                            "Real-time alerts via Telegram and Social Media"
                        ].map((item, idx) => (
                            <li key={idx} className="flex items-center gap-3 text-gray-800 font-medium">
                                <div className="w-2 h-2 bg-indigo-600 rounded-full" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </div>
    );
}
