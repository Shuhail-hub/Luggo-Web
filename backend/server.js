// backend/server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();

// ✅ Load environment variables (works both locally and on Azure)
const dockerEnvPath = "/app/.env";
const localEnvPath = path.join(__dirname, ".env");
dotenv.config({ path: fs.existsSync(dockerEnvPath) ? dockerEnvPath : localEnvPath });

// ✅ Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json());

// ✅ Swagger setup
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Luggo Locker API",
      version: "1.0.0",
      description: "API to send LOCK/UNLOCK commands to Azure IoT Hub",
    },
    servers: [
      { url: process.env.BASE_URL || "http://localhost:5000" }
    ],
  },
  apis: ["./routes/*.js"],
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ✅ Routes
app.use("/api/locker", require("./routes/lockerRoutes"));

// ✅ Root route — important for Azure health checks
app.get("/", (req, res) => {
  res.send("✅ Luggo Backend API is running on Azure 🚀");
});

// ✅ Start server on Azure’s assigned port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
