"use client";
import { getAllCommunities } from "@/src/api/communities";
import CommunitiesCard from "@/src/view/communities/communitiesCard";
import { Loader } from "lucide-react";
import React, { useEffect, useState, useRef, useCallback } from "react";

const PAGE_SIZE = 100;

function Communities() {
  const [communities, setCommunities] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredCommunities, setFilteredCommunities] = useState<any[]>([]);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastCommunityRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    const fetchCommunities = async () => {
      setLoading(true);
      try {
        const res = await getAllCommunities(page, PAGE_SIZE);
        if (res?.communities?.length) {
          setCommunities((prev) => {
            const newCommunities = [...prev, ...res.communities];
            setHasMore(newCommunities.length < res.total);
            return newCommunities;
          });
          setTotal(res.total);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCommunities();
  }, [page]);

  // Filter communities based on search keyword
  useEffect(() => {
    if (searchKeyword.trim() === "") {
      setFilteredCommunities(communities);
    } else {
      const filtered = communities.filter((community) =>
        community.name?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        community.location?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        community.description?.toLowerCase().includes(searchKeyword.toLowerCase())
      );
      setFilteredCommunities(filtered);
    }
  }, [communities, searchKeyword]);

  return (
    <div>
      <section className="pt-32 pb-12 px-4 bg-[#141442]">
        <div className=" mx-auto text-center">
          <h1 className="text-5xl font-medium mb-6 text-white font-mono">
            Communities
          </h1>
        </div>
      </section>
      <div className=" mx-auto px-4 py-12 max-w-5xl">
        <h1 className="text-center  text-4xl font-mono">
          {" "}
          Unveiling Dubai&rsquo;s Vibrant Communities
        </h1>
        <p className="text-center text-gray-600 mt-4 text-[15px]">
          Dubai is a city of diverse neighborhoods, each offering a unique
          character &amp; lifestyle. Beyond the stunning architecture, your
          bespoke community awaits. Explore the soul of Dubai&rsquo;s
          communities, ensuring your new property seamlessly integrates with
          your personal demographics &amp; desired lifestyle.
        </p>
        
        {/* Search Input */}
        <div className="flex justify-center mt-8">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search communities by name, location, or description..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-full px-4 py-3 pl-12 text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-gray-500"
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        
        {/* Search Results Counter */}
        {searchKeyword && (
          <div className="text-center mt-4">
            <p className="text-gray-600">
              Found {filteredCommunities.length} community{filteredCommunities.length !== 1 ? 'ies' : 'y'} matching "{searchKeyword}"
            </p>
          </div>
        )}
      </div>
      
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6 px-4 container mx-auto py-6">
          {filteredCommunities.map((community, i) => {
            if (i === filteredCommunities.length - 1) {
              return (
                <div ref={lastCommunityRef} key={i}>
                  <CommunitiesCard data={community} />
                </div>
              );
            }
            return <CommunitiesCard key={i} data={community} />;
          })}
        </div>
        {loading && (
          <div className="flex justify-center items-center py-4 text-primary"><Loader className="animate-spin w-8 h-8"/></div>
        )}
        {!hasMore && communities.length > 0 && (
          <div className="text-center py-4 text-gray-400">No more communities.</div>
        )}
        {searchKeyword && filteredCommunities.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p className="text-lg">No communities found matching "{searchKeyword}"</p>
            <p className="text-sm mt-2">Try adjusting your search terms</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Communities;
