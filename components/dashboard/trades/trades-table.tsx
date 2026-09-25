"use client"

import * as React from "react"
import Link from "next/link"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal, Download, Trash2, Edit } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export type Trade = {
  id: string
  date: string
  pair: string
  direction: "LONG" | "SHORT"
  account: string
  source: string
  strategy: string
  rr: number
  pnl: number
  status: "active" | "closed" | "pending"
}

const mockData: Trade[] = [
  { id: "1", date: "2024-03-10T14:30:00Z", pair: "BTC/USDT", direction: "LONG", account: "Main", source: "Personal", strategy: "Breakout", rr: 2.5, pnl: 450.5, status: "closed" },
  { id: "2", date: "2024-03-11T09:15:00Z", pair: "ETH/USDT", direction: "SHORT", account: "Alt", source: "Discord", strategy: "Mean Reversion", rr: 1.2, pnl: -120.0, status: "closed" },
  { id: "3", date: "2024-03-12T16:45:00Z", pair: "SOL/USDT", direction: "LONG", account: "Main", source: "Personal", strategy: "Trend Follow", rr: 0, pnl: 0, status: "active" },
  { id: "4", date: "2024-03-13T11:20:00Z", pair: "XRP/USDT", direction: "SHORT", account: "Main", source: "Signal", strategy: "Breakout", rr: 3.0, pnl: 210.0, status: "closed" },
  { id: "5", date: "2024-03-14T08:00:00Z", pair: "DOGE/USDT", direction: "LONG", account: "Alt", source: "Personal", strategy: "Scalp", rr: 0.8, pnl: 50.0, status: "closed" },
]

export const columns: ColumnDef<Trade>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0 font-semibold text-muted-foreground hover:bg-transparent"
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"))
      return <div className="text-muted-foreground whitespace-nowrap">{date.toLocaleDateString()} {date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
    },
  },
  {
    accessorKey: "pair",
    header: "Pair",
    cell: ({ row }) => <div className="font-mono font-medium">{row.getValue("pair")}</div>,
  },
  {
    accessorKey: "direction",
    header: "Direction",
    cell: ({ row }) => {
      const direction = row.getValue("direction") as string
      return (
        <span
          className={cn(
            "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium uppercase border",
            direction === "LONG"
              ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400"
              : "bg-rose-500/10 text-rose-600 border-rose-500/20 dark:text-rose-400"
          )}
        >
          {direction}
        </span>
      )
    },
  },
  {
    accessorKey: "account",
    header: "Account",
    cell: ({ row }) => <div>{row.getValue("account")}</div>,
  },
  {
    accessorKey: "source",
    header: "Source",
    cell: ({ row }) => <div>{row.getValue("source")}</div>,
  },
  {
    accessorKey: "strategy",
    header: "Strategy",
    cell: ({ row }) => <div>{row.getValue("strategy")}</div>,
  },
  {
    accessorKey: "rr",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0 font-semibold text-muted-foreground hover:bg-transparent"
        >
          R:R
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const rr = parseFloat(row.getValue("rr"))
      return <div className="font-mono">{rr > 0 ? rr.toFixed(2) : "-"}</div>
    },
  },
  {
    accessorKey: "pnl",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0 font-semibold text-muted-foreground hover:bg-transparent"
        >
          PnL
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const pnl = parseFloat(row.getValue("pnl"))
      if (pnl === 0) return <div className="font-mono text-muted-foreground">-</div>
      return (
        <div className={cn("font-mono font-medium", pnl > 0 ? "text-emerald-500" : "text-rose-500")}>
          {pnl > 0 ? "+" : ""}{pnl.toFixed(2)}
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      const colors: Record<string, string> = {
        active: "bg-green-500/10 text-green-600 border-green-500/20 dark:text-green-400",
        pending: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20 dark:text-yellow-400",
        closed: "bg-muted text-muted-foreground border-border",
      }
      return (
        <span
          className={cn(
            "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium uppercase border",
            colors[status] || colors.closed
          )}
        >
          {status}
        </span>
      )
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const trade = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuLabel className="text-[10px] uppercase tracking-widest text-muted-foreground">Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(trade.id)} className="text-xs">
              Copy Trade ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="text-xs">
              <Link href={`/dashboard/trades/${trade.id}`}>View Details</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="text-xs">
              <Link href={`/dashboard/trades/${trade.id}/edit`}>Edit Trade</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function TradesTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data: mockData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const handleExportCSV = () => {
    const rows = table.getFilteredRowModel().rows
    const headers = columns.map(c => (c as any).accessorKey).filter(Boolean)
    
    const csvContent = [
      headers.join(","),
      ...rows.map(row => {
        return headers.map(header => {
          const value = row.getValue(header)
          // Escape quotes and commas
          return `"${String(value).replace(/"/g, '""')}"`
        }).join(",")
      })
    ].join("\n")

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `trades_export_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success("Exported CSV successfully!")
  }

  const handleBulkDelete = () => {
    const count = Object.keys(rowSelection).length
    toast.success(`Mock deleted ${count} trades successfully!`)
    setRowSelection({})
  }

  const handleBulkEdit = () => {
    const count = Object.keys(rowSelection).length
    toast.success(`Opened bulk edit for ${count} trades!`)
  }

  const selectedCount = Object.keys(rowSelection).length

  return (
    <div className="w-full space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
            <Input
            placeholder="Filter by pair (e.g. BTC/USDT)..."
            value={(table.getColumn("pair")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
                table.getColumn("pair")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
            />
            {selectedCount > 0 && (
                <div className="flex items-center gap-2 ml-2">
                    <Button variant="secondary" size="sm" onClick={handleBulkEdit}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit ({selectedCount})
                    </Button>
                    <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete ({selectedCount})
                    </Button>
                </div>
            )}
        </div>
        
        <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleExportCSV}>
                <Download className="mr-2 h-4 w-4" />
                Export CSV
            </Button>
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                    return (
                    <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize text-xs"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                        }
                    >
                        {column.id}
                    </DropdownMenuCheckboxItem>
                    )
                })}
            </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/20">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent border-b border-border">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="h-10 text-[10px] uppercase tracking-widest font-semibold text-muted-foreground whitespace-nowrap">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="h-14 border-border/40 hover:bg-muted/30 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="whitespace-nowrap">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-32 text-center text-sm text-muted-foreground"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
