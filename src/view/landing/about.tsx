import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import Link from "next/link";

export default function AboutUsSection() {
  return (
    <section className="w-full py-5 md:h-screen h-auto">
      <div className="grid h-full grid-cols-1 md:grid-cols-2">
        {/* About Us Content */}
        <div className={cn("py-32 text-center bg-[#F8F5EF] w-full container px-3")}>
          <p className="text-sm font-light uppercase tracking-wider text-[#6B7280]">
            ABOUT US
          </p>
          <div className="flex flex-col justify-center items-center space-y-6 h-full">
            <h2 className="text-3xl sm:text-4xl font-light font-mono leading-tight tracking-wide text-[#333333]">
              Crafting Dubai&apos;s Real Estate <br/> Legacy
            </h2>
            <p className="max-w-[600px] text-sm font-light text-[#6B7280] leading-relaxed">
              At J&A Properties, we blend unparalleled market expertise with a
              passion for luxury living. Our journey in Dubai&apos;s dynamic
              real estate landscape is rooted in trust, integrity, and a
              relentless pursuit of excellence. Explore our story and discover
              why discerning clients choose us as their trusted real estate
              partner.
            </p>
          </div>
         <Link href={"/about"}>
          <Button className="bg-[#D4B88C] px-8 py-3 text-base rounded-none font-light tracking-wider text-white shadow-sm hover:bg-[#C2A77B] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 w-fit uppercase">
            ABOUT US
          </Button>
         </Link>
        </div>
        {/* Image - hidden on small screens */}
        <div className="relative h-full w-full overflow-hidden hidden md:block">
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
