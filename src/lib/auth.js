// Simple session-based authentication for demo purposes
// In production, use proper authentication like NextAuth.js or Auth0

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export function verifyPassword(password) {
  return password === ADMIN_PASSWORD;
}

export function createSession(res) {
  // Set a simple session cookie
  res.setHeader('Set-Cookie', 'admin-authed=true; Path=/; HttpOnly; SameSite=Strict');
}

export function destroySession(res) {
  res.setHeader('Set-Cookie', 'admin-authed=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0');
}

export function checkSession(req) {
  const cookie = req.headers.cookie;
  return cookie && cookie.includes('admin-authed=true');
}