"use client"

import { useState, type FormEvent } from "react"
import { Mail } from "lucide-react" // Using Lucide icon

export default function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")
    setIsSuccess(false)

    if (!email) {
      setMessage("Please enter your email address.")
      setIsLoading(false)
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address.")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(data.message || "Subscription successful!")
        setIsSuccess(true)
        setEmail("") // Clear input on success
      } else {
        setMessage(data.error || "An error occurred. Please try again.")
        setIsSuccess(false)
      }
    } catch (error) {
      console.error("Newsletter submission error:", error)
      setMessage("An unexpected error occurred. Please try again later.")
      setIsSuccess(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="email"
          name="email"
          id="footer-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          required
          className="w-full pl-10 pr-4 py-2.5 border border-gray-600 bg-gray-700 text-white rounded-md focus:ring-rwt-red focus:border-rwt-red focus:outline-none placeholder-gray-400 text-sm"
          aria-label="Email for newsletter"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-rwt-red text-white font-semibold py-2.5 px-4 rounded-md hover:bg-opacity-80 transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm"
      >
        {isLoading ? "Subscribing..." : "Subscribe"}
      </button>
      {message && (
        <p className={`text-xs mt-2 ${isSuccess ? "text-green-400" : "text-red-400"}`} aria-live="polite">
          {message}
        </p>
      )}
    </form>
  )
}
