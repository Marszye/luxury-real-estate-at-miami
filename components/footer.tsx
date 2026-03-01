"use client"

import { useState, useEffect } from "react"
import { Phone, Mail, MapPin, Globe, Shield, Monitor } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useSiteSettings } from "@/components/site-settings-provider"
import { ScrollReveal } from "@/components/scroll-reveal"

function detectDeviceInfo(): {
  deviceInfo: string
  deviceTier: "High-end Apple" | "Standard"
} {
  if (typeof navigator === "undefined") {
    return { deviceInfo: "Unknown Device", deviceTier: "Standard" }
  }
  const ua = navigator.userAgent
  const isIphone = /iPhone/i.test(ua)
  const isIpad = /iPad/i.test(ua)
  const isMac = /Macintosh|Mac OS X/i.test(ua)
  const isApple = isIphone || isIpad || isMac
  const osLabel = isIphone ? "iPhone" : isIpad ? "iPad" : isMac ? "Mac Desktop" : /Windows NT/i.test(ua) ? "Windows" : "Device"
  const browserLabel = /Edg\//i.test(ua) ? "Edge" : /CriOS|Chrome\//i.test(ua) ? "Chrome" : /Firefox\//i.test(ua) ? "Firefox" : /Safari\//i.test(ua) ? "Safari" : "Browser"
  return {
    deviceInfo: `${osLabel} • ${browserLabel}`,
    deviceTier: isApple ? "High-end Apple" : "Standard",
  }
}

export function Footer() {
  const { companyName, logoUrl } = useSiteSettings()
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)
  const [deviceInfo, setDeviceInfo] = useState<{ deviceInfo: string; deviceTier: string } | null>(null)

  useEffect(() => {
    setDeviceInfo(detectDeviceInfo())
  }, [])

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
              <p className="mt-2 max-w-md text-sm font-sans leading-relaxed text-cream/40">
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
                className="flex-1 border border-cream/15 bg-transparent px-5 py-3.5 text-sm font-sans text-cream placeholder:text-cream/25 outline-none transition-colors focus:border-gold"
              />
              <button
                type="submit"
                className="bg-gold px-8 py-3.5 text-xs font-sans tracking-[0.2em] text-charcoal uppercase transition-all duration-500 hover:bg-gold-light"
              >
                {subscribed ? "Subscribed" : "Subscribe"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <ScrollReveal>
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand — col-span-3 */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden border border-gold/40">
                {logoUrl ? (
                  <Image
                    src={logoUrl}
                    alt={companyName || "Company logo"}
                    width={40}
                    height={40}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-lg font-semibold tracking-wider text-gold">
                    {(companyName?.trim()?.[0] || "M").toUpperCase()}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-semibold tracking-[0.2em] text-cream uppercase">
                  {companyName || "Maison"}
                </span>
                <span className="text-[9px] font-sans tracking-[0.35em] text-cream/40 uppercase">
                  Miami Estates
                </span>
              </div>
            </div>
            <p className="mt-6 max-w-xs text-sm font-sans leading-relaxed text-cream/40">
              Defining luxury living in Miami since 2011. Every property tells a
              story of extraordinary craftsmanship and uncompromising elegance.
            </p>

            {/* Licenses */}
            <div className="mt-6 flex flex-col gap-1.5 text-[10px] font-sans text-cream/20">
              <span>Licensed Real Estate Brokerage</span>
              <span>Florida DBPR License #CQ1065372</span>
              <span>Member: Miami Association of Realtors</span>
              <span>Member: National Association of Realtors</span>
            </div>
          </div>

          {/* Properties — col-span-2 */}
          <div className="lg:col-span-2">
            <h4 className="mb-6 text-[10px] font-sans tracking-[0.3em] text-cream/50 uppercase">
              Properties
            </h4>
            <nav className="flex flex-col gap-3">
              {[
                { label: "Featured Listings", href: "/#properties" },
                { label: "New Developments", href: "/#properties" },
                { label: "Waterfront Estates", href: "/#properties" },
                { label: "Penthouses", href: "/#properties" },
                { label: "Investment Grade", href: "/#properties" },
                { label: "Off-Market Portfolio", href: "/#properties" },
                { label: "Recently Sold", href: "/#properties" },
                { label: "Price Reductions", href: "/#properties" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm font-sans text-cream/35 transition-colors hover:text-gold"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services — col-span-2 */}
          <div className="lg:col-span-2">
            <h4 className="mb-6 text-[10px] font-sans tracking-[0.3em] text-cream/50 uppercase">
              Services
            </h4>
            <nav className="flex flex-col gap-3">
              {[
                "AI Portfolio Analysis",
                "Yacht Docking Management",
                "White-Glove Concierge",
                "Buyer Representation",
                "Relocation Concierge",
                "Interior Design",
                "Legal & Tax Strategy",
                "Property Management",
              ].map((link) => (
                <Link
                  key={link}
                  href="/services"
                  className="text-sm font-sans text-cream/35 transition-colors hover:text-gold"
                >
                  {link}
                </Link>
              ))}
            </nav>
          </div>

          {/* Company — col-span-2 */}
          <div className="lg:col-span-2">
            <h4 className="mb-6 text-[10px] font-sans tracking-[0.3em] text-cream/50 uppercase">
              Company
            </h4>
            <nav className="flex flex-col gap-3">
              {[
                { label: `About ${companyName || "Maison"}`, href: "/#about" },
                { label: "Our Team", href: "/#about" },
                { label: "Neighborhoods", href: "/neighborhoods" },
                { label: "Market Reports", href: "/market-intelligence" },
                { label: "Investment Blog", href: "/blog" },
                { label: "Press & Media", href: "/#press" },
                { label: "Services", href: "/services" },
                { label: "Client Portal", href: "/#schedule" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm font-sans text-cream/35 transition-colors hover:text-gold"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact — col-span-3 */}
          <div className="lg:col-span-3">
            <h4 className="mb-6 text-[10px] font-sans tracking-[0.3em] text-cream/50 uppercase">
              Contact
            </h4>
            <div className="flex flex-col gap-5 font-sans">
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
        </ScrollReveal>
      </div>

      {/* Affiliations Bar */}
      <div className="border-t border-cream/8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-6 px-6 py-6 font-sans lg:gap-10 lg:px-10">
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
        <div className="mx-auto max-w-7xl px-6 py-6 font-sans lg:px-10">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <p className="text-xs text-cream/20">
              &copy; {new Date().getFullYear()} {companyName || "Maison"} Miami
              Estates. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              {[
                { label: "Privacy Policy", href: "/" },
                { label: "Terms of Service", href: "/" },
                { label: "Cookie Policy", href: "/" },
                { label: "Accessibility", href: "/" },
                { label: "Fair Housing", href: "/" },
                { label: "Sitemap", href: "/" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-xs text-cream/20 transition-colors hover:text-gold"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <p className="mt-6 text-[10px] leading-relaxed text-cream/15">
            {companyName || "Maison"} Miami Estates is a licensed real estate
            brokerage in the State of Florida. All information provided is
            deemed reliable but not guaranteed and should be independently
            verified. Properties subject to prior sale, change, withdrawal, or
            error. Equal Housing Opportunity. This is not intended to solicit
            properties already listed with another broker. All square footage
            is approximate. International buyers should consult with legal and
            tax advisors regarding US property acquisition.
          </p>

          {/* Language / Region */}
          <div className="mt-4 flex items-center gap-2">
            <Globe className="h-3 w-3 text-cream/15" />
            <span className="text-[10px] text-cream/15">
              United States (English) | Global Site Available
            </span>
          </div>

          {/* Elite Device Detection */}
          {deviceInfo && (
            <div className="mt-6 flex items-center justify-center gap-3 border-t border-cream/8 pt-6">
              <div className="flex items-center gap-2 font-sans text-[10px] tracking-[0.15em] text-cream/25 uppercase">
                <Monitor className="h-3.5 w-3.5 text-gold/30" />
                <span>Elite Device Detection</span>
              </div>
              <span className="h-3 w-px bg-cream/10" />
              <span className="font-sans text-[10px] text-cream/20">
                {deviceInfo.deviceInfo}
              </span>
              {deviceInfo.deviceTier === "High-end Apple" && (
                <>
                  <span className="h-3 w-px bg-cream/10" />
                  <span className="flex items-center gap-1.5 font-sans text-[10px] text-gold/60">
                    <Shield className="h-3 w-3" />
                    Verified High-Tier
                  </span>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}
