"use client"
import { Carousel } from "@/components/ui/carousel"

export function CarouselDemo() {
  const slideData = [
    {
      title: "Dental Clinics",
      button: "Learn More",
      src: "/dentalclinic.png",
    },
    {
      title: "Research Institutions",
      button: "Discover",
      src: "research.png",
    },
    {
      title: "Healthcare Centers",
      button: "Explore",
      src: "healthcare1.png",
    },
    {
      title: "Community Health",
      button: "Engage",
      src: "comunity.png",
    },
  ]
  return (
    <div className="relative overflow-hidden w-full h-full py-20">
      <Carousel slides={slideData} />
    </div>
  )
}
