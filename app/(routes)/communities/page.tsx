"use client";
import { getAllCommunities } from "@/api/communities";
import CommunitiesCard from "@/src/view/communities/communitiesCard";
import { set } from "date-fns";
import React, { useEffect, useState } from "react";

function Communities() {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchCommunities = async () => {
    setLoading(true);
    const query = "sort_by=total_count&sort_order=desc&page=1&size=24";
    try {
      const res = await getAllCommunities(query);
      setCommunities(res?.communities);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCommunities();
  }, []);
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
          {communities.map((community, i) => (
            <CommunitiesCard key={i} data={community} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Communities;
