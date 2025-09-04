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
import { RentCard } from "@/src/view/rent/rentCard";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Loader, Filter, X, Search } from "lucide-react";
import React, { useCallback, useMemo, useEffect } from "react";
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
  "APARTMENT", "VILLA", "TOWNHOUSE", "PENTHOUSE", "HOTEL APARTMENT",
  "DUPLEX", "RESIDENTIAL FLOOR", "RESIDENTIAL PLOT", "RESIDENTIAL BUILDING",
  "PARKING", "STORE ROOM", "COMPOUND", "OFFICE", "SHOP", "COMMERCIAL BUILDING",
  "COMMERCIAL FLOOR", "COMMERCIAL PLOT", "LABOR CAMP", "RETAIL", "SHOW ROOM",
  "COMMERCIAL VILLA", "WAREHOUSE", "FARM", "FACTORY", "HOTEL", "HOSPITAL"
];

const RENT_PRICE_OPTIONS = [
  "5000", "10000", "15000", "20000", "25000", "30000", "35000", "40000",
  "45000", "50000", "60000", "70000", "80000", "90000", "100000", "120000",
  "150000", "200000", "250000", "300000", "400000", "500000"
];

const BEDROOM_OPTIONS = ["any", "1", "2", "3", "4", "5+"];
const BATHROOM_OPTIONS = ["any", "1", "2", "3", "4", "5+"];
const HANDOVER_YEAR_OPTIONS = [
  "any", "2024", "2025", "2026", "2027", "2028", "2029", "2030", "2031", "2032", "2033", "2034", "2035"
];

function Rent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [property, setProperty] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [showFilters, setShowFilters] = React.useState(false);
  const [developers, setDevelopers] = React.useState([]);
  const [developerSearch, setDeveloperSearch] = React.useState("");
  const [searchingDevelopers, setSearchingDevelopers] = React.useState(false);
  
  // Filter states
  const [filters, setFilters] = React.useState({
    listing_type: "RENT",
    title: "",
    property_type: "any",
    min_price: "any",
    max_price: "any",
    completion_status: "all",
    developer_id: "any",
    bedrooms: "any",
    bathrooms: "any",
    handover_year: "any",
    ref_number: ""
  });

  const fetchproperty = useCallback(async () => {
    setLoading(true);
    
    const queryParams = new URLSearchParams({
      sort_by: "total_count",
      sort_order: "desc",
      page: "1",
      size: "24",
      status:"ACTIVE"
    });
    
    // Add filter parameters
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== "any" && value !== "all") {
        queryParams.append(key, value);
      }
    });
    
    try {
      const res = await getAllBuyProperties(queryParams.toString());
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
        const response = await api.get(`/properties/get_developers?name=${searchTerm}`);
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

  const handleFilterChange = useCallback((key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    
    // Navigate when listing_type changes
    if (key === "listing_type") {
      if (value === "SELL") {
        router.push("/buy");
      } else if (value === "RENT") {
        router.push("/rent");
      }
    }
  }, [router]);

  const handleSearch = useCallback(() => {
    fetchproperty();
    if (showFilters) setShowFilters(false);
  }, [fetchproperty, showFilters]);

  const handleDeveloperSelect = useCallback((developer: any) => {
    handleFilterChange("developer_id", developer.id);
    setDeveloperSearch(developer.name);
    setDevelopers([]);
  }, [handleFilterChange]);

  const toggleFilters = useCallback(() => {
    setShowFilters(prev => !prev);
  }, []);

  // Initial API call and when filters change
  React.useEffect(() => {
    console.log("Rent page - Initial load or filters changed, calling API with:", filters);
    fetchproperty();
  }, [filters, fetchproperty]);

  // Initial API call on page load
  React.useEffect(() => {
    console.log("Rent page - Page loaded, making initial API call");
    fetchproperty();
  }, []);

  // Handle query parameters from hero section
  React.useEffect(() => {
    const propertyType = searchParams.get("property_type");
    const location = searchParams.get("title");
    const bedrooms = searchParams.get("bedrooms");
    const refNumber = searchParams.get("ref_number");
    const minPrice = searchParams.get("min_price");
    const maxPrice = searchParams.get("max_price");
    
    console.log("Rent page - Query parameters received:", {
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
        title: location || "",
        bedrooms: bedrooms || "any",
        ref_number: refNumber || "",
        min_price: minPrice || "any",
        max_price: maxPrice || "any",
      };
      
      console.log("Rent page - Setting new filters:", newFilters);
      console.log("Rent page - Current filters before update:", filters);
      
      setFilters(prev => {
        const updatedFilters = {
          ...prev,
          ...newFilters
        };
        console.log("Rent page - Updated filters:", updatedFilters);
        return updatedFilters;
      });
    }
  }, [searchParams]);

  React.useEffect(() => {
    searchDevelopers(developerSearch);
  }, [developerSearch, searchDevelopers]);

  // Close developer dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.developer-search')) {
        setDevelopers([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleFavorite = useCallback((item: any) => {
    console.log("Added to favorites:", item);
    // Add your favorite logic here
  }, []);

  // Memoized components
  const FilterButton = useMemo(() => (
    <div className="block md:hidden py-20">
      <div className="flex items-center gap-3 p-4 backdrop-blur-md">
        <div className="flex-1">
          <Input
            placeholder="Location or Project"
            value={filters.title}
            onChange={(e) => handleFilterChange("title", e.target.value)}
            className="w-full text-black bg-white border border-gray-300 placeholder:text-gray-500 h-12"
          />
        </div>
        <Button
          onClick={toggleFilters}
          size="lg"
          variant="outline"
          className="h-12 w-12 bg-white hover:bg-gray-50 border border-gray-300 flex items-center justify-center"
        >
          <Icon icon="lucide:sliders-horizontal" className="text-gray-600 text-xl" />
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
  ), [filters.title, handleFilterChange, toggleFilters, handleSearch]);

  const PropertyTypeSelect = useMemo(() => (
    <Select value={filters.property_type} onValueChange={(value) => handleFilterChange("property_type", value)}>
      <SelectTrigger className="w-full sm:w-40 bg-white border-0 rounded-md h-12 text-gray-900 focus:ring-0 focus:ring-offset-0 px-4">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-white">
        <SelectItem value="any">Property Type</SelectItem>
        {PROPERTY_TYPES.map(type => (
          <SelectItem key={type} value={type}>{type}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  ), [filters.property_type, handleFilterChange]);

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
          <SelectItem value="any">Min Price</SelectItem>
          {RENT_PRICE_OPTIONS.map(price => (
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
          <SelectItem value="any">Max Price</SelectItem>
          {RENT_PRICE_OPTIONS.map(price => (
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
        <div className="container mx-auto " >
          {FilterButton}

          {/* Desktop Search Form */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-8 gap-4 p-6 backdrop-blur-md">
            {/* Listing Type Filter */}
            <div>
              <Select value={filters.listing_type} onValueChange={(value) => handleFilterChange("listing_type", value)}>
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
                value={filters.title}
                onChange={(e) => handleFilterChange("title", e.target.value)}
                className="w-full text-black bg-white border border-gray-300 placeholder:text-gray-500 h-14"
              />
            </div>

            {/* Property Type */}
            <div>
              <Select value={filters.property_type} onValueChange={(value) => handleFilterChange("property_type", value)}>
                <SelectTrigger className="w-full bg-white border border-gray-300 text-black h-14">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="any">Property Type</SelectItem>
                  {PROPERTY_TYPES.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Min Price */}
            <div>
              <Select value={filters.min_price} onValueChange={(value) => handleFilterChange("min_price", value)}>
                <SelectTrigger className="w-full bg-white border border-gray-300 text-black h-14">
                  <SelectValue placeholder="Min Price" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="any">Min Price</SelectItem>
                  {RENT_PRICE_OPTIONS.map(price => (
                    <SelectItem key={price} value={price}>
                      AED {parseInt(price).toLocaleString()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Max Price */}
            <div>
              <Select value={filters.max_price} onValueChange={(value) => handleFilterChange("max_price", value)}>
                <SelectTrigger className="w-full bg-white border border-gray-300 text-black h-14">
                  <SelectValue placeholder="Max Price" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="any">Max Price</SelectItem>
                  {RENT_PRICE_OPTIONS.map(price => (
                    <SelectItem key={price} value={price}>
                      AED {parseInt(price).toLocaleString()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Beds */}
            <div>
              <Select value={filters.bedrooms} onValueChange={(value) => handleFilterChange("bedrooms", value)}>
                <SelectTrigger className="w-full bg-white border border-gray-300 text-black h-14">
                  <SelectValue placeholder="Beds" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Beds</SelectItem>
                  {BEDROOM_OPTIONS.slice(1).map(bed => (
                    <SelectItem key={bed} value={bed}>{bed === "5+" ? "5+ Beds" : `${bed} Bed`}</SelectItem>
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
                <Icon icon="iconamoon:search-fill" className="text-white text-xl" />
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
              <label className="text-sm font-medium text-gray-700">Location</label>
              <div className="relative">
                <Input
                  placeholder="City, building or community"
                  value={filters.title}
                  onChange={(e) => handleFilterChange("title", e.target.value)}
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
              <Select value={filters.listing_type} onValueChange={(value) => handleFilterChange("listing_type", value)}>
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
              <label className="text-sm font-medium text-gray-700">Property Type</label>
              <Select value={filters.property_type} onValueChange={(value) => handleFilterChange("property_type", value)}>
                <SelectTrigger className="w-full bg-white border border-gray-300 rounded-md h-14 text-gray-900 focus:ring-2 focus:ring-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white max-h-60">
                  <SelectItem value="any">Any Property Type</SelectItem>
                  {PROPERTY_TYPES.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Completion Status */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Completion Status</label>
              <Select value={filters.completion_status} onValueChange={(value) => handleFilterChange("completion_status", value)}>
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
              <label className="text-sm font-medium text-gray-700">Developer</label>
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
                      <div className="text-sm font-medium text-gray-900">{developer.name}</div>
                      {developer.location && (
                        <div className="text-xs text-gray-500">{developer.location}</div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Price Range - Hidden on large screens since it's shown in desktop form */}
            <div className="grid grid-cols-2 gap-4 md:hidden">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Min Price</label>
                <Select value={filters.min_price} onValueChange={(value) => handleFilterChange("min_price", value)}>
                  <SelectTrigger className="w-full bg-white border border-gray-300 rounded-md h-14 text-gray-900 focus:ring-2 focus:ring-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white max-h-60">
                    <SelectItem value="any">Any</SelectItem>
                    {RENT_PRICE_OPTIONS.map(price => (
                      <SelectItem key={price} value={price}>
                        {parseInt(price).toLocaleString()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Max Price</label>
                <Select value={filters.max_price} onValueChange={(value) => handleFilterChange("max_price", value)}>
                  <SelectTrigger className="w-full bg-white border border-gray-300 rounded-md h-14 text-gray-900 focus:ring-2 focus:ring-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white max-h-60">
                    <SelectItem value="any">Any</SelectItem>
                    {RENT_PRICE_OPTIONS.map(price => (
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
              <label className="text-sm font-medium text-gray-700">Bedrooms</label>
              <Select value={filters.bedrooms} onValueChange={(value) => handleFilterChange("bedrooms", value)}>
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
              <label className="text-sm font-medium text-gray-700">Bathrooms</label>
              <Select value={filters.bathrooms} onValueChange={(value) => handleFilterChange("bathrooms", value)}>
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
              <label className="text-sm font-medium text-gray-700">Handover Year</label>
              <Select value={filters.handover_year} onValueChange={(value) => handleFilterChange("handover_year", value)}>
                <SelectTrigger className="w-full bg-white border border-gray-300 rounded-md h-14 text-gray-900 focus:ring-2 focus:ring-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="any">Any Year</SelectItem>
                  {HANDOVER_YEAR_OPTIONS.slice(1).map((year) => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
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
          Dubai&apos;s most exquisite rental properties
        </h1>
        <p className="text-center text-gray-600 mt-4">
          Find your perfect rental home in Dubai&apos;s most prestigious locations
          with world-class amenities and unmatched lifestyle.
        </p>
      </div>
      <p className="text-center mb-11">
      <Link href={"/whyDubai#rent-investment"}>
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

      {loading ? (
        <div className="text-center py-12">
          <Loader className="w-12 h-12 animate-spin text-primary mx-auto" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 container my-4 mx-auto">
          {property?.map((item: any, index: number) => (
            <RentCard
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

export default Rent;