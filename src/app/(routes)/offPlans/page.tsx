"use client";
import { getAllProperties } from "@/src/api/offPlans";
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
import OffPlanCard from "@/src/view/offPlans/offPlanCard";
import React, { useEffect, useState } from "react";

function page() {
  const [property, setProperty] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchproperty = async () => {
    setLoading(true);
    const query = "sort_by=total_count&sort_order=desc&page=1&size=24";
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
    <div>
      <section className="pt-32 pb-12 px-4 bg-[#141442]">
        <div className=" mx-auto text-center">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 container mx-auto">
            <div className="md:col-span-1">
              <Select>
                <SelectTrigger className="w-full  text-white backdrop-blur-s focus:ring-offset-0 focus:ring-transparent [&>span]:text-black bg-white border border-white/30 rounded-sm backdrop-blur-s">
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
              <Input
                placeholder="Name"
                className="w-full text-blaack bg-white border border-white/30 rounded-sm backdrop-blur-s placeholder:text-black focus-visible:ring-offset-0 focus-visible:ring-transparent"
              />
            </div>

            <div className="md:col-span-1">
              <Input
                type="text"
                placeholder="Ref Number"
                className="w-full text-blaack bg-white border border-white/30 rounded-sm backdrop-blur-s placeholder:text-black focus-visible:ring-offset-0 focus-visible:ring-transparent"
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
      <div className="mx-auto px-4 py-12 max-w-5xl">
        <h1 className="text-center text-4xl font-mono">The Art of Selection</h1>
        <p className="text-center text-gray-600 mt-4">
          Curated off-plan investments for discerning investors.
        </p>
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
      </div>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-  gap-6 px-4 container mx-auto py-6">
          {property?.map((property, i) => (
            <OffPlanCard data={property} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default page;
