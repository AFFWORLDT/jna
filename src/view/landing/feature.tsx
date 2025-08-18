import { getAllProperties } from "@/src/api/offPlans";
import PropertyCard from "@/src/components/common/property-card";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Feature() {
  const [property, setProperty] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchproperty = async () => {
    setLoading(true);
    const query = "sort_by=total_count&sort_order=desc&page=1&size=4";
    try {
      const res = await getAllProperties(query);
      setProperty(res?.projects);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchproperty();
  }, []);

  return (
    <div className="flex flex-col items-center py-16 px-4 md:px-6 lg:px-8  container mx-auto">
      <div className="text-center mb-12">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">
          FEATURED PROJECTS
        </p>
        <h1 className="text-3xl  font-serif font-bold text-[#1A202C] leading-tight mb-4">
          Luxury Unveiled, Comfort and Sophistication
        </h1>
        <p className="text-lg text-gray-600  mx-auto">
          Discover a curated selection of Dubai's most exquisite properties,
          epitomizing luxury, elegance, and unparalleled design.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8  w-full">
        {property?.map((property: any, i) => (
          <PropertyCard data={property} key={i} />
        ))}
      </div>
      <div className="w-full flex justify-center items-center my-3">
        <Link href={"/offPlans"}>
         <Button className="w-48 h-11 bg-[#dbbb90] hover:bg-[#C2A17B] text-white font-semibold py-2 px-4 rounded-none transition-colors uppercase">
          View All Project
        </Button>
        </Link>
      </div>
    </div>
  );
}
