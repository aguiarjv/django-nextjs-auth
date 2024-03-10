import { DashSearchBar } from "./dash-search";
import { AddNewPost } from "./add-post";

export function DashHeader() {
  return (
    <div className="flex flex-row items-center justify-between">
      <DashSearchBar />
      <AddNewPost />
    </div>
  );
}
