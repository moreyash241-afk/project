"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Heart, ArrowRight, Eye, Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { allListings, conditionColors, typeColors } from "@/lib/data"
import { QuickViewModal } from "@/components/quick-view-modal"

export function FeaturedListings() {
  const [favorites, setFavorites] = useState<number[]>([])
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [quickViewListing, setQuickViewListing] = useState<(typeof allListings)[0] | null>(null)

  const toggleFavorite = (e: React.MouseEvent | undefined, id: number) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]))
  }

  const openQuickView = (e: React.MouseEvent, listing: (typeof allListings)[0]) => {
    e.preventDefault()
    e.stopPropagation()
    setQuickViewListing(listing)
  }

  // Show first 6 listings as featured
  const featuredListings = allListings.slice(0, 6)

  return (
    <section className="bg-gradient-to-b from-secondary/30 via-secondary/50 to-secondary/30 py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              Featured
            </span>
            <h2 className="mb-3 text-balance text-3xl font-bold text-foreground lg:text-4xl">Featured Listings</h2>
            <p className="max-w-md text-muted-foreground">Recently added technology looking for a new home</p>
          </div>
          <Link href="/browse">
            <Button
              variant="outline"
              className="group hidden gap-2 bg-transparent transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground sm:flex"
            >
              View All Listings
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredListings.map((listing) => (
            <Link
              key={listing.id}
              href={`/listing/${listing.id}`}
              onMouseEnter={() => setHoveredId(listing.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <Card className="group h-full overflow-hidden border-border/50 transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10">
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <Image
                    src={listing.image || "/placeholder.svg"}
                    alt={listing.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent transition-opacity duration-300 ${hoveredId === listing.id ? "opacity-100" : "opacity-0"}`}
                  />

                  <button
                    className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur transition-all duration-300 ${
                      favorites.includes(listing.id)
                        ? "bg-red-500 text-white scale-110"
                        : "bg-background/80 hover:bg-background hover:scale-110"
                    }`}
                    aria-label="Add to favorites"
                    onClick={(e) => toggleFavorite(e, listing.id)}
                  >
                    <Heart
                      className={`h-5 w-5 transition-all duration-300 ${favorites.includes(listing.id) ? "fill-current animate-pulse" : ""}`}
                    />
                  </button>

                  <div className="absolute left-3 top-3 flex gap-2">
                    <Badge className={`${typeColors[listing.type]} shadow-lg`}>{listing.type}</Badge>
                  </div>

                  <div
                    className={`absolute bottom-3 left-3 right-3 flex justify-center transition-all duration-300 ${hoveredId === listing.id ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                  >
                    <Button
                      size="sm"
                      variant="secondary"
                      className="gap-2 shadow-lg transition-transform hover:scale-105"
                      onClick={(e) => openQuickView(e, listing)}
                    >
                      <Eye className="h-4 w-4" />
                      Quick View
                    </Button>
                  </div>
                </div>

                <CardContent className="p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="rounded-md bg-secondary px-2 py-1 text-xs font-medium text-muted-foreground">
                      {listing.categoryName}
                    </span>
                    <Badge variant="outline" className={`${conditionColors[listing.condition]} border`}>
                      {listing.condition}
                    </Badge>
                  </div>
                  <h3 className="mb-2 line-clamp-1 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                    {listing.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">From {listing.donor}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Eye className="h-3 w-3" />
                      {listing.views || 0}
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex items-center justify-between border-t border-border/50 px-5 py-4">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    {listing.location}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    {listing.postedAt}
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center sm:hidden">
          <Link href="/browse">
            <Button variant="outline" className="w-full gap-2 bg-transparent">
              View All Listings
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        listing={quickViewListing}
        isOpen={!!quickViewListing}
        onClose={() => setQuickViewListing(null)}
        onFavorite={(id) => toggleFavorite(undefined, id)}
        isFavorite={quickViewListing ? favorites.includes(quickViewListing.id) : false}
      />
    </section>
  )
}
