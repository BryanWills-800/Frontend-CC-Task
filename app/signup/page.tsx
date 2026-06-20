"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/app/components/Button";
import { useAuth } from "@/app/context/AuthContext";
import { createUser, getSingleUser } from "@/app/lib/userService";


export default function SignUpPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [error, setError] = useState("");

  return (
    <main className="flex min-h-[80vh] items-center justify-center p-4">
      <div className="w-full max-w-md p-6 rounded-box shadow-xl border border-gray-800 bg-neutral-900">
        <h1 className="text-2xl font-bold text-center text-white mb-6">
          Sign Up to ISS Telemetry
        </h1>

        <form
          onSubmit={async (e) => {
            e.preventDefault();

            const formData = new FormData(e.currentTarget);
            const name = String(formData.get("name") ?? "").trim();
            const email = String(formData.get("email") ?? "").trim();
            const password = String(formData.get("enter_password") ?? "").trim();
            const confirmPassword = String(formData.get("confirm_password") ?? "").trim();

            if (!name || !email || !password || !confirmPassword) {
              setError("All fields are required.");
              return;
            }

            const userExists = await getSingleUser(email);
            if (userExists) {
              setError("User already exists.");
              return;
            }

            if (password !== confirmPassword) {
              setError("Passwords do not match.");
              return;
            }

            await createUser({ name: name as string, role: "User" as string, email: email as string, password: password as string })
            setError("");

            await login(email, password);
            router.push("/dashboard");
          }}
          className="space-y-4"
        >
          <div className="form-control">
            <label htmlFor="name" className="label font-medium text-gray-200">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter Name"
              className="input input-bordered w-full"
              required
            />
          </div>

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
            />
          </div>

          <div className="form-control">
            <label
              htmlFor="enter_password"
              className="label font-medium text-gray-200"
            >
              Enter Password
            </label>
            <input
              type="password"
              name="enter_password"
              id="enter_password"
              placeholder="Enter Password"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label
              htmlFor="confirm_password"
              className="label font-medium text-gray-200"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirm_password"
              id="confirm_password"
              placeholder="Confirm Password"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="pt-2" style={{ alignItems: "center", alignContent: "center" }}>
            {error && <p className="text-red-400">{error}</p>}
          </div>

          <div className="pt-2" style={{ alignItems: "center", alignContent: "center" }}>
            <Button variant="primary" type="submit">
              Create Account
            </Button>
          </div>
        </form>

        <br />
        <hr />
        <br />

        <div className="flex items-center justify-center">
          <p className="pr-2.5">Already have an account?</p>
          <Button href="/login">Login</Button>
        </div>
      </div>
    </main>
  );
}
