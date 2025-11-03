const express = require("express");
const {
  getAllPatients,
  getpatientsById,
  insertpatient,
  deletepatient,
  updatepatient
} = require("../controllers/patient.controller");

const router = express.Router();

router.get("/getAll", async (req, res) => {
  let list = await getAllPatients();
  res.json(list);
});
router.get("/getById/:id", async (req, res) => {
  let one = await getpatientsById(req.params.id);
  res.json(one);
});

router.post("/add", async (req, res) => {
  const body = req.body;
  let result = await insertpatient(body);
  res.json(result);
});

router.delete("/delete/:id", async (req, res) => {
  let result = await deletepatient(req.params.id);
  res.json(result);
});

router.put("/update/:id", async (req, res) => {
  const body = req.body;
  let result = await updatepatient(req.params.id, body);
  res.json(result);
});

module.exports = router;
