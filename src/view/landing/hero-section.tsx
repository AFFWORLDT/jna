import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { useState } from "react";

export default function HeroSection() {
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [isPriceOpen, setIsPriceOpen] = useState(false);

  const handlePriceChange = (field: "min" | "max", value: string) => {
    setPriceRange((prev) => ({ ...prev, [field]: value }));
  };

  const getPriceDisplayValue = () => {
    if (priceRange.min && priceRange.max) {
      return `${priceRange.min} - ${priceRange.max} AED`;
    } else if (priceRange.min) {
      return `${priceRange.min}+ AED`;
    } else if (priceRange.max) {
      return `Up to ${priceRange.max} AED`;
    }
    return "Any";
  };
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
      <div className="absolute inset-0 bg-black/20 z-10  md:hidden block" />

      <div className="relative z-20 text-white px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full mt-auto py-11 max-sm:-mt-2">
        <h1 className="text-4xl  lg:text-5xl font-mono mb-4 leading-tight tracking-wide">
          Luxury Living Reimagined
        </h1>
        <p className="text-sm sm:text-base md:text-lg font-light mb-8 sm:mb-12 tracking-wider uppercase max-w-4xl mx-auto">
          EMBRACE TO A JOURNEY OF PURE SOPHISTICATION CULMINATING IN THE
          REFLECTION OF YOUR LIFESTYLE
        </p>

        <div className="w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4 p-4 sm:p-6 max-sm:bg-white">
            <div className="lg:col-span-1">
              <Select>
                <SelectTrigger className="w-full h-12 sm:h-14 text-white backdrop-blur-sm focus:ring-offset-0 focus:ring-transparent [&>span]:text-white bg-white/10 border border-white/30 rounded-none hidden md:block">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent className="bg-white text-gray-900">
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="dubai-marina">Dubai Marina</SelectItem>
                  <SelectItem value="downtown-dubai">Downtown Dubai</SelectItem>
                  <SelectItem value="palm-jumeirah">Palm Jumeirah</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Location"
                className="w-full bg-white border rounded-none h-12 text-gray-900 placeholder:text-gray-600 focus-visible:ring-0 focus-visible:ring-offset-0 border-gray-300 block md:hidden"
              />
            </div>
            <div className="lg:col-span-1">
              <Select>
                <SelectTrigger className="w-full h-12 sm:h-14 text-white bg-white/10 border border-white/30 rounded-none backdrop-blur-sm focus:ring-offset-0 focus:ring-transparent [&>span]:text-white hidden md:block">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent className="bg-white text-gray-900">
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="penthouse">Penthouse</SelectItem>
                </SelectContent>
              </Select>
              <div className="relative block md:hidden">
                <div className="absolute top-1 left-3 text-xs text-gray-500 z-10">
                  Type
                </div>
                <Select defaultValue="house">
                  <SelectTrigger className="w-full bg-white border rounded-none h-12 text-gray-900 focus:ring-0 focus:ring-offset-0 pt-5 pb-2 border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="lg:col-span-1 relative">
              <div
                className="relative w-full h-12 sm:h-14 text-white bg-white/10 border border-white/30 max-sm:border-gray-300 rounded-none backdrop-blur-sm focus:ring-offset-0 focus:ring-transparent cursor-pointer flex items-center px-3  "
                onClick={() => setIsPriceOpen(!isPriceOpen)}
              >
                <div className="absolute text-black block md:hidden left-3 top-0 text-[10px]">
                  Price
                </div>
                <span className="text-white max-sm:text-black">
                  {getPriceDisplayValue()}
                </span>
              </div>

              {isPriceOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 shadow-lg z-50 p-4 w-60 max-sm:w-full">
                  <div className="flex gap-5">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        Min Price (AED)
                      </label>
                      <Input
                        type="number"
                        placeholder="0"
                        value={priceRange.min}
                        onChange={(e) =>
                          handlePriceChange("min", e.target.value)
                        }
                        className="w-full h-10 text-gray-900 border-gray-300 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        Max Price (AED)
                      </label>
                      <Input
                        type="number"
                        placeholder="No limit"
                        value={priceRange.max}
                        onChange={(e) =>
                          handlePriceChange("max", e.target.value)
                        }
                        className="w-full h-10 text-gray-900 border-gray-300 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <Select>
                <SelectTrigger className="w-full h-12 sm:h-14 text-white max-sm:text-black bg-white/10 border max-sm:border-gray-300 border-white/30 rounded-none backdrop-blur-sm focus:ring-offset-0 focus:ring-transparent ">
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
                className="w-full h-12 sm:h-14 text-white max-sm:text-black bg-white/10 border max-sm:border-gray-300 border-white/30 rounded-none backdrop-blur-sm placeholder:text-white/70 max-sm:placeholder:text-black/70 focus-visible:ring-offset-0 focus-visible:ring-transparent"
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
  );
}
