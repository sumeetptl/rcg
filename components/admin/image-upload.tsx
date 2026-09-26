"use client"

import * as React from "react"
import { CldUploadWidget } from "next-cloudinary"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { UploadCloud, X } from "lucide-react" 
import { cn } from "@/lib/utils"

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  onRemove: () => void
  disabled?: boolean
}

export function ImageUpload({ 
  value, 
  onChange, 
  onRemove, 
  disabled
}: ImageUploadProps) {

  const onUpload = (result: any) => {
    // Cloudinary returns the secure_url which is the public HTTPS URL
    onChange(result.info.secure_url)
  }

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
                type="button"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      ) : (
        <CldUploadWidget 
           onSuccess={onUpload} 
           uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
           options={{
             maxFiles: 1,
           }}
        >
          {({ open }) => {
            const onClick = (e: React.MouseEvent) => {
              e.preventDefault()
              open()
            }

            return (
              <Card
                onClick={onClick}
                className={cn(
                  "border-2 border-dashed p-10 transition-colors cursor-pointer hover:bg-muted/50 flex flex-col items-center justify-center gap-4 text-center min-h-[200px]",
                  "border-muted-foreground/25",
                  disabled && "opacity-50 cursor-not-allowed pointer-events-none"
                )}
              >
                <div className="rounded-full bg-muted p-4">
                   <UploadCloud className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="max-w-[15rem] space-y-1">
                   <p className="text-sm font-medium">
                      Click to upload image
                   </p>
                   <p className="text-xs text-muted-foreground">
                     Uploads directly to Cloudinary
                   </p>
                </div>
              </Card>
            )
          }}
        </CldUploadWidget>
      )}
    </div>
  )
}

