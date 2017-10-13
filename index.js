const express = require('express');
const { Client } = require('pg');
const app = express();

app.set('port', (process.env.PORT || 8080));

// TODO: Make another function to handle API calls?
app.get('/api/*', (req, res) => {
    dbtest();
    res.send(`<pre>${JSON.stringify({'data': 0}, null, 2)}</pre>`);
});

// We will send everything that's not an API call to a react one page app
app.get('/*', (req, res) => {
    res.send(`<pre>METHOD: ${req.method}, PATH: ${req.path}, QUERY: ${JSON.stringify(req.query)}</pre>`);
});

// Local port is 8080 for testing
app.listen(app.get('port'), () => {
    process.stdout.write(`Listening on port ${app.get('port')}\n`);
});

function dbtest() {
    console.log(process.env.DATABASE_URL);

    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: true,
    });

    client.connect();

    client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
      if (err) throw err;
      for (let row of res.rows) {
        console.log(JSON.stringify(row));
      }
      client.end();
    });
}
