import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#141442] text-white py-12 px-4 md:px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Newsletter Section */}
        <div className="md:col-span-1">
          <h3 className="text-2xl font-extralight mb-4 tracking-wide leading-relaxed">Receive our exceptional real estate listings delivered straight to your inbox.</h3>
          <div className="flex space-x-2">
            <Input
              type="email"
              placeholder="Email"
              className="flex-grow bg-transparent text-white border-white/50 placeholder:text-white/70 focus-visible:ring-offset-0 focus-visible:ring-transparent"
            />
            <Button className="bg-[#D4B28C] hover:bg-[#C2A17B] text-white font-extralight tracking-wider py-2 px-4 rounded-md transition-colors uppercase">
              Subscribe
            </Button>
          </div>
        </div>

        {/* Sitemap */}
        <div>
          <h4 className="text-lg font-extralight mb-4 tracking-wide">Sitemap</h4>
          <ul className="space-y-2 text-sm font-extralight">
            <li><a href="#" className="hover:text-gray-300 transition-colors">Buy</a></li>
            <li><a href="#" className="hover:text-gray-300 transition-colors">Off-Plan</a></li>
            <li><a href="#" className="hover:text-gray-300 transition-colors">Communities</a></li>
            <li><a href="#" className="hover:text-gray-300 transition-colors">Why Dubai</a></li>
            <li><a href="/service" className="hover:text-gray-300 transition-colors">Services</a></li>
            <li><a href="#" className="hover:text-gray-300 transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-gray-300 transition-colors">Contact Us</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-extralight mb-4 tracking-wide">Contact</h4>
          <address className="not-italic space-y-2 text-sm font-extralight leading-relaxed">
            <p>Aspin Commercial Tower Level 48,</p>
            <p>Sheikh Zayed Road,</p>
            <p>Dubai, UAE</p>
            <p><span className="font-extralight">E</span> <a href="mailto:welcome@jna-properties.com" className="hover:text-gray-300 transition-colors font-extralight">welcome@jna-properties.com</a></p>
          </address>
        </div>

        {/* About Us */}
        <div>
          <h4 className="text-lg font-extralight mb-4 tracking-wide">About Us</h4>
          <p className="text-sm leading-relaxed font-extralight">
            J&A Properties specializes in luxury Dubai real estate, offering personalized service, market insights, and tailored investment solutions for discerning clients.
          </p>
        </div>
      </div>

      <div className="container mx-auto border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-white/70">
        <p className="font-extralight">&copy; {'2025 J&A Properties | Privacy Policy | Cookie Policy'}</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" aria-label="Facebook" className="w-8 h-8 flex items-center justify-center border border-white/50 rounded-full hover:bg-white/10 transition-colors">
            <Facebook className="h-4 w-4" />
          </a>
          <a href="#" aria-label="Instagram" className="w-8 h-8 flex items-center justify-center border border-white/50 rounded-full hover:bg-white/10 transition-colors">
            <Instagram className="h-4 w-4" />
          </a>
          <a href="#" aria-label="LinkedIn" className="w-8 h-8 flex items-center justify-center border border-white/50 rounded-full hover:bg-white/10 transition-colors">
            <Linkedin className="h-4 w-4" />
          </a>
        </div>

      </div>
    </footer>
  )
}
