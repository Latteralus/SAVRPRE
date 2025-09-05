export const currency = (n) =>
  typeof n === "number"
    ? n.toLocaleString(undefined, { style: "currency", currency: "USD" })
    : n || "-";

export const uid = () => Math.random().toString(36).slice(2);

export const LS_KEY = "SAVRP_real_estate_demo_v1";

export const loadStore = () => {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const saveStore = (data) => localStorage.setItem(LS_KEY, JSON.stringify(data));

// Seed Data
export const SEED = [
  {
    id: uid(),
    type: "House", // House | Business
    name: "8043 Digital Den",
    address: "8043 Joshua Rd",
    postalCode: "12345",
    status: "Available", // Available | Taken
    price: 3000, // Either daily rent or total price
    paymentType: "Rent", // Rent | Sale
    mortgageRemaining: 0,
    shell: "mlo",
    storage: 2,
    owner: "",
    notes: "Cozy starter spot near Legion.",
    images: [],
    tbx: "No", // TBX: Yes or No
    tbxCost: 0, // TBX cost per month in USD
  },
  {
    id: uid(),
    type: "House",
    name: "3043 Trailer B",
    address: "3043 Route 68",
    postalCode: "67890",
    status: "Available",
    price: 90000,
    paymentType: "Sale",
    mortgageRemaining: 0,
    shell: "shell_medium2",
    storage: 1,
    owner: "",
    notes: "Great value.",
    images: [],
    tbx: "No", // TBX: Yes or No
    tbxCost: 0, // TBX cost per month in USD
  },
  {
    id: uid(),
    type: "Business",
    name: "SAFR Mansion",
    address: "Mirror Park Dr 133",
    postalCode: "90210",
    status: "Taken",
    price: 2650, // Rental price for business
    paymentType: "Rent", // Business always rental
    mortgageRemaining: 1825198,
    shell: "vinewood_k4mb1",
    storage: 5,
    owner: "John Doe",
    notes: "Company HQ.",
    images: [],
    tbx: "No", // TBX: Yes or No
    tbxCost: 0, // TBX cost per month in USD
  },
  {
    id: uid(),
    type: "Business",
    name: "Cayo Circle K",
    address: "Cayo Kiosk",
    postalCode: "54321",
    status: "Available", // Business properties are available for rent
    price: 3800,
    paymentType: "Rent", // Business always rental
    mortgageRemaining: 0,
    shell: "shell_store3",
    storage: 3,
    owner: "",
    notes: "Island shopfront.",
    images: [],
    tbx: "No", // TBX: Yes or No
    tbxCost: 0, // TBX cost per month in USD
  },
  {
    id: uid(),
    type: "House",
    name: "4016 Route 68 D",
    address: "Route 68",
    postalCode: "11111",
    status: "Available", // Rental properties can be available or taken
    price: 800, // Rental price
    paymentType: "Rent", // Rental properties should be Rent
    mortgageRemaining: 0,
    shell: "k4_trailer",
    storage: 0,
    owner: "",
    notes: "Investment property.",
    images: [],
    tbx: "No", // TBX: Yes or No
    tbxCost: 0, // TBX cost per month in USD
  },
];