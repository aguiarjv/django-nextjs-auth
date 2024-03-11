import { Ellipsis } from "lucide-react";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  TableHeader,
} from "./ui/table";

import type { PostData } from "./dash-main";

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
              <TableOptions />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function TableOptions() {
  return (
    <Button variant="outline" size="icon" className="size-8">
      <Ellipsis className="size-6" />
    </Button>
  );
}
