"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface CinemaTextProps {
  text: string
  className?: string
  delay?: number
  wordDelay?: number
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span"
  once?: boolean
}

const ease = [0.22, 1, 0.36, 1] as const

function CinemaWords({
  words,
  isInView,
  delay,
  wordDelay,
}: {
  words: string[]
  isInView: boolean
  delay: number
  wordDelay: number
}) {
  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0, y: 5, filter: "blur(4px)" }}
          animate={
            isInView
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : undefined
          }
          transition={{
            duration: 0.5,
            delay: delay + i * wordDelay,
            ease,
          }}
          className="inline-block"
          style={{ marginRight: "0.3em" }}
        >
          {word}
        </motion.span>
      ))}
    </>
  )
}

export function CinemaText({
  text,
  className = "",
  delay = 0,
  wordDelay = 0.06,
  as: Tag = "p",
  once = true,
}: CinemaTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: "-40px" })
  const words = text.split(" ")

  const inner = (
    <CinemaWords
      words={words}
      isInView={isInView}
      delay={delay}
      wordDelay={wordDelay}
    />
  )

  return (
    <div ref={ref}>
      {Tag === "h1" && <h1 className={className}>{inner}</h1>}
      {Tag === "h2" && <h2 className={className}>{inner}</h2>}
      {Tag === "h3" && <h3 className={className}>{inner}</h3>}
      {Tag === "h4" && <h4 className={className}>{inner}</h4>}
      {Tag === "p" && <p className={className}>{inner}</p>}
      {Tag === "span" && <span className={className}>{inner}</span>}
    </div>
  )
}

interface CinemaBlockProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function CinemaBlock({
  children,
  className = "",
  delay = 0,
}: CinemaBlockProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-40px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 5, filter: "blur(6px)" }}
      animate={
        isInView
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : undefined
      }
      transition={{ duration: 0.8, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
