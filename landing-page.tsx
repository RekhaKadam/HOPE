import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HopeLandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-teal-600">Hope</h1>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link href="#" className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium">
                Home
              </Link>
              <Link href="#" className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium">
                Features
              </Link>
              <Link href="#" className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium">
                About Us
              </Link>
              <Link href="#" className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium">
                Testimonials
              </Link>
              <Link href="#" className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium">
                Contact
              </Link>
            </nav>

            {/* CTA Button */}
            <div className="flex-shrink-0">
              <Button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-md">Download</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Your Dreams
                <br />
                Deserve The
                <br />
                <span className="text-teal-600">Best Hope</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-md">
                Empowering your journey with innovative solutions and unwavering support
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 text-lg rounded-md">
                Get Started
              </Button>
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 text-lg rounded-md bg-transparent"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="relative">
            <div className="relative w-full h-96 lg:h-[500px]">
              {/* Background shapes */}
              <div className="absolute top-10 right-10 w-64 h-64 bg-teal-100 rounded-full opacity-60"></div>
              <div className="absolute bottom-10 left-10 w-48 h-48 bg-blue-100 rounded-full opacity-40"></div>

              {/* Main illustration elements */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Central app mockup */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 w-48 h-80 flex flex-col items-center justify-center border">
                  <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Hope</h3>
                  <div className="space-y-2 w-full">
                    <div className="h-2 bg-gray-200 rounded"></div>
                    <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-2 bg-teal-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute top-20 left-8 w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>

              <div className="absolute bottom-20 right-8 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              <div className="absolute top-32 right-16 w-8 h-8 bg-pink-400 rounded-full shadow-lg"></div>
              <div className="absolute bottom-32 left-16 w-6 h-6 bg-yellow-400 rounded-full shadow-lg"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
