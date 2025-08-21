import { Input } from "@/src/components/ui/input"
import { Textarea } from "@/src/components/ui/textarea"
import { Button } from "@/src/components/ui/button"
import EnquireForm from "@/src/components/common/enquireForm"

function ContactUs() {
  return (
    <div className="font-mono">
      <section className="pt-32 pb-12 px-4 bg-[#141442]">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-medium mb-6 text-white font-mono">Contact Us</h1>
        </div>
      </section>
      <div className="flex flex-col lg:flex-row py-16 items-center justify-center container mx-auto">
        <div className="w-full lg:w-1/2 p-4 md:p-8 lg:pr-16 space-y-6 text-center lg:text-left">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest font-mono">
            CONNECT WITH LUXURY
          </p>
          <h1 className="text-4xl md:text-4xl  text-gray-800 leading-tight font-mono">
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
                className="text-brand-gold hover:underline text-primary font-mono"
              >
                welcome@jna-properties.com
              </a>
            </p>
          </div>
        </div>
        <div className="w-full lg:w-1/2 p-4 md:p-8 lg:pl-16 mt-8 lg:mt-0">
         <EnquireForm type="contact"/>
        </div>
      </div>
    </div>
  )
}

export default ContactUs

