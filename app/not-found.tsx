import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-charcoal px-6">
      <div className="max-w-md text-center">
        <div className="mb-6 inline-flex items-center gap-3">
          <span className="h-px w-8 bg-gold" />
          <span className="font-sans text-xs tracking-[0.4em] text-gold uppercase">
            Page Not Found
          </span>
          <span className="h-px w-8 bg-gold" />
        </div>
        <h1 className="mb-4 font-serif text-6xl font-light tracking-tight text-cream">
          404
        </h1>
        <p className="mb-8 font-sans text-sm leading-relaxed text-cream/50">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let us guide you back to our portfolio.
        </p>
        <Link
          href="/"
          className="inline-flex items-center border border-gold bg-gold px-8 py-3 font-sans text-xs tracking-[0.2em] text-charcoal uppercase transition-all duration-500 hover:bg-gold-light"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}
