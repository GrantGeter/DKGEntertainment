export const metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for DKG Entertainment.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <p className="text-[#c9a84c] text-[10px] font-black tracking-[0.35em] uppercase mb-4">Legal</p>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase leading-none mb-4">
          Terms of<br />Service
        </h1>
        <p className="text-white/30 text-sm mb-16">Last updated: May 2025</p>

        <div className="space-y-12 text-white/50 leading-relaxed">

          <section>
            <h2 className="text-white text-xl font-black tracking-tight uppercase mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing or using <span className="text-white/70">dkgent.com</span> (the "Site"), you agree to be bound by these Terms of Service. If you do not agree, please do not use this Site.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-black tracking-tight uppercase mb-4">2. Use of the Site</h2>
            <p className="mb-4">You agree to use this Site only for lawful purposes. You may not:</p>
            <ul className="list-disc list-inside space-y-3 ml-2">
              <li>Reproduce, distribute, or commercially exploit any content from this Site without written permission.</li>
              <li>Attempt to gain unauthorized access to any portion of the Site or its systems.</li>
              <li>Use the Site to transmit spam, malware, or any harmful content.</li>
              <li>Impersonate DKG Entertainment, its artists, or any other person or entity.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-xl font-black tracking-tight uppercase mb-4">3. Booking Inquiries</h2>
            <p>
              Submission of a booking inquiry through this Site does <span className="text-white font-bold">not</span> constitute a confirmed booking or binding contract. All bookings are subject to artist availability and require a separately executed written agreement. DKG Entertainment reserves the right to accept or decline any inquiry at its sole discretion.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-black tracking-tight uppercase mb-4">4. Intellectual Property</h2>
            <p>
              All content on this Site — including text, images, logos, artist photography, and design — is the property of DKG Entertainment or its respective rights holders and is protected by copyright and other intellectual property laws. Unauthorized use is strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-black tracking-tight uppercase mb-4">5. Third-Party Links</h2>
            <p>
              This Site may contain links to third-party websites (e.g., streaming platforms, social media). DKG Entertainment is not responsible for the content, privacy practices, or terms of those sites. Links are provided for convenience only.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-black tracking-tight uppercase mb-4">6. Disclaimer of Warranties</h2>
            <p>
              This Site is provided "as is" without warranties of any kind, express or implied. DKG Entertainment does not warrant that the Site will be error-free, uninterrupted, or free of viruses or harmful components.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-black tracking-tight uppercase mb-4">7. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, DKG Entertainment shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of this Site or inability to use it, even if advised of the possibility of such damages.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-black tracking-tight uppercase mb-4">8. Governing Law</h2>
            <p>
              These Terms are governed by the laws of the State of Texas, without regard to its conflict-of-law provisions. Any disputes shall be resolved in the courts of Texas.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-black tracking-tight uppercase mb-4">9. Changes to Terms</h2>
            <p>
              We reserve the right to update these Terms at any time. Changes are effective upon posting to this page. Continued use of the Site constitutes acceptance of the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-black tracking-tight uppercase mb-4">10. Contact</h2>
            <p>
              Questions about these Terms? Contact us at{' '}
              <a href="mailto:info@dkgent.com" className="text-[#c9a84c] hover:text-white transition-colors">info@dkgent.com</a>.
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}
