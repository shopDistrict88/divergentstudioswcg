/**
 * Payment API routes — mount at /api
 */
const express = require("express");
const Stripe = require("stripe");

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    console.error("[unhandled]", err);
    if (!res.headersSent) {
      res.status(500).json({ error: err.message || "Internal server error" });
    }
  });
};

function createPaymentRouter(stripe, frontendUrl) {
  const router = express.Router();

  router.post("/create-checkout", asyncHandler(async (req, res) => {
    try {
      const { items, email, subtotal } = req.body;

      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({
          success: false,
          error: "Cart is empty",
        });
      }

      const shippingCost = subtotal >= 150 ? 0 : 12;

      const lineItems = items.map((item) => {
        const product = item.product || item;
        const name = product.name || "Item";
        const size = item.size ? ` — ${item.size}` : "";
        const qty = Math.max(1, parseInt(item.quantity, 10) || 1);
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${name}${size}`,
              description: "Divergent Studios — Wearable art.",
            },
            unit_amount: Math.round((product.price || 0) * 100),
          },
          quantity: qty,
        };
      });

      if (shippingCost > 0) {
        lineItems.push({
          price_data: {
            currency: "usd",
            product_data: { name: "Shipping" },
            unit_amount: Math.round(shippingCost * 100),
          },
          quantity: 1,
        });
      }

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        ui_mode: "embedded",
        payment_method_types: ["card"],
        return_url: `${frontendUrl}/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
        line_items: lineItems,
        customer_email: email || undefined,
        shipping_address_collection: {
          allowed_countries: ["US", "CA", "GB"],
        },
        metadata: {
          source: "divergent-studios",
        },
      });

      res.json({
        success: true,
        clientSecret: session.client_secret,
        orderId: session.id,
      });
    } catch (err) {
      console.error("[create-checkout]", err);
      res.status(500).json({
        success: false,
        error: err.message || "Failed to create checkout",
      });
    }
  }));

  router.get("/health", (_, res) => {
    res.json({ status: "ok", service: "divergent-payments" });
  });

  router.get("/checkout-session/:id", asyncHandler(async (req, res) => {
    const session = await stripe.checkout.sessions.retrieve(req.params.id, {
      expand: ["line_items"],
    });
    res.json({
      status: session.status,
      payment_status: session.payment_status,
      customer_email: session.customer_details?.email,
      amount_total: session.amount_total,
    });
  }));

  router.get("/test-auth", asyncHandler(async (_, res) => {
    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(401).json({
        ok: false,
        error: "STRIPE_SECRET_KEY not set",
        hint: "Get your key from dashboard.stripe.com/apikeys",
      });
    }
    try {
      await stripe.balance.retrieve();
      res.json({ ok: true, message: "Stripe key is valid." });
    } catch (err) {
      res.status(401).json({
        ok: false,
        error: err.message || "Invalid Stripe key",
        hint: "Use sk_test_... for test mode.",
      });
    }
  }));

  return router;
}

module.exports = { createPaymentRouter };
