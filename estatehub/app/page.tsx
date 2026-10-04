import { Header } from "@/components/home/header"
import { HeroSection } from "@/components/home/hero-section"
import { FeaturedListings } from "@/components/home/featured-listings"
import { GeographicEnclaves } from "@/components/home/geographic-enclaves"
import { AssetClasses } from "@/components/home/asset-classes"
import { AdvantagePillars } from "@/components/home/advantage-pillars"
import { BrokerSpotlight } from "@/components/home/broker-spotlight"
import { ConsultationBanner } from "@/components/home/consultation-banner"
import { Footer } from "@/components/home/footer"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-surface text-on-surface">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturedListings />
        <GeographicEnclaves />
        <AssetClasses />
        <AdvantagePillars />
        <BrokerSpotlight />
        <ConsultationBanner />
      </main>
      <Footer />
    </div>
  )
}
