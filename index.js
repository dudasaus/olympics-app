const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./api/routes/allRoutes.js');

// Create the app
const app = express();

// Use body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set the port
app.set('port', (process.env.PORT || 8080));

// Use API routes
routes(app);

// We will send everything that's not an API call to a react one page app
app.get('/*', (req, res) => {
  res.send(`<pre>METHOD: ${req.method}, PATH: ${req.path}, QUERY: ${JSON.stringify(req.query)}</pre>`);
});

// Local port is 8080 for testing
app.listen(app.get('port'), () => {
  process.stdout.write(`Listening on port ${app.get('port')}\n`);
});
