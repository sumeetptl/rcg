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
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #fcfbf9; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background: #ffffff; border: 1px solid #e2e1dd; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.03); }
    .header { background-color: #ffffff; padding: 40px 32px 24px; text-align: center; border-bottom: 1px solid #e2e1dd; }
    .header h1 { color: #0a0a0b; margin: 0; font-size: 28px; font-weight: 600; font-family: 'Lora', Georgia, serif; letter-spacing: -0.5px; }
    .content { padding: 40px 32px; color: #2a2a2f; font-size: 16px; line-height: 1.6; }
    .content p { margin-bottom: 24px; }
    .button-container { text-align: center; margin: 40px 0; }
    .button { display: inline-block; background-color: #0a0a0b; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 9999px; font-weight: 500; font-size: 15px; letter-spacing: 0.3px; }
    .footer { background-color: #fcfbf9; padding: 32px 24px; text-align: center; color: #6b7280; font-size: 12px; border-top: 1px solid #e2e1dd; text-transform: uppercase; letter-spacing: 1px; font-weight: 600; }
    .subtext { font-size: 13px; color: #6b7280; text-align: center; margin-top: 32px; border-top: 1px solid #e2e1dd; padding-top: 32px; }
    .link { color: #0a0a0b; text-decoration: underline; word-break: break-all; font-weight: 500; }
    .badge { display: inline-block; background-color: #f0eee8; color: #4a4a4f; padding: 4px 12px; border-radius: 9999px; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="badge">Application Approved</div>
      <h1>CoinStaq</h1>
    </div>
    <div class="content">
      <p>Hello,</p>
      <p>Your request to join the CoinStaq waitlist has been approved. We are excited to welcome you to our platform for digital market intelligence and institutional execution parameters.</p>
      
      <div class="button-container">
        <a href="${signupLink}" class="button">Create Your Account</a>
      </div>
      
      <p>If you have any questions or need assistance during setup, simply reply to this email.</p>
      
      <p>Welcome aboard,<br/><strong>The CoinStaq Team</strong></p>
      
      <div class="subtext">
        If the button doesn't work, copy and paste this link into your browser:<br/>
        <br/>
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
