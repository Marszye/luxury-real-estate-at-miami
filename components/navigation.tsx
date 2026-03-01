"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown, Globe, Phone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useSiteSettings } from "@/components/site-settings-provider"

const INQUIRY_LINK = "/#schedule"

const navLinks = [
  {
    label: "Properties",
    href: "/#properties",
    children: [
      { label: "Featured Listings", href: "/#properties" },
      { label: "The Collection", href: "/collection" },
      { label: "Ultra-Luxury Showcase", href: "/properties/ultra-luxury-showcase" },
      { label: "New Developments", href: "/#properties" },
      { label: "Waterfront Estates", href: "/#properties" },
      { label: "Penthouses & Sky Residences", href: "/#properties" },
      { label: "Investment Opportunities", href: "/#properties" },
      { label: "Off-Market Portfolio", href: "/#properties" },
    ],
  },
  {
    label: "Neighborhoods",
    href: "/neighborhoods",
    children: [
      { label: "All Neighborhoods", href: "/neighborhoods" },
      { label: "Brickell", href: "/neighborhoods#brickell" },
      { label: "Design District", href: "/neighborhoods#design-district" },
      { label: "Star Island", href: "/neighborhoods#star-island" },
      { label: "Fisher Island", href: "/neighborhoods#fisher-island" },
      { label: "Coconut Grove", href: "/neighborhoods#coconut-grove" },
      { label: "Edgewater & Wynwood", href: "/neighborhoods#edgewater" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "All Services", href: "/services" },
      { label: "AI Portfolio Analysis", href: "/services" },
      { label: "Yacht Docking Management", href: "/services" },
      { label: "24/7 White-Glove Concierge", href: "/services" },
      { label: "Legal & Tax Strategy", href: "/services" },
      { label: "Interior Design", href: "/services" },
      { label: "Relocation Concierge", href: "/services" },
    ],
  },
  {
    label: "Insights",
    href: "/market-intelligence",
    children: [
      { label: "Market Intelligence", href: "/market-intelligence" },
      { label: "ROI Forecast", href: "/market-intelligence#roi-forecast" },
      { label: "Migration Trends", href: "/market-intelligence#migration-trends" },
      { label: "Lifestyle Index", href: "/market-intelligence#lifestyle-index" },
      { label: "Market Reports", href: "/#insights" },
      { label: "Investment Blog", href: "/blog" },
      { label: "Press & Media", href: "/#press" },
    ],
  },
  { label: "About", href: "/#about" },
  { label: "Contact", href: INQUIRY_LINK },
]

export function Navigation() {
  const { companyName, logoUrl } = useSiteSettings()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  return (
    <>
      {/* Top Bar */}
      <div
        className={`fixed top-0 left-0 right-0 z-[51] transition-all duration-500 ${
          scrolled ? "h-0 opacity-0 overflow-hidden" : "h-auto opacity-100"
        }`}
      >
        <div className="bg-charcoal">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 lg:px-10">
            <div className="flex items-center gap-6 font-sans">
              <div className="flex items-center gap-2 text-cream/50">
                <Phone className="h-3 w-3" />
                <a
                  href="tel:+13058880000"
                  className="text-[11px] tracking-wide transition-colors hover:text-gold"
                >
                  +1 (305) 888-0000
                </a>
              </div>
              <span className="hidden h-3 w-px bg-cream/15 sm:block" />
              <span className="hidden font-sans text-[11px] tracking-wide text-cream/50 sm:block">
                1200 Brickell Avenue, Suite 1800, Miami FL 33131
              </span>
            </div>
            <div className="flex items-center gap-4 font-sans">
              <button className="flex items-center gap-1.5 text-[11px] tracking-wide text-cream/50 transition-colors hover:text-gold">
                <Globe className="h-3 w-3" />
                EN
                <ChevronDown className="h-2.5 w-2.5" />
              </button>
              <span className="h-3 w-px bg-cream/15" />
              <Link
                href="/#schedule"
                className="text-[11px] tracking-wide text-cream/50 transition-colors hover:text-gold"
              >
                Client Login
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav
        className={`fixed left-0 right-0 z-50 transition-all duration-700 ease-out ${
          scrolled
            ? "top-0 bg-pearl/80 backdrop-blur-2xl border-b border-gold/10 shadow-[0_1px_20px_rgba(212,175,55,0.04)]"
            : "top-[36px] bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden border border-gold/40 transition-colors duration-500 group-hover:border-gold">
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt={companyName || "Company logo"}
                  width={40}
                  height={40}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="font-serif text-lg font-semibold tracking-wider text-gold">
                  {(companyName?.trim()?.[0] || "M").toUpperCase()}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <span
                className={`font-serif text-xl font-semibold tracking-[0.2em] uppercase transition-colors duration-500 ${
                  scrolled ? "text-charcoal" : "text-cream"
                }`}
              >
                {companyName || "Maison"}
              </span>
              <span
                className={`font-sans text-[9px] font-light tracking-[0.35em] uppercase transition-colors duration-500 ${
                  scrolled ? "text-muted-foreground" : "text-cream/60"
                }`}
              >
                Miami Estates
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-8 xl:flex">
            {navLinks.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() =>
                  item.children && setActiveDropdown(item.label)
                }
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`group relative flex items-center gap-1 font-sans text-[13px] tracking-[0.12em] uppercase transition-colors duration-300 ${
                    scrolled
                      ? "text-charcoal/70 hover:text-charcoal"
                      : "text-cream/80 hover:text-cream"
                  }`}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown className="h-3 w-3 opacity-50" />
                  )}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
                </Link>

                {item.children && (
                  <AnimatePresence>
                    {activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute left-0 top-full pt-3"
                      >
                        <div className="min-w-[240px] border border-gold/10 bg-pearl/95 p-2 shadow-xl backdrop-blur-2xl">
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              className="flex items-center px-4 py-2.5 font-sans text-[12px] tracking-wide text-charcoal/70 transition-all duration-200 hover:bg-gold/5 hover:text-charcoal"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link href={INQUIRY_LINK}>
              <motion.span
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`hidden border px-6 py-2.5 font-sans text-xs tracking-[0.2em] uppercase transition-all duration-500 lg:inline-block ${
                  scrolled
                    ? "border-charcoal/20 text-charcoal hover:border-gold hover:bg-gold hover:text-pearl"
                    : "border-cream/30 text-cream hover:border-gold hover:bg-gold hover:text-charcoal"
                }`}
              >
                Private Inquiry
              </motion.span>
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`flex h-10 w-10 items-center justify-center xl:hidden transition-colors ${
                scrolled ? "text-charcoal" : "text-cream"
              }`}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-pearl/98 backdrop-blur-3xl xl:hidden"
          >
            <div className="flex h-full flex-col overflow-y-auto px-6 pt-28 pb-10">
              <nav className="flex flex-col gap-1">
                {navLinks.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        onClick={() => {
                          if (!item.children) setMobileOpen(false)
                        }}
                        className="flex-1 py-4 font-serif text-2xl font-light tracking-[0.1em] text-charcoal uppercase transition-all duration-500 hover:text-gold"
                      >
                        {item.label}
                      </Link>
                      {item.children && (
                        <button
                          onClick={() =>
                            setMobileExpanded(
                              mobileExpanded === item.label ? null : item.label
                            )
                          }
                          className="p-2 text-charcoal/40"
                          aria-label={`Expand ${item.label}`}
                        >
                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-300 ${
                              mobileExpanded === item.label ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      )}
                    </div>

                    {item.children && (
                      <div
                        className={`overflow-hidden transition-all duration-400 ${
                          mobileExpanded === item.label
                            ? "max-h-[500px] opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="flex flex-col gap-1 border-l border-gold/20 pl-6 pb-4">
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              onClick={() => setMobileOpen(false)}
                              className="py-2 font-sans text-sm text-charcoal/60 transition-colors hover:text-gold"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="h-px bg-charcoal/5" />
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto pt-8 border-t border-charcoal/10">
                <Link
                  href={INQUIRY_LINK}
                  onClick={() => setMobileOpen(false)}
                  className="mb-6 block w-full border border-gold bg-gold px-8 py-4 text-center font-sans text-xs tracking-[0.2em] text-charcoal uppercase transition-all duration-500 hover:bg-gold-light"
                >
                  Schedule Private Tour
                </Link>
                <div className="flex flex-col gap-3 font-sans">
                  <a
                    href="tel:+13058880000"
                    className="text-sm text-charcoal/50 transition-colors hover:text-gold"
                  >
                    +1 (305) 888-0000
                  </a>
                  <a
                    href="mailto:concierge@maison.com"
                    className="text-sm text-charcoal/50 transition-colors hover:text-gold"
                  >
                    concierge@maison.com
                  </a>
                  <p className="text-xs text-charcoal/30">
                    1200 Brickell Avenue, Suite 1800, Miami FL 33131
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
