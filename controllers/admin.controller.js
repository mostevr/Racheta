const dayjs = require("dayjs");
const prisma = require("../db");
const jwt = require("jsonwebtoken");

function generateOtp(length = 6) {
  const digits = "0123456789";
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
}

const OTP_EXPIRY_MIN = 1; // OTP valid for 1 minute
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// Generate OTP (create admin if not exists)
// Generate OTP (create admin if not exists)
const createOtp = async (phone) => {
  let otp = generateOtp();
  const otpExpiresAt = dayjs().add(OTP_EXPIRY_MIN, "minute").toDate();

  // Check if admin exists
  const existingAdmin = await prisma.admin.findUnique({ where: { phone } });

  let admin;
  let message;

  if (!existingAdmin) {
    // New admin created
    admin = await prisma.admin.create({
      data: { phone, otp, otpCreatedAt: otpExpiresAt },
    });
    message = `New admin created. OTP sent. Valid for ${OTP_EXPIRY_MIN} minute(s).`;
  } else {
    // Admin exists, just update OTP
    admin = await prisma.admin.update({
      where: { phone },
      data: { otp, otpCreatedAt: otpExpiresAt },
    });
    message = `OTP sent. Valid for ${OTP_EXPIRY_MIN} minute(s).`;
  }

  return { success: true, message, otp }; // otp can be sent via SMS in production
};


// Verify OTP and return token
const verifyOtp = async (phone, otp) => {
  const admin = await prisma.admin.findUnique({ where: { phone } });

  if (!admin) return { success: false, message: "Phone not registered" };
  if (admin.otp !== otp) return { success: false, message: "Invalid OTP" };

  const isExpired = dayjs().isAfter(dayjs(admin.otpCreatedAt));
  if (isExpired) return { success: false, message: "OTP has expired" };

  await prisma.admin.update({
    where: { id: admin.id },
    data: { otp: null, otpCreatedAt: null },
  });

  const token = jwt.sign({ id: admin.id, phone: admin.phone }, JWT_SECRET, {
    expiresIn: "1d",
  });

  return { success: true, token };
};

// Get all admins
const getAllAdmins = async () => prisma.admin.findMany();

// Get admin by id
const getAdminById = async (id) =>
  prisma.admin.findUnique({ where: { id } });

// Delete admin
const deleteAdminById = async (id) =>
  prisma.admin.delete({ where: { id } });

// Update admin
const updateAdminById = async (id, data) =>
  prisma.admin.update({ where: { id }, data });

module.exports = {
  createOtp,
  verifyOtp,
  getAllAdmins,
  getAdminById,
  deleteAdminById,
  updateAdminById,
};
