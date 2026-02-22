const Router = require('express').Router;
const {
  getAllPlanets,
  getPlanet,
  createPlanet,
  updatePlanet,
  deletePlanet,
} = require('../controllers/planets');

const planetRoutes = Router();

planetRoutes.get('/', getAllPlanets);
planetRoutes.get('/:planetId', getPlanet);
planetRoutes.post('/', createPlanet);
planetRoutes.put('/:planetId', updatePlanet);
planetRoutes.delete('/:planetId', deletePlanet);

module.exports = planetRoutes;
