"use client"
import { getAllProperties } from "@/src/api/offPlans"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { cn } from "@/src/lib/utils"
import OffPlanCard from "@/src/view/offPlans/offPlanCard"
import { Icon } from "@iconify/react/dist/iconify.js"
import { Loader } from "lucide-react"
import { useEffect, useState } from "react"

function page() {
  const [property, setProperty] = useState([])
  const [loading, setLoading] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const fetchproperty = async () => {
    setLoading(true)
    const query = "sort_by=total_count&sort_order=desc&page=1&size=24"
    try {
      const res = await getAllProperties(query)
      setProperty(res?.projects)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchproperty()
  }, [])

  const priceOptions = [
    { value: "250000", label: "250,000" },
    { value: "500000", label: "500,000" },
    { value: "750000", label: "750,000" },
    { value: "1000000", label: "1,000,000" },
    { value: "1500000", label: "1,500,000" },
    { value: "2000000", label: "2,000,000" },
    { value: "2500000", label: "2,500,000" },
    { value: "3000000", label: "3,000,000" },
    { value: "4000000", label: "4,000,000" },
    { value: "5000000", label: "5,000,000" },
    { value: "7500000", label: "7,500,000" },
    { value: "10000000", label: "10,000,000" },
    { value: "15000000", label: "15,000,000" },
    { value: "20000000", label: "20,000,000" },
    { value: "30000000", label: "30,000,000" },
    { value: "40000000", label: "40,000,000" },
    { value: "50000000", label: "50,000,000" },
    { value: "60000000", label: "60,000,000" },
    { value: "70000000", label: "70,000,000" },
    { value: "80000000", label: "80,000,000" },
    { value: "90000000", label: "90,000,000" },
    { value: "100000000", label: "100,000,000" },
  ]

  const developers = [
    { value: "emaar", label: "Emaar" },
    { value: "damac", label: "Damac" },
    { value: "nakheel", label: "Nakheel" },
    { value: "sobha", label: "Sobha" },
    { value: "meraas", label: "Meraas" },
    { value: "selectgroup", label: "Select Group" },
  ]

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen)
  }

  const closeFilter = () => {
    setIsFilterOpen(false)
  }

  return (
    <div>
      <section className="pt-32 pb-16 px-6 bg-[#141442]">
        <div className="container mx-auto">
          <div className="block md:hidden">
            <div className="flex items-center gap-3 p-4 backdrop-blur-md">
              <div className="flex-1">
                <Input
                  placeholder="Location or Project"
                  className="w-full text-black bg-white border border-gray-300 placeholder:text-gray-500 h-12"
                />
              </div>
              <Button
                onClick={toggleFilter}
                size="lg"
                variant="outline"
                className="h-12 w-12 bg-white hover:bg-gray-50 border border-gray-300 flex items-center justify-center"
              >
                <Icon icon="lucide:sliders-horizontal" className="text-gray-600 text-xl" />
              </Button>
              <Button
                size="lg"
                className="h-12 w-12 bg-primary hover:bg-primary/90 flex items-center justify-center shadow-lg"
              >
                <Icon icon="iconamoon:search-fill" className="text-white text-xl" />
              </Button>
            </div>
          </div>

          <div className="hidden md:grid grid-cols-1 md:grid-cols-8 gap-4 p-6 backdrop-blur-md">
            {/* Location */}
            <Input
              placeholder="Location of Project"
              className="w-full text-black bg-white border border-gray-300 placeholder:text-gray-500 col-span-2"
            />

            {/* Property Type */}
            <Select>
              <SelectTrigger className="w-full bg-white border border-gray-300 text-black">
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="penthouse">Penthouse</SelectItem>
                <SelectItem value="townhouse">Townhouse</SelectItem>
                <SelectItem value="studio">Studio</SelectItem>
                <SelectItem value="Plot">Plot</SelectItem>
                <SelectItem value="Office">Office</SelectItem>
              </SelectContent>
            </Select>

            {/* Min Price */}
            <Select>
              <SelectTrigger className="w-full bg-white border border-gray-300 text-black">
                <SelectValue placeholder="Min Price" />
              </SelectTrigger>
              <SelectContent>
                {priceOptions.map((p) => (
                  <SelectItem key={p.value} value={p.value}>
                    AED {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Max Price */}
            <Select>
              <SelectTrigger className="w-full bg-white border border-gray-300 text-black">
                <SelectValue placeholder="Max Price" />
              </SelectTrigger>
              <SelectContent>
                {priceOptions.map((p) => (
                  <SelectItem key={p.value} value={p.value}>
                    AED {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Beds */}
            <Select>
              <SelectTrigger className="w-full bg-white border border-gray-300 text-black">
                <SelectValue placeholder="Beds" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="studio">Studio</SelectItem>
                <SelectItem value="1">1 Bed</SelectItem>
                <SelectItem value="2">2 Beds</SelectItem>
                <SelectItem value="3">3 Beds</SelectItem>
                <SelectItem value="4">4 Beds</SelectItem>
                <SelectItem value="5+">5+ Beds</SelectItem>
              </SelectContent>
            </Select>

            {/* Developers */}
            <Select>
              <SelectTrigger className="w-full bg-white border border-gray-300 text-black">
                <SelectValue placeholder="All Developers" />
              </SelectTrigger>
              <SelectContent>
                {developers.map((d) => (
                  <SelectItem key={d.value} value={d.value}>
                    {d.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Search Button */}
            <div className="flex justify-start">
              <Button
                size="lg"
                className="h-14 w-14 bg-primary hover:bg-primary/90 flex items-center justify-center shadow-lg"
              >
                <Icon icon="iconamoon:search-fill" className="text-white text-2xl" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {isFilterOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
            style={{
              animation: "fadeIn 0.3s ease-out",
            }}
            onClick={closeFilter}
          />

          <div
            className="fixed bottom-0 left-0 right-0 bg-white z-50 md:hidden shadow-2xl"
            style={{
              animation: "slideUp 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              maxHeight: "85vh",
              overflowY: "auto",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900">Filters</h3>
              <Button onClick={closeFilter} variant="ghost" size="sm" className="h-8 w-8 hover:bg-gray-100">
                <Icon icon="lucide:x" className="text-gray-500 text-lg" />
              </Button>
            </div>

            {/* Filter Content */}
            <div className="p-6 space-y-6">
              {/* Property Type */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Property Type</label>
                <Select>
                  <SelectTrigger className="w-full bg-gray-50 border border-gray-200 text-black h-12">
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="penthouse">Penthouse</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="studio">Studio</SelectItem>
                    <SelectItem value="Plot">Plot</SelectItem>
                    <SelectItem value="Office">Office</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Min Price</label>
                  <Select>
                    <SelectTrigger className="w-full bg-gray-50 border border-gray-200 text-black h-12">
                      <SelectValue placeholder="Min" />
                    </SelectTrigger>
                    <SelectContent>
                      {priceOptions.map((p) => (
                        <SelectItem key={p.value} value={p.value}>
                          AED {p.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Max Price</label>
                  <Select>
                    <SelectTrigger className="w-full bg-gray-50 border border-gray-200 text-black h-12">
                      <SelectValue placeholder="Max" />
                    </SelectTrigger>
                    <SelectContent>
                      {priceOptions.map((p) => (
                        <SelectItem key={p.value} value={p.value}>
                          AED {p.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Beds */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Bedrooms</label>
                <Select>
                  <SelectTrigger className="w-full bg-gray-50 border border-gray-200 text-black h-12">
                    <SelectValue placeholder="Select bedrooms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="studio">Studio</SelectItem>
                    <SelectItem value="1">1 Bed</SelectItem>
                    <SelectItem value="2">2 Beds</SelectItem>
                    <SelectItem value="3">3 Beds</SelectItem>
                    <SelectItem value="4">4 Beds</SelectItem>
                    <SelectItem value="5+">5+ Beds</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Developers */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Developer</label>
                <Select>
                  <SelectTrigger className="w-full bg-gray-50 border border-gray-200 text-black h-12">
                    <SelectValue placeholder="Select developer" />
                  </SelectTrigger>
                  <SelectContent>
                    {developers.map((d) => (
                      <SelectItem key={d.value} value={d.value}>
                        {d.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50">
              <div className="flex gap-3">
                <Button
                  onClick={closeFilter}
                  variant="outline"
                  className="flex-1 h-12 border-gray-300 text-gray-700 hover:bg-gray-100 bg-transparent"
                >
                  Clear All
                </Button>
                <Button onClick={closeFilter} className="flex-1 h-12 bg-primary hover:bg-primary/90 text-white">
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>

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
  )
}

export default page
