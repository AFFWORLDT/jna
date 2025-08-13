"use client";
import { getFounderData } from "@/src/api/about";
import { Separator } from "@/src/components/ui/separator";
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
            {founders.map((founder:any) => (
              <div
                key={founder.id}
                className="bg-white overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300 w-full"
              >
                <div className="p-4 sm:p-6">
                  <h2 className="text-xl sm:text-2xl font-serif text-foreground mb-2">
                    {founder.name}
                  </h2>
                  <p className="text-muted-foreground text-base sm:text-lg">
                    Founder & Managing Partner
                  </p>
                </div>
                <div className="relative">
                  <Image
                    src={founder.avatar}
                    alt={`${founder.name} - Founder & Managing Partner`}
                    width={450}
                    height={500}
                    className="w-full h-[400px] sm:h-[500px] object-cover"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Company Description */}
          <div className="container mx-auto my-4">
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed text-center max-w-7xl mx-auto">
              J&amp;A Properties is your ultimate source to genuine and trending
              market insights leading to a rewarding and highly satisfying
              luxury real estate experience in the UAE. Founded by seasoned
              professionals Jochen Schmid and Ahmed Omar, we draw upon over 35
              years of international expertise in luxury hotel real estate
              investment and asset management...
            </p>
          </div>
        </div>

        <Separator className="my-6 sm:my-8 max-w-7xl mx-auto" />

        {/* Mission and Vision */}
        <div className="container mx-auto my-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
            <section>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-foreground mb-4">
                The <span className="text-primary">Mission</span>
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                We meticulously align your investment aspirations with the
                perfect property...
              </p>
            </section>

            <section>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-foreground mb-4">
                The <span className="text-primary">Vision</span>
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                To be the preferred luxury real estate company in the UAE...
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
