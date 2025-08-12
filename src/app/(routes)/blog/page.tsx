import React from "react";

function Blog() {
  return (
    <div>
      <section className="pt-32 pb-12 px-4 bg-[#141442]">
        <div className=" mx-auto text-center">
          <h1 className="text-5xl font-medium mb-6 text-white font-mono">
            Blog
          </h1>
        </div>
      </section>
      <div className=" mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-center  text-4xl font-mono">
          {" "}
          Living the Dubai Dream: Where Inspiration Meets Information
        </h1>
        <p className="text-center text-gray-600 mt-4">
         Dive into our curated collection of articles, designed to enlighten, inspire, and guide you through Dubai&rsquo;s dynamic real estate market.
        </p>
      </div>
    </div>
  );
}

export default Blog;
