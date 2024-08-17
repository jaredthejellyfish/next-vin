import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const { searchParams } = new URL(req.url);

  const vin = searchParams.get("vin");
  const token = searchParams.get("token");

  if (!vin) {
    console.error("No VIN provided");
    return NextResponse.redirect(`${url.origin}/?error=No VIN provided`);
  }

  if (!token) {
    console.error("No token provided");
    return NextResponse.redirect(`${url.origin}/?error=No token provided`);
  }

  const form = new URLSearchParams();
  form.append("secret", process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY ?? "");
  form.append("response", token ?? "");
  form.append("remoteip", req.headers.get("x-forwarded-for") as string);

  const result = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    { method: "POST", body: form }
  );

  if (result.status !== 200) {
    console.error("Error verifying token");
    return NextResponse.redirect(`${url.origin}/?error=Error verifying token`);
  }

  return NextResponse.redirect(`${url.origin}/results?vin=${vin}`);
}
