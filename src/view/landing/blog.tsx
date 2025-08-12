"use client"
import { BlogCard } from "@/src/components/common/card"
import { Button } from "@/src/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"

const blogPosts = [
  {
    imageSrc: "/images/blog1.webp",
    date: "Jul 16, 2025",
    title: "Why Your Home Should Feel as Good as It Looks: The Psychology of Luxury Living",
    description: "Have you ever stepped into a space that looked stunning... yet somehow felt wrong?...",
    href: "/blog/details/why-your-home-should-feel-as-good-as-it-looks",
  },
  {
    imageSrc: "/images/blog2.webp",
    date: "Dec 24, 2024",
    title: "Why Buying Property in Dubai is Better than Renting",
    description: "Dubai's real estate market continues to be one of the most dynamic and sought-after...",
    href: "/blog/details/why-your-home-should-feel-as-good-as-it-looks",
  },
  {
    imageSrc: "/images/building.jpg",
    date: "Jan 8, 2024",
    title: "Why Invest in Dubai's Real Estate? A Look into the Future",
    description: "Introduction in the heart of the Middle East, Dubai shines as a beacon of progress...",
    href: "/blog/details/why-your-home-should-feel-as-good-as-it-looks",
  },
]

export function InsightsInspiration() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="mx-auto px-6 md:px-10 lg:px-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-lg text-[#dbbb90] uppercase font-extralight tracking-wider mb-2">INSIGHTS & INSPIRATION</p>
          <h2 className="text-3xl font-extralight text-gray-800 mb-4 tracking-wide">
            Unveiling Dubai&apos;s Luxurious Real Estate Landscape
          </h2>
          <p className="text-sm font-extralight text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Dive into our curated collection of articles, designed to enlighten, inspire, and guide you through Dubai&apos;s dynamic real estate market.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <BlogCard {...post} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
       <Link href={"/blog"} passHref>
        <Button className="w-48 h-11 bg-[#dbbb90] hover:bg-[#C2A17B] text-white font-extralight tracking-wider py-2 px-4 rounded-none transition-colors uppercase">
       VIEW ALL BLOGS
          </Button>
       </Link>
        </motion.div>
      </div>
    </section>
  )
}
