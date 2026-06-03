"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      alert("Регистрация успешна! Теперь войдите.");
      router.push("/login");
    } else {
      alert("Ошибка при регистрации");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form
        onSubmit={handleRegister}
        className="flex flex-col gap-4 p-8 border rounded shadow-md"
      >
        <h2 className="text-xl font-bold">Регистрация</h2>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-green-600 text-white p-2 rounded">
          Зарегистрироваться
        </button>
        <p className="text-sm">
          Уже есть аккаунт?{" "}
          <a href="/login" className="text-blue-500">
            Войти
          </a>
        </p>
      </form>
    </div>
  );
}
