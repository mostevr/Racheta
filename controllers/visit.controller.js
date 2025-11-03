const prisma = require("../db");

const getAllVisits = async () => {
  let visit = await prisma.visit.findMany();
  return visit;
};

const getVisitById = async (id) => {
  let visit = await prisma.visit.findUnique({
    where: {
      id,
    },
  });
  return visit;
};

const insertVisit = async (formData) => {
  let visit = await prisma.visit.create({
    data: formData,
  });
  return visit;
};

const deleteVisit = async (id) => {
    let visit = await prisma.visit.delete({
        where: {
            id,
        },
    });
    return visit;
}

const updateVisit = async (id, formData) => {
    let visit = await prisma.visit.update({
        where: {
            id,
        },
        data: formData,
    });
    return visit;
}

module.exports = {
    getAllVisits,
    getVisitById,
    insertVisit,
    deleteVisit,
    updateVisit,
};
