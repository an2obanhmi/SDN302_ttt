"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

type LoginInput = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (data: LoginInput) => {
    setLoading(true);
    setError(null);
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      setError(res.error === "CredentialsSignin" ? "Email hoặc mật khẩu không đúng" : res.error);
    } else {
      router.push("/");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="email" className="form-label">Email</label>
        <input
          id="email"
          type="email"
          className="input"
          placeholder="Nhập email"
          {...register("email")}
          disabled={loading}
        />
        {errors.email && <p className="form-error">{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="password" className="form-label">Mật khẩu</label>
        <input
          id="password"
          type="password"
          className="input"
          placeholder="Nhập mật khẩu"
          {...register("password")}
          disabled={loading}
        />
        {errors.password && <p className="form-error">{errors.password.message}</p>}
      </div>
      {error && <div className="form-error text-center">{error}</div>}
      <button
        type="submit"
        className="btn w-full"
        disabled={loading}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
            <span className="ml-2">Đang đăng nhập...</span>
          </div>
        ) : (
          "Đăng nhập"
        )}
      </button>
    </form>
  );
} 