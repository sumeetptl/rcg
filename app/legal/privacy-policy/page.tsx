import { LegalLayout } from "@/components/legal/legal-layout"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Comprehensive privacy policy and data collection practices for RealCryptoG.",
}

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      subtitle="Detailed information on data collection, processing, and protection standards."
      lastUpdated="February 1, 2026"
    >
      <section>
        <h2>1. Introduction & Scope</h2>
        <p className="mb-3 text-muted-foreground">
          RealCryptoG ("we," "us," or "our") is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy describes how we collect, use, and disclose your personal data when you use our website, mobile applications, and services (collectively, the "Platform"). By accessing or using the Platform, you consent to the data practices described in this policy.
        </p>
        <p className="mb-3 text-muted-foreground">
          This policy applies to all users, subscribers, and visitors globally. We adhere to principles of data minimization and transparency, collecting only what is necessary to provide our financial information services.
        </p>
      </section>

      <section>
        <h2>2. Information We Collect</h2>
        <p className="mb-3 text-muted-foreground">
          We collect information that identifies, relates to, describes, references, is capable of being associated with, or could reasonably be linked, directly or indirectly, with a particular consumer or device.
        </p>
        <h3 className="font-semibold text-foreground mb-2 mt-4">2.1 Information You Provide Directly</h3>
        <ul className="mb-3">
          <li><strong>Identity Data:</strong> Includes first name, last name, username, or similar identifier when you register.</li>
          <li><strong>Contact Data:</strong> Includes billing address, email address, and telephone numbers used for account verification.</li>
          <li><strong>Financial Data:</strong> We do not store full credit card details. Payment processing is handled by third-party PCI-DSS compliant payment processors (e.g., Stripe). We strictly retain only the reference tokens provided by these processors.</li>
          <li><strong>Profile Data:</strong> Includes your username, password (hashed), preferences, feedback, and survey responses.</li>
        </ul>

        <h3 className="font-semibold text-foreground mb-2 mt-4">2.2 Information Collected Automatically</h3>
        <ul className="mb-3">
          <li><strong>Technical Data:</strong> Internet Protocol (IP) address, login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this Platform.</li>
          <li><strong>Usage Data:</strong> Information about how you use our website, products, and services, including page interaction information (scrolling, clicks, and mouse-overs) and methods used to browse away from the page.</li>
          <li><strong>Device Data:</strong> We may collect information about the device you use to access the Platform, including the hardware model, operating system and version, and unique device identifiers.</li>
        </ul>
      </section>

      <section>
        <h2>3. How We Use Information</h2>
        <p className="mb-3 text-muted-foreground">
          We process your data only where we have a lawful basis to do so. Specifically, we use your data for the following purposes:
        </p>
        <ul>
          <li><strong>Service Delivery:</strong> To provide crypto signals, editorial content, and account management features.</li>
          <li><strong>Security & Fraud Prevention:</strong> To verify your identity, detect and prevent fraud, and maintain the security of our Platform. This includes monitoring for suspicious login patterns or concurrent access that violates our Terms of Service.</li>
          <li><strong>Communication:</strong> To send you technical notices, updates, security alerts, and support and administrative messages.</li>
          <li><strong>Compliance:</strong> To comply with applicable legal obligations, store financial records for tax purposes, and enforce our legal rights.</li>
        </ul>
      </section>

      <section>
        <h2>4. Cookies & Tracking Technologies</h2>
        <p className="mb-3 text-muted-foreground">
          We use cookies, web beacons, and similar tracking technologies to track the activity on our Service and store certain information. Tracking technologies used are beacons, tags, and scripts to collect and track information and to improve and analyze our Service.
        </p>
        <ul>
          <li><strong>Essential Cookies:</strong> Necessary for the operation of the website (e.g., session management, authentication).</li>
          <li><strong>Analytics Cookies:</strong> Allow us to recognize and count the number of visitors and see how visitors move around our website (e.g., Google Analytics).</li>
          <li><strong>Preference Cookies:</strong> Enable us to remember information that changes the way the website behaves or looks (e.g., dark mode settings).</li>
        </ul>
        <p className="mt-2 text-muted-foreground">
          You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
        </p>
      </section>

      <section>
        <h2>5. Data Sharing & Disclosure</h2>
        <p className="mb-3 text-muted-foreground">
          We do not sell your personal data. We may share your information only in the following restricted circumstances:
        </p>
        <ul>
          <li><strong>Service Providers:</strong> We may share data with third-party vendors, service providers, contractors, or agents who perform services for us or on our behalf and require access to such information to do that work (e.g., cloud hosting, email delivery, payment processing).</li>
          <li><strong>Business Transfers:</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
          <li><strong>Legal Requirements:</strong> We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process.</li>
        </ul>
      </section>

      <section>
        <h2>6. Data Retention</h2>
        <p className="mb-3 text-muted-foreground">
          We retain your personal data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your personal data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies. Accounts that are inactive for a period of 24 months may be subject to deletion.
        </p>
      </section>

      <section>
        <h2>7. Data Security</h2>
        <p className="mb-3 text-muted-foreground">
          We have implemented appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. We use industry-standard encryption (TLS/SSL) for data in transit and encryption at rest for sensitive data. Access to your personal data is limited to those employees, agents, contractors, and other third parties who have a business need to know.
        </p>
      </section>

      <section>
        <h2>8. Your Legal Rights</h2>
        <p className="mb-3 text-muted-foreground">
          Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
        </p>
        <ul>
          <li>Request access to your personal data.</li>
          <li>Request correction of the personal data that we hold about you.</li>
          <li>Request erasure of your personal data ("right to be forgotten").</li>
          <li>Object to processing of your personal data.</li>
          <li>Request restriction of processing your personal data.</li>
          <li>Request transfer of your personal data.</li>
          <li>Withdraw consent at any time where we are relying on consent to process your personal data.</li>
        </ul>
      </section>

      <section>
        <h2>9. Contact Us</h2>
        <p className="mb-3 text-muted-foreground">
          If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
        </p>
        <div className="text-foreground font-medium pl-5 border-l-2 border-border">
          RealCryptoG Legal Team<br />
          Email: privacy@realcryptog.com<br />
          Address: 1209 Orange Street, Wilmington, DE 19801
        </div>
      </section>
    </LegalLayout>
  )
}
