import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Stripe from "stripe";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let stripe: Stripe | null = null;

function getStripe(): Stripe {
  if (!stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error('STRIPE_SECRET_KEY environment variable is required');
    }
    stripe = new Stripe(key);
  }
  return stripe;
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Middleware to ensure cookies are secure and SameSite=None for iframe compatibility
  app.use((req, res, next) => {
    const originalSetHeader = res.setHeader;
    res.setHeader = function (name: string, value: any) {
      if (name.toLowerCase() === 'set-cookie') {
        if (Array.isArray(value)) {
          value = value.map(cookie => {
            if (!cookie.includes('SameSite=')) cookie += '; SameSite=None';
            if (!cookie.includes('Secure')) cookie += '; Secure';
            return cookie;
          });
        } else if (typeof value === 'string') {
          if (!value.includes('SameSite=')) value += '; SameSite=None';
          if (!value.includes('Secure')) value += '; Secure';
        }
      }
      return originalSetHeader.apply(this, [name, value]);
    };
    next();
  });

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      message: "ACDC Pros Backend is running",
      domain: "acdcpros.net",
      contact: "acdcproservices@gmail.com"
    });
  });

  app.post("/api/create-checkout-session", async (req, res) => {
    try {
      const { productId, productName, price, successUrl, cancelUrl } = req.body;
      const stripeClient = getStripe();

      const session = await stripeClient.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: productName,
                description: `Elite ACDC Pros Digital Asset: ${productName}`,
              },
              unit_amount: Math.round(price * 100),
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: {
          productId,
        },
      });

      res.json({ id: session.id, url: session.url });
    } catch (error: any) {
      console.error("Stripe Checkout Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
