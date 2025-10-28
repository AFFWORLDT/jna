"use client"
import HeroSection from "@/src/view/landing/hero-section"
import Feature from "@/src/view/landing/feature"
import AboutUsSection from "@/src/view/landing/about"
import Communities from "@/src/view/landing/Communities"
import Property from "@/src/view/landing/property"
import { InsightsInspiration } from "@/src/view/landing/blog"
import { CallToAction } from "@/src/view/landing/call-to-action"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fff]">
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
