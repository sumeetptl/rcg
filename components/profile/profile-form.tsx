"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CldUploadWidget } from "next-cloudinary"
import { Loader2, Upload, X } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Profile } from "@/lib/types"

interface ProfileFormProps {
  profile: Profile & { email: string }
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    first_name: profile.first_name || "",
    last_name: profile.last_name || "",
    username: profile.username || "",
    bio: profile.bio || "",
    website: profile.website || "",
    avatar_url: profile.avatar_url || "",
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
    setError(null)
    setSuccess(false)
  }

  const onUpload = (result: any) => {
    if (result?.info?.secure_url) {
      setFormData((prev) => ({ ...prev, avatar_url: result.info.secure_url }))
      setError(null)
    }
  }

  const handleRemoveAvatar = () => {
    setFormData((prev) => ({ ...prev, avatar_url: "" }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const supabase = createClient()

      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          first_name: formData.first_name || null,
          last_name: formData.last_name || null,
          username: formData.username || null,
          bio: formData.bio || null,
          website: formData.website || null,
          avatar_url: formData.avatar_url || null,
        })
        .eq("id", profile.id)

      if (updateError) throw updateError

      setSuccess(true)
      router.refresh()
    } catch (err: any) {
      setError(err.message || "Failed to update profile")
      console.error("Update error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const initials = [formData.first_name, formData.last_name]
    .filter(Boolean)
    .map((n) => n?.[0])
    .join("")
    .toUpperCase() || formData.username?.[0]?.toUpperCase() || "U"

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Avatar Upload */}
      <div className="space-y-3">
        <Label htmlFor="avatar">Profile Picture</Label>
        <div className="flex items-start gap-6">
          <Avatar className="h-20 w-20 border-2 border-border">
            <AvatarImage src={formData.avatar_url || undefined} />
            <AvatarFallback className="text-base font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-3">
            {formData.avatar_url ? (
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleRemoveAvatar}
                  disabled={isUploading}
                >
                  <X className="mr-2 h-3.5 w-3.5" />
                  Remove
                </Button>
                <span className="text-xs text-muted-foreground">
                  Click to remove current avatar
                </span>
              </div>
            ) : (
              <CldUploadWidget 
                onSuccess={onUpload} 
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                options={{
                  maxFiles: 1,
                  cropping: true,
                  croppingAspectRatio: 1,
                  clientAllowedFormats: ["jpg", "jpeg", "png", "webp"]
                }}
              >
                {({ open }) => {
                  return (
                    <div
                      onClick={() => open()}
                      className={cn(
                        "cursor-pointer rounded-md border-2 border-dashed px-4 py-3 text-center transition-colors",
                        "border-border hover:border-primary/50 hover:bg-muted/30"
                      )}
                    >
                      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <Upload className="h-4 w-4" />
                        <span>Click to upload avatar</span>
                      </div>
                    </div>
                  )
                }}
              </CldUploadWidget>
            )}
            <p className="text-xs text-muted-foreground">
              JPG, PNG or WEBP. Max 4MB.
            </p>
          </div>
        </div>
      </div>

      {/* Name Fields */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="first_name">First Name</Label>
          <Input
            id="first_name"
            name="first_name"
            type="text"
            value={formData.first_name}
            onChange={handleInputChange}
            placeholder="Enter first name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="last_name">Last Name</Label>
          <Input
            id="last_name"
            name="last_name"
            type="text"
            value={formData.last_name}
            onChange={handleInputChange}
            placeholder="Enter last name"
          />
        </div>
      </div>

      {/* Username */}
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleInputChange}
          placeholder="Enter username"
        />
        <p className="text-xs text-muted-foreground">
          This is your public display name.
        </p>
      </div>

      {/* Bio */}
      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleInputChange}
          placeholder="Tell us about yourself"
          rows={4}
        />
        <p className="text-xs text-muted-foreground">
          Brief description for your profile. Max 160 characters.
        </p>
      </div>

      {/* Website */}
      <div className="space-y-2">
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          name="website"
          type="url"
          value={formData.website}
          onChange={handleInputChange}
          placeholder="https://example.com"
        />
      </div>

      {/* Error/Success Messages */}
      {error && (
        <div className="rounded-md border border-destructive/50 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-md border border-emerald-500/50 bg-emerald-500/5 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-400">
          Profile updated successfully
        </div>
      )}

      {/* Submit Button */}
      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Changes
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.back()}
          disabled={isLoading}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
