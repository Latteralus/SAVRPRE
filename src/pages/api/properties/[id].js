import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'DELETE') {
    try {
      await sql`DELETE FROM properties WHERE id = ${id}`;
      res.status(200).json({ message: 'Property deleted successfully' });
    } catch (error) {
      console.error('Error deleting property:', error);
      res.status(500).json({ error: 'Failed to delete property' });
    }
  } else if (req.method === 'GET') {
    try {
      const { rows } = await sql`SELECT * FROM properties WHERE id = ${id}`;
      if (rows.length === 0) {
        res.status(404).json({ error: 'Property not found' });
      } else {
        res.status(200).json(rows[0]);
      }
    } catch (error) {
      console.error('Error fetching property:', error);
      res.status(500).json({ error: 'Failed to fetch property' });
    }
  } else {
    res.setHeader('Allow', ['DELETE', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}