"use client";

import { useMemo, useState } from "react";
import { Dialog, DialogContent } from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import Image from "next/image";

type AnyRecord = Record<string, any>;

type ProjectDetailsProps = {
  property: AnyRecord | null | undefined;
};

type FloorPlan = {
  bedroom?: string | number;
  price?: number | string;
  size?: number | string;
  url?: string;
  image?: string;
  title?: string;
};

function formatPrice(value: unknown): string | null {
  if (value == null) return null;
  if (typeof value === "number") return `AED ${value.toLocaleString()}`;
  if (typeof value === "string") {
    const num = Number(value);
    return isNaN(num) ? value : `AED ${num.toLocaleString()}`;
  }
  return null;
}

export default function ProjectDetails({ property }: ProjectDetailsProps) {
  const [openPlan, setOpenPlan] = useState<FloorPlan | null>(null);

  const availableBedrooms: string[] = useMemo(() => {
    const candidates: unknown[] = [
      (property as AnyRecord)?.newParam?.availableBedrooms,
      (property as AnyRecord)?.newParam?.bedrooms,
      (property as AnyRecord)?.availableBedrooms,
      (property as AnyRecord)?.bedRoomsOptions,
      (property as AnyRecord)?.beds,
    ];
    const arr = candidates.find(Array.isArray) as unknown[] | undefined;
    const fromArray = (arr || [])
      .map((v) => (typeof v === "number" || typeof v === "string" ? String(v) : ""))
      .filter(Boolean);
    
    // Also check for single bedroom count from backend
    if (fromArray.length === 0) {
      const singleBedroom = (property as AnyRecord)?.newParam?.bedRooms 
        || (property as AnyRecord)?.bedRooms 
        || (property as AnyRecord)?.bedrooms;
      if (singleBedroom) {
        return [String(singleBedroom)];
      }
    }
    
    return fromArray;
  }, [property]);

  const startingPrice = useMemo(() => {
    const np = (property as AnyRecord)?.newParam;
    return (
      formatPrice(np?.price) ||
      formatPrice((property as AnyRecord)?.price_from) ||
      formatPrice((property as AnyRecord)?.price)
    );
  }, [property]);

  const floorPlans: FloorPlan[] = useMemo(() => {
    const np = (property as AnyRecord)?.newParam || {};
    const candidates: unknown[] = [
      np.floorPlans,
      (property as AnyRecord)?.floorPlans,
      np.unitTypes,
      (property as AnyRecord)?.unitTypes,
    ];
    const firstArray = candidates.find(Array.isArray) as AnyRecord[] | undefined;
    if (!firstArray) return [];
    return firstArray.map((it: AnyRecord) => ({
      bedroom: it.bedroom ?? it.bedrooms ?? it.type ?? it.title,
      price: it.price ?? it.startingPrice,
      size: it.size ?? it.area,
      url: it.url ?? it.fileUrl ?? it.planUrl,
      image: it.image ?? it.thumbnail,
      title: it.title,
    }));
  }, [property]);

  const amenities: string[] = useMemo(() => {
    const raw = (property as AnyRecord)?.amenities || (property as AnyRecord)?.newParam?.amenities;
    if (Array.isArray(raw)) {
      return raw
        .filter(Boolean)
        .map((v: any) => (typeof v === "string" ? v.trim() : String(v)))
        .filter((v: string) => v.length > 0);
    }
    return [];
  }, [property]);

  if (!property) return null;

  const hasAny = availableBedrooms.length > 0 || startingPrice || floorPlans.length > 0;
  if (!hasAny) return null;

  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="text-3xl font-serif text-gray-800 mb-6 text-center">Project Details</h2>
        <hr className="border-t border-gray-200 mb-12 max-w-4xl mx-auto" />

        {/* Center Section: Bedrooms only */}
        <div className="flex justify-center mb-12">
          <div className="w-full max-w-4xl">
            {availableBedrooms.length > 0 && (
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-sm font-light uppercase text-primary mb-2">Available Bedrooms</h3>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {availableBedrooms.map((b, i) => (
                      <Badge key={`${b}-${i}`} className="rounded-none bg-[#F2EEE8] text-gray-800 border border-gray-200 px-3 py-2">
                        {b}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Amenities hidden as requested */}

        {/* Floorplans Section */}
        {floorPlans.length > 0 && (
          <div className="text-center">
            <h3 className="text-sm font-light uppercase text-primary mb-4">Floorplans</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
              {floorPlans.map((fp, idx) => (
                <div key={idx} className="border border-gray-200 bg-[#F8F5EF] p-4 flex flex-col w-full max-w-sm mx-auto">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-gray-900 text-sm font-medium">
                      {fp.title || (fp.bedroom ? `${fp.bedroom} Bedroom` : "Floorplan")}
                    </p>
                    {fp.size && <span className="text-xs text-gray-600">{String(fp.size)}</span>}
                  </div>
                  {fp.image && (
                    <div className="relative w-full h-40 bg-white mb-3">
                      <Image src={fp.image} alt={fp.title || "Floorplan"} fill style={{ objectFit: "contain" }} />
                    </div>
                  )}
                  {fp.price && (
                    <p className="text-sm text-gray-800 mb-3 text-center">{formatPrice(fp.price)}</p>
                  )}
                  <div className="mt-auto flex gap-2 justify-center">
                    {fp.url && (
                      <a href={fp.url} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" className="rounded-none">View</Button>
                      </a>
                    )}
                    {fp.image && (
                      <Button size="sm" variant="secondary" className="rounded-none" onClick={() => setOpenPlan(fp)}>
                        Preview
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Dialog open={!!openPlan} onOpenChange={(o) => !o && setOpenPlan(null)}>
        <DialogContent className="bg-white rounded-none max-w-4xl w-full">
          {openPlan?.image && (
            <div className="relative w-full h-[70vh]">
              <Image src={openPlan.image} alt={openPlan.title || "Floorplan"} fill style={{ objectFit: "contain" }} />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}


