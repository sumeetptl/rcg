import { getNews } from "@/lib/services/news"
import { AdminPageHeader } from "@/components/admin/page-header"
import { NewsTable } from "@/components/admin/news/news-table"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Manage News",
}

export default async function AdminNewsPage() {
  const news = await getNews({ publishedOnly: false })

  return (
    <div className="min-h-screen bg-muted/10 p-6 lg:p-10">
      <AdminPageHeader 
        label="Content Management"
        heading="News Feed" 
        text="Curate and publish breaking news and market updates."
        action={{
            label: "New Article",
            href: "/admin/news/new"
        }}
      />
      <NewsTable initialData={news} />
    </div>
  )
}

