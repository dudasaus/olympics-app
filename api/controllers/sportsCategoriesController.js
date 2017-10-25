const { Client } = require('pg');
const { noNullValues, errorResponse } = require('./helpers.js');

// List categories
function listCategories(req, res) {
  // SQL statement
  const sql = 'SELECT id, name FROM sports_category;';

  // Create client, connect, and run query
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });
  client.connect();
  client.query(sql, (err, cres) => {
    if (err) throw err;
    client.end();
    res.json(cres.rows);
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
      res.json(cres.rows[0]);
    });
  } else {
    // Expected body values don't exist
    errorResponse(res, 404, 'Missing expected body data.');
  }
}
module.exports.addCategory = addCategory;
