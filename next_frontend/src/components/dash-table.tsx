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

const data = [
  { id: 1, title: "test", content: "just commenting", created_at: "11-22-30" },
  { id: 2, title: "test", content: "just commenting", created_at: "11-22-30" },
  { id: 3, title: "test", content: "just commenting", created_at: "11-22-30" },
  { id: 4, title: "test", content: "just commenting", created_at: "11-22-30" },
  { id: 5, title: "test", content: "just commenting", created_at: "11-22-30" },
  { id: 6, title: "test", content: "just commenting", created_at: "11-22-30" },
  { id: 7, title: "test", content: "just commenting", created_at: "11-22-30" },
  { id: 8, title: "test", content: "just commenting", created_at: "11-22-30" },
  { id: 9, title: "test", content: "just commenting", created_at: "11-22-30" },
  { id: 10, title: "test", content: "just commenting", created_at: "11-22-30" },
];

export function DashTable() {
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
