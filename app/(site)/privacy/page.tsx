import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read the Privacy Policy for Red, White and True News.",
}

export default function PrivacyPage() {
  return (
    <div className="py-8 px-4 md:px-0">
      <h1 className="text-4xl font-bold text-rwt-blue text-center mb-8">Privacy Policy</h1>

      <section className="prose prose-lg max-w-4xl mx-auto text-justify">
        <p className="text-sm text-gray-500">Last Updated: June 24, 2025</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">1. Introduction</h2>
        <p>
          Welcome to Red, White and True News. We are committed to protecting your personal information and your right
          to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to
          your personal information, please contact us at webcontact@redwhiteandtruenews.com.
        </p>
        <p>
          When you visit our website RedWhiteandTrueNews.com (the "Site"), and more generally, use any of our services
          (the "Services", which include the Site), we appreciate that you are trusting us with your personal
          information. We take your privacy very seriously. In this privacy notice, we seek to explain to you in the
          clearest way possible what information we collect, how we use it, and what rights you have in relation to it.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. Information We Collect</h2>
        <p>
          We collect personal information that you voluntarily provide to us when you register on the Site (if
          applicable), express an interest in obtaining information about us or our products and Services, when you
          participate in activities on the Site (such as posting comments or signing up for newsletters) or otherwise
          when you contact us.
        </p>
        <p>
          The personal information that we collect depends on the context of your interactions with us and the Site, the
          choices you make and the products and features you use. The personal information we collect may include the
          following:
        </p>
        <ul>
          <li>
            <strong>Personal Information Provided by You:</strong> We collect names; email addresses; usernames;
            passwords (if user accounts are enabled); contact preferences; and other similar information.
          </li>
          <li>
            <strong>Information automatically collected:</strong> We automatically collect certain information when you
            visit, use or navigate the Site. This information does not reveal your specific identity (like your name or
            contact information) but may include device and usage information, such as your IP address, browser and
            device characteristics, operating system, language preferences, referring URLs, device name, country,
            location, information about how and when you use our Site and other technical information. This information
            is primarily needed to maintain the security and operation of our Site, and for our internal analytics and
            reporting purposes.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. How We Use Your Information</h2>
        <p>
          We use personal information collected via our Site for a variety of business purposes described below. We
          process your personal information for these purposes in reliance on our legitimate business interests, in
          order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal
          obligations.
        </p>
        <ul>
          <li>To send administrative information to you.</li>
          <li>To protect our Services (e.g., for fraud monitoring and prevention).</li>
          <li>
            To enforce our terms, conditions and policies for business purposes, to comply with legal and regulatory
            requirements or in connection with our contract.
          </li>
          <li>To respond to legal requests and prevent harm.</li>
          <li>To manage user accounts (if applicable).</li>
          <li>To deliver and facilitate delivery of services to the user.</li>
          <li>To respond to user inquiries/offer support to users.</li>
          <li>To send you marketing and promotional communications (if you opt-in).</li>
          <li>
            For other Business Purposes, such as data analysis, identifying usage trends, determining the effectiveness
            of our promotional campaigns and to evaluate and improve our Site, products, marketing and your experience.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">4. Will Your Information Be Shared With Anyone?</h2>
        <p>
          We only share information with your consent, to comply with laws, to provide you with services, to protect
          your rights, or to fulfill business obligations. We may process or share your data that we hold based on the
          following legal basis: Consent, Legitimate Interests, Performance of a Contract, Legal Obligations.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">5. Cookies and Other Tracking Technologies</h2>
        <p>
          We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store
          information. Specific information about how we use such technologies and how you can refuse certain cookies is
          set out in our Cookie Policy (if applicable, otherwise this section can be expanded).
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">6. How Long Do We Keep Your Information?</h2>
        <p>
          We will only keep your personal information for as long as it is necessary for the purposes set out in this
          privacy notice, unless a longer retention period is required or permitted by law (such as tax, accounting or
          other legal requirements).
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">7. How Do We Keep Your Information Safe?</h2>
        <p>
          We have implemented appropriate technical and organizational security measures designed to protect the
          security of any personal information we process. However, despite our safeguards and efforts to secure your
          information, no electronic transmission over the Internet or information storage technology can be guaranteed
          to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third
          parties will not be able to defeat our security, and improperly collect, access, steal, or modify your
          information.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">8. Your Privacy Rights</h2>
        <p>
          In some regions (like the EEA, UK, and Canada), you have certain rights under applicable data protection laws.
          These may include the right (i) to request access and obtain a copy of your personal information, (ii) to
          request rectification or erasure; (iii) to restrict the processing of your personal information; and (iv) if
          applicable, to data portability. In certain circumstances, you may also have the right to object to the
          processing of your personal information.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">9. Updates to This Notice</h2>
        <p>
          We may update this privacy notice from time to time. The updated version will be indicated by an updated "Last
          Updated" date and the updated version will be effective as soon as it is accessible. We encourage you to
          review this privacy notice frequently to be informed of how we are protecting your information.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">10. Contact Us About This Notice</h2>
        <p>
          If you have questions or comments about this notice, you may email us at webcontact@redwhiteandtruenews.com.
        </p>
      </section>
    </div>
  )
}
