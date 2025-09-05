import { checkSession } from '../../../lib/auth';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const isAuthenticated = checkSession(req);
    res.status(200).json({ authenticated: isAuthenticated });
  } catch (error) {
    console.error('Auth check error:', error);
    res.status(500).json({ error: 'Auth check failed' });
  }
}