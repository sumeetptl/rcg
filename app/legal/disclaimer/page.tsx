import { LegalLayout } from "@/components/legal/legal-layout"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Critical risk disclosure and liability limitations for crypto trading information.",
}

export default function DisclaimerPage() {
  return (
    <LegalLayout
      title="Disclaimer"
      subtitle="Critical information regarding financial risk, liability, and the nature of our services."
      lastUpdated="February 1, 2026"
    >
      <section>
        <h2>1. General Disclaimer</h2>
        <p className="mb-3 text-muted-foreground">
          RealCryptoG is a financial information provider and media platform. We are <strong>not</strong> a broker-dealer, financial advisor, investment advisor, or registered legal advisor. The information provided on this website, including but not limited to crypto signals, market analysis, news reports, and blog posts, is for strict <strong>informational and educational purposes only</strong>.
        </p>
        <p className="mb-3 text-muted-foreground">
          Nothing contained herein constitutes a solicitation, recommendation, endorsement, or offer by RealCryptoG or any third party service provider to buy or sell any securities or other financial instruments in this or in any other jurisdiction in which such solicitation or offer would be unlawful under the securities laws of such jurisdiction.
        </p>
      </section>

      <section>
        <h2>2. No Financial Advice</h2>
        <p className="mb-3 text-muted-foreground">
          All content provided on the platform represents the subjective opinions of the authors and analysts. It should not be treated as a specific inducement to make a particular investment or follow a particular strategy. You typically cannot rely on this information to make investment decisions. You should always conduct your own research (DYOR) and consult with a qualified professional financial advisor before making any investment decisions.
        </p>
      </section>

      <section>
        <h2>3. High Risk Warning</h2>
        <div className="border-l-4 border-destructive/50 pl-4 py-1 my-4 bg-destructive/5">
          <p className="font-semibold text-destructive mb-1">WARNING: RISK OF LOSS</p>
          <p className="text-sm text-foreground/80">
            Trading cryptocurrencies, futures, and derivatives involves a substantial risk of loss and is not suitable for every investor. You could lose some or all of your initial investment. Do not trade with money you cannot afford to lose.
          </p>
        </div>
        <p className="mb-3 text-muted-foreground">
          The high degree of leverage that is often obtainable in crypto trading can work against you as well as for you. The use of leverage can lead to large losses as well as large gains. RealCryptoG accepts no liability for any loss or damage, including without limitation to, any loss of profit, which may arise directly or indirectly from use of or reliance on such information.
        </p>
      </section>

      <section>
        <h2>4. Accuracy of Information</h2>
        <p className="mb-3 text-muted-foreground">
          The content on this website is subject to change at any time without notice. While we make every effort to ensure the accuracy of the information provided, we do not guarantee its accuracy, completeness, or timeliness. The crypto market is highly volatile and information can become outdated efficiently. We accept no responsibility for any use that may be made of these comments and for any consequences that result.
        </p>
      </section>

      <section>
        <h2>5. No Guarantees</h2>
        <p className="mb-3 text-muted-foreground">
          Past performance of any trading system, methodology, or individual trader is not necessarily indicative of future results. No representation is being made that any account will or is likely to achieve profits or losses similar to those discussed. There is no guarantee that you will earn any money using the techniques and ideas in these materials.
        </p>
      </section>

      <section>
        <h2>6. Third-Party Links & Services</h2>
        <p className="mb-3 text-muted-foreground">
          Our Service may contain links to third-party web sites or services that are not owned or controlled by RealCryptoG. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You acknowledge and agree that RealCryptoG shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.
        </p>
      </section>

      <section>
        <h2>7. Jurisdiction Statement</h2>
        <p className="mb-3 text-muted-foreground">
          The information on this website is not intended for distribution to, or use by, any person in any country or jurisdiction where such distribution or use would be contrary to local law or regulation. None of the services or investments referred to in this website are available to persons resident in any country where the provision of such services or investments would be contrary to local law or regulation.
        </p>
      </section>
    </LegalLayout>
  )
}
