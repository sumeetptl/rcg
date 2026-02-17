import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, level } = body

    if (!email || !level) {
      return NextResponse.json(
        { error: "Email and trading level are required" },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Insert into waitlist_entries
    const { error } = await supabase
      .from("waitlist_entries")
      .insert({
        email,
        trading_level: level,
        status: "pending"
      })

    if (error) {
      // Handle unique constraint violation (duplicate email)
      if (error.code === '23505') {
         return NextResponse.json(
          { error: "You are already on the waitlist!" },
          { status: 409 }
        )
      }
      console.error("Waitlist error:", error)
      return NextResponse.json(
        { error: "Failed to join waitlist" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Waitlist API error:", err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
