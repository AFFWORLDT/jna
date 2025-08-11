"use client";

import { getPropertyById } from "@/api/offPlans";
import Image from "next/image";
import { useEffect, useState } from "react";
import moment from "moment";

export default function DetailPage({ id }: any) {
  const [property, setProperty] = useState<any>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [heroImageIndex, setHeroImageIndex] = useState(0);

  useEffect(() => {
    async function fetchProperty() {
      const data = await getPropertyById(id);
      setProperty(data?.projects?.[0]);
    }
    fetchProperty();
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

  if (!property?.photos || property.photos.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <section className="relative h-screen w-full flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <div className="relative w-full h-full">
            {property.photos.map((photo: string, index: number) => (
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
            {property.photos.map((_: any, index: number) => (
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
        </div>
        <div className="relative z-30 text-white px-4 mt-[60vh]">
          <span>#{property?.agent_Id}</span>
          <h1 className="text-3xl md:text-4xl font-light mb-4 leading-tight tracking-wide">
            {property?.name}
          </h1>
          <p className="text-lg font-light mb-12 tracking-wider uppercase text-[#DBBB90]">
            {property?.location?.community}, {property?.location?.sub_community}
            , {property?.location?.city}
          </p>
        </div>
      </section>

      <section className="bg-white py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center gap-8 text-lg font-light uppercase text-[#DBBB90] mb-12">
            <a href="#" className="hover:underline">
              Enquire Now
            </a>
            <span className="text-gray-300">|</span>
            <a href="#" className="hover:underline">
              Properties List
            </a>
          </div>

          <hr className="border-t border-gray-200 mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-12">
            <div>
              <h3 className="text-sm font-light uppercase text-[#DBBB90] mb-2 border-b border-[#DBBB90] inline-block pb-1">
                From
              </h3>
              <p className="text-sm font-light text-gray-700">
                {property?.price_from
                  ? `AED ${property.price_from.toLocaleString()}`
                  : "1,406,000"}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-light uppercase text-[#DBBB90] mb-2 border-b border-[#DBBB90] inline-block pb-1">
                Completion Date
              </h3>
              <p className="text-sm font-light text-gray-700">
                {property?.newParam?.handoverTime &&
                  moment(property?.newParam?.handoverTime).format(
                    "DD / MM / YYYY"
                  )}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-light uppercase text-[#DBBB90] mb-2 border-b border-[#DBBB90] inline-block pb-1">
                Construction Stage
              </h3>
              <p className="text-sm font-light text-gray-700">{"Off-plan"}</p>
            </div>
          </div>

          <hr className="border-t border-gray-200 mb-12" />

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
