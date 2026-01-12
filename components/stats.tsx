"use client"

import { TrendingUp, Package, Building2, Globe } from "lucide-react"

const stats = [
  {
    icon: Package,
    value: "8,500+",
    label: "Items Shared",
    description: "Devices given new life",
  },
  {
    icon: Building2,
    value: "450+",
    label: "Organizations",
    description: "NGOs & businesses partnered",
  },
  {
    icon: TrendingUp,
    value: "$2.1M",
    label: "Value Circulated",
    description: "In donated technology",
  },
  {
    icon: Globe,
    value: "28",
    label: "Cities",
    description: "Across the network",
  },
]

export function Stats() {
  return (
    <section className="border-y border-border/50 bg-gradient-to-r from-card via-secondary/30 to-card py-14">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="group relative text-center transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 shadow-lg shadow-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/15 group-hover:shadow-xl group-hover:shadow-primary/20">
                <stat.icon className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div className="mb-1 text-3xl font-bold text-foreground sm:text-4xl">{stat.value}</div>
              <div className="text-sm font-semibold text-foreground">{stat.label}</div>
              <div className="text-xs text-muted-foreground">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
