"use client"

import { useState, useEffect } from "react"
import { Menu, X, ChevronDown, Globe, Phone } from "lucide-react"

const navLinks = [
  {
    label: "Properties",
    href: "#properties",
    children: [
      { label: "Featured Listings", href: "#properties" },
      { label: "New Developments", href: "#properties" },
      { label: "Waterfront Estates", href: "#properties" },
      { label: "Penthouses & Sky Residences", href: "#properties" },
      { label: "Investment Opportunities", href: "#properties" },
      { label: "Off-Market Portfolio", href: "#properties" },
    ],
  },
  {
    label: "Neighborhoods",
    href: "#neighborhoods",
    children: [
      { label: "Fisher Island", href: "#neighborhoods" },
      { label: "Star Island", href: "#neighborhoods" },
      { label: "Miami Beach", href: "#neighborhoods" },
      { label: "Brickell", href: "#neighborhoods" },
      { label: "Coconut Grove", href: "#neighborhoods" },
      { label: "Coral Gables", href: "#neighborhoods" },
      { label: "Key Biscayne", href: "#neighborhoods" },
      { label: "Bal Harbour", href: "#neighborhoods" },
    ],
  },
  {
    label: "Services",
    href: "#about",
    children: [
      { label: "Property Acquisition", href: "#about" },
      { label: "Sales & Marketing", href: "#about" },
      { label: "Property Valuation", href: "#about" },
      { label: "Relocation Concierge", href: "#about" },
      { label: "Interior Design", href: "#about" },
      { label: "Legal & Tax Advisory", href: "#about" },
      { label: "Property Management", href: "#about" },
    ],
  },
  {
    label: "Insights",
    href: "#insights",
    children: [
      { label: "Market Reports", href: "#insights" },
      { label: "Investment Analysis", href: "#insights" },
      { label: "Quarterly Outlook", href: "#insights" },
      { label: "Press & Media", href: "#press" },
    ],
  },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#schedule" },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
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
            <div
              className="flex items-center gap-6"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
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
              <span className="hidden text-[11px] tracking-wide text-cream/50 sm:block">
                1200 Brickell Avenue, Suite 1800, Miami FL 33131
              </span>
            </div>
            <div className="flex items-center gap-4">
              <button
                className="flex items-center gap-1.5 text-[11px] tracking-wide text-cream/50 transition-colors hover:text-gold"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                <Globe className="h-3 w-3" />
                EN
                <ChevronDown className="h-2.5 w-2.5" />
              </button>
              <span className="h-3 w-px bg-cream/15" />
              <a
                href="#"
                className="text-[11px] tracking-wide text-cream/50 transition-colors hover:text-gold"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                Client Login
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav
        className={`fixed left-0 right-0 z-50 transition-all duration-700 ease-out ${
          scrolled
            ? "top-0 bg-cream/80 backdrop-blur-2xl border-b border-gold/10 shadow-[0_1px_20px_rgba(201,169,110,0.05)]"
            : "top-[36px] bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          {/* Logo */}
          <a href="#" className="group flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center border border-gold/40 transition-colors duration-500 group-hover:border-gold">
              <span className="text-lg font-semibold tracking-wider text-gold">
                M
              </span>
            </div>
            <div className="flex flex-col">
              <span
                className={`text-xl font-semibold tracking-[0.2em] uppercase transition-colors duration-500 ${
                  scrolled ? "text-charcoal" : "text-cream"
                }`}
              >
                Maison
              </span>
              <span
                className={`text-[9px] font-light tracking-[0.35em] uppercase transition-colors duration-500 ${
                  scrolled ? "text-muted-foreground" : "text-cream/60"
                }`}
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                Miami Estates
              </span>
            </div>
          </a>

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
                <a
                  href={item.href}
                  className={`group relative flex items-center gap-1 text-[13px] tracking-[0.12em] uppercase transition-colors duration-300 ${
                    scrolled
                      ? "text-charcoal/70 hover:text-charcoal"
                      : "text-cream/80 hover:text-cream"
                  }`}
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown className="h-3 w-3 opacity-50" />
                  )}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
                </a>

                {/* Dropdown */}
                {item.children && (
                  <div
                    className={`absolute left-0 top-full pt-3 transition-all duration-300 ${
                      activeDropdown === item.label
                        ? "pointer-events-auto opacity-100 translate-y-0"
                        : "pointer-events-none opacity-0 translate-y-2"
                    }`}
                  >
                    <div className="min-w-[240px] border border-gold/10 bg-cream/95 p-2 shadow-xl backdrop-blur-2xl">
                      {item.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          className="flex items-center px-4 py-2.5 text-[12px] tracking-wide text-charcoal/70 transition-all duration-200 hover:bg-gold/5 hover:text-charcoal"
                          style={{
                            fontFamily: "var(--font-inter), sans-serif",
                          }}
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <a
              href="#schedule"
              className={`hidden border px-6 py-2.5 text-xs tracking-[0.2em] uppercase transition-all duration-500 lg:inline-block ${
                scrolled
                  ? "border-charcoal/20 text-charcoal hover:border-gold hover:bg-gold hover:text-cream"
                  : "border-cream/30 text-cream hover:border-gold hover:bg-gold hover:text-charcoal"
              }`}
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Private Inquiry
            </a>
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
      <div
        className={`fixed inset-0 z-40 bg-cream/98 backdrop-blur-3xl transition-all duration-700 xl:hidden ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex h-full flex-col overflow-y-auto px-6 pt-28 pb-10">
          <nav className="flex flex-col gap-1">
            {navLinks.map((item, i) => (
              <div key={item.label}>
                <div className="flex items-center justify-between">
                  <a
                    href={item.href}
                    onClick={() => {
                      if (!item.children) setMobileOpen(false)
                    }}
                    className="flex-1 py-4 text-2xl font-light tracking-[0.1em] text-charcoal uppercase transition-all duration-500 hover:text-gold"
                    style={{
                      transitionDelay: mobileOpen ? `${i * 60}ms` : "0ms",
                      opacity: mobileOpen ? 1 : 0,
                      transform: mobileOpen
                        ? "translateY(0)"
                        : "translateY(20px)",
                    }}
                  >
                    {item.label}
                  </a>
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

                {/* Mobile sub-links */}
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
                        <a
                          key={child.label}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="py-2 text-sm text-charcoal/60 transition-colors hover:text-gold"
                          style={{
                            fontFamily: "var(--font-inter), sans-serif",
                          }}
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Separator line */}
                <div className="h-px bg-charcoal/5" />
              </div>
            ))}
          </nav>

          {/* Mobile bottom info */}
          <div className="mt-auto pt-8 border-t border-charcoal/10">
            <a
              href="#schedule"
              onClick={() => setMobileOpen(false)}
              className="mb-6 block w-full border border-gold bg-gold px-8 py-4 text-center text-xs tracking-[0.2em] text-charcoal uppercase transition-all duration-500 hover:bg-gold-light"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Schedule Private Tour
            </a>
            <div
              className="flex flex-col gap-3"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
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
      </div>
    </>
  )
}
