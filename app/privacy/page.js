import { motion } from 'framer-motion'

export const metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for DKG Entertainment — how we collect, use, and protect your information.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <p className="text-[#c9a84c] text-[10px] font-black tracking-[0.35em] uppercase mb-4">Legal</p>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase leading-none mb-4">
          Privacy<br />Policy
        </h1>
        <p className="text-white/30 text-sm mb-16">Last updated: May 2025</p>

        <div className="space-y-12 text-white/50 leading-relaxed">

          <section>
            <h2 className="text-white text-xl font-black tracking-tight uppercase mb-4">1. Who We Are</h2>
            <p>
              DKG Entertainment ("DKG," "we," "us," or "our") operates <span className="text-white/70">dkgent.com</span>. We are a music management and events company based in Houston, TX. Questions about this policy can be sent to{' '}
              <a href="mailto:info@dkgent.com" className="text-[#c9a84c] hover:text-white transition-colors">info@dkgent.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-black tracking-tight uppercase mb-4">2. Information We Collect</h2>
            <ul className="list-disc list-inside space-y-3 ml-2">
              <li><span className="text-white/70">Email address</span> — when you subscribe to our newsletter or submit a contact/booking form.</li>
              <li><span className="text-white/70">Name & message</span> — when you fill out our contact or booking inquiry forms.</li>
              <li><span className="text-white/70">Usage data</span> — via Google Analytics (GA4): pages visited, time on site, device type, approximate location, and IP address (anonymized). This is only collected if you accept cookies.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-xl font-black tracking-tight uppercase mb-4">3. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-3 ml-2">
              <li>To send you newsletters and updates about DKG artists, events, and releases (only if you subscribed).</li>
              <li>To respond to booking and contact inquiries.</li>
              <li>To analyze site traffic and improve our website using Google Analytics.</li>
              <li>We do <span className="text-white font-bold">not</span> sell, rent, or trade your personal information to third parties.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-xl font-black tracking-tight uppercase mb-4">4. Cookies & Analytics</h2>
            <p className="mb-4">
              We use Google Analytics 4 (GA4) to understand how visitors interact with our site. GA4 uses cookies to collect anonymous usage data. This tracking is only activated after you give explicit consent via the cookie banner shown on your first visit.
            </p>
            <p className="mb-4">
              You can opt out at any time by clearing your browser's local storage or cookies. You may also install the{' '}
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-[#c9a84c] hover:text-white transition-colors">
                Google Analytics Opt-out Browser Add-on
              </a>.
            </p>
            <p>To change your consent preference, clear your browser's local storage for dkgent.com and reload the page.</p>
          </section>

          <section>
            <h2 className="text-white text-xl font-black tracking-tight uppercase mb-4">5. Email & Newsletter</h2>
            <p className="mb-4">
              If you subscribe to our mailing list, you will receive promotional emails about DKG Entertainment artists, events, and news. Every email includes an unsubscribe link. You can also unsubscribe at any time by visiting{' '}
              <a href="/unsubscribe" className="text-[#c9a84c] hover:text-white transition-colors">/unsubscribe</a>.
            </p>
            <p>
              In compliance with the CAN-SPAM Act, our emails include our mailing address:{' '}
              <span className="text-white/70">DKG Entertainment, Houston, TX</span>.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-black tracking-tight uppercase mb-4">6. Data Retention</h2>
            <p>
              Email addresses are retained until you unsubscribe. Form submission data is retained only as long as needed to respond to your inquiry. Analytics data is retained per Google's default GA4 retention settings (14 months).
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-black tracking-tight uppercase mb-4">7. Your Rights</h2>
            <p className="mb-4">
              Depending on your location, you may have the right to access, correct, or delete personal data we hold about you. To exercise any of these rights, contact us at{' '}
              <a href="mailto:info@dkgent.com" className="text-[#c9a84c] hover:text-white transition-colors">info@dkgent.com</a>.
            </p>
            <p>
              California residents have additional rights under the CCPA, including the right to know what data is collected and the right to opt out of sale (note: we do not sell personal data).
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-black tracking-tight uppercase mb-4">8. Third-Party Services</h2>
            <p>
              We use the following third-party services, each governed by their own privacy policies:
            </p>
            <ul className="list-disc list-inside space-y-3 mt-4 ml-2">
              <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#c9a84c] hover:text-white transition-colors">Google Analytics</a> — website analytics</li>
              <li>Cloudflare — hosting and performance (via Cloudflare Pages)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-xl font-black tracking-tight uppercase mb-4">9. Children's Privacy</h2>
            <p>
              Our site is not directed to children under 13. We do not knowingly collect personal information from children. If you believe a child has submitted information to us, contact us and we will delete it promptly.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-black tracking-tight uppercase mb-4">10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be reflected by the "Last updated" date at the top of this page. Continued use of the site after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-black tracking-tight uppercase mb-4">11. Contact</h2>
            <p>
              For any privacy-related questions or requests, reach us at{' '}
              <a href="mailto:info@dkgent.com" className="text-[#c9a84c] hover:text-white transition-colors">info@dkgent.com</a>.
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}
