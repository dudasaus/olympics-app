const categories = require('../controllers/sportsCategoriesController.js');

module.exports = (app) => {
  // categories routes
  app.route('/api/sports-category/')
    .get(categories.getCategories)
    .post(categories.addCategory)
    .delete(categories.deleteCategory);
};
