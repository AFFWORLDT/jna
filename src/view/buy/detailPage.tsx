import { getAllBuyPropertiesById } from "@/api/buy";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Bed, Bath, Square, SquareGanttChart, Heart } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function DetailPage({ id }: any) {
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const fetchPropertyDetails = async () => {
    setLoading(true);
    try {
      const res = await getAllBuyPropertiesById(id);
      setProperty(res?.properties?.[0]);
    } catch (error) {
      console.error("Error fetching property details:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPropertyDetails();
  }, [id]);
  return (
    <div className="">
      <div className="bg-white h-24" />
      <div className="grid grid-cols-1 lg:grid-cols-2 items-start px-4">
        <section className="w-full my-2">
          <Image
            src={property?.photos[0]}
            alt={property?.title || "Property Image"}
            width={800}
            height={600}
            className="w-full h-96 object-cover"
          />
        </section>
        <section className="w-full my-2 bg-[#F2EEE8] h-96 py-16">
          <p className="text-neutral-400 text-base font-mono text-center">
            #{property?.id}
          </p>
          <div className="  flex gap-2 items-center justify-center my-3">
            <span className="bg-[#D4B88C] text-white px-3 py-1 text-xs tracking-wider uppercase">
              For Sale
            </span>
            <span className="bg-white text-gray-800 px-3 py-1 text-xs tracking-wider uppercase">
              Available
            </span>
          </div>
          <h1 className="text-4xl font-medium font-mono text-center mb-4 max-w-2xl mx-auto">
            {property?.title}
          </h1>
          <div className="flex items-center justify-center gap-1 text-primary uppercase mb-4">
            <p>{property?.location?.city}</p>
            <p>{property?.location?.community}</p>
            <p>{property?.location?.sub_community}</p>
          </div>
          <p className="text-sm font-light text-gray-700 text-center">
            {property?.price_from
              ? `AED ${property.price_from.toLocaleString()}`
              : "1,406,000"}
          </p>
          <div className="flex items-end gap-11 text-gray-600 text-sm mt-2 font-light justify-center">
            <div className="flex items-center gap-1">
              <Bed className="w-6 h-6" />
              <span>{property?.bedRooms ?? "N/A"}</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="w-6 h-6" />
              <span>{property?.bathrooms ?? "N/A"}</span>
            </div>
            <div className="flex items-center gap-1">
              <SquareGanttChart className="w-6 h-6" />
              <span>{property?.size ? `${property?.size} sqft` : "N/A"}</span>
            </div>
          </div>
        </section>
      </div>
      <section className="bg-white py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center gap-2 text-lg font-light uppercase text-[#DBBB90] mb-12">
            <a href="#" className="hover:underline">
              Enquire Now
            </a>
            <span className="text-gray-300">|</span>
            <a href="#" className="hover:underline">
              Brochure
            </a>
            <span className="text-gray-300">|</span>
            <a href="#" className="hover:underline">
              <Heart className="w-4 h-4 inline-block" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-12">
            <div className="border-r border-gray-200 pr-4">
              <h3 className="text-sm font-light uppercase text-[#DBBB90] mb-2 border-b border-[#DBBB90] inline-block pb-1">
                Details
              </h3>
              <p className="text-sm font-light text-gray-700">
                <p>
                  {" "}
                  <strong className="font-bold">City</strong>:{" "}
                  {property?.location?.city}{" "}
                </p>
                <p>
                  {" "}
                  <strong className="font-bold">Apartment Type:</strong>{" "}
                  {property?.property_type}
                </p>{" "}
                <p>
                  {" "}
                  <strong className="font-bold">
                    Construction Stage:
                  </strong>{" "}
                  {property?.completionStatus}
                </p>
                <p>
                  <strong className="font-bold">Bedrooms:</strong>{" "}
                  {property?.bedRooms}{" "}
                </p>
                <p>
                  <strong className="font-bold">Bathrooms:</strong>{" "}
                  {property?.bathrooms}
                </p>{" "}
                <p>
                  <strong className="font-bold">Furnished:</strong>{" "}
                  {property?.isFurnished}
                </p>
              </p>
            </div>
            <div className="border-r border-gray-200 px-4">
              <h3 className="text-sm font-light uppercase text-[#DBBB90] mb-2 border-b border-[#DBBB90] inline-block pb-1">
                Areas
              </h3>
              <p className="text-sm font-light text-gray-700">
                <strong className="font-bold"> Home Size (Sqft):</strong>{" "}
                {property?.size}²
              </p>
            </div>
            <div>
              <h3 className="text-sm font-light uppercase text-[#DBBB90] mb-2 border-b border-[#DBBB90] inline-block pb-1">
                Main Features
              </h3>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-4xl font-serif text-gray-800 mb-8">
              Description
            </h2>
            <p className="text-sm font-light text-gray-600 leading-relaxed mb-6 line-clamp-4">
              {property?.description}
            </p>
          </div>
        </div>
      </section>
      <section className="bg-white py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {property?.photos && property.photos.length > 0 && (
            <div className="mb-16">
              <div className="relative h-[400px] md:h-[500px] lg:h-[600px] mb-4 overflow-hidden rounded-lg">
                <Image
                  src={property.photos[selectedImageIndex]}
                  alt={`${property.name} - Image ${selectedImageIndex + 1}`}
                  layout="fill"
                  objectFit="cover"
                  quality={90}
                  className="transition-opacity duration-300"
                />
              </div>

              <div className="grid grid-cols-5 gap-2 md:gap-4">
                {property.photos
                  .slice(0, 5)
                  .map((photo: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative h-20 md:h-24 lg:h-28 overflow-hidden rounded transition-all duration-200 ${
                        selectedImageIndex === index
                          ? "ring-2 ring-[#DBBB90] opacity-100"
                          : "opacity-70 hover:opacity-90"
                      }`}
                    >
                      <Image
                        src={photo || "/placeholder.svg"}
                        alt={`${property.name} thumbnail ${index + 1}`}
                        layout="fill"
                        objectFit="cover"
                        quality={75}
                      />
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
