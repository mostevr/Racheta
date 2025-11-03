const prisma = require("../db");

const getAllDrugs = async () => {
  let drugs = await prisma.drugs.findMany();
  return drugs;
};

const getDrugsById = async (id) => {
  let drugs = await prisma.drugs.findUnique({
    where: {
      id,
    },
  });
  return drugs;
};

const insertDrug = async (formData) => {
  let drugs = await prisma.drugs.create({
    data: formData,
  });
  return drugs;
};

const deleteDrug = async (id) => {
  let drugs = await prisma.drugs.delete({
    where: {
      id,
    },
  });
  return drugs;
};

const updateDrug = async (id, formData) => {
  let drugs = await prisma.drugs.update({
    where: {
      id,
    },
    data: formData,
  });
  return drugs;
};

module.exports = {
  getAllDrugs,
  getDrugsById,
  insertDrug,
  deleteDrug,
  updateDrug,
};
