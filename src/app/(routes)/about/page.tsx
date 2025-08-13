import { Separator } from "@/src/components/ui/separator";
import Image from "next/image";

function AboutUs() {
  return (
    <div>
      <section className="pt-32 pb-12 px-4 bg-[#141442]">
        <div className="mx-auto text-center">
          <h1 className="text-5xl font-medium mb-6 text-white font-mono">
            About
          </h1>
        </div>
      </section>

      <div className="bg-background py-16 px-4">
        <div className="container mx-auto">
          {/* Main Title */}
          <div className="text-left mb-12 max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-2">
              The <span className="text-primary">Founders</span>
            </h1>
          </div>

          {/* Founders Grid */}
          <div className="flex justify-center items-start gap-8 flex-wrap mb-16">
            {/* Founder 1 */}
            <div className="bg-white overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <h2 className="text-2xl font-serif text-foreground mb-2">
                  Ahmed Omar
                </h2>
                <p className="text-muted-foreground text-lg">
                  Founder & Managing Partner
                </p>
              </div>
              <div className="relative">
                <Image
                  src="/images/founder1.webp"
                  alt="Ahmed Omar - Founder & Managing Partner"
                  width={450}
                  height={500}
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </div>

            {/* Founder 2 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <h2 className="text-2xl font-serif text-foreground mb-2">
                  Jochen A. Schmid
                </h2>
                <p className="text-muted-foreground text-lg">
                  Founder & Managing Partner
                </p>
              </div>
              <div className="relative">
                <Image
                  src="/images/founder2.webp"
                  alt="Jochen A. Schmid - Founder & Managing Partner"
                  width={450}
                  height={500}
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </div>
          </div>

          {/* Company Description */}
          <div className="container mx-auto my-4">
            <p className="text-muted-foreground text-sm leading-relaxed text-center">
              J&amp;A Properties is your ultimate source to genuine and trending
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
              interaction to our customer&apos;s unique investment objectives.
              Whether you&apos;re looking to buy a property in Dubai or seeking
              guidance from the best real estate company in Dubai, J&amp;A
              Properties is here to exceed your expectations.
            </p>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="flex  items-center container mx-auto my-4 gap-5">
          <section>
            <div className="text-left mb-12 max-w-5xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-2">
                The <span className="text-primary">Mission</span>
              </h1>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We meticulously align your investment aspirations with the
                perfect property, leveraging personalized service and astute
                analysis to ensure a seamless and fulfilling journey.
              </p>
            </div>
          </section>
          <section>
            <div className="text-left mb-12 max-w-5xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-2">
                The <span className="text-primary">Vision</span>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  To be the preferred luxury real estate company in the UAE,
                  built on trust, and integrity and renowned for exceptional
                  customer service, unwavering responsiveness, and unparalleled
                  expertise in identifying and securing the perfect property
                  match for our clients&apos; objectives.
                </p>
              </h1>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
