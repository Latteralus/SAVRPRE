import { initializeDatabase, SEED } from '../../utils';
import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Initialize database schema
    await initializeDatabase();

    // Check if we already have data
    const { rowCount } = await sql`SELECT COUNT(*) FROM properties`;
    
    if (rowCount === 0) {
      // Insert seed data
      for (const property of SEED) {
        await sql`
          INSERT INTO properties (
            id, type, name, address, postal_code, status, price, payment_type,
            mortgage_remaining, shell, storage, owner, notes, images, tbx, tbx_cost
          ) VALUES (
            ${property.id}, ${property.type}, ${property.name}, ${property.address}, 
            ${property.postalCode}, ${property.status}, ${property.price}, ${property.paymentType},
            ${property.mortgageRemaining}, ${property.shell}, ${property.storage}, 
            ${property.owner}, ${property.notes}, ${JSON.stringify(property.images)}, 
            ${property.tbx}, ${property.tbxCost}
          )
        `;
      }
      
      res.status(200).json({ message: 'Database initialized with seed data' });
    } else {
      res.status(200).json({ message: 'Database already initialized' });
    }
  } catch (error) {
    console.error('Error initializing database:', error);
    res.status(500).json({ error: 'Failed to initialize database' });
  }
}