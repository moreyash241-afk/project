"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Leaf, Users, RefreshCw, Sparkles } from "lucide-react"
import Link from "next/link"

export function Hero() {
  const [isHovered, setIsHovered] = useState<string | null>(null)

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-sm font-medium text-primary shadow-lg shadow-primary/10 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/20">
            <Leaf className="h-4 w-4 animate-pulse" />
            <span>Reducing E-Waste Together</span>
            <span className="flex h-2 w-2 rounded-full bg-primary">
              <span className="absolute h-2 w-2 animate-ping rounded-full bg-primary/50" />
            </span>
          </div>

          <h1 className="mb-6 text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl">
            Give Technology a{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                Second Life
              </span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                <path
                  d="M2 10C50 4 150 4 198 10"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="text-primary/40"
                />
              </svg>
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-pretty text-lg text-muted-foreground lg:text-xl">
            Join our community marketplace where surplus tech finds new purpose. Donate unused devices, access
            affordable refurbished electronics, and help build a more sustainable future.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/browse">
              <Button
                size="lg"
                className="group relative gap-2 overflow-hidden px-8 py-6 text-base shadow-xl shadow-primary/25 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/30"
                onMouseEnter={() => setIsHovered("browse")}
                onMouseLeave={() => setIsHovered(null)}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Browsing
                  <ArrowRight
                    className={`h-4 w-4 transition-transform duration-300 ${isHovered === "browse" ? "translate-x-1" : ""}`}
                  />
                </span>
                <span className="absolute inset-0 -z-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Button>
            </Link>
            <Link href="/donate">
              <Button
                size="lg"
                variant="outline"
                className="group gap-2 border-2 bg-transparent px-8 py-6 text-base transition-all duration-300 hover:scale-105 hover:border-primary hover:bg-primary/5"
                onMouseEnter={() => setIsHovered("donate")}
                onMouseLeave={() => setIsHovered(null)}
              >
                <Sparkles
                  className={`h-4 w-4 transition-all duration-300 ${isHovered === "donate" ? "rotate-12 scale-110 text-primary" : ""}`}
                />
                Donate Tech
              </Button>
            </Link>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-6 lg:gap-12">
            {[
              { icon: Users, value: "12,000+", label: "Members" },
              { icon: RefreshCw, value: "8,500+", label: "Items Circulated" },
              { icon: Leaf, value: "45 Tons", label: "E-Waste Saved" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="group flex cursor-default items-center gap-3 rounded-2xl border border-transparent bg-card/50 px-5 py-3 shadow-sm transition-all duration-300 hover:border-primary/20 hover:bg-card hover:shadow-lg"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <div className="text-lg font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute -left-40 -top-40 h-80 w-80 animate-pulse rounded-full bg-primary/10 blur-3xl" />
      <div
        className="pointer-events-none absolute -bottom-40 -right-40 h-80 w-80 animate-pulse rounded-full bg-accent/15 blur-3xl"
        style={{ animationDelay: "1s" }}
      />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
    </section>
  )
}
