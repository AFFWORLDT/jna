import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

function ContactUs() {
  return (
    <div className="font-mono">
      <section className="pt-32 pb-12 px-4 bg-[#141442]">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-medium mb-6 text-white font-mono">Contact Us</h1>
        </div>
      </section>
      <div className="flex flex-col lg:flex-row py-16 items-center justify-center bg-white container mx-auto">
        <div className="w-full lg:w-1/2 p-4 md:p-8 lg:pr-16 space-y-6 text-center lg:text-left">
          <p className="text-[#dbbb90] text-sm font-semibold uppercase tracking-widest font-mono">
            CONNECT WITH LUXURY
          </p>
          <h1 className="text-4xl md:text-4xl font-serif text-gray-800 leading-tight font-mono">
            Get in Touch with J&A Properties
          </h1>
          <p className="text-gray-600 text-base md:text-sm leading-relaxed font-mono">
            Have a question or ready to embark on your real estate journey? Our team is here to assist you every step of
            the way. Reach out to us via phone, email, or simply fill out the contact form below. We look forward to
            hearing from you!
          </p>
          <div className="space-y-2 pt-4">
            <p className="text-gray-600 text-base font-mono">Aspin Commercial Tower Level 48, Sheikh Zayed Road</p>
            <p className="text-gray-600 text-base font-mono">Dubai, UAE</p>
            <p className="text-gray-600 text-base flex items-center justify-center lg:justify-start gap-2 font-mono">
              <span className="font-bold font-mono">E</span>
              <a
                href="mailto:welcome@jna-properties.com"
                className="text-brand-gold hover:underline text-[#dbbb90] font-mono"
              >
                welcome@jna-properties.com
              </a>
            </p>
          </div>
        </div>
        <div className="w-full lg:w-1/2 p-4 md:p-8 lg:pl-16 mt-8 lg:mt-0">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="text"
                placeholder="Name"
                className="h-12 px-4 border border-gray-300 focus:border-brand-gold focus:ring-brand-gold font-mono"
              />
              <Input
                type="text"
                placeholder="Surname"
                className="h-12 px-4 border border-gray-300 focus:border-brand-gold focus:ring-brand-gold font-mono"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="email"
                placeholder="Email"
                className="h-12 px-4 border border-gray-300 focus:border-brand-gold focus:ring-brand-gold font-mono"
              />
              <Input
                type="tel"
                placeholder="Telephone"
                className="h-12 px-4 border border-gray-300 focus:border-brand-gold focus:ring-brand-gold font-mono"
              />
            </div>
            <Textarea
              placeholder="Write your message here..."
              className="min-h-[150px] p-4 border border-gray-300 focus:border-brand-gold focus:ring-brand-gold resize-y font-mono"
            />
            <p className="text-xs text-gray-500 mt-4 font-mono">
              By submitting this form you confirm that this website can store your submitted information, agree to our{" "}
              <a href="#" className="text-brand-gold hover:underline font-mono">
                privacy policy
              </a>{" "}
              and consent to{" "}
              <a href="#" className="text-brand-gold hover:underline font-mono">
                cookies
              </a>{" "}
              being stored on your computer.
            </p>
            <Button
              type="submit"
              className="w-full md:w-auto px-8 py-3 bg-brand-gold text-white font-semibold uppercase tracking-wider hover:bg-brand-gold/90 transition-colors bg-[#dbbb90] font-mono"
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactUs

