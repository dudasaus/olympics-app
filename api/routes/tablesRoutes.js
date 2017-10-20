const tables = require('../controllers/tablesController.js');

module.exports = (app) => {
  console.log('routes');
  // Tables routes
  app.route('/api/tables/')
    .get(tables.listTables);
};
