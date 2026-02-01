"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { News } from "@/lib/types"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { MoreHorizontal, Pencil, Trash2, Eye, EyeOff, ExternalLink } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface NewsTableProps {
  initialData: News[]
}

export function NewsTable({ initialData }: NewsTableProps) {
  const router = useRouter()
  const [data, setData] = React.useState<News[]>(initialData)
  const [deleteId, setDeleteId] = React.useState<string | null>(null)
  const [isDeleting, setIsDeleting] = React.useState(false)

  const handleDelete = async () => {
    if (!deleteId) return
    setIsDeleting(true)
    
    // Optimistic update
    const previousData = [...data]
    setData(data.filter(item => item.id !== deleteId))

    try {
      const supabase = createClient()
      const { error } = await supabase.from("news").delete().eq("id", deleteId)

      if (error) throw error

      toast.success("Article deleted")
      setDeleteId(null)
      router.refresh()
    } catch (error) {
      setData(previousData)
      toast.error("Failed to delete article")
      console.error(error)
    } finally {
      setIsDeleting(false)
    }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not published"
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <>
      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <Table>
            <TableHeader className="bg-muted/20">
              <TableRow className="hover:bg-transparent border-b border-border">
                <TableHead className="w-[350px] h-10 text-[10px] uppercase tracking-widest font-semibold text-muted-foreground pl-6">Title</TableHead>
                <TableHead className="h-10 text-[10px] uppercase tracking-widest font-semibold text-muted-foreground">Category</TableHead>
                <TableHead className="h-10 text-[10px] uppercase tracking-widest font-semibold text-muted-foreground">Source</TableHead>
                <TableHead className="h-10 text-[10px] uppercase tracking-widest font-semibold text-muted-foreground">Status</TableHead>
                <TableHead className="h-10 text-[10px] uppercase tracking-widest font-semibold text-muted-foreground">Date</TableHead>
                <TableHead className="h-10 text-right w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-sm text-muted-foreground">
                    No news articles found.
                  </TableCell>
                </TableRow>
              ) : (
                data.map((item) => (
                  <TableRow key={item.id} className="h-14 border-border/40 hover:bg-muted/30 transition-colors">
                    <TableCell className="pl-6">
                        <div className="flex flex-col gap-0.5">
                            <span className="truncate block font-medium text-sm" title={item.title}>{item.title}</span>
                             {item.source_url && (
                                <a href={item.source_url} target="_blank" rel="noreferrer" className="text-[10px] text-muted-foreground hover:underline flex items-center gap-1 w-fit">
                                    Original Link <ExternalLink className="h-2.5 w-2.5" />
                                </a>
                             )}
                        </div>
                    </TableCell>
                    <TableCell>
                         <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium border bg-muted text-muted-foreground border-border capitalize">{item.category}</span>
                    </TableCell>
                     <TableCell>
                        <span className="text-xs text-muted-foreground">
                            {item.source || "—"}
                        </span>
                    </TableCell>
                    <TableCell>
                      {item.status === "published" ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium uppercase border bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400">
                            Published
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium uppercase border bg-muted text-muted-foreground border-border">
                            Draft
                          </span>
                        )}
                    </TableCell>
                    <TableCell>
                        <span className="text-xs font-mono text-muted-foreground">
                            {item.status === 'published' ? formatDate(item.published_at) : formatDate(item.created_at || null)}
                        </span>
                    </TableCell>
                    <TableCell className="text-right pr-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[160px]">
                          <DropdownMenuLabel className="text-[10px] uppercase tracking-widest text-muted-foreground">Actions</DropdownMenuLabel>
                          <DropdownMenuItem asChild className="text-xs">
                            <Link href={`/admin/news/${item.id}/edit`}>
                                <Pencil className="mr-2 h-3.5 w-3.5" /> Edit Article
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => setDeleteId(item.id)}
                            className="text-xs text-red-600 focus:text-red-600 focus:bg-red-100 dark:focus:bg-red-900/20"
                          >
                            <Trash2 className="mr-2 h-3.5 w-3.5" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete News Article</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
                onClick={(e) => {
                    e.preventDefault()
                    handleDelete()
                }}
                disabled={isDeleting}
                className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
