import { getAllBuyPropertiesById } from "@/src/api/buy";
import EnquireForm from "@/src/components/common/enquireForm";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";
import { Bed, Bath, Square, SquareGanttChart, Heart } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function DetailPage({ id }: any) {
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [heroImageIndex, setHeroImageIndex] = useState(0);

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

  useEffect(() => {
    if (!property?.photos || property.photos.length <= 1) return;

    const interval = setInterval(() => {
      setHeroImageIndex(
        (prevIndex) => (prevIndex + 1) % property.photos.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [property?.photos]);
  return (
    <div className="">
      <div className="bg-white h-24" />
      <div className="grid grid-cols-1 lg:grid-cols-2 items-start px-4">
        <section className="w-full my-2 relative">
            <div className="relative w-full h-96">
              {property?.photos?.map((photo: string, index: number) => (
                <Image
                  key={index}
                  src={photo}
                  alt="Luxury Living in Dubai"
                  layout="fill"
                  objectFit="cover"
                  quality={85}
                  priority={index === 0}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    index === heroImageIndex
                      ? "opacity-100 z-10"
                      : "opacity-0 z-0"
                  }`}
                />
              ))}
            </div>
            <div className="absolute inset-0 bg-black/20 z-20" />
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
              {property?.photos?.map((_: any, index: number) => (
                <button
                  key={index}
                  onClick={() => setHeroImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === heroImageIndex
                      ? "bg-white scale-125"
                      : "bg-white/50 hover:bg-white/75"
                  }`}
                />
              ))}
            </div>
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
          <div className="flex justify-center gap-2 text-lg font-light uppercase text-primary mb-12">
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
              <h3 className="text-sm font-light uppercase text-primary mb-2 border-b border-primary inline-block pb-1">
                Details
              </h3>
              <div className="text-sm font-light text-gray-700">
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
              </div>
            </div>
            <div className="border-r border-gray-200 px-4">
              <h3 className="text-sm font-light uppercase text-primary mb-2 border-b border-primary inline-block pb-1">
                Areas
              </h3>
              <p className="text-sm font-light text-gray-700">
                <strong className="font-bold"> Home Size (Sqft):</strong>{" "}
                {property?.size}²
              </p>
            </div>
            <div>
              <h3 className="text-sm font-light uppercase text-primary mb-2 border-b border-primary inline-block pb-1">
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
                          ? "ring-2 ring-primary opacity-100"
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
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl font-serif text-primary mb-8">Enquire</h2>
          <EnquireForm type="contact" />
        </div>
      </section>
    </div>
  );
}
