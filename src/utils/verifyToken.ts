async function verifyToken(token: string) {
    const form = new FormData();
    form.append("secret", process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY ?? "");
    form.append("response", token);
  
    const result = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body: form }
    );
  
    const outcome = await result.json();
  
    return outcome.success;
  }

  export default verifyToken;