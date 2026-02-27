"use client"

import { useState } from "react"
import { CalendarIcon, ArrowUpRight } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import Image from "next/image"

export function ScheduleTour() {
  const [date, setDate] = useState<Date>()
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section id="schedule" className="relative overflow-hidden bg-charcoal py-24 lg:py-32">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-15">
        <Image
          src="/images/listing-3.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left Content */}
          <div>
            <div className="mb-6 inline-flex items-center gap-3">
              <span className="h-px w-8 bg-gold" />
              <span
                className="text-xs tracking-[0.4em] text-gold uppercase"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                By Appointment Only
              </span>
            </div>

            <h2 className="text-4xl font-light leading-[1.15] tracking-tight text-cream sm:text-5xl lg:text-6xl text-balance">
              Schedule a{" "}
              <span className="italic text-gold">Private</span> Tour
            </h2>

            <p
              className="mt-6 max-w-md text-base leading-relaxed text-cream/50"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Experience our properties firsthand with a dedicated advisor. Every
              viewing is tailored to your preferences and conducted with the
              utmost discretion.
            </p>

            {/* Trust Signals */}
            <div className="mt-12 grid grid-cols-2 gap-6 border-t border-cream/10 pt-8">
              {[
                { value: "24h", desc: "Response Time" },
                { value: "Private", desc: "Viewings Only" },
                { value: "NDA", desc: "Available" },
                { value: "VIP", desc: "Transportation" },
              ].map((item) => (
                <div key={item.desc}>
                  <span className="text-xl font-light text-gold">
                    {item.value}
                  </span>
                  <p
                    className="mt-1 text-[11px] tracking-[0.15em] text-cream/40 uppercase"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Form */}
          <div className="border border-cream/10 bg-cream/5 p-8 backdrop-blur-sm lg:p-10">
            {submitted ? (
              <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center border border-gold/30">
                  <ArrowUpRight className="h-6 w-6 text-gold" />
                </div>
                <h3 className="text-2xl font-light text-cream">
                  Request Received
                </h3>
                <p
                  className="max-w-xs text-sm text-cream/50"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  A senior advisor will contact you within 24 hours to confirm
                  your private viewing.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="mb-8">
                  <h3 className="text-2xl font-light tracking-tight text-cream">
                    Request Your Viewing
                  </h3>
                  <p
                    className="mt-2 text-xs tracking-wide text-cream/40"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    All inquiries are treated with strict confidentiality.
                  </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      className="mb-2 block text-[10px] tracking-[0.2em] text-cream/50 uppercase"
                      style={{ fontFamily: "var(--font-inter), sans-serif" }}
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full border-b border-cream/15 bg-transparent py-3 text-sm text-cream outline-none transition-colors placeholder:text-cream/20 focus:border-gold"
                      style={{ fontFamily: "var(--font-inter), sans-serif" }}
                      placeholder="Enter first name"
                    />
                  </div>
                  <div>
                    <label
                      className="mb-2 block text-[10px] tracking-[0.2em] text-cream/50 uppercase"
                      style={{ fontFamily: "var(--font-inter), sans-serif" }}
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full border-b border-cream/15 bg-transparent py-3 text-sm text-cream outline-none transition-colors placeholder:text-cream/20 focus:border-gold"
                      style={{ fontFamily: "var(--font-inter), sans-serif" }}
                      placeholder="Enter last name"
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="mb-2 block text-[10px] tracking-[0.2em] text-cream/50 uppercase"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full border-b border-cream/15 bg-transparent py-3 text-sm text-cream outline-none transition-colors placeholder:text-cream/20 focus:border-gold"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label
                    className="mb-2 block text-[10px] tracking-[0.2em] text-cream/50 uppercase"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="w-full border-b border-cream/15 bg-transparent py-3 text-sm text-cream outline-none transition-colors placeholder:text-cream/20 focus:border-gold"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                    placeholder="+1 (305) 000-0000"
                  />
                </div>

                {/* Calendar Picker */}
                <div>
                  <label
                    className="mb-2 block text-[10px] tracking-[0.2em] text-cream/50 uppercase"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    Preferred Date
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className="flex w-full items-center justify-between border-b border-cream/15 bg-transparent py-3 text-sm text-left transition-colors hover:border-gold focus:border-gold outline-none"
                        style={{ fontFamily: "var(--font-inter), sans-serif" }}
                      >
                        <span className={date ? "text-cream" : "text-cream/20"}>
                          {date ? format(date, "MMMM d, yyyy") : "Select a date"}
                        </span>
                        <CalendarIcon className="h-4 w-4 text-gold/50" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-cream border-gold/15" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(date) => date < new Date()}
                        className="bg-cream"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <label
                    className="mb-2 block text-[10px] tracking-[0.2em] text-cream/50 uppercase"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    Areas of Interest
                  </label>
                  <select
                    className="w-full appearance-none border-b border-cream/15 bg-transparent py-3 text-sm text-cream outline-none transition-colors focus:border-gold"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                    defaultValue=""
                  >
                    <option value="" disabled className="text-charcoal">
                      Select a neighborhood
                    </option>
                    {[
                      "Fisher Island",
                      "Star Island",
                      "Miami Beach",
                      "Brickell",
                      "Coconut Grove",
                      "Coral Gables",
                      "Sunny Isles",
                      "Key Biscayne",
                    ].map((area) => (
                      <option key={area} value={area} className="text-charcoal">
                        {area}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="mt-4 w-full bg-gold px-8 py-4 text-xs tracking-[0.25em] text-charcoal uppercase transition-all duration-500 hover:bg-gold-light"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  Request Private Tour
                </button>

                <p
                  className="text-center text-[10px] tracking-wide text-cream/30"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  Your information is protected and never shared with third parties.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
