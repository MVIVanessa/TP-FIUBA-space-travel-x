const Router = require('express').Router;
const {
  getAllAgencies,
  getAgency,
  createAgency,
  updateAgency,
  deleteAgency,
} = require('../controllers/agencies');

const agencyRoutes = Router();

agencyRoutes.get('/', getAllAgencies);
agencyRoutes.get('/:agencyId', getAgency);
agencyRoutes.post('/', createAgency);
agencyRoutes.put('/:agencyId', updateAgency);
agencyRoutes.delete('/:agencyId', deleteAgency);

module.exports = agencyRoutes;
