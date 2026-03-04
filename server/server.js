/**
 * Divergent Studios — Payment Server (standalone)
 * Run separately when deploying API and frontend apart.
 */
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");
const { createPaymentRouter } = require("./routes");

const app = express();
const PORT = process.env.PORT || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get("/", (_, res) => {
  res.json({
    service: "divergent-payments",
    message: "Payment server is running (Stripe).",
    endpoints: ["/api/health", "/api/test-auth", "/api/create-checkout"],
  });
});

app.use("/api", createPaymentRouter(new Stripe(process.env.STRIPE_SECRET_KEY), FRONTEND_URL));

app.use((_, res) => res.status(404).json({ error: "Not found" }));

process.on("unhandledRejection", (err) => console.error("[unhandledRejection]", err));

app.listen(PORT, () => {
  console.log(
    `\n  Divergent Studios Payment Server (Stripe)\n  → http://localhost:${PORT}\n  Stripe: ${process.env.STRIPE_SECRET_KEY ? "configured" : "NOT SET"}\n`
  );
});
