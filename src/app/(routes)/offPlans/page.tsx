"use client";
import { getAllProperties } from "@/src/api/offPlans";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { cn } from "@/src/lib/utils";
import OffPlanCard from "@/src/view/offPlans/offPlanCard";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Loader, X, Search } from "lucide-react";
import { useEffect, useState, useCallback, useMemo } from "react";
import { api } from "@/src/lib/axios";

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

const PRICE_OPTIONS = [
  "250000", "500000", "750000", "1000000", "1500000", "2000000", "2500000", "3000000",
  "4000000", "5000000", "7500000", "10000000", "15000000", "20000000", "30000000",
  "40000000", "50000000", "60000000", "70000000", "80000000", "90000000", "100000000"
];

const BEDROOM_OPTIONS = ["any", "1", "2", "3", "4", "5+"];

function OffPlansPage() {
  const [property, setProperty] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [developers, setDevelopers] = useState([]);
  const [developerSearch, setDeveloperSearch] = useState("");
  const [searchingDevelopers, setSearchingDevelopers] = useState(false);
  
  // Filter states
  const [filters, setFilters] = useState({
    title: "",
    property_type: "any",
    min_price: "any",
    max_price: "any",
    completion_status: "all",
    developer_id: "any",
    bedrooms: "any"
  });

  const fetchproperty = useCallback(async () => {
    setLoading(true);
    
    const queryParams = new URLSearchParams({
      sort_by: "total_count",
      sort_order: "desc",
      page: "1",
      size: "24"
    });
    
    // Add filter parameters
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== "any" && value !== "all") {
        queryParams.append(key, value);
      }
    });
    
    try {
      const res = await getAllProperties(queryParams.toString());
      setProperty(res?.projects || []);
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
  }, []);

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

  useEffect(() => {
    fetchproperty();
  }, [filters]);

  useEffect(() => {
    searchDevelopers(developerSearch);
  }, [developerSearch, searchDevelopers]);

  // Close developer dropdown when clicking outside
  useEffect(() => {
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

  // Memoized components
  const FilterButton = useMemo(() => (
    <div className="block md:hidden">
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
      <SelectTrigger className="w-full bg-white border border-gray-300 text-black">
        <SelectValue placeholder="Property Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="any">Any</SelectItem>
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
        <SelectTrigger className="w-full bg-white border border-gray-300 text-black">
          <SelectValue placeholder="Min Price" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="any">Any</SelectItem>
          {PRICE_OPTIONS.map(price => (
            <SelectItem key={price} value={price}>
              AED {parseInt(price).toLocaleString()}
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
        <SelectTrigger className="w-full bg-white border border-gray-300 text-black">
          <SelectValue placeholder="Max Price" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="any">Any</SelectItem>
          {PRICE_OPTIONS.map(price => (
            <SelectItem key={price} value={price}>
              AED {parseInt(price).toLocaleString()}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );

    return { MinPriceSelect, MaxPriceSelect };
  }, [filters.min_price, filters.max_price, handleFilterChange]);

  return (
    <div>
      <section className="pt-32 pb-16 px-6 bg-[#141442]">
        <div className="container mx-auto">
          {FilterButton}

          {/* Desktop Search Form */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-8 gap-4 p-6 backdrop-blur-md">
            {/* Location */}
            <div className="col-span-2">
              <Input
                placeholder="Location of Project"
                value={filters.title}
                onChange={(e) => handleFilterChange("title", e.target.value)}
                className="w-full text-black bg-white border border-gray-300 placeholder:text-gray-500"
              />
            </div>

            {/* Property Type */}
            <div>
              {PropertyTypeSelect}
            </div>

            {/* Min Price */}
            <div>
              <PriceSelect.MinPriceSelect />
            </div>

            {/* Max Price */}
            <div>
              <PriceSelect.MaxPriceSelect />
            </div>

            {/* Beds */}
            <div>
              <Select value={filters.bedrooms} onValueChange={(value) => handleFilterChange("bedrooms", value)}>
                <SelectTrigger className="w-full bg-white border border-gray-300 text-black">
                  <SelectValue placeholder="Beds" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  {BEDROOM_OPTIONS.slice(1).map(bed => (
                    <SelectItem key={bed} value={bed}>{bed === "5+" ? "5+ Beds" : `${bed} Bed`}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Developer Search */}
            <div className="developer-search">
              <div className="relative">
                <Input
                  placeholder="Search developers..."
                  value={developerSearch}
                  onChange={(e) => setDeveloperSearch(e.target.value)}
                  className="w-full bg-white border border-gray-300 text-black placeholder:text-gray-500 pr-8"
                />
                {searchingDevelopers && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Loader className="w-4 h-4 animate-spin text-gray-400" />
                  </div>
                )}
              </div>
              {developers.length > 0 && (
                <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-40 overflow-y-auto border border-gray-200 rounded-md bg-white shadow-lg">
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

            {/* Search Button */}
            <div className="flex justify-start">
              <Button
                onClick={handleSearch}
                size="lg"
                className="h-14 w-14 bg-primary hover:bg-primary/90 flex items-center justify-center shadow-lg"
              >
                <Icon icon="iconamoon:search-fill" className="text-white text-2xl" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Filter Modal */}
      <Dialog open={showFilters} onOpenChange={setShowFilters}>
        <DialogContent className="sm:max-w-[95vw] max-h-[90vh] overflow-y-auto">
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
            {/* Search Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Location</label>
              <div className="relative">
                <Input
                  placeholder="Location of Project"
                  value={filters.title}
                  onChange={(e) => handleFilterChange("title", e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-md h-12 text-gray-900 placeholder:text-gray-600 focus-visible:ring-2 focus-visible:ring-primary"
                />
                <Icon 
                  icon="heroicons:magnifying-glass" 
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                />
              </div>
            </div>

            {/* Property Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Property Type</label>
              <Select value={filters.property_type} onValueChange={(value) => handleFilterChange("property_type", value)}>
                <SelectTrigger className="w-full bg-white border border-gray-300 rounded-md h-12 text-gray-900 focus:ring-2 focus:ring-primary">
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
                <SelectTrigger className="w-full bg-white border border-gray-300 rounded-md h-12 text-gray-900 focus:ring-2 focus:ring-primary">
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
                  className="w-full bg-white border border-gray-300 rounded-md h-12 text-gray-900 placeholder:text-gray-600 focus-visible:ring-2 focus-visible:ring-primary pr-10"
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

            {/* Price Range */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Min Price</label>
                <Select value={filters.min_price} onValueChange={(value) => handleFilterChange("min_price", value)}>
                  <SelectTrigger className="w-full bg-white border border-gray-300 rounded-md h-12 text-gray-900 focus:ring-2 focus:ring-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white max-h-60">
                    <SelectItem value="any">Any</SelectItem>
                    {PRICE_OPTIONS.map(price => (
                      <SelectItem key={price} value={price}>
                        AED {parseInt(price).toLocaleString()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Max Price</label>
                <Select value={filters.max_price} onValueChange={(value) => handleFilterChange("max_price", value)}>
                  <SelectTrigger className="w-full bg-white border border-gray-300 rounded-md h-12 text-gray-900 focus:ring-2 focus:ring-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white max-h-60">
                    <SelectItem value="any">Any</SelectItem>
                    {PRICE_OPTIONS.map(price => (
                      <SelectItem key={price} value={price}>
                        AED {parseInt(price).toLocaleString()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Bedrooms - Pretty Design */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">Bedrooms</label>
              <div className="grid grid-cols-3 gap-2">
                {BEDROOM_OPTIONS.map((bed) => (
                  <button
                    key={bed}
                    onClick={() => handleFilterChange("bedrooms", bed)}
                    className={cn(
                      "py-3 px-4 rounded-lg border-2 transition-all duration-200 font-medium text-sm",
                      filters.bedrooms === bed
                        ? "border-primary bg-primary text-white shadow-md"
                        : "border-gray-200 bg-white text-gray-700 hover:border-primary hover:bg-primary/5"
                    )}
                  >
                    {bed === "any" ? "Any" : bed === "5+" ? "5+ Beds" : `${bed} Bed`}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Button */}
            <Button 
              onClick={handleSearch}
              className="w-full bg-primary hover:bg-primary/90 text-white font-medium h-12 rounded-md"
            >
              <Search className="w-5 h-5 mr-2" />
              Search Properties
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="mx-auto px-4 py-12 max-w-5xl">
        <h1 className="text-center text-4xl font-mono">The Art of Selection</h1>
        <p className="text-center text-gray-600 mt-4">Curated off-plan investments for discerning investors.</p>
        <p className="text-center my-6">
          <span
            className={cn(
              "relative pb-1 transition-all duration-300 text-primary uppercase",
              "after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-0",
              "after:-translate-x-1/2 after:bg-primary after:transition-all after:duration-300 hover:after:w-full",
            )}
          >
            Learn More
          </span>
        </p>
      </div>
      
      <div>
        {loading && (
          <div className="flex justify-center items-center h-64">
            <Loader className="animate-spin h-10 w-10 text-primary" />
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 container mx-auto py-6">
          {property?.map((property, i) => (
            <OffPlanCard data={property} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default OffPlansPage;
