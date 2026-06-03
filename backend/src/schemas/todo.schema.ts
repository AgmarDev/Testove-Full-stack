import { z } from "zod";

export const authSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const todoSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  description: z.string().optional(),
  status: z.enum(["todo", "in-progress", "done"]).optional(),
});
