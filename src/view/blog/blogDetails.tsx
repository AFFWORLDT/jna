import SocialMediaFloat from "@/src/components/common/socialMediaFlotionButtons";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";
import { Calendar, Clock, Share2, BookOpen, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Mock data - in a real app, this would come from your CMS or database
const blogPost = {
  title: "Why Buying Property in Dubai is Better than Renting",
  subtitle:
    "Discover the financial, lifestyle, and investment advantages of owning property in Dubai.",
  content: `
    <h2>Long-Term Financial Benefits</h2>
    <p>Renting might provide short-term flexibility, but it’s essentially paying for someone else’s property investment. When you buy a property, each payment builds equity—an asset that grows in value over time. With Dubai’s real estate market offering high capital appreciation, buying a home can significantly enhance your net worth.</p>
    <p>Moreover, rental prices in Dubai can be volatile, often rising sharply in popular areas. Owning property allows you to avoid these fluctuations and provides you with stable and predictable housing costs.</p>

    <h2>Tax-Free Property Ownership</h2>
    <p>Dubai is known for its investor-friendly environment, including no property taxes. Once you purchase a property, you won’t need to worry about annual taxes cutting into your investment’s value. This tax-free advantage makes property ownership in Dubai even more appealing compared to other global cities.</p>

    <h2>Flexible Payment Plans</h2>
    <p>Developers in Dubai often offer attractive and flexible payment plans for off-plan properties. These plans allow buyers to spread payments over several years, making homeownership accessible to a broader range of individuals. In many cases, the monthly installments for a property purchase can be comparable to, or even less than, rental payments.</p>

    <h2>Residency Benefits</h2>
    <p>Owning property in Dubai can come with residency visa benefits, depending on the value of your investment. This provides not just a place to live but also the security of being a resident in one of the world’s most vibrant cities. These visas often allow property owners and their families to enjoy the perks of living in Dubai, such as access to excellent healthcare, education, and business opportunities.</p>

    <h2>Freedom to Personalize</h2>
    <p>When you own your home, you have complete control over its design and functionality. You can renovate, redecorate, and modify your property as you wish without the limitations imposed by a landlord. This freedom allows you to create a space that truly feels like home.</p>

    <h2>High Rental Yields</h2>
    <p>If you’re not planning to live in the property, Dubai’s high rental yields make property ownership a lucrative investment. Popular areas such as Downtown Dubai, Dubai Marina, and Palm Jumeirah offer some of the highest rental returns globally, ensuring your property works for you even when you’re not living in it.</p>

    <h2>A Hedge Against Inflation</h2>
    <p>Owning property protects you from rising rental prices, which can significantly impact your cost of living over time. Fixed mortgage rates or paid-off properties ensure stability in your housing expenses, acting as a hedge against inflation.</p>

    <h2>A Thriving Real Estate Market</h2>
    <p>Dubai’s real estate market is continuously evolving, with world-class infrastructure projects, upcoming mega-developments, and a strong commitment to sustainability and innovation. Buying property in this market positions you to benefit from the city’s ongoing growth and global appeal.</p>

    <h2>Conclusion</h2>
    <p>While renting offers short-term convenience, buying property in Dubai is a decision that offers lasting value, financial security, and numerous lifestyle advantages. From tax-free ownership to residency benefits and high rental yields, the incentives to invest in Dubai real estate are compelling.</p>

    <p><strong>Make the smart move today.</strong> Contact our team at J&A Properties to explore exclusive property listings and discover your path to homeownership in Dubai. Let us help you turn your investment dreams into reality!</p>
  `,
  author: {
    name: "J&A Properties",
    bio: "Leading property experts helping investors and homeowners navigate Dubai’s thriving real estate market.",
    avatar: "/images/logo-gold.svg",
    social: {
      twitter: "@japroperties",
      linkedin: "japroperties",
    },
  },
  publishedAt: "December 24, 2024",
  readTime: "6 min read",
  category: "Real Estate",
  tags: ["Dubai", "Investment", "Real Estate", "Property"],
  featuredImage: "/images/blog1.webp",
};

export default function DetailsBlog() {
  return (
    <div className="min-h-screen bg-background">
      <section className="pt-32 pb-12 px-4 bg-[#141442]">
        <div className=" mx-auto text-center">
          <h1 className="text-5xl font-medium mb-6 text-white font-mono">
            Blog
          </h1>
        </div>
      </section>
      <div className="max-w-5xl mx-auto px-6 mt-16">
        <h1 className="text-center text-4xl font-mono">
          Why Buying Property in Dubai is Better than Renting
        </h1>
        <p className="text-center text-xl font-mono mt-11">December 24, 2024</p>
      </div>
      {/* Featured Image */}
      <div className="max-w-5xl mx-auto px-6 mt-8 mb-12">
        <div className="relative rounded-none overflow-hidden ">
          <Image
            src={"/images/blog1.webp"}
            alt="Featured image"
            width={0}
            height={0}
            className="w-full h-64 md:h-96 object-cover"
          />
        </div>
      </div>
      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-4">
        <article className="prose prose-lg prose-slate max-w-none">
          <div
            className="text-slate-700 leading-relaxed space-y-6"
            dangerouslySetInnerHTML={{ __html: blogPost.content }}
            style={{
              fontSize: "15px",
              lineHeight: "1.7",
            }}
          />
        </article>
      </main>
      <SocialMediaFloat css="bottom-6 left-6" />{" "}
    </div>
  );
}
