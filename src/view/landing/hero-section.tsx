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
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();
  const [propertyType, setPropertyType] = useState("any");
  const [propertyTypeFilter, setPropertyTypeFilter] = useState("any");
  const [location, setLocation] = useState("any");
  const [bedrooms, setBedrooms] = useState("any");
  const [refNumber, setRefNumber] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [isPriceOpen, setIsPriceOpen] = useState(false);

  const handlePriceChange = (field: "min" | "max", value: string) => {
    setPriceRange((prev) => ({ ...prev, [field]: value }));
  };

  const handlePropertyTypeChange = (value: string) => {
    setPropertyType(value);
    // No automatic navigation - only store the selected value
  };

  const handleSearch = () => {
    // Build query parameters
    const params = new URLSearchParams();
    
    if (propertyTypeFilter && propertyTypeFilter !== "any") {
      params.append("property_type", propertyTypeFilter);
    }
    
    if (location && location !== "any") {
      params.append("title", location);
    }
    
    if (bedrooms && bedrooms !== "any") {
      params.append("bedrooms", bedrooms);
    }
    
    if (refNumber && refNumber.trim() !== "") {
      params.append("ref_number", refNumber.trim());
    }
    
    if (priceRange.min && priceRange.min !== "any") {
      params.append("min_price", priceRange.min);
    }
    
    if (priceRange.max && priceRange.max !== "any") {
      params.append("max_price", priceRange.max);
    }
    
    // Navigate based on selected property type
    const queryString = params.toString();
    
    console.log("Hero section - Search clicked with filters:", {
      propertyType,
      propertyTypeFilter,
      location,
      bedrooms,
      refNumber,
      priceRange,
      queryString
    });
    
    if (propertyType === "rent") {
      router.push(`/rent${queryString ? `?${queryString}` : ""}`);
    } else if (propertyType === "off_plan") {
      router.push(`/offPlans${queryString ? `?${queryString}` : ""}`);
    } else {
      // Default to buy page
      router.push(`/buy${queryString ? `?${queryString}` : ""}`);
    }
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3 sm:gap-4 p-4 sm:p-6 max-sm:bg-white">
            {/* Property Type */}
            <div className="lg:col-span-1 relative">
              <div className="absolute top-2 left-3 text-xs text-white/70 max-sm:text-gray-500 z-10">
                Property Type
              </div>
              <Select value={propertyType} onValueChange={handlePropertyTypeChange}>
                <SelectTrigger className="w-full h-14 sm:h-14 text-white max-sm:text-black  focus:ring-offset-0 focus:ring-transparent bg-white/10 max-sm:bg-white border border-white/30 max-sm:border-gray-300 rounded-none pt-5 pb-2">
                  <SelectValue placeholder="Any" className="max-sm:hidden pt-2" />
                </SelectTrigger>
                <SelectContent className="bg-white text-gray-900">
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="buy">Buy</SelectItem>
                  <SelectItem value="rent">Rent</SelectItem>
                  <SelectItem value="off_plan">Off Plan</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div className="lg:col-span-1 relative">
              <div className="absolute top-2 left-3 text-xs text-white/70 max-sm:text-gray-500 z-10">
                Location
              </div>
              <Select value={location} onValueChange={setLocation}>
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
              <Select value={propertyTypeFilter} onValueChange={setPropertyTypeFilter}>
                <SelectTrigger className="w-full h-12 sm:h-14 text-white max-sm:text-black bg-white/10 max-sm:bg-white border border-white/30 max-sm:border-gray-300 rounded-none  focus:ring-offset-0 focus:ring-transparent pt-5 pb-2">
                  <SelectValue placeholder="Any" className="max-sm:hidden pt-2" />
                </SelectTrigger>
                <SelectContent className="bg-white text-gray-900 max-h-60 overflow-y-auto">
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="APARTMENT">Apartment</SelectItem>
                  <SelectItem value="VILLA">Villa</SelectItem>
                  <SelectItem value="TOWNHOUSE">Townhouse</SelectItem>
                  <SelectItem value="PENTHOUSE">Penthouse</SelectItem>
                  <SelectItem value="HOTEL APARTMENT">Hotel Apartment</SelectItem>
                  <SelectItem value="DUPLEX">Duplex</SelectItem>
                  <SelectItem value="RESIDENTIAL FLOOR">Residential Floor</SelectItem>
                  <SelectItem value="RESIDENTIAL PLOT">Residential Plot</SelectItem>
                  <SelectItem value="RESIDENTIAL BUILDING">Residential Building</SelectItem>
                  <SelectItem value="PARKING">Parking</SelectItem>
                  <SelectItem value="STORE ROOM">Store Room</SelectItem>
                  <SelectItem value="COMPOUND">Compound</SelectItem>
                  <SelectItem value="OFFICE">Office</SelectItem>
                  <SelectItem value="SHOP">Shop</SelectItem>
                  <SelectItem value="COMMERCIAL BUILDING">Commercial Building</SelectItem>
                  <SelectItem value="COMMERCIAL FLOOR">Commercial Floor</SelectItem>
                  <SelectItem value="COMMERCIAL PLOT">Commercial Plot</SelectItem>
                  <SelectItem value="LABOR CAMP">Labor Camp</SelectItem>
                  <SelectItem value="RETAIL">Retail</SelectItem>
                  <SelectItem value="SHOW ROOM">Show Room</SelectItem>
                  <SelectItem value="COMMERCIAL VILLA">Commercial Villa</SelectItem>
                  <SelectItem value="WAREHOUSE">Warehouse</SelectItem>
                  <SelectItem value="FARM">Farm</SelectItem>
                  <SelectItem value="FACTORY">Factory</SelectItem>
                  <SelectItem value="HOTEL">Hotel</SelectItem>
                  <SelectItem value="HOSPITAL">Hospital</SelectItem>
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
              <Select value={bedrooms} onValueChange={setBedrooms}>
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
                value={refNumber}
                onChange={(e) => setRefNumber(e.target.value)}
                className="w-full h-12 sm:h-14 text-white max-sm:text-black bg-white/10 max-sm:bg-white border max-sm:border-gray-300 border-white/30 rounded-none  placeholder:text-white/70 max-sm:placeholder:text-black/70 focus-visible:ring-offset-0 focus-visible:ring-transparent pt-5 pb-2"
              />
            </div>

            {/* Search Button */}
            <div className="lg:col-span-1 sm:col-span-2">
              <Button 
                onClick={handleSearch}
                className="w-full bg-[#dbbb90] hover:bg-[#C2A17B] text-white font-semibold py-2 px-4 rounded-none transition-colors h-12 sm:h-14 uppercase tracking-wider"
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
