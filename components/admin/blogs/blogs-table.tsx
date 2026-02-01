"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Blog } from "@/lib/types"

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
import { MoreHorizontal, Pencil, Trash2, Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface BlogsTableProps {
  initialData: Blog[]
}

export function BlogsTable({ initialData }: BlogsTableProps) {
  const router = useRouter()
  const [data, setData] = React.useState<Blog[]>(initialData)
  const [deleteId, setDeleteId] = React.useState<string | null>(null)
  const [isDeleting, setIsDeleting] = React.useState(false)

  const handleDelete = async () => {
    if (!deleteId) return
    setIsDeleting(true)
    
    const previousData = [...data]
    setData(data.filter(item => item.id !== deleteId))

    try {
      const supabase = createClient()
      const { error } = await supabase.from("blogs").delete().eq("id", deleteId)

      if (error) throw error

      toast.success("Blog post deleted")
      setDeleteId(null)
      router.refresh()
    } catch (error) {
      setData(previousData)
      toast.error("Failed to delete blog post")
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
                <TableHead className="w-[300px] h-10 text-[10px] uppercase tracking-widest font-semibold text-muted-foreground pl-6">Title</TableHead>
                <TableHead className="h-10 text-[10px] uppercase tracking-widest font-semibold text-muted-foreground">Tags</TableHead>
                <TableHead className="h-10 text-[10px] uppercase tracking-widest font-semibold text-muted-foreground">Status</TableHead>
                <TableHead className="h-10 text-[10px] uppercase tracking-widest font-semibold text-muted-foreground">Access</TableHead>
                <TableHead className="h-10 text-[10px] uppercase tracking-widest font-semibold text-muted-foreground">Date</TableHead>
                <TableHead className="h-10 text-right w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-sm text-muted-foreground">
                    No blog posts found.
                  </TableCell>
                </TableRow>
              ) : (
                data.map((blog) => (
                  <TableRow key={blog.id} className="h-14 border-border/40 hover:bg-muted/30 transition-colors">
                    <TableCell className="pl-6">
                        <span className="line-clamp-1 font-medium text-sm" title={blog.title}>
                             {blog.title}
                        </span>
                    </TableCell>
                    <TableCell>
                         <div className="flex flex-wrap gap-1">
                          {blog.tags?.slice(0, 2).map((tag) => (
                            <span key={tag} className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium border bg-muted text-muted-foreground border-border">{tag}</span>
                          ))}
                          {(blog.tags?.length || 0) > 2 && (
                             <span className="text-[10px] text-muted-foreground">+{(blog.tags?.length || 0) - 2}</span>
                          )}
                        </div>
                    </TableCell>
                    <TableCell>
                      {blog.status === "published" ? (
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
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider text-muted-foreground/80">
                            {blog.access_level}
                        </span>
                    </TableCell>
                    <TableCell>
                        <span className="text-xs font-mono text-muted-foreground">
                            {blog.status === 'published' ? formatDate(blog.published_at) : formatDate(blog.created_at || null)}
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
                            <Link href={`/admin/blogs/${blog.id}/edit`}>
                                <Pencil className="mr-2 h-3.5 w-3.5" /> Edit Post
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => setDeleteId(blog.id)}
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
            <AlertDialogTitle>Delete Blog Post</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure? This action cannot be undone.
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
