import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { rows } = await sql`SELECT * FROM properties ORDER BY created_at DESC`;
      res.status(200).json(rows);
    } catch (error) {
      console.error('Error fetching properties:', error);
      res.status(500).json({ error: 'Failed to fetch properties' });
    }
  } else if (req.method === 'POST') {
    try {
      const {
        id,
        type,
        name,
        address,
        postalCode,
        status,
        price,
        paymentType,
        mortgageRemaining,
        shell,
        storage,
        owner,
        notes,
        images,
        tbx,
        tbxCost
      } = req.body;

      const { rows } = await sql`
        INSERT INTO properties (
          id, type, name, address, postal_code, status, price, payment_type,
          mortgage_remaining, shell, storage, owner, notes, images, tbx, tbx_cost
        ) VALUES (
          ${id}, ${type}, ${name}, ${address}, ${postalCode}, ${status}, ${price}, ${paymentType},
          ${mortgageRemaining}, ${shell}, ${storage}, ${owner}, ${notes}, ${JSON.stringify(images)}, ${tbx}, ${tbxCost}
        ) RETURNING *
      `;

      res.status(201).json(rows[0]);
    } catch (error) {
      console.error('Error creating property:', error);
      res.status(500).json({ error: 'Failed to create property' });
    }
  } else if (req.method === 'PUT') {
    try {
      const {
        id,
        type,
        name,
        address,
        postalCode,
        status,
        price,
        paymentType,
        mortgageRemaining,
        shell,
        storage,
        owner,
        notes,
        images,
        tbx,
        tbxCost
      } = req.body;

      const { rows } = await sql`
        UPDATE properties SET
          type = ${type},
          name = ${name},
          address = ${address},
          postal_code = ${postalCode},
          status = ${status},
          price = ${price},
          payment_type = ${paymentType},
          mortgage_remaining = ${mortgageRemaining},
          shell = ${shell},
          storage = ${storage},
          owner = ${owner},
          notes = ${notes},
          images = ${JSON.stringify(images)},
          tbx = ${tbx},
          tbx_cost = ${tbxCost},
          updated_at = NOW()
        WHERE id = ${id}
        RETURNING *
      `;

      res.status(200).json(rows[0]);
    } catch (error) {
      console.error('Error updating property:', error);
      res.status(500).json({ error: 'Failed to update property' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}