export const currency = (n) =>
  typeof n === "number"
    ? n.toLocaleString(undefined, { style: "currency", currency: "USD" })
    : n || "-";

export const uid = () => Math.random().toString(36).slice(2);

// Database schema creation function
export async function initializeDatabase() {
  try {
    const { sql } = await import('@vercel/postgres');
    
    await sql`
      CREATE TABLE IF NOT EXISTS properties (
        id VARCHAR(255) PRIMARY KEY,
        type VARCHAR(50) NOT NULL,
        name VARCHAR(255) NOT NULL,
        address TEXT,
        postal_code VARCHAR(20),
        status VARCHAR(50) NOT NULL,
        price DECIMAL(15,2) DEFAULT 0,
        payment_type VARCHAR(50) NOT NULL,
        mortgage_remaining DECIMAL(15,2) DEFAULT 0,
        shell VARCHAR(100),
        storage INTEGER DEFAULT 0,
        owner VARCHAR(255),
        notes TEXT,
        images JSONB DEFAULT '[]',
        tbx VARCHAR(10) DEFAULT 'No',
        tbx_cost DECIMAL(10,2) DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `;

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

// Seed data for initial setup
export const SEED = [
  {
    id: uid(),
    type: "House",
    name: "8043 Digital Den",
    address: "8043 Joshua Rd",
    postalCode: "12345",
    status: "Available",
    price: 3000,
    paymentType: "Rent",
    mortgageRemaining: 0,
    shell: "mlo",
    storage: 2,
    owner: "",
    notes: "Cozy starter spot near Legion.",
    images: [],
    tbx: "No",
    tbxCost: 0,
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
    tbx: "No",
    tbxCost: 0,
  },
  {
    id: uid(),
    type: "Business",
    name: "SAFR Mansion",
    address: "Mirror Park Dr 133",
    postalCode: "90210",
    status: "Taken",
    price: 2650,
    paymentType: "Rent",
    mortgageRemaining: 1825198,
    shell: "vinewood_k4mb1",
    storage: 5,
    owner: "John Doe",
    notes: "Company HQ.",
    images: [],
    tbx: "No",
    tbxCost: 0,
  },
  {
    id: uid(),
    type: "Business",
    name: "Cayo Circle K",
    address: "Cayo Kiosk",
    postalCode: "54321",
    status: "Available",
    price: 3800,
    paymentType: "Rent",
    mortgageRemaining: 0,
    shell: "shell_store3",
    storage: 3,
    owner: "",
    notes: "Island shopfront.",
    images: [],
    tbx: "No",
    tbxCost: 0,
  },
  {
    id: uid(),
    type: "House",
    name: "4016 Route 68 D",
    address: "Route 68",
    postalCode: "11111",
    status: "Available",
    price: 800,
    paymentType: "Rent",
    mortgageRemaining: 0,
    shell: "k4_trailer",
    storage: 0,
    owner: "",
    notes: "Investment property.",
    images: [],
    tbx: "No",
    tbxCost: 0,
  },
];