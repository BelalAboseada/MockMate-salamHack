import express from "express";
import dotenv from "dotenv";
import { bootstrap } from "./src/app.controller.js";

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 5000; // Default to 5000 if not specified

bootstrap(app, express)
  .then(() => {
    app.listen(port, () => console.log(`✅ Server running on port ${port}`));
  })
  .catch((err) => {
    console.error("❌ Server failed to start:", err.message);
    process.exit(1);
  });
