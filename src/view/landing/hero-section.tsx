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
      return `${parseInt(priceRange.min).toLocaleString()} - ${parseInt(
        priceRange.max
      ).toLocaleString()}`;
    } else if (priceRange.min) {
      return `${parseInt(priceRange.min).toLocaleString()}`;
    } else if (priceRange.max) {
      return `Up to ${parseInt(priceRange.max).toLocaleString()} `;
    }
    return "Price";
  };

  // Price options starting from 250,000
  const priceOptions = [
    { value: "250000", label: "250,000" },
    { value: "500000", label: "500,000" },
    { value: "750000", label: "750,000" },
    { value: "1000000", label: "1,000,000" },
    { value: "1500000", label: "1,500,000" },
    { value: "2000000", label: "2,000,000" },
    { value: "2500000", label: "2,500,000" },
    { value: "3000000", label: "3,000,000" },
    { value: "4000000", label: "4,000,000" },
    { value: "5000000", label: "5,000,000" },
    { value: "7500000", label: "7,500,000" },
    { value: "10000000", label: "10,000,000" },
    { value: "15000000", label: "15,000,000" },
    { value: "20000000", label: "20,000,000" },
    { value: "30000000", label: "30,000,000" },
    { value: "40000000", label: "40,000,000" },
    { value: "50000000", label: "50,000,000" },
    { value: "60000000", label: "60,000,000" },
    { value: "70000000", label: "70,000,000" },
    { value: "80000000", label: "80,000,000" },
    { value: "90000000", label: "90,000,000" },
    { value: "100000000", label: "100,000,000" },
  ];

  return (
    <section className="relative h-[115vh] w-full flex items-center justify-center text-center bg-white md:bg-transparent">
      <Image
        src="/images/bgImage.webp"
        alt="Luxury Living in Dubai"
        fill
        className="object-cover z-0 animate-zoomInOut"
        quality={85}
        priority
      />
<div className="absolute inset-0 bg-gradient-to-t from-black/30 to-white/0 z-10" />

      <div className="relative z-20 text-white px-4 sm:px-6 lg:px-8 container w-full mt-[530px] py-11 max-sm:mt-40">
        <h1 className="text-4xl  lg:text-5xl font-custom mb-4">
          Luxury Living Reimagined
        </h1>
        <p className="text-[16px]  mb-8 sm:mb-12  uppercase max-w-4xl mx-auto text-neutral-300">
          EMBRACE TO A JOURNEY OF PURE SOPHISTICATION CULMINATING IN THE
          REFLECTION OF YOUR LIFESTYLE
        </p>

        <div className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4 p-4 sm:p-6 max-sm:bg-white">
            {/* Location */}
            <div className="lg:col-span-1 relative">
              <div className="absolute top-2 left-3 text-xs text-white/70 max-sm:text-gray-500 z-10">
                Location
              </div>
              <Select>
                <SelectTrigger className="w-full h-14 sm:h-14 text-white max-sm:text-black  focus:ring-offset-0 focus:ring-transparent bg-white/10 max-sm:bg-white border border-white/30 max-sm:border-gray-300 rounded-none pt-5 pb-2">
                  <SelectValue placeholder="Any" className="max-sm:hidden pt-2" />
                </SelectTrigger>
                <SelectContent className="bg-white text-gray-900">
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="dubai-marina">Dubai Marina</SelectItem>
                  <SelectItem value="downtown-dubai">Downtown Dubai</SelectItem>
                  <SelectItem value="palm-jumeirah">Palm Jumeirah</SelectItem>
                  <SelectItem value="business-bay">Business Bay</SelectItem>
                  <SelectItem value="jlt">JLT</SelectItem>
                  <SelectItem value="deira">Deira</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Type */}
            <div className="lg:col-span-1 relative">
              <div className="absolute top-2 left-3 text-xs text-white/70 max-sm:text-gray-500 z-10">
                Type
              </div>
              <Select>
                <SelectTrigger className="w-full h-12 sm:h-14 text-white max-sm:text-black bg-white/10 max-sm:bg-white border border-white/30 max-sm:border-gray-300 rounded-none  focus:ring-offset-0 focus:ring-transparent pt-5 pb-2">
                  <SelectValue placeholder="Any" className="max-sm:hidden pt-2" />
                </SelectTrigger>
                <SelectContent className="bg-white text-gray-900">
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="penthouse">Penthouse</SelectItem>
                  <SelectItem value="townhouse">Townhouse</SelectItem>
                  <SelectItem value="studio">Studio</SelectItem>
                  <SelectItem value="Plot">Plot</SelectItem>
                  <SelectItem value="Office">Office</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Price */}
            <div className="lg:col-span-1 relative">
              <div className="absolute top-2 left-3 text-xs text-white/70 max-sm:text-gray-500 z-10">
                Price
              </div>
              <div
                className="relative w-full h-12 sm:h-14 text-white max-sm:text-black bg-white/10 max-sm:bg-white border border-white/30 max-sm:border-gray-300 rounded-none  focus:ring-offset-0 focus:ring-transparent cursor-pointer flex items-center px-3 pt-5 pb-2"
                onClick={() => setIsPriceOpen(!isPriceOpen)}
              >
                <span className="text-white max-sm:text-black max-sm:hidden pt-2">
                  {getPriceDisplayValue()}
                </span>
              </div>

              {isPriceOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 shadow-lg z-50 p-4 w-72 max-sm:w-full">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-xs text-gray-500 mb-2">
                        Min Price
                      </label>
                      <Select
                        value={priceRange.min}
                        onValueChange={(value) =>
                          handlePriceChange("min", value)
                        }
                      >
                        <SelectTrigger className="w-full h-10 text-gray-900 border-gray-300 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 border">
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent className="bg-white text-gray-900 max-h-48 overflow-y-auto">
                          <SelectItem value="any">Any</SelectItem>
                          {priceOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs text-gray-500 mb-2">
                        Max Price
                      </label>
                      <Select
                        value={priceRange.max}
                        onValueChange={(value) =>
                          handlePriceChange("max", value)
                        }
                      >
                        <SelectTrigger className="w-full h-10 text-gray-900 border-gray-300 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 border">
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent className="bg-white text-gray-900 max-h-48 overflow-y-auto">
                          <SelectItem value="any">Any</SelectItem>
                          {priceOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bedrooms */}
            <div className="lg:col-span-1 relative">
              <div className="absolute top-2 left-3 text-xs text-white/70 max-sm:text-gray-500 z-10">
                Bedrooms
              </div>
              <Select>
                <SelectTrigger className="w-full h-12 sm:h-14 text-white max-sm:text-black bg-white/10 max-sm:bg-white border max-sm:border-gray-300 border-white/30 rounded-none  focus:ring-offset-0 focus:ring-transparent pt-5 pb-2">
                  <SelectValue placeholder="Any" className="max-sm:hidden pt-2" />
                </SelectTrigger>
                <SelectContent className="bg-white text-gray-900">
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="studio">Studio</SelectItem>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="6+">6+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Ref Number */}
            <div className="lg:col-span-1 relative">
              <div className="absolute top-2 left-3 text-xs text-white/70 max-sm:text-gray-500 z-10">
                Ref Number
              </div>
              <Input
                type="text"
                placeholder=""
                className="w-full h-12 sm:h-14 text-white max-sm:text-black bg-white/10 max-sm:bg-white border max-sm:border-gray-300 border-white/30 rounded-none  placeholder:text-white/70 max-sm:placeholder:text-black/70 focus-visible:ring-offset-0 focus-visible:ring-transparent pt-5 pb-2"
              />
            </div>

            {/* Search Button */}
            <div className="lg:col-span-1 sm:col-span-2">
              <Button className="w-full bg-[#dbbb90] hover:bg-[#C2A17B] text-white font-semibold py-2 px-4 rounded-none transition-colors h-12 sm:h-14 uppercase tracking-wider">
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
