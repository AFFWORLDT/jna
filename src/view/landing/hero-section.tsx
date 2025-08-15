import Image from "next/image"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Input } from "@/src/components/ui/input"
import { Button } from "@/src/components/ui/button"

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center text-center bg-white md:bg-transparent">
      <Image
        src="/images/bgImage.webp"
        alt="Luxury Living in Dubai"
        fill
        className="object-cover z-0"
        quality={85}
        priority
      />
      <div className="absolute inset-0 bg-black/40 z-10" />
      <div className="relative z-20 text-white px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full mt-auto py-11">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-mono mb-4 leading-tight tracking-wide">
          Luxury Living Reimagined
        </h1>
        <p className="text-sm sm:text-base md:text-lg font-light mb-8 sm:mb-12 tracking-wider uppercase max-w-4xl mx-auto">
          EMBRACE TO A JOURNEY OF PURE SOPHISTICATION CULMINATING IN THE REFLECTION OF YOUR LIFESTYLE
        </p>

        <div className="w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4 p-4 sm:p-6">
            <div className="lg:col-span-1">
              <Select>
                <SelectTrigger className="w-full h-12 sm:h-14 text-white backdrop-blur-sm focus:ring-offset-0 focus:ring-transparent [&>span]:text-white bg-white/10 border border-white/30 rounded-none">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent className="bg-white text-gray-900">
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="dubai-marina">Dubai Marina</SelectItem>
                  <SelectItem value="downtown-dubai">Downtown Dubai</SelectItem>
                  <SelectItem value="palm-jumeirah">Palm Jumeirah</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="lg:col-span-1">
              <Select>
                <SelectTrigger className="w-full h-12 sm:h-14 text-white bg-white/10 border border-white/30 rounded-none backdrop-blur-sm focus:ring-offset-0 focus:ring-transparent [&>span]:text-white">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent className="bg-white text-gray-900">
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="penthouse">Penthouse</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="lg:col-span-1">
              <Select>
                <SelectTrigger className="w-full h-12 sm:h-14 text-white bg-white/10 border border-white/30 rounded-none backdrop-blur-sm focus:ring-offset-0 focus:ring-transparent [&>span]:text-white">
                  <SelectValue placeholder="Price" />
                </SelectTrigger>
                <SelectContent className="bg-white text-gray-900">
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="500k-1m">500K - 1M AED</SelectItem>
                  <SelectItem value="1m-2m">1M - 2M AED</SelectItem>
                  <SelectItem value="2m+">2M+ AED</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="lg:col-span-1">
              <Select>
                <SelectTrigger className="w-full h-12 sm:h-14 text-white bg-white/10 border border-white/30 rounded-none backdrop-blur-sm focus:ring-offset-0 focus:ring-transparent [&>span]:text-white">
                  <SelectValue placeholder="Bedrooms" />
                </SelectTrigger>
                <SelectContent className="bg-white text-gray-900">
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4+">4+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="lg:col-span-1">
              <Input
                type="text"
                placeholder="Ref Number"
                className="w-full h-12 sm:h-14 text-white bg-white/10 border border-white/30 rounded-none backdrop-blur-sm placeholder:text-white/70 focus-visible:ring-offset-0 focus-visible:ring-transparent"
              />
            </div>
            <div className="lg:col-span-1 sm:col-span-2">
              <Button className="w-full bg-[#dbbb90] hover:bg-[#C2A17B] text-white font-semibold py-2 px-4 rounded-none transition-colors h-12 sm:h-14">
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
