import React, { useState } from 'react';

function AdminDialog({ onClose, authed, setAuthed, onAdd }) {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [show, setShow] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/40 grid place-items-center p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl border border-slate-200">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="font-semibold">Admin</h2>
          <button onClick={onClose} className="px-2 py-1 rounded-lg text-sm hover:bg-slate-100">Close</button>
        </div>

        {!authed ? (
          <div className="p-4 space-y-3">
            <p className="text-sm text-slate-600">Demo credentials: <b>admin</b> / <b>admin123</b></p>
            <input
              value={u}
              onChange={(e) => setU(e.target.value)}
              placeholder="Username"
              className="w-full px-3 py-2 rounded-xl border border-slate-300"
            />
            <div className="flex gap-2">
              <input
                type={show ? "text" : "password"}
                value={p}
                onChange={(e) => setP(e.target.value)}
                placeholder="Password"
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
              />
              <button onClick={() => setShow((s) => !s)} className="px-3 rounded-xl border">{show ? "Hide" : "Show"}</button>
            </div>
            <button
              onClick={() => {
                if (u === "admin" && p === "admin123") setAuthed(true);
                else alert("Invalid credentials for demo");
              }}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 text-white"
            >
              Sign In
            </button>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            <div className="rounded-xl bg-slate-50 border p-3 text-sm text-slate-600">
              You are signed in. You can add, edit, delete listings and upload images. All data saves to your browser.
            </div>
            <div className="flex gap-2">
              <button onClick={onAdd} className="px-3 py-2 rounded-xl border border-slate-300 hover:bg-slate-50">Add Listing</button>
              <button onClick={() => setAuthed(false)} className="px-3 py-2 rounded-xl border border-slate-300 hover:bg-slate-50">Sign Out</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDialog;