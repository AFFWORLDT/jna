import { getAllBuyProperties } from "@/src/api/buy";
import { PropertyCard } from "@/src/components/common/card";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import React from "react";

export default function Property() {
  const [property, setProperty] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const fetchproperty = async () => {
    setLoading(true);
    const query = "sort_by=total_count&sort_order=desc&page=1&size=3";
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
    <div className="min-h-screen bg-[#F8F5EF] text-[#1A202C]">
      <main className="container mx-auto py-12 px-4 md:px-6 lg:px-8">
        <section className="text-center mb-12">
          <h2 className="text-black text-sm font-light tracking-widest mb-2 uppercase">
            FEATURED PROPERTIES
          </h2>
          <h1 className="text-3xl sm:text-4xl font-mono mb-4 text-[#1A202C] tracking-wide">
            Handpicked Luxury Listings in Dubai
          </h1>
          <p className="max-w-4xl mx-auto text-sm font-light text-gray-700 leading-relaxed">
            Step into a realm of unparalleled sophistication with our featured
            properties. Explore these exclusive gems and envision your next
            luxurious retreat with J&A Properties.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {property?.map((obj:any,i) => (
            <PropertyCard
              photos={obj?.photos[0]}
              title={obj?.title}
              location="UNITED ARAB EMIRATES, DUBAI INTERNATIONAL MARINE CLUB, DUBAI"
              price="4,400,000د"
              bedrooms={2}
              bathrooms={2}
              area="1,277ft²"
              propertyId="1059"
              key={i}
            />
          ))}
        </section>

        <div className="text-center">
         <Link href={"/buy"}>
           <Button className="bg-[#D4B88C] hover:bg-[#C2A77B] text-white px-8 py-6 text-lg font-light tracking-wider rounded-none shadow-md uppercase">
            VIEW ALL PROPERTIES
          </Button>
         </Link>
        </div>
      </main>
    </div>
  );
}
