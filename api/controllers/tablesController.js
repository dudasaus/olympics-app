const { Client } = require('pg');

// Tables
function listTables(req, res) {
  console.log('Listing tables...');
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });
  const tables = [];
  client.connect();
  client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, cres) => {
    if (err) throw err;
    for (let i = 0; i < cres.rows.length; i += 1) {
      const row = cres.rows[i];
      if (row.table_schema === 'public') {
        tables.push(row.table_name);
      }
    }
    client.end();
    res.send(JSON.stringify(tables, null, 2));
  });
}
module.exports.listTables = listTables;
