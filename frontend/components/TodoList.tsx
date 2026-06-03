"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import TodoItem from "./TodoItem";
import Select from "./ui/Select";

export default function TodoList() {
  const [filter, setFilter] = useState("all");
  const { data, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: () => api("/todos"),
  });

  if (isLoading)
    return <div className="text-sm text-slate-400 py-8">Загрузка…</div>;

  const filteredData = data?.filter((t: any) =>
    filter === "all" ? true : t.status === filter,
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-slate-500">
          {filteredData?.length ?? 0} goals
        </p>
        <div className="w-44">
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            options={[
              { value: "all", label: "All Tasks" },
              { value: "todo", label: "To Do" },
              { value: "in-progress", label: "In Progress" },
              { value: "done", label: "Done" },
            ]}
          />
        </div>
      </div>
      {filteredData?.length === 0 ? (
        <div className="text-center py-12 text-slate-400 text-sm border border-dashed border-slate-200 rounded-xl">
          No tasks found
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filteredData?.map((todo: any) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      )}
    </div>
  );
}
