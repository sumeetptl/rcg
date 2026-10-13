import { getAdminBlogs } from "@/lib/services/blogs"
import { AdminPageHeader } from "@/components/admin/page-header"
import { BlogsTable } from "@/components/admin/blogs/blogs-table"
import type { Metadata } from "next"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "Manage Blogs",
}

export default async function AdminBlogsPage() {
  // Fetch all blogs (draft + published) bypassing RLS
  const blogs = await getAdminBlogs()

  return (
    <div className="min-h-screen bg-muted/10 p-6 lg:p-10">
      <AdminPageHeader 
        label="Content Management"
        heading="Editorial Content" 
        text="Create and manage in-depth analysis, research, and educational content."
        action={{
            label: "New Post",
            href: "/admin/blogs/new"
        }}
      >
        <Button variant="outline" size="sm" asChild className="border-border/80 shadow-xs">
          <Link href="/admin/briefing">
            <Sparkles className="mr-2 h-3.5 w-3.5 text-primary" />
            Market Briefing Agent
          </Link>
        </Button>
      </AdminPageHeader>
      <BlogsTable initialData={blogs} />
    </div>
  )
}

