"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Building2, User, Sparkles, CheckCircle2 } from "lucide-react"
import Link from "next/link"

const benefits = [
  "Join 12,000+ community members",
  "Access verified donors & recipients",
  "Track your environmental impact",
]

export function CTA() {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null)

  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary via-primary to-primary/90 shadow-2xl shadow-primary/30">
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />

          <div className="relative grid lg:grid-cols-2">
            <div className="p-10 lg:p-14">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-primary-foreground/90">
                <Sparkles className="h-4 w-4" />
                Join the Movement
              </div>

              <h2 className="mb-5 text-balance text-3xl font-bold text-primary-foreground lg:text-4xl xl:text-5xl">
                Ready to Make a Difference?
              </h2>

              <p className="mb-8 max-w-lg text-lg text-primary-foreground/80">
                Whether you have technology to share or are looking for affordable devices, join our community and be
                part of the circular economy movement.
              </p>

              <ul className="mb-10 space-y-3">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3 text-primary-foreground/90">
                    <CheckCircle2 className="h-5 w-5 text-accent" />
                    {benefit}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/signup">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="group gap-2 px-8 py-6 text-base shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                    onMouseEnter={() => setHoveredButton("individual")}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    <User
                      className={`h-5 w-5 transition-transform duration-300 ${hoveredButton === "individual" ? "scale-110" : ""}`}
                    />
                    Join as Individual
                    <ArrowRight
                      className={`h-4 w-4 transition-transform duration-300 ${hoveredButton === "individual" ? "translate-x-1" : ""}`}
                    />
                  </Button>
                </Link>
                <Link href="/signup?type=organization">
                  <Button
                    size="lg"
                    variant="outline"
                    className="group gap-2 border-2 border-primary-foreground/30 bg-transparent px-8 py-6 text-base text-primary-foreground transition-all duration-300 hover:scale-105 hover:border-primary-foreground/50 hover:bg-primary-foreground/10"
                    onMouseEnter={() => setHoveredButton("org")}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    <Building2
                      className={`h-5 w-5 transition-transform duration-300 ${hoveredButton === "org" ? "scale-110" : ""}`}
                    />
                    Partner as Organization
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-transparent" />
              <div className="absolute inset-0 bg-[url('/diverse-people-sharing-technology-devices-communit.jpg')] bg-cover bg-center opacity-20" />

              <div className="absolute bottom-10 right-10 flex flex-col gap-4">
                <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
                  <div className="text-3xl font-bold text-primary-foreground">45+</div>
                  <div className="text-sm text-primary-foreground/80">Tons of e-waste saved</div>
                </div>
                <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
                  <div className="text-3xl font-bold text-primary-foreground">$2.1M</div>
                  <div className="text-sm text-primary-foreground/80">Value redistributed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
