const prisma = require('../utils/prisma');

const getAllPlanets = async (req, res) => {
  try {
    const planets = await prisma.planet.findMany();

    const formattedPlanets = planets.map((planet) => ({
      ...planet,
      id: Number(planet.id),
      earth_distance: Number(planet.earth_distance),
    }));
    res.status(200).send(formattedPlanets);
  } catch (e) {
    res.status(418).send(e.message);
  }
};

const getPlanet = async (req, res) => {
  try {
    const planet = await prisma.planet.findUnique({
      where: { id: Number(req.params.planetId) },
      include: {
        travelBundles: {
          select: {
            id: true,
            price: true,
            duration: true,
            images_urls: true,
          },
        },
      },
    });

    if (!planet) {
      throw new Error('Planet not found');
    }

    const bundles = planet.travelBundles.map((bundle) => ({
      ...bundle,
      id: Number(bundle.id),
    }));

    delete planet.travelBundles;

    const formattedPlanet = {
      ...planet,
      id: Number(planet.id),
      earth_distance: Number(planet.earth_distance),
      bundles: bundles,
    };

    res.status(200).send(formattedPlanet);
  } catch (e) {
    res.status(404).send(e.message);
  }
};

const createPlanet = async (req, res) => {
  try {
    const {
      name,
      earth_distance,
      weather,
      gravity,
      danger_level,
      inhabited,
      image_url = '',
    } = req.body;

    const newPlanet = await prisma.planet.create({
      data: {
        name,
        earth_distance: BigInt(earth_distance),
        weather,
        gravity,
        danger_level,
        inhabited,
        image_url,
      },
    });

    res.status(201).send({
      ...newPlanet,
      id: Number(newPlanet.id),
      earth_distance,
    });
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const updatePlanet = async (req, res) => {
  try {
    const planet = await prisma.planet.findUnique({
      where: { id: Number(req.params.planetId) },
    });

    if (!planet) {
      throw new Error('Planet not found');
    }

    const {
      name,
      earth_distance,
      weather,
      gravity,
      danger_level,
      inhabited,
      image_url,
    } = planet;

    const updatedPlanet = await prisma.planet.update({
      where: {
        id: BigInt(req.params.planetId),
      },
      data: {
        name: req.body.name || name,
        earth_distance:
          req.body.earth_distance !== undefined
            ? BigInt(req.body.earth_distance)
            : earth_distance,
        weather: req.body.weather || weather,
        gravity: req.body.gravity || gravity,
        danger_level: req.body.danger_level || danger_level,
        inhabited: req.body.inhabited || inhabited,
        image_url: req.body.image_url || image_url,
      },
    });

    res.status(200).json({
      ...updatedPlanet,
      id: Number(req.params.planetId),
      earth_distance: Number(updatedPlanet.earth_distance),
    });
  } catch (e) {
    res.status(404).send(e.message);
  }
};

const deletePlanet = async (req, res) => {
  try {
    const planet = await prisma.planet.findUnique({
      where: { id: Number(req.params.planetId) },
    });

    if (!planet) {
      throw new Error('Planet not found');
    }

    await prisma.planet.delete({
      where: {
        id: BigInt(req.params.planetId),
      },
    });

    res.status(204).send();
  } catch (e) {
    res.status(404).send(e.message);
  }
};

module.exports = {
  getAllPlanets,
  getPlanet,
  createPlanet,
  updatePlanet,
  deletePlanet,
};
