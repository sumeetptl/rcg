"use client"

import React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Loader2, Save } from "lucide-react"
import { ImageUpload } from "@/components/admin/image-upload"
import { RichTextEditor } from "@/components/admin/rich-text-editor"
import { FormSection } from "@/components/admin/form-section"

const categories = ["Analysis", "Tutorial", "Market Update", "Strategy"]

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export default function NewBlogPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    cover_image: "",
    tags: ["Analysis"],
    access_level: "public",
    status: "draft",
  })

  const handleTitleChange = (value: string) => {
    setFormData({
      ...formData,
      title: value,
      slug: generateSlug(value),
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    const supabase = createClient()

    const { error: insertError } = await supabase.from("blogs").insert({
      title: formData.title,
      slug: formData.slug,
      excerpt: formData.excerpt || null,
      content: formData.content,
      cover_image: formData.cover_image || null,
      tags: formData.tags,
      access_level: formData.access_level,
      status: formData.status,
      published_at: formData.status === "published" ? new Date().toISOString() : null,
    })

    if (insertError) {
      setError(insertError.message)
      setIsLoading(false)
      return
    }

    router.push("/admin/blogs")
    router.refresh()
  }

  return (
    <div className="mx-auto max-w-5xl p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
             <Link
              href="/admin/blogs"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-2"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blogs
            </Link>
            <h1 className="font-serif text-3xl font-semibold tracking-tight">New Article</h1>
        </div>
        <div className="flex gap-3">
            <Button variant="outline" onClick={() => router.back()}>
                Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {!isLoading && <Save className="mr-2 h-4 w-4" />}
                Save Article
            </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {error && (
            <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}

        {/* 1. Article Metadata */}
        <FormSection title="Article Metadata" description="Core details and SEO information.">
            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            placeholder="Enter article title..."
                            value={formData.title}
                            onChange={(e) => handleTitleChange(e.target.value)}
                            required
                            className="font-serif text-lg"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="slug">Slug</Label>
                        <div className="flex rounded-md shadow-sm">
                            <span className="flex items-center rounded-l-md border border-r-0 bg-muted px-3 text-sm text-muted-foreground">
                                /blog/
                            </span>
                            <Input
                                id="slug"
                                placeholder="url-friendly-slug"
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                required
                                className="rounded-l-none font-mono text-sm"
                            />
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                            value={formData.tags[0]}
                            onValueChange={(value) => setFormData({ ...formData, tags: [value] })}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((cat) => (
                                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="excerpt">Excerpt / Meta Description</Label>
                        <Textarea
                            id="excerpt"
                            placeholder="Brief summary for SEO and previews..."
                            rows={3}
                            value={formData.excerpt}
                            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                            className="resize-none"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>Cover Image</Label>
                    <ImageUpload 
                        value={formData.cover_image}
                        onChange={(url) => setFormData({ ...formData, cover_image: url })}
                        onRemove={() => setFormData({ ...formData, cover_image: "" })}
                    />
                </div>
            </div>
        </FormSection>

        {/* 2. Content Editor */}
        <FormSection title="Content">
                <RichTextEditor
                    value={formData.content}
                    onChange={(html) => setFormData({ ...formData, content: html })}
                />
        </FormSection>

        {/* 3. Publishing Controls */}
        <FormSection title="Publishing & Visibility">
            <div className="grid gap-6 md:grid-cols-2 items-center">
                 <div className="space-y-2">
                        <Label htmlFor="access_level">Access Level</Label>
                        <Select
                            value={formData.access_level}
                            onValueChange={(value) => setFormData({ ...formData, access_level: value })}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="public">Public (Everyone)</SelectItem>
                                <SelectItem value="free">Free Member (Login Required)</SelectItem>
                                <SelectItem value="premium">Premium Member</SelectItem>
                            </SelectContent>
                        </Select>
                </div>
                
                <div className="flex items-center justify-between rounded-lg border border-border p-4 bg-muted/20">
                    <div className="space-y-0.5">
                        <Label htmlFor="status" className="font-medium">Publish Immediately</Label>
                        <p className="text-sm text-muted-foreground">
                            Switching this on will make the article live.
                        </p>
                    </div>
                    <Switch
                        id="status"
                        checked={formData.status === "published"}
                        onCheckedChange={(checked) => setFormData({ ...formData, status: checked ? "published" : "draft" })}
                    />
                </div>
            </div>
        </FormSection>

      </form>
    </div>
  )
}

