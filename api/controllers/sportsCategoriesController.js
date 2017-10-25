const { Client } = require('pg');
const { noNullValues } = require('./helpers.js');

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
  // SQL statement
  const sql = 'INSERT INTO sports_category (name) VALUES ($1) RETURNING *';
  const values = [req.body.name];

  // Check for expected body data
  if (noNullValues(values)) {
    // Create client, connect, and run query
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: true,
    });
    client.connect();
    client.query(sql, values, (err, cres) => {
      if (err) throw err;
      client.end();
      // Return the inserted information
      res.send(JSON.stringify(cres.rows[0], null, 2));
    });
  } else {
    // Expected body values don't exist
    const err = { status_code: 404, message: 'Missing expected body data.' };
    res.status(404);
    res.send(JSON.stringify(err));
  }
}
module.exports.addCategory = addCategory;
