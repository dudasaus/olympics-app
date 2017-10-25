const tables = require('../controllers/tablesController.js');

module.exports = (app) => {
  // Tables routes
  app.route('/api/tables/')
    .get(tables.listTables);
};
