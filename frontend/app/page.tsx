"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("token")) router.push("/login");
  }, [router]);

  return (
    <main className="min-h-screen px-6 py-12 bg-slate-950">
      <div className="w-full max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-slate-100 tracking-tight">
            My Tasks
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your to-dos in one place
          </p>
        </div>
        <TodoForm />
        <TodoList />
      </div>
    </main>
  );
}
