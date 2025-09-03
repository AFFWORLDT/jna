"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Separator } from "@/src/components/ui/separator";

export default function LocationSection({ property }: any) {
  const location = property?.location
  const amenities = [
    {
      icon: "arcticons:epic-plane",
      title: "Airport",
      time: "28 min",
    },
    {
      icon: "la:umbrella-beach",
      title: "Beach",
      time: "30 min",
    },
    {
      icon: "mage:hospital-circle",
      title: "Hospital",
      time: "9 min",
    },
    {
      icon: "fluent-mdl2:reading-mode",
      title: "School",
      time: "5 min",
    },
    {
      icon: "heroicons-outline:shopping-bag",
      title: "Shops",
      time: "11 min",
    },
  ];

  return (
    <section className="w-full bg-[#F8F5EF]">
      <div className=" mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Map Side */}
        <div className="w-full h-full overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://maps.google.com/maps?q=${location?.latitude},${location?.longitude}&hl=es;z=14&output=embed`}
          ></iframe>
        </div>

        {/* Right Side - Content above Image */}
        <section className="relative py-16 md:py-24 overflow-hidden bg-[#F8F5EF]">
          <div className="absolute bottom-0 inset-x-0 w-full h-64 opacity-40">
            <Image
              src="/images/dubai-skyline-30.svg"
              alt="Dubai Skyline"
              fill
              className="object-bottom"
              priority
            />
          </div>
          {/* Content */}
          <div className="relative z-10 container mx-auto px-6 md:px-10 lg:px-20 ">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-mono mb-4">Location</h2>
              <p className="text-neutral-400 text-sm leading-relaxed line-clamp-6">
              {
                property?.description
              }
              </p>

              <motion.div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-center mt-4">
                  {amenities?.map((obj, idx) => (
                    <div key={`${obj?.title}-${idx}`} className="flex flex-col items-center">
                      <div className="flex  items-start justify-center gap-2">
                        <Icon
                          icon={obj?.icon}
                          className="text-3xl mb-2 text-primary"
                        />
                        <p className="">{obj?.title}</p>
                      </div>
                      <Separator className="my-1 bg-primary" />
                      <p className="text-xs text-gray-600">{obj?.time}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </section>
  );
}
