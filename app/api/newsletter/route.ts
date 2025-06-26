import { NextResponse } from "next/server"
import sgMail from "@sendgrid/mail"
import axios from "axios"

// Set SendGrid API Key from environment variables
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
}

// Basic email validation regex
const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(String(email).toLowerCase())
}

export async function POST(request: Request) {
  // 1. Check if the service is configured
  if (!process.env.SENDGRID_API_KEY || !process.env.FROM_EMAIL) {
    console.error("SendGrid API Key or From Email is not set in environment variables.")
    return NextResponse.json({ error: "Service is not configured correctly on the server." }, { status: 500 })
  }

  try {
    // 2. Parse and validate the email from the request body
    const { email } = await request.json()

    if (!email || !validateEmail(email)) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 })
    }

    // 3. (Optional but Recommended) Save the email to your Strapi backend
    // This assumes you have a "subscriptions" collection in Strapi with a field "email".
    // Ensure the 'create' permission is enabled for the Public role for this collection.
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/subscriptions`, {
        data: { email: email },
      })
    } catch (strapiError) {
      // Log the error but don't block the user from being subscribed via email.
      // This prevents the entire process from failing if Strapi is down or misconfigured.
      console.error("Failed to save subscriber to Strapi:", strapiError)
    }

    // 4. Prepare and send the confirmation email via SendGrid
    const msg = {
      to: email,
      from: {
        name: "Red, White and True News",
        email: process.env.FROM_EMAIL, // Use your verified sender email
      },
      subject: "Welcome to the Red, White and True News Newsletter!",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
            <h2 style="text-align: center; color: #B22234;">Thank You for Subscribing!</h2>
            <p>You're now on the list to receive the latest news, opinions, and updates directly to your inbox.</p>
            <p>We're excited to have you as part of the Red, White and True News community.</p>
            <p style="text-align: center; margin-top: 30px;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}" style="background-color: #3C3B6E; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Visit Our Website</a>
            </p>
            <p style="font-size: 0.8em; text-align: center; color: #777; margin-top: 20px;">
              You can manage your subscription preferences or unsubscribe at any time.
            </p>
          </div>
        </div>
      `,
    }

    await sgMail.send(msg)

    // 5. Return a success response
    return NextResponse.json(
      { message: "Subscription successful! A confirmation email has been sent." },
      { status: 200 },
    )
  } catch (error) {
    console.error("Newsletter subscription failed:", error)
    // Check for more specific SendGrid errors if available
    if (error.response) {
      console.error(error.response.body)
    }
    return NextResponse.json({ error: "An internal server error occurred. Please try again later." }, { status: 500 })
  }
}
