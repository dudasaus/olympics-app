const categories = require('../controllers/sportsCategoriesController.js');

module.exports = (app) => {
  // categories routes
  app.route('/api/sports-category/')
    .get(categories.listCategories)
    .post(categories.addCategory);
};
