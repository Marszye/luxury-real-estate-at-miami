"use client"

import { useState } from "react"
import { Phone, Mail, MapPin, ArrowUpRight, Globe } from "lucide-react"

export function Footer() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail("")
      setTimeout(() => setSubscribed(false), 4000)
    }
  }

  return (
    <footer className="border-t border-border bg-charcoal">
      {/* Newsletter CTA Band */}
      <div className="border-b border-cream/8">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="text-2xl font-light tracking-tight text-cream sm:text-3xl">
                Stay Informed
              </h3>
              <p
                className="mt-2 max-w-md text-sm leading-relaxed text-cream/40"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                Receive exclusive market reports, off-market listings, and
                invitations to private events. Delivered quarterly to a curated
                audience.
              </p>
            </div>
            <form
              onSubmit={handleSubscribe}
              className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 border border-cream/15 bg-transparent px-5 py-3.5 text-sm text-cream placeholder:text-cream/25 outline-none transition-colors focus:border-gold"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              />
              <button
                type="submit"
                className="bg-gold px-8 py-3.5 text-xs tracking-[0.2em] text-charcoal uppercase transition-all duration-500 hover:bg-gold-light"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                {subscribed ? "Subscribed" : "Subscribe"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand — col-span-3 */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center border border-gold/40">
                <span className="text-lg font-semibold tracking-wider text-gold">
                  M
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-semibold tracking-[0.2em] text-cream uppercase">
                  Maison
                </span>
                <span
                  className="text-[9px] tracking-[0.35em] text-cream/40 uppercase"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  Miami Estates
                </span>
              </div>
            </div>
            <p
              className="mt-6 max-w-xs text-sm leading-relaxed text-cream/40"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Defining luxury living in Miami since 2011. Every property tells a
              story of extraordinary craftsmanship and uncompromising elegance.
            </p>

            {/* Licenses */}
            <div
              className="mt-6 flex flex-col gap-1.5 text-[10px] text-cream/20"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              <span>Licensed Real Estate Brokerage</span>
              <span>Florida DBPR License #CQ1065372</span>
              <span>Member: Miami Association of Realtors</span>
              <span>Member: National Association of Realtors</span>
            </div>
          </div>

          {/* Properties — col-span-2 */}
          <div className="lg:col-span-2">
            <h4
              className="mb-6 text-[10px] tracking-[0.3em] text-cream/50 uppercase"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Properties
            </h4>
            <nav className="flex flex-col gap-3">
              {[
                "Featured Listings",
                "New Developments",
                "Waterfront Estates",
                "Penthouses",
                "Investment Grade",
                "Off-Market Portfolio",
                "Recently Sold",
                "Price Reductions",
              ].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-sm text-cream/35 transition-colors hover:text-gold"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>

          {/* Services — col-span-2 */}
          <div className="lg:col-span-2">
            <h4
              className="mb-6 text-[10px] tracking-[0.3em] text-cream/50 uppercase"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Services
            </h4>
            <nav className="flex flex-col gap-3">
              {[
                "Private Viewings",
                "Property Valuation",
                "Buyer Representation",
                "Seller Representation",
                "Relocation Concierge",
                "Interior Design",
                "Legal Advisory",
                "Property Management",
              ].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-sm text-cream/35 transition-colors hover:text-gold"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>

          {/* Company — col-span-2 */}
          <div className="lg:col-span-2">
            <h4
              className="mb-6 text-[10px] tracking-[0.3em] text-cream/50 uppercase"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Company
            </h4>
            <nav className="flex flex-col gap-3">
              {[
                "About Maison",
                "Our Team",
                "Market Reports",
                "Press & Media",
                "Awards",
                "Careers",
                "Partner With Us",
                "Client Portal",
              ].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-sm text-cream/35 transition-colors hover:text-gold"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact — col-span-3 */}
          <div className="lg:col-span-3">
            <h4
              className="mb-6 text-[10px] tracking-[0.3em] text-cream/50 uppercase"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Contact
            </h4>
            <div
              className="flex flex-col gap-5"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              {/* Headquarters */}
              <div>
                <span className="mb-1.5 block text-[9px] tracking-[0.2em] text-gold/50 uppercase">
                  Headquarters
                </span>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold/40" />
                  <span className="text-sm leading-relaxed text-cream/40">
                    1200 Brickell Avenue, Suite 1800
                    <br />
                    Miami, FL 33131, United States
                  </span>
                </div>
              </div>

              {/* Showroom */}
              <div>
                <span className="mb-1.5 block text-[9px] tracking-[0.2em] text-gold/50 uppercase">
                  Design Showroom
                </span>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold/40" />
                  <span className="text-sm leading-relaxed text-cream/40">
                    420 Lincoln Road, Penthouse
                    <br />
                    Miami Beach, FL 33139
                  </span>
                </div>
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 shrink-0 text-gold/40" />
                  <div className="flex flex-col">
                    <a
                      href="tel:+13058880000"
                      className="text-sm text-cream/40 transition-colors hover:text-gold"
                    >
                      +1 (305) 888-0000
                    </a>
                    <span className="text-[10px] text-cream/20">
                      Main Office
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 shrink-0 text-gold/40" />
                  <div className="flex flex-col">
                    <a
                      href="tel:+13058881111"
                      className="text-sm text-cream/40 transition-colors hover:text-gold"
                    >
                      +1 (305) 888-1111
                    </a>
                    <span className="text-[10px] text-cream/20">
                      International Desk
                    </span>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 shrink-0 text-gold/40" />
                  <a
                    href="mailto:concierge@maison.com"
                    className="text-sm text-cream/40 transition-colors hover:text-gold"
                  >
                    concierge@maison.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 shrink-0 text-gold/40" />
                  <a
                    href="mailto:press@maison.com"
                    className="text-sm text-cream/40 transition-colors hover:text-gold"
                  >
                    press@maison.com
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="border-t border-cream/8 pt-4">
                <span className="mb-2 block text-[9px] tracking-[0.2em] text-gold/50 uppercase">
                  Office Hours
                </span>
                <div className="flex flex-col gap-1 text-xs text-cream/30">
                  <span>Mon - Fri: 9:00 AM - 7:00 PM EST</span>
                  <span>Saturday: 10:00 AM - 5:00 PM EST</span>
                  <span>Sunday: By Appointment Only</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Affiliations Bar */}
      <div className="border-t border-cream/8">
        <div
          className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-6 px-6 py-6 lg:gap-10 lg:px-10"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        >
          <span className="text-[10px] tracking-[0.2em] text-cream/20 uppercase">
            Affiliated With
          </span>
          {[
            "Christie's International",
            "Luxury Portfolio Intl.",
            "Leading RE Companies",
            "FIABCI",
            "NAR Global",
          ].map((aff) => (
            <span
              key={aff}
              className="text-[11px] tracking-wide text-cream/15"
            >
              {aff}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-cream/8">
        <div
          className="mx-auto max-w-7xl px-6 py-6 lg:px-10"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        >
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <p className="text-xs text-cream/20">
              &copy; {new Date().getFullYear()} Maison Miami Estates. All
              rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              {[
                "Privacy Policy",
                "Terms of Service",
                "Cookie Policy",
                "Accessibility",
                "Fair Housing",
                "Sitemap",
              ].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-xs text-cream/20 transition-colors hover:text-gold"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <p className="mt-6 text-[10px] leading-relaxed text-cream/15">
            Maison Miami Estates is a licensed real estate brokerage in the
            State of Florida. All information provided is deemed reliable but
            not guaranteed and should be independently verified. Properties
            subject to prior sale, change, withdrawal, or error. Equal Housing
            Opportunity. This is not intended to solicit properties already
            listed with another broker. All square footage is approximate.
            International buyers should consult with legal and tax advisors
            regarding US property acquisition.
          </p>

          {/* Language / Region */}
          <div className="mt-4 flex items-center gap-2">
            <Globe className="h-3 w-3 text-cream/15" />
            <span className="text-[10px] text-cream/15">
              United States (English) | Global Site Available
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
