import React from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

function EnquireForm({ type }: { type: string }) {
  return (
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
        By submitting this form you confirm that this website can store your
        submitted information, agree to our{" "}
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
        className="w-full md:w-auto px-8 py-3 bg-brand-gold text-white font-semibold uppercase tracking-wider hover:bg-brand-gold/90 transition-colors bg-primary font-mono"
      >
        Submit
      </Button>
    </form>
  );
}

export default EnquireForm;
