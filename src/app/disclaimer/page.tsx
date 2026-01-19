import { Terminal } from 'lucide-react';

export default function DisclaimerPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
                <div className="flex items-center gap-3 mb-8 text-indigo-600">
                    <Terminal className="w-8 h-8" />
                    <h1 className="text-3xl font-bold text-gray-900">Disclaimer</h1>
                </div>

                <div className="space-y-6 text-gray-600 leading-relaxed">
                    <p className="text-lg font-medium text-gray-800">
                        Please read this disclaimer carefully before using our website.
                    </p>

                    <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl">
                        <p className="text-amber-800 font-semibold mb-2 text-lg">Important Notice</p>
                        <p className="text-amber-700">
                            We are not a government website and not affiliated with any organization. We only provide job information collected from official sources.
                        </p>
                    </div>

                    <p>
                        The information provided on <strong>MyJobGuide</strong> is for general informational purposes only. While we strive to provide accurate and up-to-date information, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on the website for any purpose.
                    </p>

                    <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-xl">
                        <p className="text-blue-800 font-semibold mb-2">User Responsibility</p>
                        <p className="text-blue-700">
                            Users must verify details on the official website before applying. Any reliance you place on such information is therefore strictly at your own risk.
                        </p>
                    </div>

                    <p>
                        In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.
                    </p>

                    <p>
                        Through this website, you are able to link to other websites which are not under the control of MyJobGuide. We have no control over the nature, content, and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.
                    </p>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-100 text-sm text-gray-400">
                    Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
            </div>
        </div>
    );
}
