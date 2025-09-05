import React, { useState } from 'react';
import Field from './Field';

function EditorDialog({ value, onClose, onSave }) {
  const [draft, setDraft] = useState(value);

  function update(key, val) {
    setDraft((d) => ({ ...d, [key]: val }));
    
    // Business properties are always for Rent
    if (key === "type" && val === "Business") {
      setDraft((d) => ({
        ...d,
        type: "Business",
        paymentType: "Rent",
        mortgageRemaining: 0 // Business rentals have no mortgage
      }));
    }
    
    // When switching to Rent payment type, clear mortgage
    if (key === "paymentType" && val === "Rent") {
      setDraft((d) => ({ ...d, mortgageRemaining: 0 }));
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 grid place-items-center p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl border border-slate-200">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="font-semibold">{value?.name ? "Edit Listing" : "New Listing"}</h2>
          <button onClick={onClose} className="px-2 py-1 rounded-lg text-sm hover:bg-slate-100">Close</button>
        </div>

        <div className="p-4 grid sm:grid-cols-2 gap-3">
          <Field label="Type">
            <select
              value={draft.type}
              onChange={(e) => update("type", e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-300"
            >
              <option>House</option>
              <option>Business</option>
            </select>
          </Field>
          <Field label="Status">
            <select
              value={draft.status}
              onChange={(e) => update("status", e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-300"
            >
              <option>Available</option>
              <option>Taken</option>
            </select>
          </Field>
          <Field label="Name">
            <input
              value={draft.name}
              onChange={(e) => update("name", e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-300"
            />
          </Field>
          <Field label="Address">
            <input
              value={draft.address}
              onChange={(e) => update("address", e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-300"
            />
          </Field>
          <Field label="Postal Code">
            <input
              value={draft.postalCode}
              onChange={(e) => update("postalCode", e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-300"
            />
          </Field>
          <Field label="Price (number)">
            <input
              type="number"
              value={draft.price}
              onChange={(e) => update("price", Number(e.target.value))}
              className="px-3 py-2 rounded-xl border border-slate-300"
            />
          </Field>
          <Field label="Payment Type">
            <select
              value={draft.paymentType}
              onChange={(e) => update("paymentType", e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-300"
              disabled={draft.type === "Business"}
            >
              <option>Sale</option>
              <option>Rent</option>
            </select>
          </Field>
          {draft.paymentType === "Sale" && (
            <Field label="Mortgage Remaining (number)">
              <input
                type="number"
                value={draft.mortgageRemaining}
                onChange={(e) => update("mortgageRemaining", Number(e.target.value))}
                className="px-3 py-2 rounded-xl border border-slate-300"
              />
            </Field>
          )}
          <Field label="Shell / MLO">
            <input
              value={draft.shell}
              onChange={(e) => update("shell", e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-300"
            />
          </Field>
          <Field label="Storage (number)">
            <input
              type="number"
              value={draft.storage}
              onChange={(e) => update("storage", Number(e.target.value))}
              className="px-3 py-2 rounded-xl border border-slate-300"
            />
          </Field>
          {draft.status === "Taken" && (
            <Field label="Owner Name">
              <input
                value={draft.owner}
                onChange={(e) => update("owner", e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-300"
              />
            </Field>
          )}
          <div className="sm:col-span-2">
            <Field label="Notes">
              <textarea
                rows={3}
                value={draft.notes}
                onChange={(e) => update("notes", e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
              />
            </Field>
          </div>
          
          {/* TBX Fields */}
          <Field label="TBX Included">
            <select
              value={draft.tbx}
              onChange={(e) => update("tbx", e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-300"
            >
              <option>No</option>
              <option>Yes</option>
            </select>
          </Field>
          
          {draft.tbx === "Yes" && (
            <Field label="TBX Cost per Month (USD)">
              <input
                type="number"
                value={draft.tbxCost}
                onChange={(e) => update("tbxCost", Number(e.target.value))}
                className="px-3 py-2 rounded-xl border border-slate-300"
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </Field>
          )}
        </div>

        <div className="p-4 border-t flex items-center justify-end gap-2">
          <button onClick={onClose} className="px-3 py-2 rounded-xl border border-slate-300">Cancel</button>
          <button onClick={() => onSave(draft)} className="px-3 py-2 rounded-xl bg-slate-900 text-white">Save Listing</button>
        </div>
      </div>
    </div>
  );
}

export default EditorDialog;