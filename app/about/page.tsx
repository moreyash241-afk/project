"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Target, Eye, Heart, Leaf, Users, Globe, Recycle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const values = [
  {
    icon: Leaf,
    title: "Sustainability",
    description: "Every device reused is one less in a landfill. We're committed to reducing e-waste.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Building connections between donors and recipients to create lasting impact.",
  },
  {
    icon: Heart,
    title: "Accessibility",
    description: "Making technology accessible to everyone, regardless of economic status.",
  },
  {
    icon: Globe,
    title: "Global Impact",
    description: "Creating ripples of change that extend beyond our local community.",
  },
]

const team = [
  { name: "Sarah Chen", role: "Founder & CEO", image: "/professional-woman-headshot.png" },
  { name: "Marcus Johnson", role: "Head of Operations", image: "/professional-man-headshot.png" },
  { name: "Elena Rodriguez", role: "Community Lead", image: "/professional-latina-woman-headshot.png" },
  { name: "David Kim", role: "Tech Lead", image: "/professional-asian-man-headshot.png" },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <Link
              href="/"
              className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-6 text-4xl font-bold text-foreground lg:text-5xl">
                Building a <span className="text-primary">Circular Economy</span> for Technology
              </h1>
              <p className="text-lg text-muted-foreground lg:text-xl">
                CycleShare was founded with a simple mission: to give technology a second life while bridging the
                digital divide and protecting our planet.
              </p>
            </div>
          </div>
          <div className="pointer-events-none absolute -left-40 -top-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
        </section>

        {/* Mission & Vision */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-2">
              <Card className="overflow-hidden border-border/50">
                <CardContent className="p-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-foreground">Our Mission</h3>
                  <p className="text-muted-foreground">
                    To create a sustainable ecosystem where technology is shared, not wasted. We connect individuals and
                    organizations with surplus devices to those who need them most, reducing e-waste while promoting
                    digital inclusion.
                  </p>
                </CardContent>
              </Card>
              <Card className="overflow-hidden border-border/50">
                <CardContent className="p-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                    <Eye className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-foreground">Our Vision</h3>
                  <p className="text-muted-foreground">
                    A world where no functional technology goes to waste and everyone has access to the digital tools
                    they need to thrive. We envision communities empowered through shared resources and sustainable
                    practices.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-secondary/30 py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">Our Values</h2>
              <p className="mx-auto max-w-xl text-muted-foreground">The principles that guide everything we do</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => (
                <Card
                  key={value.title}
                  className="group border-border/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                      <value.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="mb-2 font-semibold text-foreground">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
              {[
                { value: "45+", label: "Tons of E-Waste Saved" },
                { value: "12,000+", label: "Community Members" },
                { value: "8,500+", label: "Devices Redistributed" },
                { value: "$2.1M", label: "Value Shared" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="mb-2 text-4xl font-bold text-primary lg:text-5xl">{stat.value}</p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="bg-secondary/30 py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">Meet Our Team</h2>
              <p className="mx-auto max-w-xl text-muted-foreground">
                Passionate individuals dedicated to making technology accessible to all
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((member) => (
                <Card key={member.name} className="group overflow-hidden border-border/50">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-4 text-center">
                    <h3 className="font-semibold text-foreground">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">Join Our Mission</h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Whether you have technology to share or are looking for devices, become part of our growing community.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link href="/donate">
                  <Button size="lg" className="w-full gap-2 shadow-lg shadow-primary/25 sm:w-auto">
                    <Recycle className="h-5 w-5" />
                    Donate Technology
                  </Button>
                </Link>
                <Link href="/browse">
                  <Button size="lg" variant="outline" className="w-full gap-2 sm:w-auto bg-transparent">
                    Browse Listings
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
