import { Playfair_Display } from "next/font/google"

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair-studio",
})

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={playfair.variable} style={{ fontFamily: "var(--font-playfair-studio), 'Playfair Display', Georgia, serif" }}>
      {children}
    </div>
  )
}
