import { Card, CardContent } from "@/src/components/ui/card";
import { cn } from "@/src/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface CommunityData {
  city: string;
  photos: string[];
  latitude: number;
  longitude: number;
  name: string;
  assigned_order: number | null;
  order_photo: string | null;
  order_description: string | null;
  order_created_at: string | null;
  order_updated_at: string | null;
}

export default function CommunitiesCard({ data }: { data: CommunityData }) {
  const router = useRouter();
  return (
    <Card
      className="relative w-[95%] h-[380px] rounded-none overflow-hidden shadow-lg group border cursor-pointer"
      onClick={() =>
        router.push(`/communities/details/${encodeURIComponent(data?.name)}`)
      }
    >
      <CardContent className="p-0 h-full">
        <Image
          src={
            data?.order_photo || data?.photos?.[0] || "/images/placeholder.jpg"
          }
          alt={`Image of ${data?.name}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end text-white">
          <h3 className="text-2xl sm:text-3xl font-custom mb-2 tracking-wide">
            {data?.name}
          </h3>
          {data?.order_description && (
            <p className="text-xs mb-4 font-light leading-relaxed opacity-90">
              {data.order_description}
            </p>
          )}
          <div className="w-full  border-[0.5px] border-white/30 mb-4" />

          <Link
            href={`/communities/details/${encodeURIComponent(data?.name)}`}
            className={cn(
              "relative pb-1 transition-all duration-300 text-primary uppercase text-base",
              "after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0",
              "after:bg-primary after:transition-all after:duration-300 hover:after:w-20"
            )}
          >
            Explore
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
