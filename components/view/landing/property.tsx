import { PropertyCard } from "@/components/landingpage/card"
import { Button } from "@/components/ui/button"

export default function Property() {
  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#1A202C]">
      <main className="container mx-auto py-12 px-4 md:px-6 lg:px-8">
        <section className="text-center mb-12">
          <h2 className="text-[#B89B6F] text-sm font-semibold tracking-widest mb-2">
            FEATURED PROPERTIES
          </h2>
          <h1 className="text-3xl font-serif font-bold mb-4 text-[#1A202C]">
            Handpicked Luxury Listings in Dubai
          </h1>
          <p className="max-w-4xl mx-auto text-sm text-gray-700">
            Step into a realm of unparalleled sophistication with our featured properties. Explore these exclusive gems and envision your next luxurious retreat with J&A Properties.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <PropertyCard
            imageSrc="/images/property1.jpeg"
            title="Two Bedroom: Damac Bay by Cavalli"
            location="UNITED ARAB EMIRATES, DUBAI INTERNATIONAL MARINE CLUB, DUBAI"
            price="4,400,000د"
            bedrooms={2}
            bathrooms={2}
            area="1,277ft²"
            propertyId="1059"
          />
          <PropertyCard
            imageSrc="/images/property2.jpeg"
            title="Three Bedroom - Damac Casa"
            location="UNITED ARAB EMIRATES, DUBAI MARINA, DUBAI"
            price="5,776,0000 د"
            bedrooms={3}
            bathrooms={3}
            area="2,041ft²"
            propertyId="1117"
          />
          <PropertyCard
            imageSrc="/images/property3.jpeg"
            title="Two Bedroom - Canal Heights"
            location="UNITED ARAB EMIRATES, BUSINESS BAY, DUBAI"
            price="3,429,0000 د"
            bedrooms={2}
            bathrooms={3}
            area="1,270ft²"
            propertyId="1100"
          />
        </section>

        <div className="text-center">
          <Button className="bg-[#D4B88C] hover:bg-[#C2A77B] text-white px-8 py-6 text-lg font-semibold rounded-none shadow-md">
            VIEW ALL PROPERTIES
          </Button>
        </div>
      </main>
    </div>
  )
}
