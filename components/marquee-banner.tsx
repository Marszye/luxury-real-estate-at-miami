"use client"

const neighborhoods = [
  "Fisher Island",
  "Star Island",
  "Miami Beach",
  "Brickell",
  "Coconut Grove",
  "Coral Gables",
  "Sunny Isles",
  "Key Biscayne",
  "Bal Harbour",
  "Surfside",
]

export function MarqueeBanner() {
  return (
    <div className="border-y border-border bg-background overflow-hidden py-5">
      <div className="flex animate-[marquee_30s_linear_infinite] whitespace-nowrap">
        {[...neighborhoods, ...neighborhoods].map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="mx-8 flex items-center gap-8 text-sm tracking-[0.2em] text-muted-foreground/60 uppercase font-sans"
          >
            {name}
            <span className="h-1 w-1 rounded-full bg-gold/40 font-sans" />
          </span>
        ))}
      </div>
    </div>
  )
}
