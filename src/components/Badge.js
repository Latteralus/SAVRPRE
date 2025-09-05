import React from 'react';

function Badge({ children, color = "slate" }) {
  const map = {
    slate: "bg-slate-100 text-slate-700 border-slate-200",
    green: "bg-green-100 text-green-700 border-green-200",
    red: "bg-rose-100 text-rose-700 border-rose-200",
    amber: "bg-amber-100 text-amber-800 border-amber-200",
    blue: "bg-blue-100 text-blue-700 border-blue-200",
  };
  
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs border ${map[color]}`}>
      {children}
    </span>
  );
}

export default Badge;