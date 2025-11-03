const prisma = require("../db");

const getAllPatients = async () => {
  let patients = await prisma.patient.findMany();
  return patients;
};


 const getpatientsById = async (id) => {
  let patients = await prisma.patient.findUnique({
    where: {
      id,
    },
  });
  return patients;
};

const insertpatient = async (formData) => {
  let patients = await prisma.patient.create({
    data: formData,
  });
  return patients;
};


const deletepatient = async (id) => {
  let patients = await prisma.patient.delete({
    where: {
      id,
    },
  });
  return patients;
};

const updatepatient = async (id, formData) => {
  let patients = await prisma.patient.update({
    where: {
      id,
    },
    data: formData,
  });
  return patients;
};

module.exports = {
  getAllPatients,
  getpatientsById,
  insertpatient,
  deletepatient,
  updatepatient,
};