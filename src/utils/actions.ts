"use server";

import { redirect } from "next/navigation";

import formData from "form-data";
import Mailgun from "mailgun.js";

export async function resultsForVin(data: FormData) {
  redirect(`/results/${data.get("vin")}`);
}

export async function contactEmailSubmit(data: FormData) {
  const { email, name, subject, message } = Object.fromEntries(data);

  // Initialize Mailgun client
  const mailgun = new Mailgun(formData);
  const client = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY || "",
  });

  const emailContent = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Subject:</strong> ${subject}</p>
    <h3>Message:</h3>
    <p>${message}</p>
  `;

  const messageData = {
    from: `${name} <${email}>`,
    to: "ger.almenara@gmail.com",
    subject: `New Contact Form Submission: ${subject}`,
    html: emailContent,
    text: emailContent.replace(/<[^>]+>/g, ""),
  };

  try {
    // Send the email
    await client.messages.create(process.env.MAILGUN_DOMAIN || "", messageData);
    // Redirect to the success page
    redirect("/contact/success");
  } catch (error) {
    // Redirect to the error page
    console.error((error as Error).message);
    redirect("/contact/error");
  }
}
