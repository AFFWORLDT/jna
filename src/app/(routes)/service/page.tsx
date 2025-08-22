import React from "react";

const servicesData = [
  {
    id: 1,
    title: "Market Insights",
    description:
      "We understand Dubai's luxury real estate market and explain areas like freehold locations, property types (townhouses, villas, penthouses), and current market trends (capital appreciation, rental yields).",
    additionalInfo:
      "We provide insights on areas with high investment potential. We assist in making informed decisions by considering upcoming developments, infrastructure projects, and areas poised for growth.",
    imageUrl: "/images/third.webp",
  },
  {
    id: 2,
    title: "Property Investment Consultation",
    description:
      "Expert guidance on investment opportunities in Dubai's dynamic real estate market. We analyze market trends, ROI potential, and help you make strategic investment decisions.",
    additionalInfo:
      "Our team provides comprehensive analysis of emerging neighborhoods, off-plan projects, and established luxury communities to maximize your investment returns.",
    imageUrl: "/images/marketprofiling.webp",
  },
  {
    id: 3,
    title: "Luxury Property Management",
    description:
      "Complete property management services for your luxury real estate portfolio. From tenant screening to maintenance coordination, we handle every aspect of property management.",
    additionalInfo:
      "Premium services including concierge support, regular property inspections, and direct communication channels for all your property needs.",
    imageUrl: "/images/analysis.webp",
  },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 bg-[#141442]">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-medium mb-6 text-white font-mono">
            Services
          </h1>
        </div>
      </section>

      {/* Services Section */}
      <div className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {servicesData.map((service, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={service.id}
                className={`flex flex-col lg:flex-row items-center mb-20 ${
                  isEven ? "lg:flex-row-reverse" : "lg:flex-row"
                }`}
              >
                {/* Image Section */}
                <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
                  <div className={`${isEven ? "lg:pl-8" : "lg:pr-8"}`}>
                    <div className="relative overflow-hidden rounded-none shadow-none">
                      <img
                        src={service.imageUrl}
                        alt={service.title}
                        className="w-full  sm:h-[600px] object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Text Section */}
                <div className="w-full lg:w-1/2">
                  <div className={`${isEven ? "lg:pl-8" : "lg:pr-8"}`}>
                    <h2 className="text-3xl sm:text-4xl  font-mono text-gray-700 mb-6">
                      {service.title}
                    </h2>

                    <p className="text-sm text-neutral-500 mb-6 ">
                      {service.description}
                    </p>

                    <p className="text-sm text-neutral-500 mb-8 ">
                      {service.additionalInfo}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

