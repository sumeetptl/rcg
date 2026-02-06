"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Signal } from "@/lib/types";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { CryptoLogo } from "@/components/crypto/crypto-logo";

interface SignalsTableProps {
  initialData: Signal[];
}

export function SignalsTable({ initialData }: SignalsTableProps) {
  const router = useRouter();
  const [data, setData] = React.useState<Signal[]>(initialData);
  const [deleteId, setDeleteId] = React.useState<string | null>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);

    // Optimistic update
    const previousData = [...data];
    setData(data.filter((item) => item.id !== deleteId));

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("signals")
        .delete()
        .eq("id", deleteId);

      if (error) throw error;

      toast.success("Signal deleted successfully");
      setDeleteId(null);
      router.refresh();
    } catch (error) {
      setData(previousData); // Revert optimistic update
      toast.error("Failed to delete signal");
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  const formatPrice = (price: number | null) => {
    if (price === null || price === undefined) return "-";
    return price < 1
      ? price.toFixed(6)
      : price.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const statusColors: Record<string, string> = {
    pending:
      "bg-yellow-500/10 text-yellow-600 border-yellow-500/20 dark:text-yellow-400",
    active:
      "bg-green-500/10 text-green-600 border-green-500/20 dark:text-green-400",
    closed: "bg-muted text-muted-foreground border-border",
    cancelled: "bg-red-500/10 text-red-600 border-red-500/20 dark:text-red-400",
    draft: "bg-muted text-muted-foreground border-border",
  };

  return (
    <>
      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/20">
            <TableRow className="hover:bg-transparent border-b border-border">
              <TableHead className="w-[180px] h-10 text-[10px] uppercase tracking-widest font-semibold text-muted-foreground pl-6">
                Asset
              </TableHead>
              <TableHead className="h-10 text-[10px] uppercase tracking-widest font-semibold text-muted-foreground">
                Direction
              </TableHead>
              <TableHead className="h-10 text-[10px] uppercase tracking-widest font-semibold text-muted-foreground">
                Entry Price
              </TableHead>
              <TableHead className="h-10 text-[10px] uppercase tracking-widest font-semibold text-muted-foreground">
                Status
              </TableHead>
              <TableHead className="h-10 text-[10px] uppercase tracking-widest font-semibold text-muted-foreground">
                Result
              </TableHead>
              <TableHead className="h-10 text-right w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-32 text-center text-sm text-muted-foreground"
                >
                  No signals found.
                </TableCell>
              </TableRow>
            ) : (
              data.map((signal) => (
                <TableRow
                  key={signal.id}
                  className="h-14 border-border/40 hover:bg-muted/30 transition-colors"
                >
                  <TableCell className="pl-6">
                    <div className="flex items-center gap-3">
                      <CryptoLogo symbol={signal.asset} size={32} />
                      <div className="flex flex-col gap-0.5">
                        <span className="font-mono text-sm font-medium">
                          {signal.asset}
                        </span>
                        <span className="text-[10px] text-muted-foreground font-mono">
                          {formatDate(signal.created_at)}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium uppercase border",
                        signal.direction === "LONG"
                          ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400"
                          : "bg-rose-500/10 text-rose-600 border-rose-500/20 dark:text-rose-400",
                      )}
                    >
                      {signal.direction === "LONG" ? (
                        <ArrowUp className="h-3 w-3" />
                      ) : (
                        <ArrowDown className="h-3 w-3" />
                      )}
                      {signal.direction}
                    </span>
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    ${formatPrice(signal.entry_price)}
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium uppercase border",
                        statusColors[signal.status.toLowerCase()] ||
                          statusColors.draft,
                      )}
                    >
                      {signal.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {signal.result ? (
                      <span className="font-mono text-xs font-medium capitalize">
                        {signal.result}
                      </span>
                    ) : (
                      <span className="text-muted-foreground text-xs">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right pr-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                        >
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[160px]">
                        <DropdownMenuLabel className="text-[10px] uppercase tracking-widest text-muted-foreground">
                          Actions
                        </DropdownMenuLabel>
                        <DropdownMenuItem asChild className="text-xs">
                          <Link href={`/admin/signals/${signal.id}/edit`}>
                            <Pencil className="mr-2 h-3.5 w-3.5" /> Edit Signal
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => setDeleteId(signal.id)}
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

      <AlertDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              signal and remove it from the dashboard.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isDeleting ? "Deleting..." : "Delete Signal"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
