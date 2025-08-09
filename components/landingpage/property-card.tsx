import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

interface PropertyCardProps {
  id: string
  name: string
  location: string
  price: string
  imageUrl: string
}

export default function PropertyCard({ id, name, location, price, imageUrl }: PropertyCardProps) {
  return (
    <Card className="overflow-hidden  border-none p-0 shadow-sm border-2 rounded-none">
      <div className="relative w-full h-64 overflow-hidden group">
        <Image
          src={imageUrl}
          alt={`Image of ${name}`}
          fill
          className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110 cursor-pointer"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
        <div className="absolute bottom-4 left-4 bg-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
          UNITS
        </div>
        <div className="absolute bottom-4 right-4 bg-white text-sm font-bold px-3 py-1 rounded-full shadow-md text-[#1A202C]">
          FROM {price}
          <span className="font-normal text-gray-500 ml-1">د.إ</span>
        </div>
      </div>
      <CardContent className="p-6">
        <CardDescription className="text-sm text-gray-500 mb-1">{id}</CardDescription>
        <CardTitle className="text-2xl font-serif font-medium text-[#1A202C] mb-2">{name}</CardTitle>
        <p className="text-sm  uppercase tracking-wide text-[#B89B6F]">{location}</p>
      </CardContent>
    </Card>
  )
}
