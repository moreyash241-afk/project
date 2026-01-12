"use client"

import { useState } from "react"
import { Upload, Search, Truck, Heart, ArrowRight } from "lucide-react"

const steps = [
  {
    icon: Upload,
    title: "List or Donate",
    description: "Upload your unused technology with photos and details. Set as free, donation, or subsidized pricing.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Search,
    title: "Browse & Request",
    description:
      "Search our marketplace for the tech you need. Filter by category, condition, location, and availability.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Truck,
    title: "Connect & Collect",
    description: "Coordinate pickup or delivery with the donor. Our platform facilitates safe, verified exchanges.",
    color: "from-orange-500 to-amber-500",
  },
  {
    icon: Heart,
    title: "Track Your Impact",
    description: "See the environmental and social impact of your contributions. Build your sustainability profile.",
    color: "from-pink-500 to-rose-500",
  },
]

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState<number | null>(null)

  return (
    <section id="how-it-works" className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="mb-14 text-center">
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Simple Process
          </span>
          <h2 className="mb-4 text-balance text-3xl font-bold text-foreground lg:text-4xl">How It Works</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Join thousands of individuals and organizations in the circular economy movement
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 top-16 hidden h-1 w-[calc(100%-280px)] -translate-x-1/2 overflow-hidden rounded-full bg-border lg:block">
            <div className="h-full w-full bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-shimmer" />
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="group relative text-center"
                onMouseEnter={() => setActiveStep(index)}
                onMouseLeave={() => setActiveStep(null)}
              >
                <div className="relative mx-auto mb-6 flex h-28 w-28 items-center justify-center">
                  {/* Outer ring */}
                  <div
                    className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.color} opacity-10 transition-all duration-300 group-hover:scale-110 group-hover:opacity-20`}
                  />
                  {/* Inner circle */}
                  <div
                    className={`relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${step.color} shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl`}
                  >
                    <step.icon className="h-9 w-9 text-white transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  {/* Step number */}
                  <div className="absolute -right-1 -top-1 flex h-9 w-9 items-center justify-center rounded-full border-4 border-background bg-accent text-sm font-bold text-accent-foreground shadow-lg transition-all duration-300 group-hover:scale-110">
                    {index + 1}
                  </div>
                </div>

                <h3 className="mb-3 text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
                  {step.title}
                </h3>
                <p className="mx-auto max-w-xs text-sm leading-relaxed text-muted-foreground">{step.description}</p>

                {index < steps.length - 1 && (
                  <ArrowRight
                    className={`absolute -right-4 top-14 hidden h-6 w-6 text-muted-foreground/50 transition-all duration-300 lg:block ${activeStep === index ? "translate-x-1 text-primary" : ""}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
