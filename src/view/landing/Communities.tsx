"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Phone, Menu, MessageCircle } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/src/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { getAllCommunities } from "@/src/api/communities";
import { cn } from "@/src/lib/utils";

const communities = [
  {
    id: 1,
    name: "Dubai Marina",
    description: "Where Yachting Meets Urban Living",
    imageQuery: "/images/dubai-marina.webp",
  },
  {
    id: 2,
    name: "Business Bay",
    description: "A Hub of Bustling Activity and Affordable Investment",
    imageQuery: "/images/Palm-Jumeirah.webp",
  },
  {
    id: 3,
    name: "Downtown Dubai",
    description: "Where Iconic Landmarks Meet Luxurious Living",
    imageQuery: "/images/Dubai-Creek-Harbour.webp",
  },
  {
    id: 4,
    name: "Dubai Hills Estate",
    description: "Tranquility Meets Luxury Living",
    imageQuery: "/images/Dubai-Hills-Estate.webp",
  },
  {
    id: 5,
    name: "Palm Jumeirah",
    description: "Iconic Man-Made Island with Luxury Residences",
    imageQuery: "/images/dubai-marina.webp",
  },
  {
    id: 6,
    name: "Jumeirah Lake Towers",
    description: "Vibrant Community with Lake Views",
    imageQuery: "/images/Dubai-Creek-Harbour.webp",
  },
];

export default function Component() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [communities, setCommunities] = useState<any[]>([]);

  const plugin = useRef(
    Autoplay({ delay: 1000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const scrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const res = await getAllCommunities(1, 20);

        setCommunities(res.communities);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCommunities();
  }, []);
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="py-16 md:py-24 text-center px-4">
        <p className="text-[#D4B88C] text-sm uppercase tracking-widest mb-2 font-light">
          COMMUNITIES
        </p>
        <h1 className="text-3xl sm:text-4xl font-mono text-gray-800 mb-6 tracking-wide">
          Discover Dubai&apos;s Finest
        </h1>
        <p className="max-w-4xl mx-auto text-gray-600 text-sm tracking-tight font-light">
          Explore the diverse tapestry of Dubai&apos;s most sought-after areas
          and communities. From serene waterfront retreats to bustling urban
          hubs, our curated selection showcases the essence of luxury living in
          each locale.
        </p>
      </section>

      {/* Communities Section - Carousel */}
      <section className="relative pb-16 px-4 md:px-12">
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[plugin.current]}
          className="w-full"
        >
          <CarouselContent className="-ml-6">
            {communities?.map((community: any) => (
              <CarouselItem
                key={community.id}
                className="pl-6 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <Card className="relative w-full h-[650px] rounded-none overflow-hidden shadow-lg group border-none">
                  <CardContent className="p-0 h-full">
                    <Image
                      src={community.photos[0]}
                      alt={community.name}
                      fill
                      style={{ objectFit: "cover" }}
                      className="transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end text-white">
                      <h3 className="text-2xl font-light mb-2 tracking-wide">
                        {community.name}
                      </h3>
                      <p className="text-sm mb-4 font-light leading-relaxed">
                        {community.order_description}
                      </p>
                      <div className="w-full border-[0.5px] border-white/30 mb-4" />
                      <Link
                        href={"/communities"}
                        className={cn(
                          "relative pb-1 transition-all duration-300 text-primary uppercase text-base",
                          "after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0",
                          "after:bg-primary after:transition-all after:duration-300 hover:after:w-20"
                        )}
                      >
                        EXPLORE
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* CarouselPrevious and CarouselNext can be added here if navigation arrows are desired */}
        </Carousel>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                index === current - 1
                  ? "bg-gold-accent"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              onClick={() => {
                plugin.current.stop(); // Stop autoplay on manual click
                scrollTo(index);
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <div className="w-full flex justify-center items-center mt-11 mb-4">
          
        <Link href={"/communities"}>
           <Button className="w-48 h-11 bg-[#dbbb90] hover:bg-[#C2A17B] text-white font-light tracking-wider py-2 px-4 rounded-none transition-colors uppercase">
            View All Communities
          </Button>
        </Link>
        </div>
      </section>
    </div>
  );
}
