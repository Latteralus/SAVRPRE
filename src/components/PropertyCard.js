import React, { useRef } from 'react';
import Badge from './Badge';
import { currency } from '../utils';

function PropertyCard({ p, admin, onEdit, onDelete, onUpdate }) {
  const inputRef = useRef(null);

  function handleFile(e) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const urls = files.map((f) => URL.createObjectURL(f));
    onUpdate({ ...p, images: [...(p.images || []), ...urls] });
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
      <div className="aspect-[16/9] bg-slate-100 relative">
        {p.images?.length ? (
          <img src={p.images[0]} alt={p.name} className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0 grid place-items-center text-slate-400 text-sm">No photo</div>
        )}
        {admin && (
          <div className="absolute top-2 right-2 flex gap-2">
            <button
              onClick={() => inputRef.current?.click()}
              className="px-2 py-1 rounded-lg text-xs bg-white/90 border border-slate-300 hover:bg-white"
            >
              Upload
            </button>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={handleFile}
            />
          </div>
        )}
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold leading-tight">{p.name}</h3>
            <div className="text-sm text-slate-500">{p.address || "—"}</div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold">{currency(p.price)}</div>
            <div className="text-xs text-slate-500">{p.paymentType}</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge color={p.type === "Business" ? "blue" : "slate"}>{p.type}</Badge>
          {p.status === "Available" && (
            <Badge color={p.paymentType === "Rent" ? "amber" : "green"}>
              {p.paymentType === "Rent" ? "For Rent" : "Available"}
            </Badge>
          )}
          {p.status === "Taken" && <Badge color="red">Taken</Badge>}
          {p.shell && <Badge>Shell: {p.shell}</Badge>}
          {(p.mortgageRemaining || 0) > 0 && p.paymentType === "Sale" && (
            <Badge color="amber">Mortgage: {currency(p.mortgageRemaining)}</Badge>
          )}
          <Badge>Storage: {p.storage > 0 ? p.storage : "N/A"}</Badge>
          
          {/* TBX Badge */}
          {p.tbx === "Yes" && p.tbxCost > 0 && (
            <Badge color="blue">TBX: {currency(p.tbxCost)}/mo</Badge>
          )}
        </div>

        {p.postalCode && (
          <div className="text-sm text-slate-600">
            Postal Code: {p.postalCode}
          </div>
        )}

        {p.status === "Taken" && p.owner && (
          <div className="text-sm text-slate-600">
            Owner: {p.owner}
          </div>
        )}

        {p.notes && <p className="text-sm text-slate-600">{p.notes}</p>}

        {admin && (
          <div className="pt-2 flex gap-2">
            <button
              onClick={onEdit}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-sm hover:bg-slate-50"
            >
              Edit
            </button>
            <button
              onClick={onDelete}
              className="px-3 py-1.5 rounded-lg border border-rose-300 text-sm hover:bg-rose-50 text-rose-700"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PropertyCard;