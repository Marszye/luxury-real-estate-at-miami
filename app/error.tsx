'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Optionally report to error tracking service
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-charcoal px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-md text-center"
      >
        <div className="mb-8 inline-flex h-16 w-16 items-center justify-center border border-gold/40">
          <span className="font-serif text-2xl font-light text-gold">!</span>
        </div>
        <h1 className="mb-4 font-serif text-3xl font-light tracking-tight text-cream">
          Something went wrong
        </h1>
        <p className="mb-8 font-sans text-sm leading-relaxed text-cream/50">
          We apologize for the inconvenience. Please try again or contact our
          concierge team for immediate assistance.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center border border-gold bg-gold px-8 py-3 font-sans text-xs tracking-[0.2em] text-charcoal uppercase transition-all duration-500 hover:bg-gold-light"
        >
          Try Again
        </button>
      </motion.div>
    </div>
  )
}
