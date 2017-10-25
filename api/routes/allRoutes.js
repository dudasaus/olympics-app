const routeFunctions = [];

// tables
routeFunctions.push(require('./tablesRoutes.js'));

module.exports = (app) => {
  for (let i = 0; i < routeFunctions.length; i += 1) {
    routeFunctions[i](app);
  }
};
