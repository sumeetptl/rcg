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
import { FormSection } from "@/components/admin/form-section"
import { ImageUpload } from "@/components/admin/image-upload"
import { RichTextEditor } from "@/components/admin/rich-text-editor"

const categories = ["Bitcoin", "Ethereum", "Altcoins", "DeFi", "NFT", "Regulation"]

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export default function NewNewsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    summary: "",
    content: "",
    cover_image: "",
    source: "",
    source_url: "",
    category: "Bitcoin",
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

    const { error: insertError } = await supabase.from("news").insert({
      title: formData.title,
      slug: formData.slug,
      summary: formData.summary || null,
      content: formData.content,
      cover_image: formData.cover_image || null,
      source: formData.source || null,
      source_url: formData.source_url || null,
      category: formData.category,
      access_level: formData.access_level,
      status: formData.status,
      published_at: formData.status === "published" ? new Date().toISOString() : null,
    })

    if (insertError) {
      setError(insertError.message)
      setIsLoading(false)
      return
    }

    router.push("/admin/news")
    router.refresh()
  }

  return (
    <div className="mx-auto max-w-5xl p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
                <Link
                href="/admin/news"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-2"
                >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to News
                </Link>
                <h1 className="font-serif text-3xl font-semibold tracking-tight">Add News Article</h1>
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

            {/* 1. News Details */}
            <FormSection title="News Details" description="Core information about the news event.">
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Headline</Label>
                            <Input
                                id="title"
                                placeholder="Enter news headline..."
                                value={formData.title}
                                onChange={(e) => handleTitleChange(e.target.value)}
                                required
                                className="font-serif text-lg"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="slug">Slug</Label>
                            <Input
                                id="slug"
                                placeholder="url-friendly-slug"
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                required
                            />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="category">Category/Asset</Label>
                            <Select
                                value={formData.category}
                                onValueChange={(value) => setFormData({ ...formData, category: value })}
                            >
                                <SelectTrigger>
                                <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                {categories.map((cat) => (
                                    <SelectItem key={cat} value={cat}>
                                    {cat}
                                    </SelectItem>
                                ))}
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="source">Source Name</Label>
                                <Input
                                id="source"
                                placeholder="e.g. CoinDesk"
                                value={formData.source}
                                onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="source_url">Source URL</Label>
                                <Input
                                id="source_url"
                                placeholder="https://..."
                                value={formData.source_url}
                                onChange={(e) => setFormData({ ...formData, source_url: e.target.value })}
                                />
                            </div>
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

            {/* 2. Summary & Content */}
             <FormSection title="Summary & Impact">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="summary">Executive Summary</Label>
                        <Textarea
                            id="summary"
                            placeholder="Brief summary of the news and its potential impact..."
                            rows={3}
                            value={formData.summary}
                            onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                        />
                    </div>
                     <div className="space-y-2">
                        <Label>Content Body</Label>
                        <RichTextEditor 
                            value={formData.content}
                            onChange={(html) => setFormData({ ...formData, content: html })}
                        />
                     </div>
                </div>
             </FormSection>

             {/* 3. Publishing */}
             <FormSection title="Publishing">
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
                            <SelectItem value="public">Public</SelectItem>
                            <SelectItem value="free">Free (Login Required)</SelectItem>
                            <SelectItem value="premium">Premium</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="flex items-center justify-between rounded-lg border border-border p-4 bg-muted/20">
                        <div className="space-y-0.5">
                            <Label htmlFor="status" className="font-medium">Publish Now</Label>
                            <p className="text-sm text-muted-foreground">
                            Make this article visible to users
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

