import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Our Mission",
  description: "Support the mission of Red, White and True News.",
}

export default function SupportPage() {
  return (
    <div className="py-8 px-4 md:px-0">
      <h1 className="text-4xl font-bold text-rwt-blue text-center mb-8">Our Mission</h1>

      <section className="mb-12 prose prose-lg max-w-4xl mx-auto text-justify">
        <p>
          At Red, White and True News, our mission is to provide truthful, unbiased news and insightful analysis from a
          patriotic perspective. We believe in the founding principles of the United States and strive to uphold the
          values of freedom, liberty, and individual responsibility.
        </p>
        <p>
          In an era of information overload and media bias, we aim to be a beacon of clarity, offering our readers
          well-researched articles, thought-provoking opinions, and a platform for respectful discourse. We are
          committed to journalistic integrity, accuracy, and transparency in all our reporting.
        </p>
        <h2 className="text-2xl font-semibold text-rwt-blue mt-8 mb-4">Why We Do It</h2>
        <p>
          We believe that a well-informed citizenry is essential for a healthy republic. Our goal is to empower our
          readers with the knowledge they need to make informed decisions and to foster a deeper understanding of the
          issues shaping our nation and the world. We stand for free speech and the open exchange of ideas, even when
          those ideas challenge conventional narratives.
        </p>
        <h2 className="text-2xl font-semibold text-rwt-blue mt-8 mb-4">How You Can Support Us</h2>
        <p>
          Red, White and True News is a reader-supported platform. Your contributions help us continue our work, expand
          our coverage, and remain independent. There are several ways you can support our mission:
        </p>
        <ul>
          <li>
            <strong>Subscribe to our Newsletter:</strong> Stay updated with our latest content and exclusive insights.
            (A newsletter signup form can be embedded here or linked).
          </li>
          <li>
            <strong>Share our Articles:</strong> Help us reach a wider audience by sharing content you find valuable on
            social media.
          </li>
          <li>
            <strong>Contribute:</strong> If you believe in our mission, please consider making a donation. Your support,
            no matter the size, makes a difference.
          </li>
        </ul>
        <div className="mt-8 text-center">
          <Link
            href="https://www.gofundme.com/f/support-red-white-and-true-news-mission"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-rwt-red text-white font-semibold py-3 px-8 rounded-lg hover:bg-opacity-80 transition-colors text-lg"
          >
            Donate via GoFundMe
          </Link>
        </div>
        <p className="mt-6">
          You can also support us by visiting our{" "}
          <Link
            href="https://redwhiteandtruegear.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-rwt-blue hover:underline font-semibold"
          >
            official merchandise store
          </Link>
          .
        </p>
        <p className="mt-8">
          Thank you for your support and for being a part of the Red, White and True News community.
        </p>
      </section>
    </div>
  )
}
