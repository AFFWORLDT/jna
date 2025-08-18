"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Heart,
  MessageCircle,
  Phone,
  Menu,
  X,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { cn } from "@/src/lib/utils";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOverlayOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOverlayOpen]);

  const navLinks = [
    { href: "/buy", label: "BUY" },
    { href: "/offPlans", label: "OFF-PLAN" },
    { href: "/communities", label: "COMMUNITIES" },
    { href: "/whyDubai", label: "WHY DUBAI" },
    { href: "/service", label: "SERVICE" },     
    { href: "/about", label: "ABOUT" },          
    { href: "/contactUs", label: "CONTACT US" },
  ];


  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled ? "bg-[#141442]" : "bg-transparent"
      }`}
    >
      <nav
        className={`container mx-auto flex items-center justify-between px-4 md:px-6 transition-all duration-300 ${
          isScrolled ? "h-20" : "h-28"
        }`}
      >
        <div className="flex items-center">
          <Link href={"/"}>
            <Image
              src={isScrolled?"/images/logo-gold.svg":"/images/logo-white.svg"}
              alt="logo"
              width={80}
              height={80}
            />
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-10 text-sm font-light uppercase tracking-[1.5px]" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
          {navLinks.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className={cn(
                "relative pb-1 transition-all duration-300 text-white uppercase",
                "after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0",
                "after:bg-primary after:transition-all after:duration-300 hover:after:w-full",
                pathname === link.href && "after:w-full"
              )}
              style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', letterSpacing: '1.5px' }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
          >
            <Heart className="h-5 w-5" />
            <span className="sr-only">Favorites</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
            asChild
          >
            <a
              href="https://wa.me/971471803105"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <MessageCircle className="h-5 w-5" />
              <span className="sr-only">WhatsApp</span>
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
            asChild
          >
            <a
              href="tel:+971471803105"
              aria-label="Call Us"
            >
              <Phone className="h-5 w-5" />
              <span className="sr-only">Call Us</span>
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
            onClick={() => setIsOverlayOpen(true)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </div>
      </nav>

      {/* Overlay */}
      <div
        className={`fixed top-0 bottom-0 right-0 w-full md:w-1/4 bg-[#F5F2ED] text-gray-900 z-[100] transform transition-transform duration-300 ease-in-out ${
          isOverlayOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-[#1A2B40] hover:bg-gray-200"
          onClick={() => setIsOverlayOpen(false)}
        >
          <X className="h-6 w-6" />
          <span className="sr-only">Close menu</span>
        </Button>

        <nav className="flex flex-col pt-16 p-8 space-y-4 text-lg uppercase font-light tracking-[1.5px] flex-grow" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
          {navLinks.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className={`block py-2 transition-colors duration-200 uppercase
                ${
                  pathname === link.href ? "text-primary" : "hover:text-primary"
                }`}
              onClick={() => setIsOverlayOpen(false)}
              style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', letterSpacing: '1.5px' }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="p-8 border-t border-gray-200 flex justify-start space-x-4">
          <Link
            href="#"
            aria-label="Facebook"
            className="w-8 h-8 flex items-center justify-center border border-gray-400 rounded-full text-gray-700 hover:bg-gray-200"
          >
            <Facebook className="h-4 w-4" />
          </Link>
          <Link
            href="#"
            aria-label="Instagram"
            className="w-8 h-8 flex items-center justify-center border border-gray-400 rounded-full text-gray-700 hover:bg-gray-200"
          >
            <Instagram className="h-4 w-4" />
          </Link>
          <Link
            href="#"
            aria-label="LinkedIn"
            className="w-8 h-8 flex items-center justify-center border border-gray-400 rounded-full text-gray-700 hover:bg-gray-200"
          >
            <Linkedin className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
