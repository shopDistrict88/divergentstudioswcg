/**
 * Unified dev server — Next.js + Payment API in one process
 */
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "server", ".env") });
const next = require("next");
const express = require("express");
const { createPaymentRouter } = require("./server/routes");
const Stripe = require("stripe");

const dev = process.env.NODE_ENV !== "production";
const port = parseInt(process.env.PORT || "3000", 10);

const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const app = express();
  app.use(express.json());

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
  const frontendUrl = process.env.FRONTEND_URL || `http://localhost:${port}`;

  app.use("/api", createPaymentRouter(stripe, frontendUrl));
  app.use((req, res) => handle(req, res));

  app.listen(port, () => {
    console.log(
      `\n  Divergent Studios — http://localhost:${port}\n  API: /api/health  /api/create-checkout  /api/checkout-session/:id\n  Stripe: ${process.env.STRIPE_SECRET_KEY ? "configured" : "NOT SET"}\n`
    );
  });
});
