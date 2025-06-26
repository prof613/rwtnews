import type { Metadata } from "next"
// import { Mail, MessageSquare, AlertTriangle } from 'lucide-react' // Example icons

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Red, White and True News.",
}

export default function ContactPage() {
  return (
    <div className="py-8 px-4 md:px-0">
      <h1 className="text-4xl font-bold text-rwt-blue text-center mb-12">Contact Us</h1>

      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Information Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-rwt-blue mb-4">Our Information</h2>
          <p className="text-gray-700 mb-6">
            We welcome your feedback, questions, and inquiries. Please feel free to reach out to us using the
            appropriate email address below.
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-800 flex items-center">
                {/* <MessageSquare size={20} className="mr-2 text-rwt-red" /> */}
                General Inquiries & Feedback
              </h3>
              <p className="text-gray-600">For general questions, comments, or feedback about our content.</p>
              <a href="mailto:webcontact@redwhiteandtruenews.com" className="text-rwt-blue hover:underline break-all">
                webcontact@redwhiteandtruenews.com
              </a>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-800 flex items-center">
                {/* <AlertTriangle size={20} className="mr-2 text-rwt-red" /> */}
                Website Issues & Bug Reports
              </h3>
              <p className="text-gray-600">If you encounter any technical problems or bugs while using our website.</p>
              <a href="mailto:webmaster@redwhiteandtruenews.com" className="text-rwt-blue hover:underline break-all">
                webmaster@redwhiteandtruenews.com
              </a>
            </div>

            {/* Add other contact points if necessary, e.g., Press Inquiries, Advertising */}
          </div>
        </div>

        {/* Placeholder for Contact Form */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-rwt-blue mb-4">Send Us a Message</h2>
          <p className="text-gray-700 mb-4">
            A contact form will be available here in a future update. For now, please use the email addresses provided.
          </p>
          <div className="space-y-4 opacity-50">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                disabled
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-200 cursor-not-allowed"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Your Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                disabled
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-200 cursor-not-allowed"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                rows={4}
                disabled
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-200 cursor-not-allowed"
                placeholder="Your message..."
              ></textarea>
            </div>
            <button
              type="submit"
              disabled
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rwt-red opacity-50 cursor-not-allowed"
            >
              Send Message (Coming Soon)
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
