"use client"

import * as React from "react"
import { useDropzone } from "react-dropzone"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Loader2, UploadCloud, X, Image as ImageIcon } from "lucide-react" 
import { cn } from "@/lib/utils"

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  onRemove: () => void
  disabled?: boolean
  bucket?: string
  folder?: string
}

export function ImageUpload({ 
  value, 
  onChange, 
  onRemove, 
  disabled,
  bucket = "blog-images", // Ensure this bucket exists in Supabase
  folder = "uploads"
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const onDrop = React.useCallback(async (acceptedFiles: File[]) => {
    try {
      const file = acceptedFiles[0]
      if (!file) return

      setIsUploading(true)
      setError(null)

      const supabase = createClient()
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`
      const filePath = `${folder}/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath)

      onChange(publicUrl)
    } catch (err: any) {
      setError(err.message || "Failed to upload image")
      console.error("Upload error:", err)
    } finally {
      setIsUploading(false)
    }
  }, [bucket, folder, onChange])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/webp': []
    },
    maxFiles: 1,
    disabled: disabled || isUploading
  })

  return (
    <div className="w-full space-y-4">
      {value ? (
        <Card className="relative overflow-hidden group">
          <div className="relative aspect-video w-full h-64 bg-muted/30 flex items-center justify-center">
             {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={value} 
              alt="Upload" 
              className="object-cover w-full h-full"
            />
          </div>
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button 
                variant="destructive" 
                size="icon" 
                onClick={onRemove}
                disabled={disabled}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      ) : (
        <Card
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed p-10 transition-colors cursor-pointer hover:bg-muted/50 flex flex-col items-center justify-center gap-4 text-center min-h-[200px]",
            isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25",
            (disabled || isUploading) && "opacity-50 cursor-not-allowed pointer-events-none",
            error && "border-destructive/50"
          )}
        >
          <input {...getInputProps()} />
          <div className="rounded-full bg-muted p-4">
            {isUploading ? (
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            ) : (
                <UploadCloud className="h-8 w-8 text-muted-foreground" />
            )}
          </div>
          <div className="max-w-[15rem] space-y-1">
             <p className="text-sm font-medium">
                {isUploading ? "Uploading file..." : "Click or drag image to upload"}
             </p>
             <p className="text-xs text-muted-foreground">
               SVG, PNG, JPG or WEBP (max. 4MB)
             </p>
          </div>
          {error && (
              <p className="text-xs text-destructive font-medium mt-2">{error}</p>
          )}
        </Card>
      )}
    </div>
  )
}
