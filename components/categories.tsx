"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { categories } from "@/lib/data"

export function Categories() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="categories" className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Categories
          </span>
          <h2 className="mb-4 text-balance text-3xl font-bold text-foreground lg:text-4xl">Browse by Category</h2>
          <p className="mx-auto max-w-xl text-muted-foreground">Find the technology you need from our community</p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              href={`/browse/${category.slug}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Card
                className={`group relative h-full cursor-pointer overflow-hidden border-border/50 transition-all duration-500 hover:-translate-y-2 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10`}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/50 to-foreground/20 transition-opacity duration-300 group-hover:from-primary/90 group-hover:via-primary/60 group-hover:to-primary/30" />
                </div>

                <CardContent className="relative flex flex-col items-center p-6 text-center lg:p-8">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-background/90 backdrop-blur transition-all duration-300 group-hover:scale-110 group-hover:bg-background group-hover:shadow-lg">
                    {category.icon && (
                      <category.icon className="h-8 w-8 text-primary transition-all duration-300 group-hover:scale-110" />
                    )}
                  </div>
                  <h3 className="mb-1 font-semibold text-background transition-colors">{category.name}</h3>
                  <p className="mb-3 text-sm text-background/80">{category.count} items</p>
                  <div
                    className={`flex items-center gap-1 rounded-full bg-background/90 px-3 py-1.5 text-xs font-medium text-primary shadow-lg backdrop-blur transition-all duration-300 ${hoveredIndex === index ? "translate-y-0 opacity-100 scale-100" : "translate-y-4 opacity-0 scale-90"}`}
                  >
                    Browse <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
