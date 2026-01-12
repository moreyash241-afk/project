"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Heart, ChevronLeft, ChevronRight, ExternalLink, Eye, MessageCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { conditionColors, typeColors } from "@/lib/data"

interface Listing {
  id: number
  title: string
  description: string
  condition: string
  type: string
  location: string
  postedAt: string
  image: string
  images?: string[]
  category: string
  categoryName: string
  donor: string
  donorAvatar: string
  specs: string[]
  views?: number
  requests?: number
}

interface QuickViewModalProps {
  listing: Listing | null
  isOpen: boolean
  onClose: () => void
  onFavorite: (id: number) => void
  isFavorite: boolean
}

export function QuickViewModal({ listing, isOpen, onClose, onFavorite, isFavorite }: QuickViewModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!listing) return null

  const images = listing.images || [listing.image]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* Image Gallery */}
          <div className="relative aspect-square bg-muted">
            <Image
              src={images[currentImageIndex] || "/placeholder.svg"}
              alt={listing.title}
              fill
              className="object-cover"
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur shadow-lg transition-all hover:bg-background hover:scale-110"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur shadow-lg transition-all hover:bg-background hover:scale-110"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}

            {/* Image Indicators */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-2 w-2 rounded-full transition-all ${
                      index === currentImageIndex ? "bg-primary w-6" : "bg-background/60 hover:bg-background"
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Badges */}
            <div className="absolute left-3 top-3 flex gap-2">
              <Badge className={`${typeColors[listing.type]} shadow-lg`}>{listing.type}</Badge>
              <Badge
                variant="outline"
                className={`${conditionColors[listing.condition]} border bg-background/80 backdrop-blur`}
              >
                {listing.condition}
              </Badge>
            </div>
          </div>

          {/* Details */}
          <div className="p-6 flex flex-col">
            <DialogHeader className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="rounded-md bg-secondary px-2 py-1 text-xs font-medium text-muted-foreground">
                  {listing.categoryName}
                </span>
              </div>
              <DialogTitle className="text-xl font-bold text-foreground">{listing.title}</DialogTitle>
            </DialogHeader>

            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{listing.description}</p>

            {/* Specs */}
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Specifications</h4>
              <div className="flex flex-wrap gap-2">
                {listing.specs.slice(0, 4).map((spec) => (
                  <span key={spec} className="rounded-full bg-secondary px-2 py-1 text-xs text-secondary-foreground">
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-4 mb-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{listing.views || 0} views</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" />
                <span>{listing.requests || 0} requests</span>
              </div>
            </div>

            {/* Location & Time */}
            <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                {listing.location}
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {listing.postedAt}
              </div>
            </div>

            {/* Donor */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 mb-4">
              <div className="relative h-10 w-10 overflow-hidden rounded-full bg-muted">
                <Image
                  src={listing.donorAvatar || "/placeholder.svg"}
                  alt={listing.donor}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium">{listing.donor}</p>
                <p className="text-xs text-muted-foreground">Verified Donor</p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-auto flex gap-3">
              <Link href={`/listing/${listing.id}`} className="flex-1">
                <Button className="w-full gap-2 shadow-lg shadow-primary/25 transition-all hover:scale-[1.02]">
                  <ExternalLink className="h-4 w-4" />
                  View Full Details
                </Button>
              </Link>
              <Button
                variant="outline"
                size="icon"
                className={`transition-all hover:scale-110 ${isFavorite ? "border-red-300 bg-red-50 text-red-600 hover:bg-red-100" : ""}`}
                onClick={() => onFavorite(listing.id)}
              >
                <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
