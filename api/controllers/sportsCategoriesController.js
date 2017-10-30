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
    const id = values[0];
    if (id === 'all') {
      // delete all categories
      const sql = 'DELETE FROM sports_category RETURNING *';
      client.connect();
      client.query(sql, (err, cres) => {
        if (err) throw err;
        client.end();
        // Return the deleted rows
        res.json(cres.rows);
      });
    }
    else if (!Number.isNaN(parseInt(id, 10))) {
      const sql = 'DELETE FROM sports_category WHERE id = $1 RETURNING *';
      client.connect();
      client.query(sql, values, (err, cres) => {
        if (err) throw err;
        client.end();
        // Return the deleted rows
        if (cres.rows.length) {
          res.json(cres.rows[0]);
        }
        else {
          errorResponse(res, 404, 'id not found');
        }
      });
    }
    else {
      // Invalid id parameter
      errorResponse(res, 404, 'Invalid id parameter');
    }
  } // end if noNullValues
  else {
    // eexpected body values don't exist
    errorResponse(res, 404, 'Missing expected body data');
  }
}
module.exports.deleteCategory = deleteCategory;
