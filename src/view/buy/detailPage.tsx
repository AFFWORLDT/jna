import { getAllBuyPropertiesById } from "@/src/api/buy";
import EnquireForm from "@/src/components/common/enquireForm";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/src/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Bed, Bath, Square, SquareGanttChart, Heart } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function DetailPage({ id }: any) {
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [heroImageIndex, setHeroImageIndex] = useState(0);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
      <div className="bg-[#141442] h-24" />
      <div className="grid grid-cols-1 lg:grid-cols-2 items-start px-4">
        <section className="w-full my-2 relative">
          <div className="relative w-full h-96">
            {property?.photos && property.photos.length > 0 && (
              <Image
                key={heroImageIndex}
                src={property.photos[heroImageIndex]}
                alt="Luxury Living in Dubai"
                fill
                style={{ objectFit: "cover" }}
                quality={85}
                priority
                className="absolute inset-0 transition-opacity duration-700 ease-in-out text-white"
              />
            )}
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
              : property?.price
              ? `AED ${property.price.toLocaleString()}`
              : "Price on request"}
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
            <a
              className="hover:underline cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
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
            <div className="text-sm font-light text-gray-600 leading-relaxed mb-6">
              <p className={isDescriptionExpanded ? "" : "line-clamp-4"}>
                {property?.description}
              </p>
              {property?.description && property.description.length > 200 && (
                <button
                  onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                  className="mt-4 text-primary hover:text-primary/80 font-medium transition-colors duration-200 underline"
                >
                  {isDescriptionExpanded ? "Read Less" : "Read More"}
                </button>
              )}
            </div>
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
                        fill
                        style={{ objectFit: "cover" }}
                        loading="lazy"
                        quality={75}
                      />
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>

        {property?.permitQRCode && (
          <div className="flex justify-center">
            <div className="bg-[#F2EEE8] border border-white rounded-lg p-4 flex items-center gap-4 shadow-sm max-w-sm">
              {/* QR Code with Palm Tree Emblem */}
              <div className="relative">
                <div className="w-32 h-32 bg-white rounded-lg flex items-center justify-center border-2 border-gray-200 overflow-hidden">
                  <Image
                    src={property?.permitQRCode}
                    alt="QR Code"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Verification Text */}
              <div className="text-gray-700">
                <p className="text-sm">
                  This Listing has been verified by{" "}
                  <span className="font-bold">Dubai Land Department</span>
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl font-serif text-primary mb-8">Enquire</h2>
          <EnquireForm type="contact" />
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <AnimatePresence>
            <DialogContent className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-[#F2EEE8] rounded-none px-8 py-4">
              <motion.div
                key="dialog"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <DialogTitle className="mb-6 flex justify-between">
                  <div>
                    <h2 className="text-2xl  font-mono font-thin text-black text-center">
                      Take the First Step
                    </h2>
                    <p className="font-mono font-thin text-center text-[15px] text-neutral-400">
                      Get a free consultation, personalized investment strategy,
                      and exclusive access to Dubai best properties.
                    </p>
                  </div>
                  <Icon
                    icon={"material-symbols-light:cancel-outline"}
                    fontSize={25}
                    className="text-neutral-400 cursor-pointer"
                    onClick={() => setIsOpen(false)}
                  />
                </DialogTitle>

                <EnquireForm type="buy" />
              </motion.div>
            </DialogContent>
          </AnimatePresence>
        </Dialog>
      </section>
    </div>
  );
}
