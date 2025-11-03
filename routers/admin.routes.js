const express = require("express");
const {
  getAllAdmins,
  getAdminById,
  deleteAdminById,
  updateAdminById,
  createOtp,
  verifyOtp
} = require("../controllers/admin.controller");

const authMiddleware = require("../middleware/auth");

const router = express.Router();

// Generate OTP (creates admin if phone not exists)
router.post("/otp", async (req, res) => {
  try {
    const { phone } = req.body;
    const result = await createOtp(phone);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Verify OTP and get token
router.post("/verify", async (req, res) => {
  try {
    const { phone, otp } = req.body;
    const result = await verifyOtp(phone, otp);
    if (result.success) res.json(result);
    else res.status(400).json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all admins (protected)
router.get("/getAll", authMiddleware, async (req, res) => {
  try {
    const admins = await getAllAdmins();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get admin by id (protected)
router.get("/get/:id", authMiddleware, async (req, res) => {
  try {
    const admin = await getAdminById(req.params.id);
    if (admin) res.json(admin);
    else res.status(404).json({ error: "Admin not found" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete admin by id (protected)
router.delete("/delete/:id", authMiddleware, async (req, res) => {
  try {
    const admin = await deleteAdminById(req.params.id);
    res.json({ message: "Admin deleted successfully", admin });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update admin by id (protected)
router.put("/update/:id", authMiddleware, async (req, res) => {
  try {
    const admin = await updateAdminById(req.params.id, req.body);
    res.json({ message: "Admin updated successfully", admin });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
