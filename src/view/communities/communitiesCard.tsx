import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface CommunityData {
  assigned_agents: any[];
  city: string;
  latitude: number;
  longitude: number;
  name: string;
  photos: string[];
  pool_projects_count: number;
  projects_count: number;
  rent_properties_count: number;
  sell_properties_count: number;
  total_count: number;
}

export default function CommunitiesCard({ data }: { data: CommunityData }) {
  return (
    <Card className="relative w-full h-[450px] rounded-none overflow-hidden shadow-lg group border">
      <CardContent className="p-0 h-full">
        <Image
          src={data.photos?.[0]}
          alt={`Image of ${data.name}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end text-white">
          <h3 className="text-2xl font-light mb-2 tracking-wide">
            {data.name}
          </h3>
          <p className="text-sm mb-4 font-light leading-relaxed">
            {`${data.city} — ${data.latitude.toFixed(
              4
            )}, ${data.longitude.toFixed(4)}`}
          </p>
          <div className="w-16 h-0.5 border mb-4" />

          <Link
            href="#"
            className="mt-4 text-[#D4B88C] uppercase text-sm font-light tracking-wider hover:underline"
          >
            Explore
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
