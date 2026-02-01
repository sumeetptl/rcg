import { getBlogs } from "@/lib/services/blogs"
import { AdminPageHeader } from "@/components/admin/page-header"
import { BlogsTable } from "@/components/admin/blogs/blogs-table"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Manage Blogs",
}

export default async function AdminBlogsPage() {
  // Fetch all blogs (draft + published)
  const blogs = await getBlogs({ publishedOnly: false })

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
      />
      <BlogsTable initialData={blogs} />
    </div>
  )
}

