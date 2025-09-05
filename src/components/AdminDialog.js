import React, { useState, useEffect } from 'react';

function AdminDialog({ onClose, authed, setAuthed, onAdd }) {
  const [p, setP] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/auth/check');
      if (response.ok) {
        const { authenticated } = await response.json();
        if (authenticated) {
          setAuthed(true);
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: p }),
      });

      if (response.ok) {
        setAuthed(true);
      } else {
        const error = await response.json();
        alert(error.error || 'Invalid password');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (response.ok) {
        setAuthed(false);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 grid place-items-center p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl border border-slate-200">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="font-semibold">Admin</h2>
          <button onClick={onClose} className="px-2 py-1 rounded-lg text-sm hover:bg-slate-100">Close</button>
        </div>

        {!authed ? (
          <div className="p-4 space-y-3">
            <p className="text-sm text-slate-600">Enter admin password to manage properties</p>
            <div className="flex gap-2">
              <input
                type={show ? "text" : "password"}
                value={p}
                onChange={(e) => setP(e.target.value)}
                placeholder="Password"
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
                disabled={loading}
              />
              <button onClick={() => setShow((s) => !s)} className="px-3 rounded-xl border" disabled={loading}>
                {show ? "Hide" : "Show"}
              </button>
            </div>
            <button
              onClick={handleLogin}
              disabled={loading || !p}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 text-white disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            <div className="rounded-xl bg-slate-50 border p-3 text-sm text-slate-600">
              You are signed in. You can add, edit, delete listings and upload images. All data is now stored in Vercel Postgres database.
            </div>
            <div className="flex gap-2">
              <button onClick={onAdd} className="px-3 py-2 rounded-xl border border-slate-300 hover:bg-slate-50">Add Listing</button>
              <button onClick={handleLogout} className="px-3 py-2 rounded-xl border border-slate-300 hover:bg-slate-50">Sign Out</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDialog;