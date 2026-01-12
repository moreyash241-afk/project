"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Recycle, Search, Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

export function Header() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/browse?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const navLinks = [
    { href: "/browse", label: "Browse" },
    { href: "/about#how-it-works", label: "How It Works" },
    { href: "/donate", label: "Donate" },
    { href: "/about", label: "About" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-18 items-center justify-between px-4">
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/25 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-primary/30">
            <Recycle className="h-5 w-5 text-primary-foreground transition-transform duration-300 group-hover:rotate-180" />
          </div>
          <span className="text-xl font-bold text-foreground">CycleShare</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="relative px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="relative z-10">{link.label}</span>
              <span className="absolute inset-0 scale-0 rounded-lg bg-secondary transition-transform hover:scale-100" />
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <form
            onSubmit={handleSearch}
            className={`relative transition-all duration-300 ${searchFocused ? "w-72" : "w-56"}`}
          >
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search tech..."
              className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-primary/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </form>
          <Link href="/signin">
            <Button variant="ghost" size="sm" className="font-medium transition-all duration-200 hover:bg-secondary">
              Sign In
            </Button>
          </Link>
          <Link href="/signup">
            <Button
              size="sm"
              className="gap-2 shadow-lg shadow-primary/25 transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-primary/30"
            >
              <Sparkles className="h-4 w-4" />
              Get Started
            </Button>
          </Link>
        </div>

        <button
          className="relative flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-secondary md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="relative h-5 w-5">
            <span
              className={`absolute left-0 top-0.5 h-0.5 w-5 rounded-full bg-foreground transition-all duration-300 ${isMenuOpen ? "top-2 rotate-45" : ""}`}
            />
            <span
              className={`absolute left-0 top-2 h-0.5 w-5 rounded-full bg-foreground transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`absolute left-0 top-3.5 h-0.5 w-5 rounded-full bg-foreground transition-all duration-300 ${isMenuOpen ? "top-2 -rotate-45" : ""}`}
            />
          </div>
        </button>
      </div>

      <div
        className={`overflow-hidden border-t border-border/50 bg-background transition-all duration-300 md:hidden ${isMenuOpen ? "max-h-96" : "max-h-0"}`}
      >
        <nav className="container mx-auto flex flex-col gap-2 px-4 py-4">
          {navLinks.map((link, i) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
              style={{ animationDelay: `${i * 50}ms` }}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-2 flex gap-2 border-t border-border pt-4">
            <Link href="/signin" className="flex-1">
              <Button variant="ghost" size="sm" className="w-full">
                Sign In
              </Button>
            </Link>
            <Link href="/signup" className="flex-1">
              <Button size="sm" className="w-full gap-2 shadow-lg shadow-primary/25">
                <Sparkles className="h-4 w-4" />
                Get Started
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
