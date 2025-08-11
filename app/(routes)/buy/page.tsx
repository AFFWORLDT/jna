"use client";
import { getAllBuyProperties } from "@/api/buy";
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

  console.log(property, "property");

  return (
    <div>
      <section className="pt-32 pb-12 px-4 bg-[#141442]">
        <div className="mx-auto text-center">
          <h1 className="text-5xl font-medium mb-6 text-white font-mono">
            Buy
          </h1>
        </div>
      </section>

      <div className="mx-auto px-4 py-12 max-w-5xl">
        <h1 className="text-center text-4xl font-mono">
          Dubai&apos;s most exquisite properties
        </h1>
        <p className="text-center text-gray-600 mt-4">
          Become part of a world class lifestyle, benefit of unrivaled returns
          and own a piece of Dubai&apos;s future.
        </p>
      </div>
      <p className="text-center my-6">
        <span
          className={cn(
            "relative pb-1 transition-all duration-300 text-primary uppercase",
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
