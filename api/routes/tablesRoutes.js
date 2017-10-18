module.exports = (app) => {
    let tables = require('../controllers/tablesController.js');
    console.log('routes');
    // Tables routes
    app.route('/api/tables/')
        .get(tables.listTables);
}
