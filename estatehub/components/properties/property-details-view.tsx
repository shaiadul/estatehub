"use client"

import React, { useState, useMemo } from "react"
import { PropertyData } from "@/lib/properties-data"
import { Header } from "@/components/home/header"
import { Footer } from "@/components/home/footer"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import {
  AmenitiesMatrix,
  BookingSidebar,
  DetailsGallery,
  DetailsHeader,
  DetailsLightbox,
  DetailsSpecs,
  DetailsToasts,
  FloorPlans,
  MortgageCalculator,
  NeighborhoodSection,
  SimilarProperties,
} from "./_components"
import { FloorLevel, TourType } from "./_components/types"

interface PropertyDetailsViewProps {
  property: PropertyData
  similarProperties: PropertyData[]
}

export function PropertyDetailsView({ property, similarProperties }: PropertyDetailsViewProps) {
  const [isSaved, setIsSaved] = useState(false)
  const [shareToast, setShareToast] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const [calcPrice, setCalcPrice] = useState(property.price)
  const [downPercent, setDownPercent] = useState(20)

  const [activeFloor, setActiveFloor] = useState<FloorLevel>("level1")

  const [tourType, setTourType] = useState<TourType>("inperson")
  const [selectedDate, setSelectedDate] = useState("Today")
  const [selectedTime, setSelectedTime] = useState("10:00 AM")
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [isAccredited, setIsAccredited] = useState(true)
  const [bookingToast, setBookingToast] = useState(false)
  const [bookingSubmitting, setBookingSubmitting] = useState(false)

  const [brokerMsg, setBrokerMsg] = useState("")
  const [brokerMsgSent, setBrokerMsgSent] = useState(false)

  const mortgageCalculations = useMemo(() => {
    const downAmount = calcPrice * (downPercent / 100)
    const loanAmount = Math.max(0, calcPrice - downAmount)
    const monthlyRate = 0.062 / 12
    const totalPayments = 360
    const principalAndInterest =
      loanAmount > 0
        ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
          (Math.pow(1 + monthlyRate, totalPayments) - 1)
        : 0
    const propertyTaxMonthly = (calcPrice * 0.012) / 12
    const insuranceAndHoa = 2350
    const totalMonthly = principalAndInterest + propertyTaxMonthly + insuranceAndHoa

    return {
      downAmount,
      loanAmount,
      principalAndInterest,
      propertyTaxMonthly,
      insuranceAndHoa,
      totalMonthly,
    }
  }, [calcPrice, downPercent])

  const allPhotos = useMemo(() => {
    if (property.images && property.images.length >= 5) {
      return property.images
    }
    const defaultList = [
      property.heroImage,
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
    ]
    return defaultList
  }, [property])

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href)
      setShareToast(true)
      setTimeout(() => setShareToast(false), 3000)
    }
  }

  const handleTourSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setBookingSubmitting(true)
    setTimeout(() => {
      setBookingSubmitting(false)
      setBookingToast(true)
      setTimeout(() => setBookingToast(false), 5000)
    }, 600)
  }

  const handleSendBrokerMsg = (e: React.FormEvent) => {
    e.preventDefault()
    if (!brokerMsg.trim()) return
    setBrokerMsgSent(true)
    setBrokerMsg("")
    setTimeout(() => setBrokerMsgSent(false), 3000)
  }

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col font-sans">
      <Header />

      <main className="w-full pt-20 flex-1">
        <DetailsHeader
          property={property}
          isSaved={isSaved}
          onToggleSaved={() => setIsSaved(!isSaved)}
          onShare={handleShare}
        />

        <DetailsGallery
          allPhotos={allPhotos}
          propertyTitle={property.title}
          onOpenLightbox={handleOpenLightbox}
        />

        <SectionWrapper className="bg-surface pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 flex flex-col gap-8">
                <DetailsSpecs property={property} />

                <AmenitiesMatrix property={property} />

                <MortgageCalculator
                  calcPrice={calcPrice}
                  downPercent={downPercent}
                  mortgageCalculations={mortgageCalculations}
                  onCalcPriceChange={setCalcPrice}
                  onDownPercentChange={setDownPercent}
                />

                <FloorPlans activeFloor={activeFloor} onActiveFloorChange={setActiveFloor} />

                <NeighborhoodSection property={property} />

                <SimilarProperties similarProperties={similarProperties} />
              </div>

              <BookingSidebar
                property={property}
                tourType={tourType}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                fullName={fullName}
                phone={phone}
                email={email}
                isAccredited={isAccredited}
                bookingSubmitting={bookingSubmitting}
                brokerMsg={brokerMsg}
                brokerMsgSent={brokerMsgSent}
                onTourTypeChange={setTourType}
                onSelectedDateChange={setSelectedDate}
                onSelectedTimeChange={setSelectedTime}
                onFullNameChange={setFullName}
                onPhoneChange={setPhone}
                onEmailChange={setEmail}
                onAccreditedChange={setIsAccredited}
                onTourSubmit={handleTourSubmit}
                onBrokerMsgChange={setBrokerMsg}
                onBrokerMsgSubmit={handleSendBrokerMsg}
              />
            </div>
        </SectionWrapper>

        <DetailsLightbox
          open={lightboxOpen}
          lightboxIndex={lightboxIndex}
          allPhotos={allPhotos}
          propertyTitle={property.title}
          onClose={() => setLightboxOpen(false)}
          onIndexChange={setLightboxIndex}
        />

        <DetailsToasts
          bookingToast={bookingToast}
          shareToast={shareToast}
          agentName={property.agent.name}
        />
      </main>

      <Footer />
    </div>
  )
}
