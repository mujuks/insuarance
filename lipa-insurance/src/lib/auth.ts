const USERS_KEY = "rsb_users";
const SESSION_KEY = "rsb_session";

export interface User {
  name: string;
  email: string;
  password: string;
}

export interface Session {
  name: string;
  email: string;
}

function readUsers(): User[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]") as User[];
  } catch {
    return [];
  }
}

function writeUsers(list: User[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(list));
}

export function seedDemoUser(): void {
  const list = readUsers();
  if (!list.some((u) => u.email === "demo@royalshield.co.ke")) {
    list.push({ name: "Demo Client", email: "demo@royalshield.co.ke", password: "demo123" });
    writeUsers(list);
  }
}

export function getSession(): Session | null {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || "null") as Session | null;
  } catch {
    return null;
  }
}

function setSession(s: Session): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(s));
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
}

export function signIn(email: string, password: string): { ok: boolean; error?: string; user?: User } {
  const user = readUsers().find((u) => u.email === email && u.password === password);
  if (!user) return { ok: false, error: "Incorrect email or password. Try demo@royalshield.co.ke / demo123." };
  setSession({ name: user.name, email: user.email });
  return { ok: true, user };
}

export function signUp(name: string, email: string, password: string): { ok: boolean; error?: string } {
  const list = readUsers();
  if (list.some((u) => u.email === email)) {
    return { ok: false, error: "An account with that email already exists — try signing in." };
  }
  list.push({ name, email, password });
  writeUsers(list);
  setSession({ name, email });
  return { ok: true };
}
