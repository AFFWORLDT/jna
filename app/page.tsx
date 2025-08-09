import Header from "@/components/common/header"
import HeroSection from "@/components/view/landing/hero-section"
import Footer from "@/components/common/footer"
import Feature from "@/components/view/landing/feature"
import AboutUsSection from "@/components/view/landing/about"
import Communities from "@/components/view/landing/Communities"
import Property from "@/components/view/landing/property"
import { InsightsInspiration } from "@/components/view/landing/blog"
import { CallToAction } from "@/components/view/landing/call-to-action"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      
      <HeroSection />
      <Feature/>
      <AboutUsSection/>
      <Communities/>
      <Property/>
     <InsightsInspiration/>
     <CallToAction/>
    </main>
  )
}
