"use client";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import Input from "./ui/Input";
import Select from "./ui/Select";
import Button from "./ui/Button";

export default function TodoForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "todo",
  });
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: any) =>
      api("/todos", { method: "POST", body: JSON.stringify(data) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setFormData({ title: "", description: "", status: "todo" });
    },
  });

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm mb-8">
      <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
        New Task
      </h2>
      <div className="flex flex-col gap-3">
        <Input
          placeholder="Task title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <textarea
          placeholder="Description (optional)"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          rows={3}
          className="w-full px-3 py-2 rounded-lg text-sm border border-slate-300 placeholder:text-slate-400 text-slate-800 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <Select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          options={[
            { value: "todo", label: "To Do" },
            { value: "in-progress", label: "In Progress" },
            { value: "done", label: "Done" },
          ]}
        />
        <Button
          onClick={() => mutation.mutate(formData)}
          disabled={!formData.title.trim() || mutation.isPending}
        >
          {mutation.isPending ? "Adding…" : "Add Task"}
        </Button>
      </div>
    </div>
  );
}
