"use server" // This directive marks all exports from this file as Server Actions

// This file is intended for Next.js Server Actions.
// Server Actions allow you to run server-side code in response to client interactions,
// such as form submissions or button clicks, without manually creating API routes.

// Example of a simple Server Action (can be removed if not needed yet):
/*
export async function submitContactForm(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  console.log("Server Action: Contact Form Submitted");
  console.log({ name, email, message });

  // Here you would typically:
  // 1. Validate the data
  // 2. Send an email (e.g., using SendGrid or Nodemailer)
  // 3. Save the submission to a database (e.g., via Strapi or another DB)
  // 4. Revalidate paths if data changes affect cached pages (e.g., revalidatePath('/posts'))

  // Simulate some processing
  await new Promise(resolve => setTimeout(resolve, 1000));

  if (!name || !email || !message) {
    return { success: false, error: "All fields are required." };
  }

  // Simulate success
  return { success: true, message: "Thank you for your message! We'll be in touch soon." };
}
*/

// Example of a Server Action for the newsletter (alternative to the API route)
/*
import { z }
from 'zod';
import sgMail from '@sendgrid/mail';

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

const EmailSchema = z.string().email({ message: "Invalid email address." });

export async function subscribeToNewsletterAction(previousState: any, formData: FormData) {
  const email = formData.get('email') as string;

  const validation = EmailSchema.safeParse(email);
  if (!validation.success) {
    return { success: false, error: validation.error.errors[0].message, field: 'email' };
  }

  if (!process.env.SENDGRID_API_KEY || !process.env.FROM_EMAIL) {
    console.error("SendGrid API Key or From Email is not set.");
    return { success: false, error: "Newsletter service is not configured." };
  }

  // Optional: Save to Strapi (similar to the API route)
  try {
    // const strapiResponse = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/subscriptions`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ data: { email } }),
    // });
    // if (!strapiResponse.ok) console.error("Failed to save to Strapi via Server Action");
  } catch (e) {
    console.error("Strapi save error in Server Action:", e);
  }


  const msg = {
    to: email,
    from: {
      name: "Red, White and True News",
      email: process.env.FROM_EMAIL,
    },
    subject: "Welcome to the RWTNews Newsletter! (Server Action)",
    html: `<div>Thank you for subscribing via Server Action!</div>`,
  };

  try {
    await sgMail.send(msg);
    return { success: true, message: "Subscribed successfully! Check your email." };
  } catch (error: any) {
    console.error("SendGrid error in Server Action:", error);
    return { success: false, error: "Failed to subscribe. Please try again." };
  }
}
*/

// Add your Server Actions here as the project develops.
// For example, handling likes, comments, or other form submissions.
