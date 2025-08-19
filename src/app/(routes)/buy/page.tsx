"use client";
import { getAllBuyProperties } from "@/src/api/buy";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { cn } from "@/src/lib/utils";
import { BuyCard } from "@/src/view/buy/buyCard";
import { Loader } from "lucide-react";
import React from "react";

function Buy() {
  const [property, setProperty] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const fetchproperty = async () => {
    setLoading(true);
    const query = "sort_by=total_count&sort_order=desc&page=1&size=24";
    try {
      const res = await getAllBuyProperties(query);
      setProperty(res?.properties || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchproperty();
  }, []);

  const handleFavorite = (item: any) => {
    console.log("Added to favorites:", item);
    // Add your favorite logic here
  };


  return (
    <div>
      <section className="bg-[#141442] px-4 py-28">
        <div className="container mx-auto">
          {/* Search Form */}
          <div className="space-y-4">
            {/* First Row */}
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <div className="md:col-span-1">
                <Input
                  placeholder="Location"
                  className="w-full bg-white border-0 rounded-none h-12 text-gray-900 placeholder:text-gray-600 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>

              <div className="md:col-span-1">
                <div className="relative">
                  <div className="absolute top-1 left-3 text-xs text-gray-500 z-10">
                    Type
                  </div>
                  <Select defaultValue="house">
                    <SelectTrigger className="w-full bg-white border-0 rounded-none h-12 text-gray-900 focus:ring-0 focus:ring-offset-0 pt-5 pb-2">
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

              <div className="md:col-span-1">
                <div className="relative">
                  <div className="absolute top-1 left-3 text-xs text-gray-500 z-10">
                    Covered Area
                  </div>
                  <Select defaultValue="any">
                    <SelectTrigger className="w-full bg-white border-0 rounded-none h-12 text-gray-900 focus:ring-0 focus:ring-offset-0 pt-5 pb-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="500-1000">500-1000 sqft</SelectItem>
                      <SelectItem value="1000-2000">1000-2000 sqft</SelectItem>
                      <SelectItem value="2000+">2000+ sqft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="md:col-span-1">
                <div className="relative">
                  <div className="absolute top-1 left-3 text-xs text-gray-500 z-10">
                    Price
                  </div>
                  <Select defaultValue="any">
                    <SelectTrigger className="w-full bg-white border-0 rounded-none h-12 text-gray-900 focus:ring-0 focus:ring-offset-0 pt-5 pb-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="100k-500k">$100k - $500k</SelectItem>
                      <SelectItem value="500k-1m">$500k - $1M</SelectItem>
                      <SelectItem value="1m+">$1M+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="md:col-span-1">
                <div className="relative">
                  <div className="absolute top-1 left-3 text-xs text-gray-500 z-10">
                    Construction Condition
                  </div>
                  <Select defaultValue="any">
                    <SelectTrigger className="w-full bg-white border-0 rounded-none h-12 text-gray-900 focus:ring-0 focus:ring-offset-0 pt-5 pb-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="excellent">Excellent</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="md:col-span-1">
                <Input
                  placeholder="Ref Number"
                  className="w-full bg-white border-0 rounded-none h-12 text-gray-900 placeholder:text-gray-600 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <div className="md:col-span-1">
                <div className="relative">
                  <div className="absolute top-1 left-3 text-xs text-gray-500 z-10">
                    Bedrooms
                  </div>
                  <Select defaultValue="any">
                    <SelectTrigger className="w-full bg-white border-0 rounded-none h-12 text-gray-900 focus:ring-0 focus:ring-offset-0 pt-5 pb-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5+">5+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="md:col-span-1">
                <div className="relative">
                  <div className="absolute top-1 left-3 text-xs text-gray-500 z-10">
                    Bathrooms
                  </div>
                  <Select defaultValue="any">
                    <SelectTrigger className="w-full bg-white border-0 rounded-none h-12 text-gray-900 focus:ring-0 focus:ring-offset-0 pt-5 pb-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5+">5+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="md:col-span-1">
                <div className="relative">
                  <div className="absolute top-1 left-3 text-xs text-gray-500 z-10">
                    Floor Number
                  </div>
                  <Select defaultValue="any">
                    <SelectTrigger className="w-full bg-white border-0 rounded-none h-12 text-gray-900 focus:ring-0 focus:ring-offset-0 pt-5 pb-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="ground">Ground</SelectItem>
                      <SelectItem value="1-5">1-5</SelectItem>
                      <SelectItem value="6-10">6-10</SelectItem>
                      <SelectItem value="11+">11+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="md:col-span-1">
                <div className="relative">
                  <div className="absolute top-1 left-3 text-xs text-gray-500 z-10">
                    Year Built
                  </div>
                  <Select defaultValue="any">
                    <SelectTrigger className="w-full bg-white border-0 rounded-none h-12 text-gray-900 focus:ring-0 focus:ring-offset-0 pt-5 pb-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="2020+">2020+</SelectItem>
                      <SelectItem value="2010-2019">2010-2019</SelectItem>
                      <SelectItem value="2000-2009">2000-2009</SelectItem>
                      <SelectItem value="before-2000">Before 2000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="md:col-span-1">
                <Select defaultValue="more">
                  <SelectTrigger className="w-full bg-white border-0 rounded-none h-12 text-gray-900 focus:ring-0 focus:ring-offset-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="more">More</SelectItem>
                    <SelectItem value="parking">Parking</SelectItem>
                    <SelectItem value="pool">Pool</SelectItem>
                    <SelectItem value="gym">Gym</SelectItem>
                    <SelectItem value="balcony">Balcony</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-1">
                <Button className="w-full bg-[#c4a574] hover:bg-[#b8996a] text-white font-medium h-12 rounded-none uppercase tracking-wider">
                  SEARCH
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto px-4 py-7 mt-11 max-w-5xl">
        <h1 className="text-center text-5xl font-mono">
          Dubai&apos;s most exquisite properties
        </h1>
        <p className="text-center text-gray-600 mt-4">
          Become part of a world class lifestyle, benefit of unrivaled returns
          and own a piece of Dubai&apos;s future.
        </p>
      </div>
      <p className="text-center mb-11">
        <span
          className={cn(
            "relative pb-1 transition-all duration-300 text-primary uppercase font-thin",
            "after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-0",
            "after:-translate-x-1/2 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
          )}
        >
          Learn More
        </span>
      </p>

      {loading ? (
        <div className="text-center py-12">
          <Loader className="w-12 h-12 animate-spin text-primary mx-auto" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 container my-4 mx-auto">
          {property?.map((item: any, index: number) => (
            <BuyCard
              key={item.id ?? index}
              data={item}
              onFavorite={handleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Buy;
