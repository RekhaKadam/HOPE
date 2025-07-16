"use client"

import { Blog7 } from "@/components/blocks/blog7"
import { Sun, Moon } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const demoData = {
  tagline: "Latest Updates",
  heading: "Our Products",
  description:
    "Discover our suite of advanced healthcare solutions",
  posts: [
    {
      id: "post-1",
      title: "OraCare",
      summary:
        "Advanced oral health screening platform empowering healthcare professionals with quick, accurate assessments.",
    
      image: "/ai.jpeg?height=400&width=600", // Updated image path
    },
     {
      id: "post-2",
      title: "O.D.D",
      summary:
        "Oncological Diffrencal Diagnostics System - Advanced AI-powered diagnostic system for oral oncology.",
      
      image: "/clinic.jpeg?height=400&width=600", // Updated image path
    },
    {
      id: "post-3",
      title: "P.A.G.E.S",
      summary:
        "Patient Analytics & Genomic Evaluation System - Comprehensive patient data analysis platform.",
    
      image: "/lab.jpeg?height=400&width=600", // Updated image path
    },
     {
      id: "post-3",
      title: "E.A.S.Y",
      summary:
        "Enhanced Automated Screening Yield - Streamlined screening process with automated workflows.",

      image: "/medical.jpeg?height=400&width=600", // Updated image path
    },
  ],
}

export default function BlogPage() {
  const [isDark, setIsDark] = useState(false) // Default to light mode

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        {/* Header - Simplified for blog page, matching main landing page style */}
        <header className="sticky top-0 z-50 bg-white dark:bg-slate-800 shadow-sm border-b border-gray-200 dark:border-slate-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-teal-600">Hope</h1>
              </div>

              {/* Navigation */}
              <nav className="hidden md:flex space-x-8">
                <Link
                  href="/"
                  className="text-gray-700 dark:text-gray-300 hover:text-teal-600 px-3 py-2 text-sm font-medium"
                >
                  Home
                </Link>
                <Link
                  href="/blog"
                  className="text-gray-700 dark:text-gray-300 hover:text-teal-600 px-3 py-2 text-sm font-medium border-b-2 border-teal-500"
                >
                  Products
                </Link>
                {/* Add other relevant links if necessary */}
              </nav>

              {/* Theme Toggle and CTA */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsDark(!isDark)}
                  className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                >
                  {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md">Contact Us</Button>
              </div>
            </div>
          </div>
        </header>

        {/* Blog Section */}
        <Blog7 {...demoData} />

        {/* Footer (Optional: You might want to reuse the main landing page footer) */}
        <footer className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-400">
            © 2024 Hope App. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  )
}
