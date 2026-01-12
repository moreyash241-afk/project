"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Recycle, ArrowRight, Mail, Twitter, Linkedin, Github, Instagram } from "lucide-react"

const footerLinks = {
  Platform: [
    { label: "Browse Listings", href: "/browse" },
    { label: "Donate Tech", href: "/donate" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "/pricing" },
  ],
  Community: [
    { label: "Success Stories", href: "/stories" },
    { label: "Partner Organizations", href: "/partners" },
    { label: "Impact Report", href: "/impact" },
    { label: "Blog", href: "/blog" },
  ],
  Support: [
    { label: "Help Center", href: "/help" },
    { label: "Safety Guidelines", href: "/safety" },
    { label: "Contact Us", href: "/contact" },
    { label: "FAQs", href: "/faqs" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
}

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Instagram, href: "#", label: "Instagram" },
]

export function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  return (
    <footer className="border-t border-border/50 bg-gradient-to-b from-card to-secondary/20">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-16 flex flex-col items-center justify-between gap-6 rounded-2xl bg-primary/5 p-8 lg:flex-row lg:p-10">
          <div className="text-center lg:text-left">
            <h3 className="mb-2 text-xl font-bold text-foreground">Stay in the Loop</h3>
            <p className="text-muted-foreground">Get updates on new listings and impact stories</p>
          </div>
          <form onSubmit={handleSubscribe} className="flex w-full max-w-md gap-3">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              type="submit"
              className="gap-2 shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-105"
            >
              {isSubscribed ? "Subscribed!" : "Subscribe"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="group mb-5 flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/25 transition-all duration-300 group-hover:scale-110">
                <Recycle className="h-5 w-5 text-primary-foreground transition-transform duration-300 group-hover:rotate-180" />
              </div>
              <span className="text-xl font-bold text-foreground">CycleShare</span>
            </Link>
            <p className="mb-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Building a sustainable future through technology sharing. Join our community and reduce e-waste together.
            </p>

            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:bg-primary hover:text-primary-foreground hover:shadow-lg"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="mb-4 text-sm font-semibold text-foreground">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-all duration-200 hover:translate-x-1 hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} CycleShare. All rights reserved.</p>
          <p className="text-xs text-muted-foreground">Made with care for a sustainable future</p>
        </div>
      </div>
    </footer>
  )
}
