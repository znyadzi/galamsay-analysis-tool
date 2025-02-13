"use client";

import { Table } from "@tanstack/react-table";

import { Input } from "@/components/ui/input";

interface ToolbarProps<TData> {
  table: Table<TData>;
}

const Toolbar = <TData,>({ table }: ToolbarProps<TData>) => {
  return (
    <div className="flex items-center justify-between">
      <Input
        placeholder="Search filename..."
        value={(table.getColumn("filename")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("filename")?.setFilterValue(event.target.value)
        }
        className="h-8 w-[150px] lg:w-[250px]"
      />
    </div>
  );
};

export default Toolbar;
