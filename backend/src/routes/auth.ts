import { Router } from "express";
import { prisma } from "../db";
import { hashPassword, comparePasswords } from "../utils/hash";
import { authSchema } from "../schemas/todo.schema";
import jwt from "jsonwebtoken";

const router = Router();
const JWT_SECRET = "test_key_123";

router.post("/register", async (req, res) => {
  const validation = authSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      error: "Validation failed",
    });
  }

  const { email, password } = validation.data;

  const hashedPassword = await hashPassword(password);

  try {
    await prisma.user.create({ data: { email, password: hashedPassword } });
    res.status(201).json({ message: "Registration successful" });
  } catch {
    res
      .status(400)
      .json({ error: "Registration failed, email might already be taken" });
  }
});

router.post("/login", async (req, res) => {
  const validation = authSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      error: "Validation failed",
    });
  }

  const { email, password } = validation.data;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await comparePasswords(password, user.password))) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

export default router;
