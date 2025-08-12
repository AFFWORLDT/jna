import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent } from "@/src/components/ui/card"
import { Separator } from "@/src/components/ui/separator"
import { Calendar, Clock, Share2, BookOpen, ArrowLeft } from "lucide-react"
import Link from "next/link"

// Mock data - in a real app, this would come from your CMS or database
const blogPost = {
  title: "Designing for Deep Reading: How to Keep Users Hooked",
  subtitle: "Creating immersive digital experiences that encourage sustained engagement",
  content: `
    <p>In our fast-paced digital world, capturing and maintaining a reader's attention has become both an art and a science. The challenge isn't just getting someone to click on your content—it's keeping them engaged long enough to absorb your message and take meaningful action.</p>
    
    <h2>The Psychology of Digital Reading</h2>
    <p>Research shows that people read differently on screens than on paper. Our eyes tend to scan in an F-pattern, looking for quick takeaways rather than diving deep into lengthy paragraphs. Understanding this behavior is crucial for designers who want to create content that truly resonates.</p>
    
    <blockquote>"A truly great design disappears into the background, letting the story take center stage."</blockquote>
    
    <p>When we design with reading psychology in mind, we can create layouts that guide the eye naturally through the content, using white space, typography, and visual hierarchy to create a seamless reading experience.</p>
    
    <h2>Visual Hierarchy and Flow</h2>
    <p>The key to deep reading lies in creating a clear visual hierarchy that doesn't overwhelm the reader. This means using consistent spacing, appropriate font sizes, and strategic use of color to highlight important information without creating visual noise.</p>
    
    <p>Consider how your content flows from one section to the next. Are you providing clear transitions? Are your headings descriptive enough to help readers navigate? These details make the difference between content that gets skimmed and content that gets absorbed.</p>
    
    <h2>The Role of White Space</h2>
    <p>White space isn't empty space—it's breathing room for your content. Generous margins, line spacing, and paragraph breaks give readers' eyes a chance to rest and process information. This is especially important for longer-form content where reader fatigue can quickly set in.</p>
  `,
  author: {
    name: "Alex Rivera",
    bio: "Senior UX Designer with 8+ years crafting digital experiences that prioritize user engagement and accessibility.",
    avatar: "/placeholder.svg?height=64&width=64",
    social: {
      twitter: "@alexrivera",
      linkedin: "alexrivera",
    },
  },
  publishedAt: "March 15, 2024",
  readTime: "7 min read",
  category: "Design",
  tags: ["UX Design", "Typography", "User Engagement"],
  featuredImage: "/placeholder.svg?height=400&width=800",
}

export default function DetailsBlog() {
  return (
    <div className="min-h-screen bg-background mt-20">
     

      {/* Header */}
      <header className="relative bg-gradient-to-br from-slate-50 to-white border-b">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          <div className="space-y-6">
            <Badge variant="secondary" className="bg-blue-600 text-white hover:bg-blue-700">
              {blogPost.category}
            </Badge>

            <h1 className="text-4xl md:text-5xl font-bold text-slate-700 leading-tight">{blogPost.title}</h1>

            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">{blogPost.subtitle}</p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {blogPost.publishedAt}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {blogPost.readTime}
              </div>
              <Button variant="outline" size="sm" className="ml-auto bg-transparent">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="max-w-4xl mx-auto px-6 -mt-8 mb-12">
        <div className="relative rounded-xl overflow-hidden shadow-2xl">
          <img
            src={blogPost.featuredImage || "/placeholder.svg"}
            alt="Featured image"
            className="w-full h-64 md:h-96 object-cover"
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6">
        <article className="prose prose-lg prose-slate max-w-none">
          <div
            className="text-slate-700 leading-relaxed space-y-6"
            dangerouslySetInnerHTML={{ __html: blogPost.content }}
            style={{
              fontSize: "18px",
              lineHeight: "1.7",
            }}
          />
        </article>

      

      

       
      </main>
    </div>
  )
}
