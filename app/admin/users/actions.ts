"use server"

import { createClient } from "@supabase/supabase-js"
import { revalidatePath } from "next/cache"
import nodemailer from "nodemailer"

export async function confirmUserEmail(userId: string) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set in environment variables.")
  }

  // Use the service role key to bypass RLS and perform admin actions
  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })

  const { data, error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
    email_confirm: true,
  })

  if (error) {
    throw new Error(error.message)
  }

  // Send confirmation email
  const userEmail = data.user?.email
  if (userEmail) {
    const user = process.env.GMAIL_USER
    const pass = process.env.GMAIL_APP_PASSWORD
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://coinstaq.com"
    const loginLink = `${baseUrl}/auth/login  `

    if (user && pass) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user, pass },
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
    .badge { display: inline-block; background-color: #f0eee8; color: #4a4a4f; padding: 4px 12px; border-radius: 9999px; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px; }
    .subtext { font-size: 13px; color: #6b7280; text-align: center; margin-top: 32px; border-top: 1px solid #e2e1dd; padding-top: 32px; }
    .link { color: #0a0a0b; text-decoration: underline; word-break: break-all; font-weight: 500; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="badge">Account Verified</div>
      <h1>CoinStaq</h1>
    </div>
    <div class="content">
      <p>Hello,</p>
      <p>Good news! Your CoinStaq account has been fully verified by our admin team. You now have access to our platform's market intelligence and execution parameters.</p>
      
      <div class="button-container">
        <a href="${loginLink}" class="button">Log In to Your Account</a>
      </div>
      
      <p>If you have any questions, feel free to reply to this email.</p>
      
      <p>Welcome aboard,<br/><strong>The CoinStaq Team</strong></p>

      <div class="subtext">
        If the button doesn't work, copy and paste this link into your browser:<br/>
        <br/>
        <a href="${loginLink}" class="link">${loginLink}</a>
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
          to: userEmail,
          subject: "Your CoinStaq Account is Verified",
          text: `Hello,\n\nYour CoinStaq account has been verified. You can now log in here: \n\n${loginLink}\n\nWelcome aboard,\nThe CoinStaq Team`,
          html: htmlContent,
        })
      } catch (err) {
        console.error("Failed to send verification email:", err)
      }
    }
  }

  revalidatePath("/admin/users")
  return { success: true }
}
