"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  MapPin,
  Clock,
  Heart,
  Share2,
  ArrowLeft,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Eye,
  Users,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { allListings, conditionColors, typeColors } from "@/lib/data"
import { toast } from "sonner"

export default function ListingPage() {
  const params = useParams()
  const listingId = Number(params.id)
  const listing = allListings.find((l) => l.id === listingId)

  const [isFavorite, setIsFavorite] = useState(false)
  const [requestSent, setRequestSent] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!listing) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-20 text-center">
          <h1 className="mb-4 text-2xl font-bold">Listing not found</h1>
          <Link href="/browse">
            <Button>Browse all listings</Button>
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  const images = listing.images || [listing.image]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleRequest = () => {
    setRequestSent(true)
    toast.success("Request sent successfully!", {
      description: "The donor will be notified and will contact you soon.",
    })
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success("Link copied to clipboard!")
  }

  const handleFavorite = () => {
    setIsFavorite(!isFavorite)
    toast.success(isFavorite ? "Removed from favorites" : "Added to favorites!")
  }

  // Get related listings from same category
  const relatedListings = allListings.filter((l) => l.category === listing.category && l.id !== listing.id).slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Back Link */}
          <Link
            href="/browse"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Browse
          </Link>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Image Section with Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
                <Image
                  src={images[currentImageIndex] || "/placeholder.svg"}
                  alt={listing.title}
                  fill
                  className="object-cover transition-all duration-500"
                />

                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-background/80 backdrop-blur shadow-lg transition-all hover:bg-background hover:scale-110"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-background/80 backdrop-blur shadow-lg transition-all hover:bg-background hover:scale-110"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}

                <div className="absolute left-4 top-4 flex gap-2">
                  <Badge className={`${typeColors[listing.type]} shadow-lg`}>{listing.type}</Badge>
                  <Badge
                    variant="outline"
                    className={`${conditionColors[listing.condition]} border bg-background/80 backdrop-blur`}
                  >
                    {listing.condition}
                  </Badge>
                </div>

                {/* Image Counter */}
                {images.length > 1 && (
                  <div className="absolute bottom-4 right-4 rounded-full bg-background/80 px-3 py-1 text-sm font-medium backdrop-blur">
                    {currentImageIndex + 1} / {images.length}
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg transition-all ${
                        index === currentImageIndex
                          ? "ring-2 ring-primary ring-offset-2"
                          : "opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image src={img || "/placeholder.svg"} alt={`View ${index + 1}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Stats Card */}
              <Card className="border-border/50">
                <CardContent className="flex items-center justify-around p-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-2xl font-bold text-foreground">
                      <Eye className="h-5 w-5 text-muted-foreground" />
                      {listing.views || 0}
                    </div>
                    <p className="text-xs text-muted-foreground">Views</p>
                  </div>
                  <Separator orientation="vertical" className="h-10" />
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-2xl font-bold text-foreground">
                      <Users className="h-5 w-5 text-muted-foreground" />
                      {listing.requests || 0}
                    </div>
                    <p className="text-xs text-muted-foreground">Requests</p>
                  </div>
                  <Separator orientation="vertical" className="h-10" />
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-2xl font-bold text-primary">
                      <Clock className="h-5 w-5" />
                      Active
                    </div>
                    <p className="text-xs text-muted-foreground">Status</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Details Section */}
            <div className="space-y-6">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-md bg-secondary px-2 py-1 text-xs font-medium text-muted-foreground">
                    {listing.categoryName}
                  </span>
                </div>
                <h1 className="mb-4 text-2xl font-bold text-foreground lg:text-3xl">{listing.title}</h1>
                <p className="text-muted-foreground">{listing.description}</p>
              </div>

              {/* Specs */}
              <div>
                <h3 className="mb-3 font-semibold text-foreground">Specifications</h3>
                <div className="flex flex-wrap gap-2">
                  {listing.specs.map((spec) => (
                    <span
                      key={spec}
                      className="rounded-full bg-secondary px-3 py-1.5 text-sm text-secondary-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Location & Time */}
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{listing.location}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Posted {listing.postedAt}</span>
                </div>
              </div>

              {/* Donor Card */}
              <Card className="border-border/50 transition-all hover:border-primary/30 hover:shadow-md">
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full bg-muted ring-2 ring-primary/20">
                    <Image
                      src={listing.donorAvatar || "/placeholder.svg"}
                      alt={listing.donor}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{listing.donor}</p>
                    <p className="flex items-center gap-1 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                      Verified Donor
                    </p>
                  </div>
                  <Link href={`/donor/${listing.donor.toLowerCase().replace(/\s+/g, "-")}`}>
                    <Button variant="outline" size="sm" className="transition-all hover:scale-105 bg-transparent">
                      View Profile
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  className="flex-1 gap-2 shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] hover:shadow-xl"
                  onClick={handleRequest}
                  disabled={requestSent}
                >
                  {requestSent ? (
                    <>
                      <CheckCircle2 className="h-5 w-5" />
                      Request Sent
                    </>
                  ) : (
                    <>
                      <MessageCircle className="h-5 w-5" />
                      Request This Item
                    </>
                  )}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className={`gap-2 transition-all hover:scale-[1.02] ${isFavorite ? "border-red-300 bg-red-50 text-red-600 hover:bg-red-100" : ""}`}
                  onClick={handleFavorite}
                >
                  <Heart className={`h-5 w-5 transition-transform ${isFavorite ? "fill-current scale-110" : ""}`} />
                  {isFavorite ? "Saved" : "Save"}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 transition-all hover:scale-[1.02] bg-transparent"
                  onClick={handleShare}
                >
                  <Share2 className="h-5 w-5" />
                  Share
                </Button>
              </div>

              {/* Info Notice */}
              <div className="flex items-start gap-3 rounded-xl bg-primary/5 p-4">
                <AlertCircle className="mt-0.5 h-5 w-5 text-primary" />
                <div className="text-sm">
                  <p className="font-medium text-foreground">How it works</p>
                  <p className="text-muted-foreground">
                    Click "Request This Item" to notify the donor. They will review your request and contact you to
                    arrange pickup or delivery.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Listings */}
          {relatedListings.length > 0 && (
            <div className="mt-16">
              <h2 className="mb-6 text-2xl font-bold text-foreground">Related Items</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedListings.map((related) => (
                  <Link key={related.id} href={`/listing/${related.id}`}>
                    <Card className="group h-full overflow-hidden border-border/50 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl">
                      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                        <Image
                          src={related.image || "/placeholder.svg"}
                          alt={related.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute left-3 top-3">
                          <Badge className={`${typeColors[related.type]} shadow-lg`}>{related.type}</Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="mb-2 line-clamp-1 font-semibold text-foreground transition-colors group-hover:text-primary">
                          {related.title}
                        </h3>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{related.donor}</span>
                          <Badge variant="outline" className={`${conditionColors[related.condition]} border`}>
                            {related.condition}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
