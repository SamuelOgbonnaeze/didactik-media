export function PrivacyPolicyContent() {
  return (
    <div className="max-w-prose mx-auto text-gray-700 text-base leading-relaxed space-y-8">
      <div>
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-2 tracking-tight text-balance text-gray-900">Privacy Policy</h2>
        <p className="text-gray-500 text-sm">Last Updated: June 9, 2026</p>
      </div>

      <section className="space-y-4">
        <h3 className="text-2xl font-serif font-semibold tracking-tight text-balance text-gray-900">1. Introduction & Data Controller</h3>
        <p>
          Didactik Media ("we", "our", or "us") respects your privacy and is committed to protecting your personal data. 
          This Privacy Policy explains how we collect, use, and safeguard your information when you use our Production Company Portal.
          If you have any questions about this policy or your data, please contact us at <a href="mailto:privacy@didactikmedia.com" className="text-secondary hover:text-primary transition-colors font-medium">privacy@didactikmedia.com</a>.
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-serif font-semibold tracking-tight text-balance text-gray-900">2. Data We Collect</h3>
        <p>
          We may collect and process the following data about you:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-600">
          <li><strong>Identity Data:</strong> First name, last name, and organization details.</li>
          <li><strong>Contact Data:</strong> Email address and phone number.</li>
          <li><strong>Content & Metadata:</strong> Any media files, descriptions, and metadata you upload through the portal.</li>
          <li><strong>Technical Data:</strong> IP address, browser type and version, time zone setting, and operating system.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-serif font-semibold tracking-tight text-balance text-gray-900">3. How We Use Your Data</h3>
        <p>
          We will only use your personal data for the following purposes:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-600">
          <li>To register you as a new user and manage your portal account.</li>
          <li>To process, store, and manage the media assets you submit.</li>
          <li>To communicate with you regarding portal updates, technical issues, or submission statuses.</li>
          <li>To comply with legal and regulatory obligations.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-serif font-semibold tracking-tight text-balance text-gray-900">4. Data Processors & Cross-Border Transfers</h3>
        <p>
          To provide our services, we utilize third-party data processors. Notably, media assets and associated metadata 
          submitted through the portal are securely transferred to and stored by <strong>Backblaze, Inc. (Backblaze B2)</strong>, 
          which operates servers located in the United States. 
        </p>
        <p>
          By submitting your content and personal data, you explicitly consent to this transfer, storing, and processing 
          outside of your local jurisdiction. We ensure that our processors implement appropriate technical and organizational 
          measures to safeguard your data.
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-serif font-semibold tracking-tight text-balance text-gray-900">5. Your Legal Rights</h3>
        <p>
          Depending on your jurisdiction (such as under the NDPR in Nigeria, the GDPR, or CCPA), you may have the right to:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-600">
          <li>Request access to your personal data.</li>
          <li>Request correction of the personal data that we hold about you.</li>
          <li>Request erasure of your personal data.</li>
          <li>Object to or request restriction of processing of your personal data.</li>
        </ul>
        <p>
          To exercise any of these rights, please email <a href="mailto:privacy@didactikmedia.com" className="text-secondary hover:text-primary transition-colors font-medium">privacy@didactikmedia.com</a>.
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-serif font-semibold tracking-tight text-balance text-gray-900">6. Contact & Support</h3>
        <p>
          For general portal support, account onboarding, or technical inquiries, please contact our team at <a href="mailto:admin@didactikmedia.com" className="text-secondary hover:text-primary transition-colors font-medium">admin@didactikmedia.com</a>.
        </p>
      </section>
    </div>
  );
}
