"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Bath, Bed, Heart, SquareGanttChart } from "lucide-react"
import Image from "next/image"

interface PropertyData {
  id?: string | number
  title?: string
  price?: number
  bedRooms?: number
  bathrooms?: number | string
  size?: number | string
  propertyId?: string
  photos?: string[]
  location?: {
    city?: string
    community?: string
    sub_community?: string
  }
    ownPortal_agent_Id?: string
}

interface BuyCardProps {
  data?: PropertyData
  onFavorite?: (item: PropertyData) => void
}

export function BuyCard({ data, onFavorite }: BuyCardProps) {
  const handleFavorite = () => {
    if (data && onFavorite) {
      onFavorite(data)
    }
  }

  if (!data) {
    return (
      <Card className="relative overflow-hidden rounded-none shadow-sm bg-white p-0 border">
        <CardContent className="p-6 text-center text-gray-500">
          No property data available
        </CardContent>
      </Card>
    )
  }

  const imageUrl = data.photos?.[0] || "/placeholder.svg?height=320&width=400"
  const locationName = [
    data.location?.community,
    data.location?.sub_community
  ].filter(Boolean).join(", ")

  const formattedPrice = data.price
    ? `AED ${data.price.toLocaleString()}`
    : "Price on request"

  return (
    <Card className="relative overflow-hidden rounded-none shadow-sm bg-white p-0 border">
      <div className="relative w-full h-80">
        <Image
          src={imageUrl}
          alt={data?.title || "Property image"}
          fill
          className="rounded-none object-cover"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-[#D4B88C] text-white px-3 py-1 text-xs tracking-wider uppercase">
            For Sale
          </span>
          <span className="bg-white text-gray-800 px-3 py-1 text-xs tracking-wider uppercase">
            Available
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-white rounded-full"
          onClick={handleFavorite}
        >
          <Heart className="w-7 h-7" />
          <span className="sr-only">Add to favorites</span>
        </Button>
      </div>

      <CardContent className="grid gap-2 px-4 py-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-mono text-[#1A202C] tracking-wide">
            {data?.title}
          </h3>
          <p className="text-sm text-gray-500 font-light">
            #{data?.ownPortal_agent_Id}
          </p>
        </div>

        <p className="text-sm text-primary uppercase font-light tracking-wider">
          {locationName || "Location not specified"}
        </p>
        <p className="text-sm font-bold text-[#1A202C] tracking-wide">
          {formattedPrice}
        </p>

        <div className="flex items-end gap-11 text-gray-600 text-sm mt-2 font-light">
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4" />
            <span>{data?.bedRooms ?? "N/A"}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            <span>{data?.bathrooms ?? "N/A"}</span>
          </div>
          <div className="flex items-center gap-1">
            <SquareGanttChart className="w-4 h-4" />
            <span>{data?.size ? `${data?.size} sqft` : "N/A"}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
