import { LegalLayout } from "@/components/legal/legal-layout"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Binding agreement and conditions of use for the RealCryptoG platform.",
}

export default function TermsOfServicePage() {
  return (
    <LegalLayout
      title="Terms of Service"
      subtitle="Binding agreement governing your access to and use of RealCryptoG services."
      lastUpdated="February 1, 2026"
    >
      <section>
        <h2>1. Acceptance of Terms</h2>
        <p className="mb-3 text-muted-foreground">
          These Terms of Service ("Terms") constitute a legally binding agreement between you ("User" or "you") and RealCryptoG ("Company," "we," "us," or "our"). By accessing, registering for, or using the RealCryptoG platform, website, API, or mobile applications (collectively, the "Service"), you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you must not access or use the Service.
        </p>
        <p className="mb-3 text-muted-foreground">
          We reserve the right to update or modify these Terms at any time without prior notice. Your continued use of the Service following any such change constitutes your agreement to follow and be bound by the Terms as changed.
        </p>
      </section>

      <section>
        <h2>2. Eligibility & Access</h2>
        <p className="mb-3 text-muted-foreground">
          The Service is strictly limited to users who are at least 18 years of age or the legal age of majority in their jurisdiction. By using the Service, you represent and warrant that you meet this eligibility requirement.
        </p>
        <p className="mb-3 text-muted-foreground">
          Access to the Service is not permitted for any person or entity who is: (a) a citizen or resident of, or located in, any country against which the United States has embargoed goods or imposed trade sanctions; (b) identified on the U.S. Treasury Department's Specially Designated Nationals List.
        </p>
      </section>

      <section>
        <h2>3. Account Registration & Security</h2>
        <ul className="mb-3">
          <li><strong>Registration:</strong> You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.</li>
          <li><strong>Security:</strong> You are responsible for safeguarding your password and for any activities or actions under your password. You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</li>
          <li><strong>Account Sharing:</strong> Accounts are for individual use only. Sharing login credentials or subscription access with others is strictly prohibited and fits grounds for immediate termination without refund.</li>
        </ul>
      </section>

      <section>
        <h2>4. Prohibited Use Activities</h2>
        <p className="mb-3 text-muted-foreground">
          You agree strictly NOT to:
        </p>
        <ul className="mb-3">
          <li>Reproduce, duplicate, copy, sell, resell, or exploit any portion of the Service, use of the Service, or access to the Service without express written permission by us.</li>
          <li>Use any robot, spider, scraper, or other automated means to access the Service for any purpose without our express written permission.</li>
          <li>Distribute, publish, or republish any crypto signals, analysis, or proprietary content to third parties, including on social media, Telegram groups, or other public forums.</li>
          <li>Attempt to interfere with, compromise the system integrity or security, or decipher any transmissions to or from the servers running the Service.</li>
        </ul>
      </section>

      <section>
        <h2>5. Subscription, Billing & Cancellation</h2>
        <p className="mb-3 text-muted-foreground">
          <strong>Billing Cycle:</strong> Service fees are billed on a recurring basis (monthly or annually) immediately upon subscription and at the start of each renewal period.
        </p>
        <p className="mb-3 text-muted-foreground">
          <strong>Cancellation:</strong> You may cancel your subscription at any time through your account settings. Cancellation will stop future billing but does not result in a refund for the current billing period. Access to premium content will continue until the end of the current billing cycle.
        </p>
        <p className="mb-3 text-muted-foreground">
          <strong>Refunds:</strong> Unless required by applicable law, all fees are non-refundable. We do not provide refunds for partial months or unused services.
        </p>
      </section>

      <section>
        <h2>6. Intellectual Property Rights</h2>
        <p className="mb-3 text-muted-foreground">
          The Service and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by the Company, its licensors, or other providers of such material and are protected by United States and international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
        </p>
      </section>

      <section>
        <h2>7. Disclaimer of Warranties</h2>
        <p className="mb-3 text-muted-foreground uppercase text-xs tracking-wider">
          PLEASE READ CAREFULLY
        </p>
        <p className="mb-3 text-muted-foreground">
          THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. THE COMPANY MAKES NO REPRESENTATIONS OR WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, STATUTORY OR OTHERWISE, REGARDING THE SERVICE, INCLUDING ANY WARRANTY THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF HARMFUL COMPONENTS. WE DISCLAIM ALL WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
        </p>
      </section>

      <section>
        <h2>8. Limitation of Liability</h2>
        <p className="mb-3 text-muted-foreground">
          TO THE FULLEST EXTENT PERMITTED BY LAW, IN NO EVENT SHALL THE COMPANY, ITS AFFILIATES, OFFICERS, EMPLOYEES, AGENTS, SUPPLIERS, OR LICENSORS BE LIABLE FOR (A) ANY INDIRECT, INCIDENTAL, SPECIAL, PUNITIVE, COVER, OR CONSEQUENTIAL DAMAGES (INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOST PROFITS, REVENUE, GOODWILL, USE, OR CONTENT) HOWEVER CAUSED, UNDER ANY THEORY OF LIABILITY; (B) ANY TRADING LOSSES INCURRED BY FOLLOWING SIGNALS OR ANALYSIS PROVIDED ON THE PLATFORM.
        </p>
      </section>

      <section>
        <h2>9. Termination</h2>
        <p className="mb-3 text-muted-foreground">
          We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
        </p>
      </section>

      <section>
        <h2>10. Governing Law</h2>
        <p className="mb-3 text-muted-foreground">
          These Terms shall be governed and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
        </p>
      </section>

      <section>
        <h2>11. Contact Information</h2>
        <p className="mb-3 text-muted-foreground">
          Legal correspondence regarding these Terms should be sent to: legal@realcryptog.com.
        </p>
      </section>
    </LegalLayout>
  )
}
