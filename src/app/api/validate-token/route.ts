import verifyToken from "@/utils/verifyToken";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  const token = searchParams.get("token");
  const vin = searchParams.get("vin");

  if (!token || !vin) {
    return NextResponse.redirect(url.origin);
  }

  const isValidToken = await verifyToken(token);

  if (!isValidToken) {
    cookies().delete("cf-turnstyle-token");
    return NextResponse.redirect(url.origin + "/?error=invalid-token");
  }

  cookies().set("cf-turnstyle-token", token, { maxAge: 300 });

  return NextResponse.redirect(url.origin + "/results/" + vin);
}
