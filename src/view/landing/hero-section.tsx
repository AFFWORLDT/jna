import Image from "next/image"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Input } from "@/src/components/ui/input"
import { Button } from "@/src/components/ui/button"

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center text-center">
      <Image
        src="/images/bgImage.webp"
        alt="Luxury Living in Dubai"
        layout="fill"
        objectFit="cover"
        quality={85}
        priority 
        className="z-0"
      />
      <div className="absolute inset-0 bg-black/40 z-10" /> 
      <div className="relative z-20 text-white px-4">
        <h1 className="text-3xl md:text-4xl font-light mb-4 leading-tight tracking-wide">Luxury Living Reimagined</h1>
        <p className="text-lg font-light mb-12 tracking-wider uppercase">
          EMBRACE TO A JOURNEY OF PURE SOPHISTICATION CULMINATING IN THE REFLECTION OF YOUR LIFESTYLE
        </p>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 p-6 ">
          <div className="md:col-span-1">
            <Select>
              <SelectTrigger className="w-full text-white backdrop-blur-s focus:ring-offset-0 focus:ring-transparent [&>span]:text-white bg-white/10 border border-white/30 rounded-sm backdrop-blur-s">
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
          <div className="md:col-span-1">
            <Select>
              <SelectTrigger className="w-full text-white bg-white/10 border border-white/30 rounded-sm backdrop-blur-s focus:ring-offset-0 focus:ring-transparent [&>span]:text-white">
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
          <div className="md:col-span-1">
            <Select>
              <SelectTrigger className="w-full text-white bg-white/10 border border-white/30 rounded-sm backdrop-blur-s focus:ring-offset-0 focus:ring-transparent [&>span]:text-white">
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
          <div className="md:col-span-1">
            <Select>
              <SelectTrigger className="w-full text-white bg-white/10 border border-white/30 rounded-sm backdrop-blur-s focus:ring-offset-0 focus:ring-transparent [&>span]:text-white">
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
          <div className="md:col-span-1">
            <Input
              type="text"
              placeholder="Ref Number"
              className="w-full text-white bg-white/10 border border-white/30 rounded-sm backdrop-blur-s placeholder:text-white/70 focus-visible:ring-offset-0 focus-visible:ring-transparent"
            />
          </div>
          <div className="md:col-span-1">
            <Button className="w-full bg-[#dbbb90] hover:bg-[#C2A17B] text-white font-semibold py-2 px-4 rounded-md transition-colors">
              Search
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
