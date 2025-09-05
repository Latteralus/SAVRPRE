import React, { useState, useEffect, useMemo } from 'react';
import PropertyCard from '../components/PropertyCard';
import AdminDialog from '../components/AdminDialog';
import EditorDialog from '../components/EditorDialog';
import { uid } from '../utils';

function Home() {
  const [properties, setProperties] = useState([]);
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("price_desc");
  const [adminAuthed, setAdminAuthed] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      const response = await fetch('/api/properties');
      if (response.ok) {
        const data = await response.json();
        setProperties(data);
      }
    } catch (error) {
      console.error('Error loading properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const filtered = useMemo(() => {
    let list = [...properties];

    if (filterType !== "All") list = list.filter((p) => p.type === filterType);
    if (filterStatus !== "All") {
      if (filterStatus === "Rental") {
        list = list.filter((p) => p.paymentType === "Rent");
      } else {
        list = list.filter((p) => p.status === filterStatus);
      }
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.address.toLowerCase().includes(q) ||
          (p.notes || "").toLowerCase().includes(q)
      );
    }

    if (sortBy === "price_asc") list.sort((a, b) => (a.price || 0) - (b.price || 0));
    if (sortBy === "price_desc") list.sort((a, b) => (b.price || 0) - (a.price || 0));
    if (sortBy === "name_asc") list.sort((a, b) => a.name.localeCompare(b.name));

    return list;
  }, [properties, filterType, filterStatus, query, sortBy]);

  function openEditor(item) {
    setEditing(item || {
      id: uid(),
      type: "House",
      name: "",
      address: "",
      postalCode: "",
      status: "Available",
      price: 0,
      paymentType: "Sale",
      mortgageRemaining: 0,
      shell: "",
      storage: 0,
      owner: "",
      notes: "",
      images: [],
      tbx: "No",
      tbxCost: 0,
    });
    setEditorOpen(true);
  }

  async function saveProperty(prop) {
    try {
      const method = properties.some(p => p.id === prop.id) ? 'PUT' : 'POST';
      const response = await fetch('/api/properties', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(prop),
      });

      if (response.ok) {
        loadProperties(); // Reload properties from database
      }
    } catch (error) {
      console.error('Error saving property:', error);
    }
    setEditorOpen(false);
    setEditing(null);
  }

  async function removeProperty(id) {
    if (!window.confirm("Delete this property?")) return;
    
    try {
      const response = await fetch(`/api/properties/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        loadProperties(); // Reload properties from database
      }
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 grid place-items-center">
        <div className="text-slate-600">Loading properties...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Bar */}
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-slate-900 text-white grid place-items-center font-bold">RP</div>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">SAVRP Real Estate</h1>
            <p className="text-xs text-slate-500">Browse listings, filter by availability, and manage properties.</p>
          </div>
          <button
            onClick={() => setShowAdmin(true)}
            className="px-3 py-1.5 rounded-lg border border-slate-300 text-sm hover:bg-slate-100"
          >
            Admin
          </button>
        </div>
      </header>

      {/* Controls */}
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="grid md:grid-cols-5 gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, address, notes..."
            className="md:col-span-2 w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400"
          />

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-300"
          >
            <option>All</option>
            <option>House</option>
            <option>Business</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-300"
          >
            <option>All</option>
            <option>Available</option>
            <option>Taken</option>
            <option>Rental</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-300"
          >
            <option value="price_desc">Sort: Price High → Low</option>
            <option value="price_asc">Sort: Price Low → High</option>
            <option value="name_asc">Sort: Name A → Z</option>
          </select>
        </div>

        <div className="mt-3 text-sm text-slate-600">{filtered.length} result{filtered.length !== 1 && "s"}</div>
      </div>

      {/* Grid */}
      <main className="mx-auto max-w-7xl px-4 pb-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((p) => (
          <PropertyCard
            key={p.id}
            p={p}
            admin={adminAuthed}
            onEdit={() => openEditor(p)}
            onDelete={() => removeProperty(p.id)}
            onUpdate={saveProperty}
          />)
        )}

        {filtered.length === 0 && (
          <div className="col-span-full rounded-xl border border-dashed p-10 text-center text-slate-500">
            No properties match your filters.
          </div>
        )}
      </main>

      {/* Admin Dialog */}
      {showAdmin && (
        <AdminDialog
          onClose={() => setShowAdmin(false)}
          authed={adminAuthed}
          setAuthed={setAdminAuthed}
          onAdd={() => openEditor(null)}
        />)
      }

      {/* Editor Dialog */}
      {editorOpen && (
        <EditorDialog
          value={editing}
          onClose={() => setEditorOpen(false)}
          onSave={saveProperty}
        />)
      }
    </div>
  );
}

export default Home;