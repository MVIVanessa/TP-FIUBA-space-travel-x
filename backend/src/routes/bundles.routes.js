const Router = require('express').Router;
const {
  getAllBundles,
  getBundle,
  createBundle,
  updateBundle,
  deleteBundle,
} = require('../controllers/bundles');

const bundleRoutes = Router();

bundleRoutes.get('/', getAllBundles);
bundleRoutes.get('/:bundleId', getBundle);
bundleRoutes.post('/', createBundle);
bundleRoutes.put('/:bundleId', updateBundle);
bundleRoutes.delete('/:bundleId', deleteBundle);

module.exports = bundleRoutes;