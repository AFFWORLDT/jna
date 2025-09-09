"use client";
import { getAllBuyProperties } from "@/src/api/buy";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { cn } from "@/src/lib/utils";
import { BuyCard } from "@/src/view/buy/buyCard";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Loader, Filter, X, Search } from "lucide-react";
import PropertyCardSkeleton from "@/src/components/common/property-card-skeleton";
import React, { useCallback, useEffect, useMemo } from "react";
import { api } from "@/src/lib/axios";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

// Constants
const COMPLETION_STATUS_OPTIONS = [
  { label: "Completion Status", value: "all" },
  { label: "Completed Secondary", value: "completed" },
  { label: "Off Plan Secondary", value: "off_plan" },
  { label: "Completed Primary", value: "completed_primary" },
  { label: "Off Plan Primary", value: "off_plan_primary" },
];

const PROPERTY_TYPES = [
  "APARTMENT",
  "PENTHOUSE",
  "TOWNHOUSE",
  "VILLA",
];

// Property type mapping for hero section
const HERO_PROPERTY_TYPES = [
  { value: "apartment", label: "Apartment" },
  { value: "villa", label: "Villa" },
  { value: "townhouse", label: "Townhouse" },
  { value: "penthouse", label: "Penthouse" },
  { value: "studio", label: "Studio" },
  { value: "plot", label: "Plot" },
  { value: "office", label: "Office" },
];

const PRICE_OPTIONS = [
  "250000",
  "500000",
  "750000",
  "1000000",
  "1500000",
  "2000000",
  "2500000",
  "3000000",
  "4000000",
  "5000000",
  "7500000",
  "10000000",
  "15000000",
  "20000000",
  "30000000",
  "40000000",
  "50000000",
  "60000000",
  "70000000",
  "80000000",
  "90000000",
  "100000000",
];

const BEDROOM_OPTIONS = ["any", "1", "2", "3", "4", "5+"];
const BATHROOM_OPTIONS = ["any", "1", "2", "3", "4", "5+"];
const HANDOVER_YEAR_OPTIONS = [
  "any",
  "2024",
  "2025",
  "2026",
  "2027",
  "2028",
  "2029",
  "2030",
  "2031",
  "2032",
  "2033",
  "2034",
  "2035",
];

function Buy() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [property, setProperty] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [showFilters, setShowFilters] = React.useState(false);
  const [developers, setDevelopers] = React.useState([]);
  const [developerSearch, setDeveloperSearch] = React.useState("");
  const [searchingDevelopers, setSearchingDevelopers] = React.useState(false);

  // Filter states
  const [filters, setFilters] = React.useState({
    listing_type: "SELL",
    location: "",
    property_type: "any",
    min_price: "any",
    max_price: "any",
    completion_status: "all",
    developer_id: "any",
    bedrooms: "any",
    bathrooms: "any",
    handover_year: "any",
    ref_number: "",
  });

  const fetchproperty = useCallback(async () => {
    setLoading(true);

    console.log("Buy page - fetchproperty called with filters:", filters);

    const queryParams = new URLSearchParams({
      sort_order: "desc",
      page: "1",
      size: "24",
      status:"ACTIVE"
    });

    // Add filter parameters
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== "any" && value !== "all") {
        queryParams.append(key, value);
        console.log(`Buy page - Adding filter: ${key} = ${value}`);
      }
    });

    const finalQueryString = queryParams.toString();
    console.log("Buy page - Final API query string:", finalQueryString);

    try {
      console.log("Buy page - Calling API with URL params:", finalQueryString);
      const res = await getAllBuyProperties(finalQueryString);
      console.log("Buy page - API response:", res);
      console.log("Buy page - Properties count:", res?.properties?.length || 0);
      setProperty(res?.properties || []);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Debounced developer search
  const searchDevelopers = useCallback((searchTerm: string) => {
    if (searchTerm.length < 2) {
      setDevelopers([]);
      return;
    }

    setSearchingDevelopers(true);
    const timeoutId = setTimeout(async () => {
      try {
        const response = await api.get(
          `/properties/get_developers?name=${searchTerm}`
        );
        setDevelopers(response.data?.developers || response.data || []);
      } catch (error) {
        console.error("Error searching developers:", error);
        setDevelopers([]);
      } finally {
        setSearchingDevelopers(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, []);

  // Handle query parameters from hero section
  useEffect(() => {
    const propertyType = searchParams.get("property_type");
    const location = searchParams.get("location");
    const bedrooms = searchParams.get("bedrooms");
    const refNumber = searchParams.get("ref_number");
    const minPrice = searchParams.get("min_price");
    const maxPrice = searchParams.get("max_price");
    
    console.log("Buy page - Query parameters received:", {
      propertyType,
      location,
      bedrooms,
      refNumber,
      minPrice,
      maxPrice
    });
    
    if (propertyType || location || bedrooms || refNumber || minPrice || maxPrice) {
      const newFilters = {
        property_type: propertyType || "any",
        location: location || "",
        bedrooms: bedrooms || "any",
        ref_number: refNumber || "",
        min_price: minPrice || "any",
        max_price: maxPrice || "any",
      };
      
      console.log("Buy page - Setting new filters:", newFilters);
      console.log("Buy page - Current filters before update:", filters);
      
      setFilters(prev => {
        const updatedFilters = {
          ...prev,
          ...newFilters
        };
        console.log("Buy page - Updated filters:", updatedFilters);
        return updatedFilters;
      });
    }
  }, [searchParams]);

  const handleFilterChange = useCallback(
    (key: string, value: string) => {
      setFilters((prev) => ({ ...prev, [key]: value }));

      // Navigate when listing_type changes
    if (key === "listing_type") {
      if (value === "RENT") {
        router.push("/rent");
      } else if (value === "SELL") {
        router.push("/buy");
      }
    }
    },
    [router]
  );

  const handleSearch = useCallback(() => {
    fetchproperty();
    if (showFilters) setShowFilters(false);
  }, [fetchproperty, showFilters]);

  const handleDeveloperSelect = useCallback(
    (developer: any) => {
      handleFilterChange("developer_id", developer.id);
      setDeveloperSearch(developer.name);
      setDevelopers([]);
    },
    [handleFilterChange]
  );

  const toggleFilters = useCallback(() => {
    setShowFilters((prev) => !prev);
  }, []);

  // Single useEffect to handle API calls - only when filters change
  useEffect(() => {
    console.log("Buy page - Filters changed, calling API with:", filters);
    fetchproperty();
  }, [filters, fetchproperty]);

  React.useEffect(() => {
    searchDevelopers(developerSearch);
  }, [developerSearch, searchDevelopers]);

  // Close developer dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(".developer-search")) {
        setDevelopers([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFavorite = useCallback((item: any) => {
    console.log("Added to favorites:", item);
    // Add your favorite logic here
  }, []);

  // Memoized components
  const FilterButton = useMemo(
    () => (
      <div className="block md:hidden py-20">
        <div className="flex items-center gap-3 p-4 backdrop-blur-md">
          <div className="flex-1">
            <Input
              placeholder="Location or Project"
              value={filters.location}
              onChange={(e) => handleFilterChange("location", e.target.value)}
              className="w-full text-black bg-white border border-gray-300 placeholder:text-gray-500 h-12"
            />
          </div>
          <Button
            onClick={toggleFilters}
            size="lg"
            variant="outline"
            className="h-12 w-12 bg-white hover:bg-gray-50 border border-gray-300 flex items-center justify-center"
          >
            <Icon
              icon="lucide:sliders-horizontal"
              className="text-gray-600 text-xl"
            />
          </Button>
          <Button
            onClick={handleSearch}
            size="lg"
            className="h-12 w-12 bg-primary hover:bg-primary/90 flex items-center justify-center shadow-lg"
          >
            <Icon icon="iconamoon:search-fill" className="text-white text-xl" />
          </Button>
        </div>
      </div>
    ),
    [filters.location, handleFilterChange, toggleFilters, handleSearch]
  );

  const PropertyTypeSelect = useMemo(
    () => (
      <Select
        value={filters.property_type}
        onValueChange={(value) => handleFilterChange("property_type", value)}
      >
        <SelectTrigger className="w-full sm:w-40 bg-white border-0 rounded-md h-12 text-gray-900 focus:ring-0 focus:ring-offset-0 px-4">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="any">Property Type</SelectItem>
          {PROPERTY_TYPES.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    ),
    [filters.property_type, handleFilterChange]
  );

  const PriceSelect = useMemo(() => {
    const MinPriceSelect = () => (
      <Select
        value={filters.min_price}
        onValueChange={(value) => handleFilterChange("min_price", value)}
      >
        <SelectTrigger className="w-full sm:w-28 bg-white border-0 rounded-md h-12 text-gray-900 focus:ring-0 focus:ring-offset-0 px-4">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="any">Min </SelectItem>
          {PRICE_OPTIONS.map((price) => (
            <SelectItem key={price} value={price}>
              {parseInt(price).toLocaleString()}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );

    const MaxPriceSelect = () => (
      <Select
        value={filters.max_price}
        onValueChange={(value) => handleFilterChange("max_price", value)}
      >
        <SelectTrigger className="w-full sm:w-28 bg-white border-0 rounded-md h-12 text-gray-900 focus:ring-0 focus:ring-offset-0 px-4">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="any">Max</SelectItem>
          {PRICE_OPTIONS.map((price) => (
            <SelectItem key={price} value={price}>
              {parseInt(price).toLocaleString()}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );

    return { MinPriceSelect, MaxPriceSelect };
  }, [filters.min_price, filters.max_price, handleFilterChange]);

  return (
    <div>
      <section className="bg-[#141442] px-4 lg:h-72 h-auto flex justify-center items-end lg:py-16 py-6">
        <div className="container mx-auto ">
          {FilterButton}

          {/* Desktop Search Form */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-8 gap-4 p-6 backdrop-blur-md">
            {/* Buy/Sell Filter */}
            {/* Listing Type Filter */}
            <div>
              <Select
                value={filters.listing_type}
                onValueChange={(value) => handleFilterChange("listing_type", value)}
              >
                <SelectTrigger className="w-full bg-white border border-gray-300 text-black h-14">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="SELL">Buy</SelectItem>
                  <SelectItem value="RENT">Rent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div className="col-span-2">
              <Input
                placeholder="City, building or community"
                value={filters.location}
                onChange={(e) => handleFilterChange("location", e.target.value)}
                className="w-full text-black bg-white border border-gray-300 placeholder:text-gray-500 h-14"
              />
            </div>

            {/* Property Type */}
            <div>
              <Select
                value={filters.property_type}
                onValueChange={(value) =>
                  handleFilterChange("property_type", value)
                }
              >
                <SelectTrigger className="w-full bg-white border border-gray-300 text-black h-14">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="any">Property Type</SelectItem>
                  {PROPERTY_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Min Price */}
            <div>
              <Select
                value={filters.min_price}
                onValueChange={(value) =>
                  handleFilterChange("min_price", value)
                }
              >
                <SelectTrigger className="w-full bg-white border border-gray-300 text-black h-14">
                  <SelectValue placeholder="Min Price" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="any">Min Price</SelectItem>
                  {PRICE_OPTIONS.map((price) => (
                    <SelectItem key={price} value={price}>
                      AED {parseInt(price).toLocaleString()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Max Price */}
            <div>
              <Select
                value={filters.max_price}
                onValueChange={(value) =>
                  handleFilterChange("max_price", value)
                }
              >
                <SelectTrigger className="w-full bg-white border border-gray-300 text-black h-14">
                  <SelectValue placeholder="Max Price" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="any">Max Price</SelectItem>
                  {PRICE_OPTIONS.map((price) => (
                    <SelectItem key={price} value={price}>
                      AED {parseInt(price).toLocaleString()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Beds */}
            <div>
              <Select
                value={filters.bedrooms}
                onValueChange={(value) => handleFilterChange("bedrooms", value)}
              >
                <SelectTrigger className="w-full bg-white border border-gray-300 text-black h-14">
                  <SelectValue placeholder="Beds" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Beds</SelectItem>
                  {BEDROOM_OPTIONS.slice(1).map((bed) => (
                    <SelectItem key={bed} value={bed}>
                      {bed === "5+" ? "5+ Beds" : `${bed} Bed`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* More Filters Button and Search Button in same column */}
            <div className="flex gap-2">
              <Button
                onClick={toggleFilters}
                variant="outline"
                className="w-32 h-14 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 flex items-center justify-center gap-2"
              >
                <Icon icon="lucide:sliders-horizontal" className="w-4 h-4" />
                More Filters
              </Button>

              <Button
                onClick={handleSearch}
                className="h-14 w-14 bg-primary hover:bg-primary/90 text-white flex items-center justify-center shadow-lg"
              >
                <Icon
                  icon="iconamoon:search-fill"
                  className="text-white text-xl"
                />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Filter Modal */}
      <Dialog open={showFilters} onOpenChange={setShowFilters}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span className="text-xl font-semibold">Search Filters</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Search Input - Hidden on large screens since it's shown in desktop form */}
            <div className="space-y-2 md:hidden">
              <label className="text-sm font-medium text-gray-700">
                Location
              </label>
              <div className="relative">
                <Input
                  placeholder="City, building or community"
                  value={filters.location}
                  onChange={(e) => handleFilterChange("location", e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-md h-14 text-gray-900 placeholder:text-gray-600 focus-visible:ring-2 focus-visible:ring-primary"
                />
                <Icon
                  icon="heroicons:magnifying-glass"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                />
              </div>
            </div>

            {/* Listing Type Filter - Hidden on large screens since it's shown in desktop form */}
            <div className="space-y-2 md:hidden">
              <label className="text-sm font-medium text-gray-700">Type</label>
              <Select
                value={filters.listing_type}
                onValueChange={(value) => handleFilterChange("listing_type", value)}
              >
                <SelectTrigger className="w-full bg-white border border-gray-300 rounded-md h-14 text-gray-900 focus:ring-2 focus:ring-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="SELL">Buy</SelectItem>
                  <SelectItem value="RENT">Rent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Property Type - Hidden on large screens since it's shown in desktop form */}
            <div className="space-y-2 md:hidden">
              <label className="text-sm font-medium text-gray-700">
                Property Type
              </label>
              <Select
                value={filters.property_type}
                onValueChange={(value) =>
                  handleFilterChange("property_type", value)
                }
              >
                <SelectTrigger className="w-full bg-white border border-gray-300 rounded-md h-14 text-gray-900 focus:ring-2 focus:ring-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white max-h-60">
                  <SelectItem value="any">Any Property Type</SelectItem>
                  {PROPERTY_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Completion Status */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Completion Status
              </label>
              <Select
                value={filters.completion_status}
                onValueChange={(value) =>
                  handleFilterChange("completion_status", value)
                }
              >
                <SelectTrigger className="w-full bg-white border border-gray-300 rounded-md h-14 text-gray-900 focus:ring-2 focus:ring-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {COMPLETION_STATUS_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Developer Search */}
            <div className="space-y-2 developer-search">
              <label className="text-sm font-medium text-gray-700">
                Developer
              </label>
              <div className="relative">
                <Input
                  placeholder="Search developers..."
                  value={developerSearch}
                  onChange={(e) => setDeveloperSearch(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-md h-14 text-gray-900 placeholder:text-gray-600 focus-visible:ring-2 focus-visible:ring-primary pr-10"
                />
                {searchingDevelopers && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Loader className="w-5 h-5 animate-spin text-gray-400" />
                  </div>
                )}
              </div>
              {developers.length > 0 && (
                <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-md bg-white">
                  {developers.map((developer: any) => (
                    <div
                      key={developer.id}
                      className="px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                      onClick={() => handleDeveloperSelect(developer)}
                    >
                      <div className="text-sm font-medium text-gray-900">
                        {developer.name}
                      </div>
                      {developer.location && (
                        <div className="text-xs text-gray-500">
                          {developer.location}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Price Range - Hidden on large screens since it's shown in desktop form */}
            <div className="grid grid-cols-2 gap-4 md:hidden">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Min Price
                </label>
                <Select
                  value={filters.min_price}
                  onValueChange={(value) =>
                    handleFilterChange("min_price", value)
                  }
                >
                  <SelectTrigger className="w-full bg-white border border-gray-300 rounded-md h-14 text-gray-900 focus:ring-2 focus:ring-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white max-h-60">
                    <SelectItem value="any">Any</SelectItem>
                    {PRICE_OPTIONS.map((price) => (
                      <SelectItem key={price} value={price}>
                        {parseInt(price).toLocaleString()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Max Price
                </label>
                <Select
                  value={filters.max_price}
                  onValueChange={(value) =>
                    handleFilterChange("max_price", value)
                  }
                >
                  <SelectTrigger className="w-full bg-white border border-gray-300 rounded-md h-14 text-gray-900 focus:ring-2 focus:ring-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white max-h-60">
                    <SelectItem value="any">Any</SelectItem>
                    {PRICE_OPTIONS.map((price) => (
                      <SelectItem key={price} value={price}>
                        {parseInt(price).toLocaleString()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Bedrooms - Hidden on large screens since it's shown in desktop form */}
            <div className="space-y-2 md:hidden">
              <label className="text-sm font-medium text-gray-700">
                Bedrooms
              </label>
              <Select
                value={filters.bedrooms}
                onValueChange={(value) => handleFilterChange("bedrooms", value)}
              >
                <SelectTrigger className="w-full bg-white border border-gray-300 rounded-md h-14 text-gray-900 focus:ring-2 focus:ring-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="any">Any Bedrooms</SelectItem>
                  {BEDROOM_OPTIONS.slice(1).map((bed) => (
                    <SelectItem key={bed} value={bed}>
                      {bed === "5+" ? "5+ Beds" : `${bed} Bed`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Bathrooms */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Bathrooms
              </label>
              <Select
                value={filters.bathrooms}
                onValueChange={(value) =>
                  handleFilterChange("bathrooms", value)
                }
              >
                <SelectTrigger className="w-full bg-white border border-gray-300 rounded-md h-14 text-gray-900 focus:ring-2 focus:ring-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="any">Any Bathrooms</SelectItem>
                  {BATHROOM_OPTIONS.slice(1).map((bath) => (
                    <SelectItem key={bath} value={bath}>
                      {bath === "5+" ? "5+ Baths" : `${bath} Bath`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Handover Year */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Handover Year
              </label>
              <Select
                value={filters.handover_year}
                onValueChange={(value) =>
                  handleFilterChange("handover_year", value)
                }
              >
                <SelectTrigger className="w-full bg-white border border-gray-300 rounded-md h-14 text-gray-900 focus:ring-2 focus:ring-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="any">Any Year</SelectItem>
                  {HANDOVER_YEAR_OPTIONS.slice(1).map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Search Button */}
            <Button
              onClick={handleSearch}
              className="w-full bg-primary hover:bg-primary/90 text-white font-medium h-14 rounded-md"
            >
              <Search className="w-5 h-5 mr-2" />
              Search Properties
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="mx-auto px-4 py-7 mt-11 max-w-5xl">
        <h1 className="text-center text-5xl font-mono">
          Dubai&apos;s most exquisite properties
        </h1>
        <p className="text-center text-gray-600 mt-4">
          Become part of a world class lifestyle, benefit of unrivaled returns
          and own a piece of Dubai&apos;s future.
        </p>
      </div>
      <p className="text-center mb-11">
        <Link href={"/whyDubai"}>
          <span
            className={cn(
              "relative pb-1 transition-all duration-300 text-primary uppercase font-thin",
              "after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-0",
              "after:-translate-x-1/2 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
            )}
          >
            Learn More
          </span>
        </Link>
      </p>

      {loading || property.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 container my-4 mx-auto">
          {Array.from({ length: 6 }).map((_, i) => (
            <PropertyCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 container my-4 mx-auto">
          {property?.map((item: any, index: number) => (
            <BuyCard
              key={item.id ?? index}
              data={item}
              onFavorite={handleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Buy;
