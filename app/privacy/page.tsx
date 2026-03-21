import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata = {
  title: 'Privacy Policy — ClearDMV',
  description: 'How ClearDMV collects, uses, and protects your information.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Effective date: March 21, 2026</p>

        <div className="space-y-8 text-sm text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">1. Overview</h2>
            <p>
              ClearDMV (&ldquo;we,&rdquo; &ldquo;our,&rdquo; &ldquo;us&rdquo;) is a free vehicle
              registration status checker and AI guidance tool. This Privacy Policy explains what
              information we collect when you use cleardmv.com, how we use it, and your rights
              regarding that information. ClearDMV is operated by TollFighter, Inc.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">2. Information We Collect</h2>
            <h3 className="font-semibold text-slate-800 mt-3 mb-1">a. Information you provide</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>License plate number and state you enter for a scan</li>
              <li>Messages you type in the AI chat assistant</li>
              <li>Optional: VIN (last 8 digits) or driver&apos;s license number if required for your state scan</li>
            </ul>
            <h3 className="font-semibold text-slate-800 mt-3 mb-1">b. Information collected automatically</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>IP address (used for rate limiting and fraud prevention; not stored permanently)</li>
              <li>Browser type, device type, and referring URL (standard web server logs)</li>
              <li>Pages visited and actions taken on the site (analytics — see Section 5)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">3. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>To retrieve your vehicle registration status from public state DMV portals</li>
              <li>To provide AI-powered guidance specific to your state and detected issues</li>
              <li>To enforce rate limits and prevent abuse of our service</li>
              <li>To improve the accuracy and coverage of our state-specific guidance</li>
              <li>To comply with legal obligations</li>
            </ul>
            <p className="mt-2">
              We do not sell your personal information. We do not use your plate number or chat
              messages for advertising targeting.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">4. Data Retention</h2>
            <p>
              Scan job records (plate number, state, scan result) are stored for up to 1 hour
              to allow result polling, then automatically deleted. Chat messages are processed
              in real time by our AI model and are not permanently stored on our servers.
              We may retain anonymized, aggregated scan statistics (e.g., &ldquo;X scans run in
              New York this month&rdquo;) for service improvement.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">5. Analytics</h2>
            <p>
              We use PostHog for product analytics. PostHog collects anonymized usage data
              (pages visited, features used) to help us understand how the service is being
              used. PostHog data is pseudonymous and does not include your plate number or
              chat messages. You can opt out of analytics by enabling &ldquo;Do Not Track&rdquo;
              in your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">6. Third-Party Services</h2>
            <p>We use the following third-party services to operate ClearDMV:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Anthropic Claude API</strong> — powers the AI chat assistant. Your messages are sent to Anthropic for processing per their <a href="https://www.anthropic.com/privacy" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.</li>
              <li><strong>Vercel</strong> — web hosting. Standard web logs apply.</li>
              <li><strong>Supabase</strong> — temporary scan job storage.</li>
              <li><strong>State DMV portals</strong> — we query public state government portals on your behalf to retrieve registration status.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">7. Children&apos;s Privacy</h2>
            <p>
              ClearDMV is not directed to children under 13. We do not knowingly collect
              personal information from children under 13. If you believe we have inadvertently
              collected such information, please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">8. Your Rights</h2>
            <p>
              Because we store minimal identifying information and delete scan records within 1
              hour, most users have no persistent personal data to request or delete. If you
              believe we hold personal data about you, contact us at{' '}
              <a href="mailto:privacy@tollfighter.com" className="text-blue-600 hover:underline">
                privacy@tollfighter.com
              </a>{' '}
              and we will respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Material changes will be
              posted on this page with an updated effective date. Continued use of the service
              after changes are posted constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">10. Contact</h2>
            <p>
              Questions about this Privacy Policy? Email{' '}
              <a href="mailto:privacy@tollfighter.com" className="text-blue-600 hover:underline">
                privacy@tollfighter.com
              </a>
              .
            </p>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  );
}
