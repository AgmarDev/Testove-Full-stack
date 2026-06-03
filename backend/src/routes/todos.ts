import { Router } from "express";
import { prisma } from "../db";
import { authenticate } from "../middleware/auth";
import { todoSchema } from "../schemas/todo.schema";

const router = Router();

router.get("/", authenticate, async (req, res) => {
  try {
    const { status } = req.query;
    const userId = (req as any).user.id;
    const todos = await prisma.todo.findMany({
      where: { userId, status: status as string | undefined },
    });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

router.post("/", authenticate, async (req, res) => {
  const validation = todoSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({ error: validation.error.issues });
  }

  try {
    const { title, description } = validation.data;

    if (!title) return res.status(400).json({ error: "Title is required" });

    const todo = await prisma.todo.create({
      data: {
        title,
        description: description || "",
        userId: (req as any).user.id,
        status: "todo",
      },
    });
    res.status(201).json({ message: "Todo created successfully", todo });
  } catch (error) {
    res.status(500).json({ error: "Failed to create todo" });
  }
});

router.put("/:id", authenticate, async (req, res) => {
  const validation = todoSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({ error: validation.error.issues });
  }
  try {
    const todoId = parseInt(req.params.id as string);

    const updated = await prisma.todo.update({
      where: { id: todoId, userId: (req as any).user.id },
      data: validation.data,
    });
    res
      .status(200)
      .json({ message: "Todo updated successfully", todo: updated });
  } catch (error) {
    res.status(404).json({ error: "Todo not found or unauthorized" });
  }
});

router.delete("/:id", authenticate, async (req, res) => {
  try {
    const todoId = parseInt(req.params.id as string);
    await prisma.todo.delete({
      where: { id: todoId, userId: (req as any).user.id },
    });
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: "Todo not found" });
  }
});

export default router;
