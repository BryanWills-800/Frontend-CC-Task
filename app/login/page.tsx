"use client";

import React, { useState } from "react";
import Button from "@/app/components/Button";
import { useAuth } from "@/app/context/AuthContext";
import { getSingleUser } from "@/app/lib/userService";


export default function LoginPage() {
  const { login } = useAuth();

  const [error, setError] = useState("");

  return (
    <main className="flex min-h-[80vh] items-center justify-center p-4">
      <div className="w-full max-w-md p-6 rounded-box shadow-xl border border-gray-800 bg-neutral-900">

        <h1 className="text-2xl font-bold text-center text-white mb-6">
          Login to ISS Telemetry
        </h1>
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            const formData = new FormData(e.currentTarget);
            const email = String(formData.get("email") ?? "").trim();
            const password = String(formData.get("password") ?? "").trim();

            if (!email || !password) {
              setError("All fields are required.");
              return;
            }

            const user = await getSingleUser(email);
            if (!user) {
              setError("User not found.");
              return;
            }

            if (user.password !== password) {
              setError("Incorrect password.");
              return;
            }

            await login(email, password);
            window.location.replace("/dashboard");
          }}
          className="space-y-4"
        >
          <div className="form-control">
            <label htmlFor="email" className="label font-medium text-gray-200">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="name@example.com"
              className="input input-bordered w-full"
              required
              autoComplete="email"
            />
          </div>
          <div className="form-control">
            <label htmlFor="password" className="label font-medium text-gray-200">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="input input-bordered w-full"
              required
              autoComplete="current-password"
            />
          </div>

          <div className="pt-2" style={{ alignItems: "center", alignContent: "center" }}>
            {error && <p className="text-red-400">{error}</p>}
          </div>

          <div className="pt-2" style={{ alignItems: "center", alignContent: "center" }}>
            <Button variant="primary" type="submit">Login</Button>
          </div>
        </form>
        <br /><hr /><br />
        <div className="flex" style={{ alignItems: "center", alignContent: "center" }}>
          <p className="pr-2.5" style={{ alignItems: "center", alignContent: "center" }}>Don&apos;t have an account?</p>
          <Button href="/signup">Sign Up</Button>
        </div>
        <br />
        <div className="flex" style={{ alignItems: "center", alignContent: "center" }}>
          <p className="pr-2.5" style={{ alignItems: "center", alignContent: "center" }}>Forgot password?</p>
          <Button href="/signup">Reset Password</Button>
        </div>
      </div>
    </main>
  );
}
