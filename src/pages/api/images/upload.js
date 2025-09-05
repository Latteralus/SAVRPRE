import { put } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { filename, contentType, content } = req.body;

    if (!filename || !contentType || !content) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const blob = await put(filename, content, {
      access: 'public',
      contentType,
      addRandomSuffix: true,
    });

    res.status(200).json({ url: blob.url });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
}