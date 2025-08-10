"use client"

import React, { useState } from "react"
import {
  Mail,
  MessageCircle,
  Phone,
  Plus,
  Search,
  Send,
  RssIcon as Reddit,
  AtSign,
  Share2,
  MessageSquare,
  Pin,
  Pocket,
  Users,
  ShoppingCart,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const socialLinksData = [
  { name: "Facebook", icon: <Facebook size={20} />, url: "https://facebook.com" },
  { name: "WhatsApp", icon: <MessageCircle size={20} />, url: "https://wa.me/1234567890" },
  { name: "Telegram", icon: <Send size={20} />, url: "https://telegram.org" },
  { name: "Reddit", icon: <Reddit size={20} />, url: "https://reddit.com" },
  { name: "Threads", icon: <AtSign size={20} />, url: "https://threads.net" },
  { name: "Mix", icon: <Share2 size={20} />, url: "https://mix.com" },
  { name: "Mastodon", icon: <AtSign size={20} />, url: "https://mastodon.social" },
  { name: "Email", icon: <Mail size={20} />, url: "mailto:info@example.com" },
  { name: "Message", icon: <MessageSquare size={20} />, url: "sms:+1234567890" },
  { name: "Gmail", icon: <Mail size={20} />, url: "mailto:info@gmail.com" },
  { name: "LinkedIn", icon: <Linkedin size={20} />, url: "https://linkedin.com" },
  { name: "Google Translate", icon: <MessageCircle size={20} />, url: "https://translate.google.com" },
  { name: "Bluesky", icon: <Twitter size={20} />, url: "https://bsky.app" },
  { name: "Pinterest", icon: <Pin size={20} />, url: "https://pinterest.com" },
  { name: "Messenger", icon: <MessageSquare size={20} />, url: "https://messenger.com" },
  { name: "Pocket", icon: <Pocket size={20} />, url: "https://getpocket.com" },
  { name: "Teams", icon: <Users size={20} />, url: "https://teams.microsoft.com" },
  { name: "Amazon Wish List", icon: <ShoppingCart size={20} />, url: "https://amazon.com/wishlist" },
  { name: "Phone", icon: <Phone size={20} />, url: "tel:+1234567890" },
  { name: "Instagram", icon: <Instagram size={20} />, url: "https://instagram.com" },
]

const SocialMediaFloat = () => {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredSocialLinks = socialLinksData.filter((social) =>
    social.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSocialClick = (url: string) => {
    window.open(url, "_blank")
  }

  return (
    <>
      {/* Floating Social Media Icons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
        {/* Individual Social Icons (first 4 shown directly) */}
        {socialLinksData.slice(0, 4).map((social, index) => (
          <Button
            key={index}
            onClick={() => handleSocialClick(social.url)}
            className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-300"
            title={social.name}
            variant="outline"
            size="icon"
          >
            {/* Clone element to apply text color to the icon */}
            {React.cloneElement(social.icon, { className: "text-[#DBBB90]" })}
          </Button>
        ))}

        {/* Plus Button - Opens Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="w-8 h-8 bg-[#DBBB90] hover:bg-[#C0A070] rounded-full shadow-lg flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
              title="More Social Links"
              size="icon"
            >
              <Plus size={20} />
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-neutral-900 text-white p-0 sm:max-w-lg rounded-xl border-none overflow-hidden">
            <DialogHeader className="p-4 pb-0">
              <DialogTitle className="sr-only">Connect With Us</DialogTitle>
              <div className="relative">
                <Label htmlFor="search-social" className="sr-only">
                  Search social media
                </Label>
                <Input
                  id="search-social"
                  placeholder="Search"
                  className="w-full pl-10 pr-4 py-2 rounded-md bg-neutral-800 text-white border-none focus:ring-0 focus:outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
              </div>
            </DialogHeader>

            <div className="p-4 pt-6 grid grid-cols-3 gap-4 max-h-[400px] overflow-y-auto custom-scrollbar">
              {filteredSocialLinks.map((social, index) => (
                <button
                  key={index}
                  onClick={() => handleSocialClick(social.url)}
                  className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-neutral-800 cursor-pointer transition-colors duration-200"
                >
                  <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                    {React.cloneElement(social.icon, { className: "text-[#DBBB90]" })}
                  </div>
                  <span className="text-sm text-white">{social.name}</span>
                </button>
              ))}
            </div>

            <div className="p-4 pt-0 text-center">
              <Button variant="link" className="text-white hover:text-gray-300">
                <Plus size={16} className="mr-1" /> AddToAny
              </Button>
            </div>

           
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}

export default SocialMediaFloat
