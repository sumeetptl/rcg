import { createClient } from "@/lib/supabase/server"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"

export const dynamic = "force-dynamic"

export default async function AdminWaitlistPage() {
  const supabase = await createClient()

  const { data: entries, error } = await supabase
    .from("waitlist_entries")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    return <div className="p-8 text-red-500">Error loading waitlist: {error.message}</div>
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Waitlist Entries</h2>
      </div>
      
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Trading Level</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries?.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell className="font-medium">{entry.email}</TableCell>
                <TableCell className="capitalize">{entry.trading_level}</TableCell>
                <TableCell>
                  <Badge 
                    variant={entry.status === "approved" ? "default" : "secondary"}
                    className="capitalize"
                  >
                    {entry.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {entry.created_at ? formatDistanceToNow(new Date(entry.created_at), { addSuffix: true }) : "-"}
                </TableCell>
              </TableRow>
            ))}
            {(!entries || entries.length === 0) && (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No entries yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
