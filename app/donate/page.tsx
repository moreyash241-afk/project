"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Upload, CheckCircle2, Leaf, Users, Recycle, Sparkles } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { categories } from "@/lib/data"
import { toast } from "sonner"

export default function DonatePage() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    condition: "",
    description: "",
    location: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    toast.success("Donation submitted successfully!", {
      description: "Our team will review your listing and publish it soon.",
    })
  }

  const impactStats = [
    { icon: Leaf, value: "2.5kg", label: "E-waste diverted per device" },
    { icon: Users, value: "12,000+", label: "People helped" },
    { icon: Recycle, value: "95%", label: "Items successfully redistributed" },
  ]

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-20">
          <div className="mx-auto max-w-lg text-center">
            <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>
            <h1 className="mb-4 text-3xl font-bold text-foreground">Thank You!</h1>
            <p className="mb-8 text-lg text-muted-foreground">
              Your donation submission has been received. Our team will review it and get back to you within 24 hours.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/browse">
                <Button size="lg" className="w-full sm:w-auto">
                  Browse Listings
                </Button>
              </Link>
              <Button size="lg" variant="outline" onClick={() => setSubmitted(false)} className="w-full sm:w-auto">
                Donate Another Item
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-8">
        <div className="container mx-auto px-4">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Form Section */}
            <div>
              <div className="mb-8">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                  <Sparkles className="h-4 w-4" />
                  Make an Impact
                </div>
                <h1 className="mb-3 text-3xl font-bold text-foreground lg:text-4xl">Donate Technology</h1>
                <p className="text-lg text-muted-foreground">
                  Give your unused devices a second life and help bridge the digital divide.
                </p>
              </div>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>Item Details</CardTitle>
                  <CardDescription>Tell us about the device you&apos;d like to donate</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Item Title</Label>
                      <Input
                        id="title"
                        placeholder="e.g., MacBook Pro 2019 - 16GB RAM"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(v) => setFormData({ ...formData, category: v })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat.slug} value={cat.slug}>
                                {cat.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="condition">Condition</Label>
                        <Select
                          value={formData.condition}
                          onValueChange={(v) => setFormData({ ...formData, condition: v })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select condition" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="like-new">Like New</SelectItem>
                            <SelectItem value="excellent">Excellent</SelectItem>
                            <SelectItem value="good">Good</SelectItem>
                            <SelectItem value="fair">Fair</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe the item, its specifications, and any issues..."
                        rows={4}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Pickup Location</Label>
                      <Input
                        id="location"
                        placeholder="City, State"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Photos</Label>
                      <div className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border transition-colors hover:border-primary/50 hover:bg-primary/5">
                        <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Click to upload photos</p>
                      </div>
                    </div>

                    <Button type="submit" size="lg" className="w-full gap-2 shadow-lg shadow-primary/25">
                      <Recycle className="h-5 w-5" />
                      Submit Donation
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Impact Section */}
            <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <Card className="overflow-hidden border-border/50 bg-gradient-to-br from-primary/5 via-background to-accent/5">
                <CardContent className="p-6">
                  <h3 className="mb-6 text-xl font-semibold text-foreground">Your Impact Matters</h3>
                  <div className="space-y-6">
                    {impactStats.map((stat) => (
                      <div key={stat.label} className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                          <stat.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                          <p className="text-sm text-muted-foreground">{stat.label}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h3 className="mb-4 font-semibold text-foreground">What happens next?</h3>
                  <ol className="space-y-4">
                    {[
                      "We review your submission within 24 hours",
                      "Your listing goes live for recipients to discover",
                      "Interested recipients send you requests",
                      "You choose who to donate to and arrange handoff",
                    ].map((step, i) => (
                      <li key={step} className="flex gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                          {i + 1}
                        </span>
                        <span className="text-sm text-muted-foreground">{step}</span>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
