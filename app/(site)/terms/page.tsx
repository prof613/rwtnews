import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Read the Terms of Use for Red, White and True News.",
}

export default function TermsPage() {
  return (
    <div className="py-8 px-4 md:px-0">
      <h1 className="text-4xl font-bold text-rwt-blue text-center mb-8">Terms of Use</h1>

      <section className="prose prose-lg max-w-4xl mx-auto text-justify">
        <p className="text-sm text-gray-500">Last Updated: June 24, 2025</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">1. Acceptance of Terms</h2>
        <p>
          By accessing and using Red, White and True News (the "Site"), you accept and agree to be bound by the terms
          and provision of this agreement. In addition, when using this Site's particular services, you shall be subject
          to any posted guidelines or rules applicable to such services, which may be posted and modified from time to
          time. All such guidelines or rules are hereby incorporated by reference into the Terms of Use.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. Content</h2>
        <p>
          All content provided on this Site is for informational purposes only. Red, White and True News makes no
          representations as to the accuracy or completeness of any information on this site or found by following any
          link on this site. Red, White and True News will not be liable for any errors or omissions in this information
          nor for the availability of this information. Red, White and True News will not be liable for any losses,
          injuries, or damages from the display or use of this information.
        </p>
        <p>
          The views and opinions expressed in the articles and comments on this Site are those of the authors and do not
          necessarily reflect the official policy or position of Red, White and True News.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. Intellectual Property</h2>
        <p>
          The Site and its original content, features, and functionality are owned by Red, White and True News LLC and
          are protected by international copyright, trademark, patent, trade secret, and other intellectual property or
          proprietary rights laws. You may not reproduce, distribute, modify, create derivative works of, publicly
          display, publicly perform, republish, download, store, or transmit any of the material on our Site, except as
          follows:
        </p>
        <ul>
          <li>
            Your computer may temporarily store copies of such materials in RAM incidental to your accessing and viewing
            those materials.
          </li>
          <li>
            You may store files that are automatically cached by your Web browser for display enhancement purposes.
          </li>
          <li>
            You may print or download one copy of a reasonable number of pages of the Site for your own personal,
            non-commercial use and not for further reproduction, publication, or distribution.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">4. User Conduct and Comments</h2>
        <p>
          Users are welcome to leave comments on articles. However, you agree not to post any material that is
          defamatory, abusive, hateful, threatening, spam or spam-like, likely to offend, contains adult or
          objectionable content, contains personal information of others, risks copyright infringement, encourages
          unlawful activity, or otherwise violates any laws.
        </p>
        <p>
          We reserve the right to remove or modify any content posted for any reason without explanation. Requests for
          content to be removed or modified will be undertaken only at our discretion. We reserve the right to take
          action against any account with the Site at any time.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">5. External Links</h2>
        <p>
          Our Site may contain links to third-party web sites or services that are not owned or controlled by Red, White
          and True News. Red, White and True News has no control over, and assumes no responsibility for, the content,
          privacy policies, or practices of any third-party web sites or services. You further acknowledge and agree
          that Red, White and True News shall not be responsible or liable, directly or indirectly, for any damage or
          loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or
          services available on or through any such web sites or services.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">6. Disclaimer of Warranties</h2>
        <p>
          The Site is provided on an "AS IS" and "AS AVAILABLE" basis. Use of the Site is at your own risk. To the
          maximum extent permitted by applicable law, the Site is provided without warranties of any kind, whether
          express or implied, including, but not limited to, implied warranties of merchantability, fitness for a
          particular purpose, or non-infringement.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">7. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by applicable law, in no event shall Red, White and True News, its affiliates,
          agents, directors, employees, suppliers, or licensors be liable for any indirect, punitive, incidental,
          special, consequential, or exemplary damages, including without limitation damages for loss of profits,
          goodwill, use, data, or other intangible losses, arising out of or relating to the use of, or inability to
          use, this Site.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">8. Changes to Terms</h2>
        <p>
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is
          material we will try to provide at least 30 days' notice prior to any new terms taking effect. What
          constitutes a material change will be determined at our sole discretion.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">9. Contact Us</h2>
        <p>If you have any questions about these Terms, please contact us at webcontact@redwhiteandtruenews.com.</p>
      </section>
    </div>
  )
}
