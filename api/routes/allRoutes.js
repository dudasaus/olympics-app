const routeFunctions = [];

// tables
routeFunctions.push(require('./tablesRoutes.js'));
// categories
routeFunctions.push(require('./sportsCategoriesRoutes.js'));

module.exports = (app) => {
  for (let i = 0; i < routeFunctions.length; i += 1) {
    routeFunctions[i](app);
  }
};
