"use client";
import { getFounderData } from "@/src/api/about";
import { Separator } from "@/src/components/ui/separator";
import { CallToAction } from "@/src/view/landing/call-to-action";
import Image from "next/image";
import { useEffect, useState } from "react";

function AboutUs() {
  const [founders, setFounders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFounders = async () => {
    setLoading(true);
    try {
      const res = await getFounderData();

      setFounders(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFounders();
  }, []);

  return (
    <div>
      <section className="pt-32 pb-12 px-4 bg-[#141442]">
        <div className="mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium mb-6 text-white font-mono">
            About
          </h1>
        </div>
      </section>

      <div className="bg-background py-8 sm:py-12 lg:py-16 px-4">
        <div className="container mx-auto">
          <div className="text-left mb-8 sm:mb-12 max-w-5xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-foreground mb-2">
              The <span className="text-primary">Founders</span>
            </h1>
          </div>

          {/* Founders Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 justify-items-center mb-12 sm:mb-16 max-w-5xl mx-auto">
            <div className="bg-white overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300 w-full">
              <div className="p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-serif text-foreground mb-2">
                  Ahmed Omar
                </h2>
                <p className="text-muted-foreground text-base sm:text-lg">
                  Founder & Managing Partner
                </p>
              </div>
              <div className="relative">
                <Image
                  src={"/images/founder1.webp"}
                  alt={` Founder & Managing Partner`}
                  width={450}
                  height={500}
                  className="w-full h-[400px] sm:h-[500px] object-cover"
                />
              </div>
            </div>
            <div className="bg-white overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300 w-full">
              <div className="p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-serif text-foreground mb-2">
                  Jochen A. Schmid
                </h2>
                <p className="text-muted-foreground text-base sm:text-lg">
                  Founder & Managing Partner
                </p>
              </div>
              <div className="relative">
                <Image
                  src={"/images/founder2.webp"}
                  alt={`$ Founder & Managing Partner`}
                  width={450}
                  height={500}
                  className="w-full h-[400px] sm:h-[500px] object-cover"
                />
              </div>
            </div>
          </div>

          {/* Company Description */}
          <div className="container mx-auto my-2">
            <p className="text-neutral-400 text-sm  leading-relaxed text-justify max-w-5xl mx-auto">
              J&A Properties is your ultimate source to genuine and trending
              market insights leading to a rewarding and highly satisfying
              luxury real estate experience in the UAE. Founded by seasoned
              professionals Jochen Schmid and Ahmed Omar, we draw upon over 35
              years of international expertise in luxury hotel real estate
              investment and asset management. Witnessing a predominantly
              sales-centric approach to real estate within the region, we saw an
              opportunity to establish a bespoke luxury real estate company in
              the UAE, serving a discerning clientele demanding in-depth
              knowledge about selected key locations, a high level of
              personalized service, and most importantly, trust and integrity.
              Beyond sales, we build lasting relationships, tailoring each
              interaction to our customer&amp;s unique investment objectives.
              Whether you&amp;re looking to buy a property in Dubai or seeking
              guidance from the best real estate company in Dubai, J&A
              Properties is here to exceed your expectations.
            </p>
          </div>
        </div>

        <Separator className="my-6 sm:my-8 max-w-7xl mx-auto" />

        {/* Mission and Vision */}
        <div className="container mx-auto my-4 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
            <section>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-foreground mb-4">
                The <span className="text-primary">Mission</span>
              </h1>
              <p className="text-muted-foreground text-sm  leading-relaxed">
                We meticulously align your investment aspirations with the
                perfect property, leveraging personalized service and astute
                analysis to ensure a seamless and fulfilling journey.
              </p>
            </section>

            <section>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-foreground mb-4">
                The <span className="text-primary">Vision</span>
              </h1>
              <p className="text-muted-foreground text-sm  leading-relaxed">
                To be the preferred luxury real estate company in the UAE, built
                on trust, and integrity and renowned for exceptional customer
                service, unwavering responsiveness, and unparalleled expertise
                in identifying and securing the perfect property match for our
                clients&amp; objectives.
              </p>
            </section>
          </div>
        </div>
      </div>
      <CallToAction/>
    </div>
  );
}

export default AboutUs;
