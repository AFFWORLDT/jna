"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Heart, MessageCircle, Phone, Menu, X, Facebook, Instagram, Linkedin } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOverlayOpen, setIsOverlayOpen] = useState(false) // State to control overlay visibility

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Disable body scroll when overlay is open
  useEffect(() => {
    if (isOverlayOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = ''; // Clean up on unmount
    };
  }, [isOverlayOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled ? "bg-[#141442]" : "bg-transparent"
      }`}
    >
      <nav className={`container mx-auto flex items-center justify-between px-4 md:px-6 transition-all duration-300 ${
        isScrolled ? "h-20" : "h-28"
      }`}>
        <div className="flex items-center">
          <Image 
           src={"/images/logo-gold.svg"}
           alt="logo"
           width={80}
           height={80}
          />
        </div>
        {/* Desktop Navigation Links - still hidden on small screens */}
        <div className="hidden md:flex items-center space-x-10 text-white text-sm font-light uppercase tracking-wider">
          <a href="#" className="hover:text-gray-300 transition-colors duration-300 hover:opacity-80">
            BUY
          </a>
          <a href="#" className="hover:text-gray-300 transition-colors duration-300 hover:opacity-80">
            OFF-PLAN
          </a>
          <a href="#" className="hover:text-gray-300 transition-colors duration-300 hover:opacity-80">
            COMMUNITIES
          </a>
          <a href="#" className="hover:text-gray-300 transition-colors duration-300 hover:opacity-80">
            WHY DUBAI
          </a>
          <a href="#" className="hover:text-gray-300 transition-colors duration-300 hover:opacity-80">
            CONTACT US
          </a>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
            <Heart className="h-5 w-5" />
            <span className="sr-only">Favorites</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
            <MessageCircle className="h-5 w-5" />
            <span className="sr-only">WhatsApp</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
            <Phone className="h-5 w-5" />
            <span className="sr-only">Call Us</span>
          </Button>
          {/* Hamburger button to open overlay */}
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={() => setIsOverlayOpen(true)}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </div>
      </nav>

      {/* Full-screen Overlay */}
      <div
        className={`fixed top-0 bottom-0 right-0 w-full md:w-1/4 bg-[#F5F2ED] text-gray-900 z-[100] transform transition-transform duration-300 ease-in-out ${
          isOverlayOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-[#1A2B40] hover:bg-gray-200"
          onClick={() => setIsOverlayOpen(false)}
        >
          <X className="h-6 w-6" />
          <span className="sr-only">Close menu</span>
        </Button>

        <nav className="flex flex-col pt-16 p-8 space-y-4 text-lg uppercase font-light tracking-wider flex-grow">
          <a href="#" className="block py-2 hover:text-gray-600 transition-colors duration-200" onClick={() => setIsOverlayOpen(false)}>
            BUY
          </a>
          <a href="#" className="block py-2 hover:text-gray-600 transition-colors duration-200" onClick={() => setIsOverlayOpen(false)}>
            OFF-PLAN
          </a>
          <a href="#" className="block py-2 hover:text-gray-600 transition-colors duration-200" onClick={() => setIsOverlayOpen(false)}>
            COMMUNITIES
          </a>
          <a href="/whyDubai" className="block py-2 hover:text-gray-600 transition-colors duration-200" onClick={() => setIsOverlayOpen(false)}>
            WHY DUBAI
          </a>
          <a href="/contact" className="block py-2 hover:text-gray-600 transition-colors duration-200" onClick={() => setIsOverlayOpen(false)}>
            CONTACT US
          </a>
        </nav>
        <div className="p-8 border-t border-gray-200 flex justify-start space-x-4">
          <a href="#" aria-label="Facebook" className="w-8 h-8 flex items-center justify-center border border-gray-400 rounded-full text-gray-700 hover:bg-gray-200 transition-colors">
            <Facebook className="h-4 w-4" />
          </a>
          <a href="#" aria-label="Instagram" className="w-8 h-8 flex items-center justify-center border border-gray-400 rounded-full text-gray-700 hover:bg-gray-200 transition-colors">
            <Instagram className="h-4 w-4" />
          </a>
          <a href="#" aria-label="LinkedIn" className="w-8 h-8 flex items-center justify-center border border-gray-400 rounded-full text-gray-700 hover:bg-gray-200 transition-colors">
            <Linkedin className="h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  )
}
