import { NextRequest, NextResponse } from "next/server"
import { fetchMarketDerivatives } from "@/lib/services/market-briefing-data"
import { generateMarketBriefing } from "@/lib/services/market-briefing-agent"
import { saveBriefingDraftToBlogsAction } from "@/app/admin/briefing/actions"

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  return handleBriefingCron(req)
}

export async function POST(req: NextRequest) {
  return handleBriefingCron(req)
}

async function handleBriefingCron(req: NextRequest) {
  // Optional authorization via CRON_SECRET or bearer token
  const authHeader = req.headers.get("authorization")
  const cronSecret = process.env.CRON_SECRET

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const timeframe = (searchParams.get("timeframe") as "daily" | "weekly") || "weekly"

  try {
    const dataset = await fetchMarketDerivatives(timeframe)
    const draft = await generateMarketBriefing(dataset)

    const saveResult = await saveBriefingDraftToBlogsAction({
      title: draft.title,
      slug: draft.slug,
      excerpt: draft.excerpt,
      content: draft.content,
      tags: draft.tags,
      access_level: draft.access_level,
      status: "draft",
    })

    if (!saveResult.success) {
      return NextResponse.json({ error: saveResult.error }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      timeframe,
      blogId: saveResult.blogId,
      slug: saveResult.slug,
      title: draft.title,
      provider: draft.provider,
    })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Internal server error" }, { status: 500 })
  }
}
