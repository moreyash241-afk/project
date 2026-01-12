"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Quote, Star } from "lucide-react"

const testimonials = [
  {
    quote:
      "CycleShare helped us donate 50+ laptops to local schools. The process was seamless, and we could track the impact of our contribution.",
    author: "Sarah Chen",
    role: "IT Director, TechCorp",
    avatar: "/professional-asian-woman.png",
    rating: 5,
  },
  {
    quote:
      "As a nonprofit, we saved thousands by sourcing refurbished equipment through CycleShare. The quality exceeded our expectations.",
    author: "Marcus Johnson",
    role: "Executive Director, Code4Good",
    avatar: "/professional-black-man-portrait.png",
    rating: 5,
  },
  {
    quote:
      "I found a great laptop for my daughter's remote learning. The donor was incredibly kind, and the exchange was safe and easy.",
    author: "Elena Rodriguez",
    role: "Parent & Community Member",
    avatar: "/woman-latina-smiling-portrait.jpg",
    rating: 5,
  },
]

export function Testimonials() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="bg-gradient-to-b from-secondary/30 via-secondary/50 to-secondary/30 py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="mb-14 text-center">
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Testimonials
          </span>
          <h2 className="mb-4 text-balance text-3xl font-bold text-foreground lg:text-4xl">Community Stories</h2>
          <p className="text-muted-foreground">See how CycleShare is making a difference</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.author}
              className="group relative overflow-hidden border-border/50 transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <CardContent className="relative p-8">
                <Quote
                  className={`absolute -right-4 -top-4 h-24 w-24 transition-all duration-300 ${hoveredIndex === index ? "text-primary/15 rotate-12" : "text-primary/5"}`}
                />

                {/* Star rating */}
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>

                <p className="relative mb-6 text-foreground leading-relaxed">{testimonial.quote}</p>

                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 ring-2 ring-primary/20 transition-all duration-300 group-hover:ring-primary/40">
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.author} />
                    <AvatarFallback className="bg-primary/10 text-primary font-medium">
                      {testimonial.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
