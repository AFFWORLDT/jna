"use client";

import { Badge } from "@/src/components/ui/badge";
import { CheckCircle } from "lucide-react";

type AmenitiesProps = {
  title?: string;
  amenities?: Array<string | null | undefined>;
};

const CODE_TO_NAME: Record<string, string> = {
  BA: "Balcony",
  PP: "Private Pool",
  CO: "Concierge",
  PJ: "Playground",
  SY: "24/7 Security",
  BR: "Barbecue Area",
  SE: "Service Elevators",
  PR: "Prayer Room",
  CP: "Covered Parking",
  LB: "Lobby in Building",
};

function toTitleCase(input: string): string {
  return input
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function getDisplayName(rawAmenity: string): string {
  const trimmed = rawAmenity.trim();
  if (CODE_TO_NAME[trimmed as keyof typeof CODE_TO_NAME]) {
    return CODE_TO_NAME[trimmed as keyof typeof CODE_TO_NAME];
  }
  // If it's already a phrase (longer than code), prettify it
  if (trimmed.length > 3 || /[a-z]/.test(trimmed)) {
    return toTitleCase(trimmed);
  }
  return trimmed;
}

export default function AmenitiesSection({ title = "Amenities", amenities = [] }: AmenitiesProps) {
  const normalized = (amenities || [])
    .filter(Boolean)
    .map((a) => (typeof a === "string" ? a.trim() : ""))
    .filter((a) => a.length > 0)
    .map(getDisplayName)
    // Remove unknown short codes so only full names show
    .filter((name) => !(name.length <= 3 && /^[A-Z]{1,3}$/.test(name)));

  if (normalized.length === 0) return null;

  return (
    <section className="bg-white py-12">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="text-3xl font-serif text-gray-800 mb-6">{title}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {normalized.map((amenity, idx) => (
            <div
              key={`${amenity}-${idx}`}
              className="flex items-center gap-2 bg-[#F2EEE8] text-gray-900 border border-gray-200 px-3 py-2"
            >
              <CheckCircle className="w-4 h-4 text-primary" />
              <span className="text-sm">{amenity}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


