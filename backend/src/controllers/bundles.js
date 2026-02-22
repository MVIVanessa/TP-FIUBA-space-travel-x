const { Decimal } = require('@prisma/client/runtime/library');
const prisma = require('../utils/prisma');

const getAllBundles = async (req, res) => {
  try {
    const bundles = await prisma.travel_bundle.findMany();

    const formattedBundles = bundles.map((bundle) => ({
      ...bundle,
      id: Number(bundle.id),
      agency_id: Number(bundle.agency_id),
      planet_id: Number(bundle.planet_id),
    }));
    res.status(200).send(formattedBundles);
  } catch (e) {
    res.status(418).send(e.message);
  }
};

const getBundle = async (req, res) => {
  try {
    const bundle = await prisma.travel_bundle.findUnique({
      where: { id: Number(req.params.bundleId) },
      include: {
        travel_agency: {
          select: {
            name: true,
            logo_url: true,
          },
        },
        planet: {
            select: {
              name: true,
              image_url: true,
            },
          },
      },
    });

    if (!bundle) {
      throw new Error('Bundle not found');
    }

    const formattedBundle = {
      ...bundle,
      id: Number(bundle.id),
      agency_id: Number(bundle.agency_id),
      planet_id: Number(bundle.planet_id),
      travel_agency: bundle.travel_agency,
      planet: bundle.planet,
    };

    res.status(200).send(formattedBundle);
  } catch (e) {
    res.status(404).send(e.message);
  }
};

const createBundle = async (req, res) => {
  try {
    const {
      price,
      duration,
      activities,
      flight_class,
      all_inclusive,
      season,
      agency_id,
      planet_id,
      images_urls = [],
    } = req.body;

    const agencyExists = await prisma.travel_agency.findUnique({
      where: { id: BigInt(agency_id) }
    });
    if (!agencyExists) {
      return res.status(400).send('Travel agency with the provided id does not exist');
    }

    const planetExists = await prisma.planet.findUnique({
      where: { id: BigInt(planet_id) }
    });
    if (!planetExists) {
      return res.status(400).send('Planet with the provided id does not exist');
    }

    const newBundle = await prisma.travel_bundle.create({
      data: {
        price: Decimal(price),
        duration,
        activities,
        flight_class,
        all_inclusive,
        season,
        images_urls: images_urls,
        travel_agency: {
          connect: {
            id: BigInt(agency_id),
          },
        },
        planet: {
          connect: {
            id: BigInt(planet_id),
          },
        },
      },
    });

    res.status(201).send({
      ...newBundle,
      id: Number(newBundle.id),
      agency_id: Number(agency_id),
      planet_id: Number(planet_id),
    });
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const updateBundle = async (req, res) => {
  try {

    const bundleId = req.params.bundleId !== undefined ? BigInt(req.params.bundleId) : undefined;
    if (!bundleId) {
      return res.status(400).send('Invalid or missing bundle ID');
    }

    const bundle = await prisma.travel_bundle.findUnique({
      where: { id: bundleId },
    });

    if (!bundle) {
      return res.status(404).send('Bundle not found');
    }

    const agencyId = req.body.agency_id !== undefined 
      ? BigInt(req.body.agency_id) 
      : bundle.agency_id;

    if (agencyId !== undefined) {
      const agencyExists = await prisma.travel_agency.findUnique({
        where: { id: agencyId },
      });
      if (!agencyExists) {
        return res.status(400).send('Travel agency with the provided id does not exist');
      }
    }

    const planetId = req.body.planet_id !== undefined 
      ? BigInt(req.body.planet_id) 
      : bundle.planet_id;

    if (planetId !== undefined) {
      const planetExists = await prisma.planet.findUnique({
        where: { id: planetId },
      });
      if (!planetExists) {
        return res.status(400).send('Planet with the provided id does not exist');
      }
    }

    const updatedBundle = await prisma.travel_bundle.update({
      where: {
        id: BigInt(req.params.bundleId),
      },
      data: {
        price: req.body.price !== undefined 
          ? Decimal(req.body.price) : bundle.price,
        duration: req.body.duration || bundle.duration,
        activities: req.body.activities || bundle.activities,
        flight_class: req.body.flight_class || bundle.flight_class,
        all_inclusive: req.body.all_inclusive || bundle.all_inclusive,
        season: req.body.season || bundle.season,
        images_urls: req.body.images_urls || bundle.images_urls,
    
        travel_agency: agencyId !== undefined 
        ? { connect: { id: agencyId } } 
        : undefined,
      planet: planetId !== undefined 
        ? { connect: { id: planetId } } 
        : undefined,
    },
  });
  
    res.status(200).json({
      ...updatedBundle,
      id: Number(updatedBundle.id),
      agency_id: Number(updatedBundle.agency_id),
      planet_id: Number(updatedBundle.planet_id),
    });
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const deleteBundle = async (req, res) => {
  try {
    const bundle = await prisma.travel_bundle.findUnique({
      where: { id: Number(req.params.bundleId) },
    });

    if (!bundle) {
      throw new Error('Bundle not found');
    }

    await prisma.travel_bundle.delete({
      where: {
        id: BigInt(req.params.bundleId),
      },
    });

    res.status(204).send();
  } catch (e) {
    res.status(404).send(e.message);
  }
};



module.exports = {
  getAllBundles,
  getBundle,
  createBundle,
  updateBundle,
  deleteBundle,
};
