"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { useState, useEffect, useRef, useCallback } from "react"
import { Mail, Phone, Sun, Moon, Send } from "lucide-react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, OrbitControls, Sphere, Box, Cylinder, Cone } from "@react-three/drei"
import type * as THREE from "three"
import { TestimonialsSection } from "@/components/blocks/testimonials-with-marquee" // Import the new testimonials section
import {  MessageSquare } from "lucide-react" 
import { CarouselDemo } from "@/components/ui/carousel-demo" // Import the new CarouselDemo

// Import the new HeroWithMockup component
import { HeroWithMockup } from "@/components/ui/hero-with-mockup"
import { PricingCard } from "@/components/ui/dark-gradient-pricing" // Import the new PricingCard component
import { GlareCard } from "@/components/ui/glare-card" // Import the new GlareCard component

// Confetti Component
function Confetti({ active }: { active: boolean }) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string }>>([])

  useEffect(() => {
    if (active) {
      const newParticles = Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100 - 50, // Random horizontal spread
        y: Math.random() * 100 - 50, // Random vertical spread
        color: `hsl(${Math.random() * 360}, 70%, 60%)`,
      }))
      setParticles(newParticles)

      const timer = setTimeout(() => {
        setParticles([])
      }, 1000) // Confetti disappears after 1 second

      return () => clearTimeout(timer)
    }
  }, [active])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute w-2 h-2 rounded-full animate-confetti"
          style={{
            backgroundColor: p.color,
            left: `calc(50% + ${p.x}px)`,
            top: `calc(50% + ${p.y}px)`,
            animationDelay: `${Math.random() * 0.5}s`,
          }}
        />
      ))}
    </div>
  )
}

// HopeBot 3D Model
function HopeBotModel({ onHover, onLeave, onJump }: { onHover: () => void; onLeave: () => void; onJump: boolean }) {
  const headRef = useRef<THREE.Mesh>(null)
  const bodyRef = useRef<THREE.Mesh>(null)
  const leftArmRef = useRef<THREE.Mesh>(null)
  const rightArmRef = useRef<THREE.Mesh>(null)
  const heartRef = useRef<THREE.Mesh>(null)
  const toothRef = useRef<THREE.Mesh>(null)

  const [isWaving, setIsWaving] = useState(false)
  const [isBlinking, setIsBlinking] = useState(false)
  const [isJumping, setIsJumping] = useState(false)

  // Idle animations
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    // Breathing (body scale)
    if (bodyRef.current) {
      bodyRef.current.scale.y = 1 + Math.sin(t * 2) * 0.02
      bodyRef.current.position.y = Math.sin(t * 2) * 0.02
    }

    // Blinking (eyes - not explicitly modeled, but can simulate with head scale/color)
    if (Math.random() < 0.005) {
      setIsBlinking(true)
      setTimeout(() => setIsBlinking(false), 100)
    }

    // Occasional happy jumps
    if (onJump && !isJumping) {
      setIsJumping(true)
      setTimeout(() => setIsJumping(false), 500) // Jump duration
    }
    if (isJumping && bodyRef.current) {
      bodyRef.current.position.y = Math.sin(t * 10) * 0.1 + 0.02 // Fast up-down for jump
    } else if (bodyRef.current) {
      bodyRef.current.position.y = Math.sin(t * 2) * 0.02 // Normal breathing
    }

    // Waving animation
    if (isWaving && rightArmRef.current) {
      rightArmRef.current.rotation.z = Math.sin(t * 5) * 0.5 - Math.PI / 4 // Wave motion
    } else if (rightArmRef.current) {
      rightArmRef.current.rotation.z = -Math.PI / 4 // Default arm position
    }
  })

  // Mouse proximity for waving
  const handlePointerMove = useCallback(
    (event: THREE.Event) => {
      setIsWaving(true)
      onHover()
    },
    [onHover],
  )

  const handlePointerLeave = useCallback(
    (event: THREE.Event) => {
      setIsWaving(false)
      onLeave()
    },
    [onLeave],
  )

  return (
    <group position={[0, -0.5, 0]}>
      {/* Body (Robot) */}
      <Box args={[0.6, 0.8, 0.4]} ref={bodyRef} onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
        <meshStandardMaterial color="#4a90e2" /> {/* Blue robot body */}
      </Box>

      {/* Head (Robot) */}
      <Sphere args={[0.4, 32, 32]} position={[0, 0.6, 0]} ref={headRef}>
        <meshStandardMaterial color="#4a90e2" />
        {/* Eyes */}
        <mesh position={[-0.15, 0.1, 0.35]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color={isBlinking ? "#333" : "white"} />
        </mesh>
        <mesh position={[0.15, 0.1, 0.35]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color={isBlinking ? "#333" : "white"} />
        </mesh>
      </Sphere>

      {/* Arms */}
      <Cylinder args={[0.08, 0.08, 0.5, 16]} position={[-0.4, 0.1, 0]} rotation={[0, 0, Math.PI / 4]}>
        <meshStandardMaterial color="#666" />
      </Cylinder>
      <Cylinder args={[0.08, 0.08, 0.5, 16]} position={[0.4, 0.1, 0]} rotation={[0, 0, -Math.PI / 4]} ref={rightArmRef}>
        <meshStandardMaterial color="#666" />
      </Cylinder>

      {/* Legs */}
      <Cylinder args={[0.08, 0.08, 0.5, 16]} position={[-0.15, -0.6, 0]} rotation={[0, 0, 0]}>
        <meshStandardMaterial color="#666" />
      </Cylinder>
      <Cylinder args={[0.08, 0.08, 0.5, 16]} position={[0.15, -0.6, 0]} rotation={[0, 0, 0]}>
        <meshStandardMaterial color="#666" />
      </Cylinder>

      {/* Heart (Hybrid element) */}
      <group position={[0, 0.2, 0.25]} rotation={[0, 0, Math.PI / 4]} ref={heartRef}>
        <Cone args={[0.15, 0.2, 32]} position={[0, 0.05, 0]} rotation={[0, 0, Math.PI]} />
        <Cone args={[0.15, 0.2, 32]} position={[0.1, 0.05, 0]} rotation={[0, 0, Math.PI]} />
        <mesh position={[0.05, -0.05, 0]}>
          <sphereGeometry args={[0.15, 32, 32]} />
        </mesh>
        <meshStandardMaterial color="#e74c3c" /> {/* Red heart */}
      </group>

      {/* Tooth (Hybrid element) */}
      <group position={[0, -0.2, 0.25]} ref={toothRef}>
        <Box args={[0.3, 0.4, 0.1]} position={[0, 0.1, 0]} />
        <Sphere args={[0.15, 32, 32]} position={[-0.1, -0.1, 0]} />
        <Sphere args={[0.15, 32, 32]} position={[0.1, -0.1, 0]} />
        <meshStandardMaterial color="white" /> {/* White tooth */}
      </group>
    </group>
  )
}

// HopeBot Chatbot Component
function HopeBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([])
  const [input, setInput] = useState("")
  const [showConfetti, setShowConfetti] = useState(false)
  const [isBotHovered, setIsBotHovered] = useState(false)
  const [botJumpTrigger, setBotJumpTrigger] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (input.trim()) {
      const userMessage = input.trim()
      setMessages((prev) => [...prev, { sender: "user", text: userMessage }])
      setInput("")

      // Simulate bot response
      setTimeout(() => {
        let botResponse =
          "I'm sorry, I don't understand that. Can you ask about jokes, breathing exercises, or appointment booking?"
        const lowerCaseInput = userMessage.toLowerCase()

        if (lowerCaseInput.includes("joke")) {
          const jokes = [
            "Why don't scientists trust atoms? Because they make up everything!",
            "What do you call a fake noodle? An impasta!",
            "Why did the scarecrow win an award? Because he was outstanding in his field!",
          ]
          botResponse = jokes[Math.floor(Math.random() * jokes.length)]
          setShowConfetti(true)
          setBotJumpTrigger(true)
          setTimeout(() => {
            setShowConfetti(false)
            setBotJumpTrigger(false)
          }, 1500)
        } else if (lowerCaseInput.includes("breathing exercise")) {
          botResponse =
            "Let's try a simple breathing exercise: Inhale slowly for 4 counts, hold for 4 counts, exhale slowly for 6 counts. Repeat 3-5 times. Feel better?"
        } else if (lowerCaseInput.includes("appointment") || lowerCaseInput.includes("book")) {
          botResponse = "To book an appointment, please visit our 'Contact Us' section or call us at +1-555-HOPE-APP."
        } else if (lowerCaseInput.includes("hello") || lowerCaseInput.includes("hi")) {
          botResponse = "Hello there! How can I help you today?"
        } else if (lowerCaseInput.includes("thank you") || lowerCaseInput.includes("thanks")) {
          botResponse = "You're welcome! Is there anything else I can assist you with?"
          setShowConfetti(true)
          setBotJumpTrigger(true)
          setTimeout(() => {
            setShowConfetti(false)
            setBotJumpTrigger(false)
          }, 1500)
        }

        setMessages((prev) => [...prev, { sender: "bot", text: botResponse }])
      }, 500)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen && (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-80 h-96 flex flex-col border border-gray-200 dark:border-slate-700 mb-2">
          <div className="p-4 border-b border-gray-200 dark:border-slate-700 flex justify-between items-center">
            <h3 className="font-bold text-lg text-teal-600">HopeBot</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
              &times;
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[75%] p-2 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-teal-500 text-white"
                      : "bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-gray-200"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-slate-700 flex">
            <Input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 mr-2 bg-gray-100 dark:bg-slate-700 border-gray-300 dark:border-slate-600"
            />
            <Button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white p-2">
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      )}
      <div
        className="w-24 h-24 rounded-full shadow-lg cursor-pointer relative"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsBotHovered(true)}
        onMouseLeave={() => setIsBotHovered(false)}
      >
        <Canvas camera={{ position: [0, 0, 3], fov: 75 }}>
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <HopeBotModel
            onHover={() => setIsBotHovered(true)}
            onLeave={() => setIsBotHovered(false)}
            onJump={botJumpTrigger}
          />
          <Environment preset="sunset" />
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Canvas>
        <Confetti active={showConfetti} />
      </div>
    </div>
  )
}

export default function HopeFullLandingPage() {
  const [isDark, setIsDark] = useState(true) // Default to light mode

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission here
  }

  // Testimonials data for the new section
  const testimonials = [
    {
      author: {
        name: "Our Mission",
        
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
      },
      text: "To enhance digital healthcare through innovative solutions that empower individuals and communities",
    
    },
    {
      author: {
        name: "Our Vision",
        
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      },
      text: "To be the leading platform in digital health screening and wellness management",
      href: "https://twitter.com/davidtech",
    },
    {
      author: {
        name: "Our Values",
       
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      },
      text: "Innovation, accuracy, and accessibility in healthcare technology",
    },
  ]

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen bg-hero-like-gradient text-gray-900 dark:text-white transition-colors duration-300">
        {/* Header - Reverted to original */}
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
                  href="#home"
                  className="text-gray-700 dark:text-gray-300 hover:text-teal-600 px-3 py-2 text-sm font-medium"
                >
                  Home
                </Link>
                <Link
                  href="#use-cases"
                  className="text-gray-700 dark:text-gray-300 hover:text-teal-600 px-3 py-2 text-sm font-medium"
                >
                  Use Cases
                </Link>
                <Link
                  href="#pricing"
                  className="text-gray-700 dark:text-gray-300 hover:text-teal-600 px-3 py-2 text-sm font-medium border-b-2 border-teal-500"
                >
                  Pricing
                </Link>
                <Link
                  href="#testimonials" // Updated link to testimonials
                  className="text-gray-700 dark:text-gray-300 hover:text-teal-600 px-3 py-2 text-sm font-medium"
                >
                  About Us {/* Updated text to Testimonials */}
                </Link>
                <Link
                  href="#contact"
                  className="text-gray-700 dark:text-gray-300 hover:text-teal-600 px-3 py-2 text-sm font-medium"
                >
                  Contact
                </Link>
              </nav>

              {/* Theme Toggle and CTA */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsDark(!isDark)}
                  className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                >
                  {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
<Button asChild className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md">
                  <Link href="/products">View Products</Link>
                </Button>              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <HeroWithMockup
          title="Empower Your Health Journey with Hope"
          description="Our intuitive platform provides comprehensive health screening and wellness management, designed to support your well-being."
          mockupImage={{
            alt: "Hope App Interface Mockup",
            width: 1248,
            height: 765,
            src: "https://www.launchuicomponents.com/app-light.png",
          }}
        />

       {/* Use Cases Section (now Carousel) */}
        <section id="use-cases" className="py-20 bg-white text-gray-900 dark:bg-slate-900 dark:text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Use Cases</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Discover how H.O.P.E can transform your practice
              </p>
            </div>
            <CarouselDemo />
          </div>
        </section>

        {/* New Pricing Section */}
        <section id="pricing" className="relative overflow-hidden dark:bg-slate-900 text-foreground py-20">
          <div className="relative z-10 mx-auto max-w-5xl px-4 md:px-8">
            <div className="mb-12 space-y-3">
              <h2 className="text-center text-3xl font-semibold leading-tight sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                Pricing
              </h2>
              <p className="text-center text-base text-muted-foreground md:text-lg">
                Use it for free for yourself, upgrade when your team needs advanced control.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <PricingCard
                tier="Free"
                price="$0/mo"
                bestFor="Best for 1-5 users"
                CTA="Get started free"
                benefits={[
                  { text: "One workspace", checked: true },
                  { text: "Email support", checked: true },
                  { text: "1 day data retention", checked: false },
                  { text: "Custom roles", checked: false },
                  { text: "Priority support", checked: false },
                  { text: "SSO", checked: false },
                ]}
              />
              <PricingCard
                tier="Pro"
                price="$79/mo"
                bestFor="Best for 5-50 users"
                CTA="14-day free trial"
                benefits={[
                  { text: "Five workspaces", checked: true },
                  { text: "Email support", checked: true },
                  { text: "7 day data retention", checked: true },
                  { text: "Custom roles", checked: true },
                  { text: "Priority support", checked: false },
                  { text: "SSO", checked: false },
                ]}
              />
              <PricingCard
                tier="Enterprise"
                price="Contact us"
                bestFor="Best for 50+ users"
                CTA="Contact us"
                benefits={[
                  { text: "Unlimited workspaces", checked: true },
                  { text: "Email support", checked: true },
                  { text: "30 day data retention", checked: true },
                  { text: "Custom roles", checked: true },
                  { text: "Priority support", checked: true },
                  { text: "SSO", checked: true },
                ]}
              />
            </div>
          </div>
        </section>

        {/* About Us Section */}
      {/* Testimonials Section */}
        <section id="testimonials" >
          <TestimonialsSection
            title="About Us"
            description="Discover how we're transforming digital healthcare"
            testimonials={testimonials}
          />
        </section>

        {/* Contact Section */}
         <section id="contact" className="bg-white dark:bg-slate-900 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Contact Us</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">We're here to help</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* Call Us Card */}
              <div className="relative bg-gray-100 dark:bg-slate-800 p-6 pt-16 rounded-lg shadow-sm">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-blue-700 rounded-full flex items-center justify-center">
                  <Phone className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Call Us</h3>
                <Link href="tel:1-844-GSA-4111" className="text-blue-600 hover:underline">
                  1-844-GSA-4111
                </Link>
              </div>

              {/* Chat Live Card */}
              <div className="relative bg-gray-100 dark:bg-slate-800 p-6 pt-16 rounded-lg shadow-sm">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-blue-700 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Chat Live</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  We're available Sun 7:00pm EST - Friday 7:00pm EST
                </p>
                <Button variant="default" className="bg-blue-700 hover:bg-blue-800 text-white">
                  Chat Now
                </Button>
              </div>

              {/* Ask a Question Card */}
              <div className="relative bg-gray-100 dark:bg-slate-800 p-6 pt-16 rounded-lg shadow-sm">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-blue-700 rounded-full flex items-center justify-center">
                  <Mail className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Ask a Question</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Fill out our form and we'll get back to you in 24 hours.
                </p>
                <Button variant="default" className="bg-blue-700 hover:bg-blue-800 text-white">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <h3 className="text-2xl font-bold text-teal-600 mb-4">Hope</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Empowering your journey with innovative digital healthcare solutions and unwavering support.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="#home" className="text-gray-600 dark:text-gray-400 hover:text-teal-600">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="#use-cases" className="text-gray-600 dark:text-gray-400 hover:text-teal-600">
                      Use Cases
                    </Link>
                  </li>
                  <li>
                    <Link href="#pricing" className="text-gray-600 dark:text-gray-400 hover:text-teal-600">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link href="#about" className="text-gray-600 dark:text-gray-400 hover:text-teal-600">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="#contact" className="text-gray-600 dark:text-gray-400 hover:text-teal-600">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Support</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-teal-600">
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-teal-600">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-teal-600">
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-slate-700 mt-8 pt-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">© 2024 Hope App. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
      {/* HopeBot Chatbot */}
      <HopeBot />
    </div>
  )
}
