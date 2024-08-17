"use client";

import { FormEvent, useState } from "react";
import TurnstileWidget from "@/components/turnstile";
import { redirect, useRouter } from "next/navigation";

export default function Home() {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!token) {
      alert("Please complete the CAPTCHA");
      return;
    }
    router.push(
      `/results?vin=${(event.target as any).vin.value}&token=${token ?? ""}`
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-b from-gray-50 to-gray-200 dark:from-neutral-800 dark:to-neutral-900">
      <div className="w-full max-w-sm bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-8">
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="vin"
            className="block text-gray-800 dark:text-neutral-200 text-sm font-semibold mb-4"
          >
            Enter VIN:
          </label>
          <div className="bg-gray-50 dark:bg-neutral-700 rounded-md px-4 py-2 flex items-center gap-x-3 shadow-inner">
            <input
              className="h-10 w-full rounded-md bg-transparent text-gray-700 dark:text-neutral-200 placeholder-gray-500 dark:placeholder-neutral-400 focus:outline-none"
              type="text"
              id="vin"
              name="vin"
              placeholder="Enter your VIN"
              required
            />
            <button
              className="h-10 px-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
              type="submit"
            >
              Decode
            </button>
          </div>
          <div className="mt-4">
            <TurnstileWidget
              sitekey={process.env.NEXT_PUBLIC_TURNSLITE_SITE_KEY!}
              onVerify={(t) => setToken(t)}
              onError={() => {
                console.error("CAPTCHA verification failed");
                setToken(null);
              }}
            />
          </div>
        </form>
      </div>
    </main>
  );
}
