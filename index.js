const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
const drugsRoutes = require("./routers/drugs.routes");
const patientsRoutes = require("./routers/patient.routes");
const visitsRoutes = require("./routers/visit.routes");
const adminRoutes = require("./routers/admin.routes");
const authMiddleware = require("./middleware/auth");


app.use(express.json());
app.get("/", (req, res) => {
  res.json({ message: "Server is live..." });
});

app.use("/drugs",authMiddleware, drugsRoutes);
app.use("/patients",authMiddleware, patientsRoutes);
app.use("/visits",authMiddleware, visitsRoutes);
app.use("/admin",adminRoutes);

app.listen(PORT, () => {
  console.log(`serve on http://localhost:${PORT}`);
});


//step1 : npm i @prisma/client
//step2 : npm i prisma -D
//step3 : npx prisma init --datasource-provider postgresql
//step4 : get tables form chatgpt to put them on prisma/schema.prisma
//step5 : npx prisma db push
//optional : npx prisma studio

