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
      </div>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6 px-4 container mx-auto py-6">
          {communities.map((community, i) => {
            if (i === communities.length - 1) {
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
      </div>
    </div>
  );
}

export default Communities;
