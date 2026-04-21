const pool = require('../database/pool');

async function listProducts() {
  const result = await pool.query('SELECT * FROM products ORDER BY created_at DESC');
  return result.rows.map(row => ({
    id: row.id,
    name: row.name,
    description: row.description,
    price: Number(row.price),
    category: row.category,
    badge: row.badge,
    emoji: row.emoji,
    image: row.image,
    stock: Number(row.stock),
    featured: row.featured
  }));
}

async function replaceProducts(products) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query('DELETE FROM products');
    for (const item of products) {
      await client.query(
        `INSERT INTO products (id, name, description, price, category, badge, emoji, image, stock, featured)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
        [
          item.id,
          item.name || 'Untitled Product',
          item.description || '',
          Number(item.price || 0),
          item.category || 'accessories',
          item.badge || '',
          item.emoji || '🔩',
          item.image || '',
          Number(item.stock || 0),
          Boolean(item.featured)
        ]
      );
    }
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

module.exports = {
  listProducts,
  replaceProducts
};
