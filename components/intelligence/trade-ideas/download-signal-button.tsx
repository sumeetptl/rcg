"use client";

import React, { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toPng } from "html-to-image";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface DownloadSignalButtonProps {
  elementId: string;
  filename: string;
  className?: string;
}

export function DownloadSignalButton({ elementId, filename, className }: DownloadSignalButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    const element = document.getElementById(elementId);
    if (!element) {
      toast.error("Could not find the signal content to download.");
      return;
    }

    try {
      setIsDownloading(true);
      
      // Temporarily add watermark if we want it, or assume it's built into the layout
      // But html-to-image sometimes has trouble if we modify DOM mid-flight, so we just capture
      const dataUrl = await toPng(element, {
        cacheBust: true,
        pixelRatio: 2,
        style: {
          transform: 'scale(1)',
        }
      });
      
      const link = document.createElement('a');
      link.download = `${filename}.png`;
      link.href = dataUrl;
      link.click();
      toast.success("Detailed report downloaded!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to download signal report.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Button 
      variant="outline" 
      size="sm"
      className={cn("gap-2", className)}
      onClick={handleDownload}
      disabled={isDownloading}
    >
      <Download className={cn("h-4 w-4", isDownloading && "animate-pulse")} />
      {isDownloading ? "Capturing..." : "Download Report"}
    </Button>
  );
}
