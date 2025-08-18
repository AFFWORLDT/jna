"use client"
import Image from "next/image";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Heart, Bed, Bath, SquareGanttChart, ChevronRight } from "lucide-react";
import { motion } from "framer-motion"

interface PropertyCardProps {
  photos: string;
  title: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  propertyId: string;
}

export function PropertyCard({
  photos,
  title,
  location,
  price,
  bedrooms,
  bathrooms,
  area,
  propertyId,
}: PropertyCardProps) {
  return (
    <Card className="relative overflow-hidden rounded-none shadow-sm bg-white p-0 border">
      <div className="relative w-full h-80">
        <Image
          src={photos}
          alt={title}
          fill
          className="rounded-none object-cover"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-[#D4B88C] text-white px-3 py-1 rounded-none text-xs font-light tracking-wider uppercase">
            FOR SALE
          </span>
          <span className="bg-white text-gray-800 px-3 py-1 rounded-none text-xs font-light tracking-wider uppercase">
            AVAILABLE
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-white rounded-full"
        >
          <Heart className="w-7 h-7 " />
          <span className="sr-only">Add to favorites</span>
        </Button>
      </div>
      <CardContent className="grid gap-2 px-4 py-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-light text-[#1A202C] tracking-wide line-clamp-1" title={title}>{title}</h3>
          <p className="text-sm text-gray-500 font-light">#{propertyId}</p>
        </div>

        <p className="text-sm text-primary uppercase font-light tracking-wider">{location}</p>
        <p className="text-xl font-light text-[#1A202C] tracking-wide">{price}</p>
        <div className="flex items-end gap-11 text-gray-600 text-sm mt-2 font-light">
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4" />
            <span>{bedrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            <span>{bathrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <SquareGanttChart className="w-4 h-4" />
            <span>{area}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}



interface BlogCardProps {
  imageSrc: string
  date: string
  title: string
  description: string
  href: string
}

export function BlogCard({ imageSrc, date, title, description, href }: BlogCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-none shadow-sm overflow-hidden group"
    >
      <div className="relative h-96 w-full overflow-hidden">
        <div 
          className="h-full w-full bg-center bg-cover transition-transform duration-300 group-hover:scale-105"
          style={{ 
            backgroundImage: `url('${imageSrc}')` 
          }}
        />
      </div>
      <div className="px-4 py-6 text-left">
        <p className="text-sm text-gray-500 mb-2 text-left font-extralight">{date}</p>
        <h3 className="text-lg font-extralight text-gray-800 mb-2 line-clamp-2 tracking-wide">{title}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-3 font-extralight leading-relaxed">{description}</p>
        <motion.a 
          href={href}
          whileHover={{ x: 5 }}
          className="inline-flex items-center font-extralight tracking-wider hover:underline text-[#dbbb90] uppercase"
        >
          READ MORE
         
           <ChevronRight size={15} />
        </motion.a>
      </div>
    </motion.div>
  )
}
