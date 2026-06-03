"use client";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTodo, deleteTodo } from "../lib/api";
import Input from "./ui/Input";
import Button from "./ui/Button";
import Select from "./ui/Select";

export default function TodoItem({ todo }: { todo: any }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: todo.title,
    description: todo.description,
    status: todo.status,
  });
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: (data: any) => updateTodo(todo.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setIsEditing(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteTodo(todo.id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  if (isEditing) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col gap-3">
        <Input
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          rows={2}
          className="w-full px-3 py-2 rounded-lg text-sm border border-slate-300 text-slate-800 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <div className="flex gap-2">
          <Button
            onClick={() => updateMutation.mutate(formData)}
            disabled={updateMutation.isPending}
          >
            Save
          </Button>
          <Button variant="ghost" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex justify-between items-start gap-4">
      <div className="flex flex-col gap-1 min-w-0">
        <h3
          className={`font-medium text-slate-800 ${todo.status === "done" ? "line-through text-slate-400" : ""}`}
        >
          {todo.title}
        </h3>
        {todo.description && (
          <p className="text-sm text-slate-500">{todo.description}</p>
        )}
        <div className="mt-1 w-36">
          <Select
            value={todo.status}
            onChange={(e) =>
              updateMutation.mutate({ ...todo, status: e.target.value })
            }
            options={[
              { value: "todo", label: "To Do" },
              { value: "in-progress", label: "In Progress" },
              { value: "done", label: "Done" },
            ]}
          />
        </div>
      </div>
      <div className="flex gap-2 shrink-0">
        <Button variant="warning" onClick={() => setIsEditing(true)}>
          Edit
        </Button>
        <Button
          variant="danger"
          onClick={() => deleteMutation.mutate()}
          disabled={deleteMutation.isPending}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
