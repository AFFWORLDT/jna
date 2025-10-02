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
import React, {
  useCallback,
  useEffect,
  useMemo,
  Suspense,
  useRef,
} from "react";
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

const PROPERTY_TYPES = ["APARTMENT", "PENTHOUSE", "TOWNHOUSE", "VILLA"];

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

function BuyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [property, setProperty] = React.useState<any[]>([]);
  const [totalProperties, setTotalProperties] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);
  const [showFilters, setShowFilters] = React.useState(false);
  const [developers, setDevelopers] = React.useState([]);
  const [developerSearch, setDeveloperSearch] = React.useState("");
  const [searchingDevelopers, setSearchingDevelopers] = React.useState(false);
  const observerRef = useRef<HTMLDivElement>(null);

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

  const fetchproperty = useCallback(
    async (page = 1, append = false) => {
      console.log("fetchproperty called:", {
        page,
        append,
        loadingMore,
        hasMore,
      });

      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
        setCurrentPage(1);
        setHasMore(true);
      }

      const queryParams = new URLSearchParams({
        sort_order: "desc",
        page: page.toString(),
        size: "6",
        status: "ACTIVE",
      });

      // Add filter parameters
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== "any" && value !== "all") {
          queryParams.append(key, value);
        }
      });

      const finalQueryString = queryParams.toString();
      console.log("Making API call with params:", finalQueryString);

       try {
         const res = await getAllBuyProperties(finalQueryString);
         const newProperties = res?.properties || [];
 
         setTotalProperties(res?.totalProperties || 0);
         console.log("API response:", {
           totalProperties: newProperties.length,
           currentPropertyCount: property.length,
           append,
         });

        if (append) {
          setProperty((prev) => {
            const updated = [...prev, ...newProperties];
            console.log("Appended properties. New total:", updated.length);
            return updated;
          });
        } else {
          setProperty(newProperties);
          console.log("Set new properties:", newProperties.length);
        }

        setCurrentPage(page);

        // Check if there are more pages
        const hasMoreData = newProperties.length === 6;
        console.log("Has more data:", hasMoreData);
        setHasMore(hasMoreData);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [filters]
  );

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

    if (
      propertyType ||
      location ||
      bedrooms ||
      refNumber ||
      minPrice ||
      maxPrice
    ) {
      const newFilters = {
        property_type: propertyType || "any",
        location: location || "",
        bedrooms: bedrooms || "any",
        ref_number: refNumber || "",
        min_price: minPrice || "any",
        max_price: maxPrice || "any",
      };

      setFilters((prev) => ({
        ...prev,
        ...newFilters,
      }));
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
    fetchproperty(1, false);
    if (showFilters) setShowFilters(false);
  }, [fetchproperty, showFilters]);

  const clearAllFilters = useCallback(() => {
    setFilters({
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
    setDeveloperSearch("");
    setDevelopers([]);
  }, []);

  const loadMore = useCallback(() => {
    console.log("loadMore called:", { loadingMore, hasMore, currentPage });
    if (!loadingMore && hasMore) {
      console.log("Fetching next page:", currentPage + 1);
      fetchproperty(currentPage + 1, true);
    } else {
      console.log("Load more blocked:", { loadingMore, hasMore });
    }
  }, [fetchproperty, currentPage, loadingMore, hasMore]);

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

  // Initial load and when filters change
  useEffect(() => {
    fetchproperty(1, false);
  }, [filters]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        console.log("Intersection observer triggered:", {
          isIntersecting: entries[0].isIntersecting,
          hasMore,
          loadingMore,
          currentPage,
          propertyLength: property.length,
        });

        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          console.log("Loading more properties - Page:", currentPage + 1);
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = observerRef.current;
    if (currentRef) {
      console.log("Setting up intersection observer");
      observer.observe(currentRef);
    } else {
      console.log("Observer ref not found");
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasMore, loadingMore, loadMore, currentPage, property.length]);

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
            className="h-12 w-12 bg-white hover:bg-gray-50 border border-gray-300 flex items-center justify-center rounded-lg transition-all duration-200"
          >
            <Icon
              icon="lucide:sliders-horizontal"
              className="text-gray-600 w-5 h-5"
            />
          </Button>
          <Button
            onClick={clearAllFilters}
            size="lg"
            variant="outline"
            className="h-12 w-12 bg-white hover:bg-gray-50 border border-gray-300 flex items-center justify-center rounded-lg transition-all duration-200"
          >
            <Icon icon="lucide:x-circle" className="text-gray-600 w-5 h-5" />
          </Button>
          <Button
            onClick={handleSearch}
            size="lg"
            className="h-12 w-12 bg-primary hover:bg-primary/90 flex items-center justify-center shadow-lg rounded-lg transition-all duration-200"
          >
            <Icon icon="iconamoon:search-fill" className="text-white w-5 h-5" />
          </Button>
        </div>
      </div>
    ),
    [
      filters.location,
      handleFilterChange,
      toggleFilters,
      handleSearch,
      clearAllFilters,
    ]
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
                onValueChange={(value) =>
                  handleFilterChange("listing_type", value)
                }
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

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={toggleFilters}
                variant="outline"
                className="h-14 w-14 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 flex items-center justify-center font-medium transition-all duration-200"
                title="More Filters"
              >
                <Icon icon="lucide:sliders-horizontal" className="w-5 h-5" />
              </Button>

              <Button
                onClick={clearAllFilters}
                variant="outline"
                className="h-14 w-14 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 flex items-center justify-center font-medium transition-all duration-200"
                title="Clear Filters"
              >
                <Icon icon="lucide:x-circle" className="w-5 h-5" />
              </Button>

              <Button
                onClick={handleSearch}
                className="h-14 w-14 bg-primary hover:bg-primary/90 text-white flex items-center justify-center shadow-lg font-medium transition-all duration-200"
                title="Search"
              >
                <Icon
                  icon="iconamoon:search-fill"
                  className="text-white w-5 h-5"
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
                  onChange={(e) =>
                    handleFilterChange("location", e.target.value)
                  }
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
                onValueChange={(value) =>
                  handleFilterChange("listing_type", value)
                }
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

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={clearAllFilters}
                variant="outline"
                className="flex-1 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 font-medium h-14 rounded-lg transition-all duration-200"
              >
                <Icon icon="lucide:x-circle" className="w-5 h-5 mr-2" />
                Clear Filters
              </Button>
              <Button
                onClick={handleSearch}
                className="flex-1 bg-primary hover:bg-primary/90 text-white font-medium h-14 rounded-lg transition-all duration-200 shadow-lg"
              >
                <Search className="w-5 h-5 mr-2" />
                Search
              </Button>
            </div>
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

        <div className="h-8">
          {
            totalProperties !== 0 && (
              <div className="text-center py-12 text-gray-500">
                <div className="text-lg font-medium mb-2">Total properties: {totalProperties}</div>
              </div>
            )
          }
        </div>
      </p>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 container my-4 mx-auto">
          {Array.from({ length: 6 }).map((_, i) => (
            <PropertyCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 container my-4 mx-auto">
            {property?.map((item: any, index: number) => (
              <BuyCard
                key={item.id ?? index}
                data={item}
                onFavorite={handleFavorite}
              />
            ))}
          </div>

          {/* Loading more indicator */}
          {loadingMore && (
            <div className="flex justify-center items-center py-8">
              <Loader className="animate-spin h-8 w-8 text-primary" />
              <span className="ml-2 text-gray-600">
                Loading more properties...
              </span>
            </div>
          )}

          {/* Intersection Observer target */}
          {!loading && <div ref={observerRef} className="h-8 " />}

          {/* No more properties message */}
          {!hasMore && property.length > 0 && (
            <div className="text-center py-8 text-gray-500">
              No more properties to load
            </div>
          )}

          {/* No properties message */}
          {!loading && property.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <div className="text-lg font-medium mb-2">
                No properties found
              </div>
              <div className="text-sm">Try adjusting your search filters</div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function Buy() {
  return (
    <Suspense
      fallback={
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 container my-4 mx-auto">
          {Array.from({ length: 6 }).map((_, i) => (
            <PropertyCardSkeleton key={i} />
          ))}
        </div>
      }
    >
      <BuyContent />
    </Suspense>
  );
}

export default Buy;
