import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  TableHeader,
} from "./ui/table";
import { TableOptions } from "./dash-table-options";

import type { PostData } from "@/lib/definitions";

export function DashTable({ data }: { data: PostData[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead className="w-[200px]">Title</TableHead>
          <TableHead colSpan={2}>Content</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.id}</TableCell>
            <TableCell className="font-medium">{item.title}</TableCell>
            <TableCell colSpan={2}>{item.content}</TableCell>
            <TableCell>{item.created_at}</TableCell>
            <TableCell>
              <TableOptions postId={item.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
