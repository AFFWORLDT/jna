import PropertyCard from "@/components/common/property-card"
import { Button } from "@/components/ui/button"

export default function Feature() {
const properties = [
  {
    id: "#154",
    name: "Sunset Bay 4",
    location: "DUBAI ISLANDS, DUBAI, UNITED ARAB EMIRATES",
    price: "2,088,522",
    imageUrl: "/images/card1.jpeg",
  },
  {
    id: "#159",
    name: "Beach Walk Grand 2",
    location: "DUBAI ISLANDS, DUBAI, UNITED ARAB EMIRATES",
    price: "2,200,000",
    imageUrl: "/images/card2.jpeg",
  },
  {
    id: "#160",
    name: "Palm Jumeirah Residences",
    location: "PALM JUMEIRAH, DUBAI, UNITED ARAB EMIRATES",
    price: "3,500,000",
    imageUrl: "/images/card3.jpeg",
  },
  {
    id: "#161",
    name: "Downtown Skyline Towers",
    location: "DOWNTOWN DUBAI, DUBAI, UNITED ARAB EMIRATES",
    price: "1,850,000",
    imageUrl: "/images/card4.jpeg",
  },
]

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
        Discover a curated selection of Dubai's most exquisite properties, epitomizing luxury, elegance, and unparalleled design.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8  w-full">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          id={property.id}
          name={property.name}
          location={property.location}
          price={property.price}
          imageUrl={property.imageUrl}
        />
      ))}
      
    </div>
    <div className="w-full flex justify-center items-center my-3">
       <Button className="w-48 h-11 bg-[#dbbb90] hover:bg-[#C2A17B] text-white font-semibold py-2 px-4 rounded-none transition-colors uppercase">
              View All Project
            </Button>
       </div>
  </div>
)
}
