"use client";

import { FormEvent, useState } from "react";
import TurnstileWidget from "@/components/turnstile";
import { useRouter } from "next/navigation";
import { validate, validateAndThrowOnInvalid } from "vinidator";

export default function Home() {
  const [token, setToken] = useState<string | null>(null);
  const [vin, setVin] = useState("");
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
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          VIN Decoder
        </h1>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label
              htmlFor="vin"
              className="block text-gray-800 dark:text-neutral-200 text-sm font-semibold mb-2"
            >
              Enter VIN:
            </label>
            <div className="bg-gray-50 dark:bg-neutral-700 rounded-md px-4 py-2 flex items-center gap-x-3 shadow-inner">
              <input
                className="h-10 w-full rounded-md bg-transparent text-gray-700 dark:text-neutral-200 placeholder-gray-500 dark:placeholder-neutral-400 focus:outline-none"
                type="text"
                id="vin"
                name="vin"
                value={vin}
                onChange={(e) => setVin(e.target.value)}
                placeholder="Enter your VIN"
                required
                aria-required="true"
                aria-invalid={
                  !token || validate(vin).isValid === false ? "true" : "false"
                }
                aria-describedby="vin-error"
                pattern="^[A-HJ-NPR-Z0-9]{17}$"
                maxLength={17}
              />
              <button
                className="h-10 px-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-800 disabled:opacity-50"
                type="submit"
                aria-label="Decode VIN"
                disabled={!token || validate(vin).isValid === false}
              >
                Decode
              </button>
            </div>
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
