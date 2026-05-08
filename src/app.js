const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const app = express();

app.set("trust proxy", 1);

const limiter = rateLimit({
    windowMs : 15*60*1000,
    max:100,
    message:{
        success:false,
        message:"Too many requests please try again later",
    }
})

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "DonationBridge API",
      version: "1.0.0",
      description: "API documentation for DonationBridge backend",
    },
    servers: [
      {
        url: process.env.NODE_ENV === "production"
      ? "https://donation-bridge-api.onrender.com"
      : "http://localhost:5000"
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

const allowedOrigins = [
    process.env.CLIENT_URL,
    "http://localhost:5173",
    "http://127.0.0.1:5173",
].filter(Boolean);

app.use(cors({
    origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error("Not allowed by CORS"));
    },
    credentials:true,
}));

const authRoutes = require("./routes/authRoutes");
const donationRoutes = require("./routes/donationRoutes")

const swaggerSpec = swaggerJsdoc(swaggerOptions);

const {errorHandler} = require("./middleware/errorMiddleware"); 



app.use(express.json());

app.use(limiter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    service: "DonationBridge API",
    status: "running",
    documentation: "https://donation-bridge-api.onrender.com/api-docs"
  });
});

  app.use("/api/v1/auth" , authRoutes);
app.use("/api/v1/donation" , donationRoutes);

app.use(errorHandler);

module.exports = app;
