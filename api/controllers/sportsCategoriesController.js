const { Client } = require('pg');

// List categories
function listCategories(req, res) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });
  client.connect();
  client.query('SELECT id, name FROM sports_category;', (err, cres) => {
    if (err) throw err;
    client.end();
    res.send(JSON.stringify(cres.rows, null, 2));
  });
}
module.exports.listCategories = listCategories;

// Add categories
function addCategory(req, res) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });
  client.connect();
  const sql = 'INSERT INTO sports_category (name) VALUES ($1) RETURNING *';
  client.query(sql, [req.body.name], (err, cres) => {
    if (err) throw err;
    client.end();
    res.send(JSON.stringify(cres.rows[0], null, 2));
  });
}
module.exports.addCategory = addCategory;
