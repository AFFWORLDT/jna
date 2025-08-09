import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function AboutUsSection() {
  return (
    <section className="w-full  py-5 h-screen">
        <div className="grid h-full grid-cols-2">
          {/* Top Left - About Us Content */}
          <div className="py-16 text-center bg-[#F8F5EF]">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#6B7280] ">
              ABOUT US
            </p>
            <div className="flex flex-col justify-center items-center space-y-6 h-full">
              <h2 className="text-3xl font-extrabold leading-tight tracking-tighter text-[#333333]">
                Crafting Dubai&apos;s Real Estate Legacy
              </h2>
              <p className="max-w-[600px] text-sm text-[#6B7280]">
                At J&A Properties, we blend unparalleled market expertise with a
                passion for luxury living. Our journey in Dubai&apos;s dynamic
                real estate landscape is rooted in trust, integrity, and a
                relentless pursuit of excellence. Explore our story and discover
                why discerning clients choose us as their trusted real estate
                partner.
              </p>
              <Button className="bg-[#D4B88C] px-8 py-3 text-base font-medium text-white shadow-sm hover:bg-[#C2A77B] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 w-fit">
                ABOUT US
              </Button>
            </div>
          </div>
          {/* Top Right - Image */}
          <div className="relative h-full w-full overflow-hidden">
            <Image
              src="/images/building.jpg"
              alt="Dubai Skyline"
              width={0}
              height={0}
              className="w-full h-full"
              priority
            />
          </div>
        </div>
    </section>
  );
}
