const express = require('express');
const { Client } = require('pg');
const routes = require('./api/routes/tablesRoutes.js');

const app = express();

app.set('port', (process.env.PORT || 8080));

// TODO: Make another function to handle API calls?
routes(app);

// We will send everything that's not an API call to a react one page app
app.get('/*', (req, res) => {
  res.send(`<pre>METHOD: ${req.method}, PATH: ${req.path}, QUERY: ${JSON.stringify(req.query)}</pre>`);
});

// Local port is 8080 for testing
app.listen(app.get('port'), () => {
  process.stdout.write(`Listening on port ${app.get('port')}\n`);
});
