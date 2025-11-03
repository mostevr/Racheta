const express = require("express");
const {
    getAllVisits,
    getVisitById,
    insertVisit,
    deleteVisit,
    updateVisit
} = require("../controllers/visit.controller");

const router = express.Router();

router.get("/getAll", async (req, res) => {
  let list = await getAllVisits();
  res.json(list);
});
router.get("/getById/:id", async (req, res) => {
  let one = await getVisitById(req.params.id);
  res.json(one);
});

router.post("/add", async (req, res) => {
  const body = req.body;
  let result = await insertVisit(body);
  res.json(result);
});

router.delete("/delete/:id", async (req, res) => {
  let result = await deleteVisit(req.params.id);
  res.json(result);
});

router.put("/update/:id", async (req, res) => {
  const body = req.body;
  let result = await updateVisit(req.params.id, body);
  res.json(result);
});

module.exports = router;
