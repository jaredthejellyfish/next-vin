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

  let form = new FormData();
  form.append("secret", process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY ?? "");
  form.append("response", token ?? "");
  form.append("remoteip", req.headers.get("x-forwarded-for") as string);

  const result = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    { method: "POST", body: form }
  );

  const outcome = await result.json();

  if (!outcome.success) {
    console.error("CAPTCHA verification failed");
    return NextResponse.redirect(
      `${url.origin}/?error=CAPTCHA verification failed`
    );
  }

  return NextResponse.redirect(`${url.origin}/results?vin=${vin}`);
}
