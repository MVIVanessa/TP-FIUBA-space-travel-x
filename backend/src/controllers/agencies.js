const { Decimal } = require('@prisma/client/runtime/library');
const prisma = require('../utils/prisma');

const getAllAgencies = async (req, res) => {
  try {
    const agencies = await prisma.travel_agency.findMany();

    const formattedAgencies = agencies.map((agency) => ({
      ...agency,
      id: Number(agency.id),
      rating: Number(agency.rating),
    }));
    res.status(200).send(formattedAgencies);
  } catch (e) {
    res.status(418).send(e.message);
  }
};

const getAgency = async (req, res) => {
  try {
    const agency = await prisma.travel_agency.findUnique({
      where: { id: Number(req.params.agencyId) },
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

    if (!agency) {
      throw new Error('Agency not found');
    }

    const bundles = agency.travelBundles.map((bundle) => ({
      ...bundle,
      id: Number(bundle.id),
    }));

    delete agency.travelBundles;

    const formattedAgency = {
      ...agency,
      id: Number(agency.id),
      rating: Number(agency.rating),
      bundles: bundles,
    };

    res.status(200).send(formattedAgency);
  } catch (e) {
    res.status(404).send(e.message);
  }
};

const createAgency = async (req, res) => {
  try {
    const {
      name,
      about_us,
      accepted_currency,
      telephone,
      website,
      rating,
      logo_url = '',
    } = req.body;

    const newAgency = await prisma.travel_agency.create({
      data: {
        name,
        about_us,
        accepted_currency,
        telephone,
        website,
        rating: Decimal(rating),
        logo_url,
      },
    });

    res.status(201).send({
      ...newAgency,
      id: Number(newAgency.id),
      rating,
    });
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const updateAgency = async (req, res) => {
  try {
    const agency = await prisma.travel_agency.findUnique({
      where: { id: Number(req.params.agencyId) },
    });

    if (!agency) {
      throw new Error('Agency not found');
    }

    const {
      name,
      about_us,
      accepted_currency,
      telephone,
      website,
      rating,
      logo_url,
    } = agency;

    const updatedAgency = await prisma.travel_agency.update({
      where: {
        id: BigInt(req.params.agencyId),
      },
      data: {
        name: req.body.name || name,
        rating:
          req.body.rating !== undefined
            ? Decimal(req.body.rating)
            : rating,
        about_us: req.body.about_us || about_us,
        accepted_currency: req.body.accepted_currency || accepted_currency,
        telephone: req.body.telephone || telephone,
        website: req.body.website || website,
        logo_url: req.body.logo_url || logo_url,
      },
    });

    res.status(200).json({
      ...updatedAgency,
      id: Number(req.params.agencyId),
      rating: Number(updatedAgency.rating),
    });
  } catch (e) {
    res.status(404).send(e.message);
  }
};

const deleteAgency = async (req, res) => {
  try {
    const agency = await prisma.travel_agency.findUnique({
      where: { id: Number(req.params.agencyId) },
    });

    if (!agency) {
      throw new Error('Agency not found');
    }

    await prisma.travel_agency.delete({
      where: {
        id: BigInt(req.params.agencyId),
      },
    });

    res.status(204).send();
  } catch (e) {
    res.status(404).send(e.message);
  }
};

module.exports = {
  getAllAgencies,
  getAgency,
  createAgency,
  updateAgency,
  deleteAgency,
};
