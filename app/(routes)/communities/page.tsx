"use client";
import { getAllCommunities } from "@/api/communities";
import CommunitiesCard from "@/src/view/communities/communitiesCard";
import React, { useEffect, useState, useRef, useCallback } from "react";

const PAGE_SIZE = 10;

function Communities() {
  const [communities, setCommunities] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
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
      const query = `sort_by=total_count&sort_order=desc&page=${page}&size=${PAGE_SIZE}`;
      try {
        const res = await getAllCommunities(query);
        if (res?.communities?.length) {
          setCommunities((prev) => [...prev, ...res.communities]);
          setHasMore(res.communities.length === PAGE_SIZE);
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
        <p className="text-center text-gray-600 mt-4">
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
          <div className="text-center py-4 text-gray-500">Loading...</div>
        )}
        {!hasMore && (
          <div className="text-center py-4 text-gray-400">No more communities.</div>
        )}
      </div>
    </div>
  );
}

export default Communities;
