import { getPropertyById } from "@/api/offPlans";
import Image from "next/image";
import { useEffect, useState } from "react";
import moment from "moment";

export default function DetailPage({ id }: any) {
  const [property, setProperty] = useState<any>(null);

  useEffect(() => {
    async function fetchProperty() {
      const data = await getPropertyById(id);
      setProperty(data?.projects?.[0]);
    }
    fetchProperty();
  }, [id]);
  console.log(property);
  return (
    <div>
      <section className="relative h-screen w-full flex items-center justify-center text-center">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={property?.photos?.[0] ?? ""}
            alt="Luxury Living in Dubai"
            layout="fill"
            objectFit="cover"
            quality={85}
            priority
            className="z-0"
          />
          <div className="absolute inset-0 bg-black/20 z-10" />
        </div>
        <div className="relative z-20 text-white px-4 mt-[60vh]">
          <span>#{property?.agent_Id}</span>
          <h1 className="text-3xl md:text-4xl font-light mb-4 leading-tight tracking-wide">
            {property?.name}
          </h1>
          <p className="text-lg font-light mb-12 tracking-wider uppercase text-[#DBBB90]">
            {property?.location?.community}, {property?.location?.sub_community}{" "}
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
                {property?.newParam?.handoverTime && moment(property?.newParam?.handoverTime).format("DD / MM / YYYY")}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-light uppercase text-[#DBBB90] mb-2 border-b border-[#DBBB90] inline-block pb-1">
                Construction Stage
              </h3>
              <p className="text-sm font-light text-gray-700">
                {"Off-plan"}
              </p>
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
    </div>
  );
}
