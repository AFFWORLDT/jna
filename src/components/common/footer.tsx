import { Input } from "@/src/components/ui/input"
import { Button } from "@/src/components/ui/button"
import { Facebook, Instagram, Linkedin } from "lucide-react"

const sitemapLinks = [
  { href: "/buy", label: "Buy" },
  { href: "/offPlans", label: "Off-Plan" },
  { href: "/communities", label: "Communities" },
  { href: "/whyDubai", label: "Why Dubai" },
  { href: "/service", label: "Services" },
  { href: "/about", label: "About Us" },
  { href: "/contactUs", label: "Contact Us" },
]

export default function Footer() {
  return (
    <footer className="bg-[#141442] text-white py-12 px-5 md:px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Newsletter Section */}
        <div className="md:col-span-3 lg:col-span-4 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 w-full">
          <h3 className="text-xl font-extralight tracking-wide leading-relaxed w-full md:flex-none md:w-[45%]">
            Receive our exceptional real estate listings delivered straight to your inbox.
          </h3>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full md:flex-1">
            <label htmlFor="email-subscribe" className="sr-only">
              Email address for newsletter subscription
            </label>
            <Input
              id="email-subscribe"
              type="email"
              placeholder="Email"
              className="flex-grow bg-transparent text-white border-white/50 placeholder:text-white/70 focus-visible:ring-offset-0 focus-visible:ring-transparent rounded-none"
            />
            <Button className="bg-[#D4B28C] hover:bg-[#C2A17B] text-white font-extralight tracking-wider py-2 px-4 rounded-md transition-colors uppercase h-14 rounded-none">
              Subscribe
            </Button>
          </div>
        </div>

        {/* Sitemap */}
        <div>
          <h4 className="text-lg font-extralight mb-4 tracking-wide">Sitemap</h4>
          <ul className="space-y-2 text-sm font-extralight">
            {sitemapLinks.map((link, i) => (
              <li key={i}>
                <a
                  href={link.href}
                  className="relative inline-block hover:text-gray-300 transition-colors
                             after:content-[''] after:absolute after:left-0 after:bottom-0
                             after:h-[2px] after:w-0 after:bg-primary
                             after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-extralight mb-4 tracking-wide">Contact</h4>
          <address className="not-italic space-y-2 text-sm font-extralight leading-relaxed">
            <p>Aspin Commercial Tower Level 48,</p>
            <p>Sheikh Zayed Road,</p>
            <p>Dubai, UAE</p>
            <p>
              <span className="font-extralight">E</span>{" "}
              <a
                href="mailto:welcome@jna-properties.com"
                className="relative inline-block hover:text-gray-300 transition-colors
                           after:content-[''] after:absolute after:left-0 after:bottom-0
                           after:h-[2px] after:w-0 after:bg-primary
                           after:transition-all after:duration-300 hover:after:w-full"
              >
                welcome@jna-properties.com
              </a>
            </p>
          </address>
        </div>

        {/* About Us */}
        <div>
          <h4 className="text-lg font-extralight mb-4 tracking-wide">About Us</h4>
          <p className="text-sm leading-relaxed font-extralight">
            J&A Properties specializes in luxury Dubai real estate, offering personalized service,
            market insights, and tailored investment solutions for discerning clients.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="container mx-auto border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-white/70">
        <p className="font-extralight">&copy; {"2025 J&A Properties | Privacy Policy | Cookie Policy"}</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a
            href="https://www.facebook.com/profile.php?id=61555781408625"
            target="_blank"
            aria-label="Facebook"
            className="w-8 h-8 flex items-center justify-center border border-white/50 rounded-full hover:bg-white/10 transition-colors"
          >
            <Facebook className="h-4 w-4" />
          </a>
          <a
            href="https://www.instagram.com/jnapropertiesofficial/"
            target="_blank"
            aria-label="Instagram"
            className="w-8 h-8 flex items-center justify-center border border-white/50 rounded-full hover:bg-white/10 transition-colors"
          >
            <Instagram className="h-4 w-4" />
          </a>
          <a
            href="https://www.linkedin.com/company/j-a-properties/"
            target="_blank"
            aria-label="LinkedIn"
            className="w-8 h-8 flex items-center justify-center border border-white/50 rounded-full hover:bg-white/10 transition-colors"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  )
}
