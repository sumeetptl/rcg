"use server"

import nodemailer from "nodemailer"

export async function sendInviteEmail(email: string) {
  const user = process.env.GMAIL_USER
  const pass = process.env.GMAIL_APP_PASSWORD
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://coinstaq.com"
  
  const signupLink = `${baseUrl}/auth/sign-up?email=${encodeURIComponent(email)}`

  if (!user || !pass) {
    console.error("Gmail credentials (GMAIL_USER, GMAIL_APP_PASSWORD) missing in environment variables.")
    throw new Error("Email configuration missing.")
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user,
      pass,
    },
  })

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #faf9f7; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; }
    .header { background-color: #1a1a2e; padding: 32px 24px; text-align: center; }
    .header h1 { color: #faf9f7; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: -0.5px; }
    .content { padding: 40px 32px; color: #1a1a2e; font-size: 16px; line-height: 1.6; }
    .content p { margin-bottom: 24px; }
    .button-container { text-align: center; margin: 32px 0; }
    .button { display: inline-block; background-color: #1a1a2e; color: #faf9f7; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 500; font-size: 16px; }
    .footer { background-color: #faf9f7; padding: 24px; text-align: center; color: #6b7280; font-size: 14px; border-top: 1px solid #e5e7eb; }
    .subtext { font-size: 14px; color: #6b7280; text-align: center; margin-top: 24px; border-top: 1px solid #e5e7eb; padding-top: 24px; }
    .link { color: #1a1a2e; text-decoration: underline; word-break: break-all; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>CoinStaq</h1>
    </div>
    <div class="content">
      <p>Hello,</p>
      <p>Your request to join the CoinStaq waitlist has been approved. We are excited to welcome you to our platform for digital market intelligence.</p>
      
      <div class="button-container">
        <a href="${signupLink}" class="button">Create Your Account</a>
      </div>
      
      <p>If you have any questions or need assistance during setup, simply reply to this email.</p>
      
      <p>Welcome aboard,<br/><strong>The CoinStaq Team</strong></p>
      
      <div class="subtext">
        If the button doesn't work, copy and paste this link into your browser:<br/>
        <a href="${signupLink}" class="link">${signupLink}</a>
      </div>
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} CoinStaq. All rights reserved.
    </div>
  </div>
</body>
</html>
  `

  try {
    await transporter.sendMail({
      from: `"CoinStaq Team" <${user}>`,
      to: email,
      subject: "You're invited to CoinStaq",
      text: `Hello,\n\nYour request to join the CoinStaq waitlist has been approved. You can now create your account using the following link:\n\n${signupLink}\n\nWelcome aboard,\nThe CoinStaq Team`,
      html: htmlContent,
    })
    
    return { success: true }
  } catch (error: any) {
    console.error("Failed to send email:", error)
    throw new Error(error.message || "Failed to send email")
  }
}
