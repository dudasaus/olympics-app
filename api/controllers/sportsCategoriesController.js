const { Client } = require('pg');
const { noNullValues, errorResponse, writePermission } = require('./helpers.js');

// List categories
function getCategories(req, res) {
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
module.exports.getCategories = getCategories;

// Add categories
function addCategory(req, res) {
  // SQL statement
  const sql = 'INSERT INTO sports_category (name) VALUES ($1) RETURNING *';
  const values = [req.body.name];

  // Check for write permissions
  if (!writePermission(req)) {
    errorResponse(res, 403, 'Invalid or missing API key');
  }
  // Check for expected body data
  else if (noNullValues(values)) {
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
  }
  else {
    // Expected body values don't exist
    errorResponse(res, 404, 'Missing expected body data');
  }
}
module.exports.addCategory = addCategory;

// Delete categories
function deleteCategory(req, res) {
  const values = [req.body.id];

  // Check for write permissions
  if (!writePermission(req)) {
    errorResponse(res, 403, 'Inavlid or missing API key');
  }
  // Check for expected body data
  else if (noNullValues(values)) {
    // Create client
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: true,
    });

    // Read ID
    let id = values[0];
    if (id === 'all') {
      // delete all categories
      const sql = 'DELETE FROM sports_category RETURNING *';
      client.query(sql, (err, cres) => {
        if (err) throw err;
        client.end();
        // Return the deleted rows
        res.json(cres.rows);
      });
    }
    else if (!Number.isNaN(parseInt(id, 10))) {
      id = parseInt(id, 10);
      // TODO: delete category with id
    }
    else {
      // Invalid id parameter
      errorResponse(res, 404, 'Invalid id parameter');
    }
  }
  else {
    // eexpected body values don't exist
    errorResponse(res, 404, 'Missing expected body data');
  }
}
module.exports.deleteCategory = deleteCategory;
