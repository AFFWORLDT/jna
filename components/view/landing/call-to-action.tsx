"use client"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function CallToAction() {
  return (
    <section className="relative py-16 md:py-24   overflow-hidden bg-[#F8F5EF]">
      <div 
        className="absolute inset-0 bg-center bg-cover opacity-20"
        
      />
      <div className="relative z-10 container mx-auto px-6 md:px-10 lg:px-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm uppercase text-white/70 font-semibold mb-2">JOIN THE ELITE</p>
          <h2 className="text-3xl  font-medium mb-4">
            Elevate Your Real Estate Journey
          </h2>
          <p className="text-base md:text-lg  max-w-4xl mx-auto mb-12">
            Ready to embark on a luxurious real estate experience tailored just for you? Take the first step towards unparalleled living.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
       <Button className="w-48 h-11 bg-[#dbbb90] hover:bg-[#C2A17B] text-white font-semibold py-2 px-4 rounded-none transition-colors uppercase">
       CONTACT US
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
