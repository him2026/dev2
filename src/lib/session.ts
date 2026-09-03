import { cookies } from "next/headers";

export interface SessionUser {
  id: number;
  email: string;
  name: string;
  role: string;
}

const SESSION_COOKIE_NAME = "him_session";

export async function getSession(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

    if (!sessionCookie || !sessionCookie.value) {
      return null;
    }

    const userData = JSON.parse(
      Buffer.from(sessionCookie.value, "base64").toString("utf-8")
    );
    return userData as SessionUser;
  } catch {
    return null;
  }
}

export async function setSession(user: SessionUser) {
  const cookieStore = await cookies();
  const sessionValue = Buffer.from(JSON.stringify(user)).toString("base64");

  cookieStore.set(SESSION_COOKIE_NAME, sessionValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
