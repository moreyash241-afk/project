"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Clock, Heart, Search, Filter, Grid3X3, List, ArrowLeft, Eye, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { allListings, categories, conditionColors, typeColors } from "@/lib/data"
import { QuickViewModal } from "@/components/quick-view-modal"

export default function BrowsePage() {
  const [favorites, setFavorites] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedCondition, setSelectedCondition] = useState<string>("all")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [quickViewListing, setQuickViewListing] = useState<(typeof allListings)[0] | null>(null)

  const filteredListings = useMemo(() => {
    return allListings.filter((listing) => {
      const matchesSearch =
        listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "all" || listing.category === selectedCategory
      const matchesCondition = selectedCondition === "all" || listing.condition === selectedCondition
      const matchesType = selectedType === "all" || listing.type === selectedType
      return matchesSearch && matchesCategory && matchesCondition && matchesType
    })
  }, [searchQuery, selectedCategory, selectedCondition, selectedType])

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

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setSelectedCondition("all")
    setSelectedType("all")
  }

  const hasActiveFilters =
    searchQuery || selectedCategory !== "all" || selectedCondition !== "all" || selectedType !== "all"

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8">
            <Link
              href="/"
              className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="text-3xl font-bold text-foreground lg:text-4xl">Browse All Technology</h1>
            <p className="mt-2 text-muted-foreground">Find the perfect device from our community</p>
          </div>

          {/* Filters */}
          <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-border/50 bg-card p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
            <div className="relative flex-1 lg:max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search devices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[160px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.slug} value={cat.slug}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Conditions</SelectItem>
                  <SelectItem value="Like New">Like New</SelectItem>
                  <SelectItem value="Excellent">Excellent</SelectItem>
                  <SelectItem value="Good">Good</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Free">Free</SelectItem>
                  <SelectItem value="Donation">Donation</SelectItem>
                  <SelectItem value="Subsidized">Subsidized</SelectItem>
                </SelectContent>
              </Select>

              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="gap-1 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                  Clear
                </Button>
              )}

              <div className="flex items-center gap-1 rounded-lg border border-border p-1">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <p className="mb-6 text-sm text-muted-foreground">
            Showing {filteredListings.length} of {allListings.length} items
          </p>

          {/* Listings Grid */}
          <div
            className={
              viewMode === "grid" ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "flex flex-col gap-4"
            }
          >
            {filteredListings.map((listing) => (
              <Link key={listing.id} href={`/listing/${listing.id}`}>
                <Card
                  className={`group h-full overflow-hidden border-border/50 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl ${viewMode === "list" ? "flex flex-row" : ""}`}
                >
                  <div
                    className={`relative overflow-hidden bg-muted ${viewMode === "list" ? "aspect-square w-48" : "aspect-[4/3]"}`}
                  >
                    <Image
                      src={listing.image || "/placeholder.svg"}
                      alt={listing.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <button
                      className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur transition-all duration-300 ${
                        favorites.includes(listing.id)
                          ? "bg-red-500 text-white"
                          : "bg-background/80 hover:bg-background hover:scale-110"
                      }`}
                      onClick={(e) => toggleFavorite(e, listing.id)}
                    >
                      <Heart className={`h-4 w-4 ${favorites.includes(listing.id) ? "fill-current" : ""}`} />
                    </button>
                    <div className="absolute left-3 top-3">
                      <Badge className={`${typeColors[listing.type]} shadow-lg`}>{listing.type}</Badge>
                    </div>

                    {/* Quick View button */}
                    <div className="absolute bottom-3 left-3 right-3 flex justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="gap-2 shadow-lg"
                        onClick={(e) => openQuickView(e, listing)}
                      >
                        <Eye className="h-4 w-4" />
                        Quick View
                      </Button>
                    </div>
                  </div>

                  <div className={viewMode === "list" ? "flex flex-1 flex-col" : ""}>
                    <CardContent className="p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="rounded-md bg-secondary px-2 py-1 text-xs font-medium text-muted-foreground">
                          {listing.categoryName}
                        </span>
                        <Badge variant="outline" className={`${conditionColors[listing.condition]} border`}>
                          {listing.condition}
                        </Badge>
                      </div>
                      <h3 className="mb-2 line-clamp-1 font-semibold text-foreground transition-colors group-hover:text-primary">
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

                    <CardFooter className="flex items-center justify-between border-t border-border/50 px-4 py-3">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {listing.location}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {listing.postedAt}
                      </div>
                    </CardFooter>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {filteredListings.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">No items found</h3>
              <p className="mb-4 text-muted-foreground">Try adjusting your search or filters</p>
              <Button variant="outline" onClick={clearFilters}>
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Quick View Modal */}
      <QuickViewModal
        listing={quickViewListing}
        isOpen={!!quickViewListing}
        onClose={() => setQuickViewListing(null)}
        onFavorite={(id) => toggleFavorite(undefined, id)}
        isFavorite={quickViewListing ? favorites.includes(quickViewListing.id) : false}
      />
    </div>
  )
}
