"use client"

import React from "react"
import { CldImage } from "next-cloudinary"
import Image, { ImageProps } from "next/image"

interface CloudinaryImageProps extends Omit<ImageProps, "src"> {
  src: string | null | undefined
  fallback?: string
}

export function CloudinaryImage({ src, fallback = "/placeholder.svg", alt, ...props }: CloudinaryImageProps) {
  const imageUrl = src || fallback
  const isCloudinary = imageUrl.includes("res.cloudinary.com")

  if (isCloudinary) {
    return (
      <CldImage
        src={imageUrl}
        alt={alt}
        {...(props as any)}
        format="auto"
        quality="auto"
      />
    )
  }

  return <Image src={imageUrl} alt={alt} {...props} />
}
