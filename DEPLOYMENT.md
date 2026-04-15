# ACDC Pros - Hostinger Deployment Guide

This guide outlines how to deploy the **ACDC Pros** platform to Hostinger.

## Prerequisites
1. **Hostinger Plan:** You need a **VPS Hosting** or a **Business/Cloud Hosting** plan that supports Node.js.
2. **Domain:** Ensure your domain (e.g., `acdcpros.net`) is pointed to your Hostinger server.

## Step 1: Prepare Environment Variables
You must set the following environment variables in your Hostinger panel (or a `.env` file on the server):

```env
# Stripe Keys
STRIPE_SECRET_KEY=sk_live_...
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...

# Gemini API (for CoachBot)
GEMINI_API_KEY=...

# Node Environment
NODE_ENV=production
```

## Step 2: Build the Application
Before uploading, or on the server, run:
```bash
npm install
npm run build
```
This creates a `dist/` folder containing the optimized frontend.

## Step 3: Upload Files
Upload all files **except** `node_modules` to your Hostinger public directory or VPS folder.
Include:
- `dist/`
- `server.ts`
- `package.json`
- `firebase-applet-config.json`
- `.env` (if not using the panel)

## Step 4: Start the Server
### Option A: VPS (Recommended)
Use **PM2** to keep the server running:
```bash
npm install -g pm2
pm2 start server.ts --interpreter tsx --name acdc-pros
pm2 save
pm2 startup
```

### Option B: Hostinger Managed Node.js
1. Go to **Advanced -> Node.js** in your hPanel.
2. Select your application folder.
3. Set the **Entry File** to `server.ts`.
4. Click **Install Dependencies**.
5. Click **Start**.

## Step 5: Firebase & Stripe Webhooks
1. **Firebase:** Ensure your domain is added to the "Authorized Domains" list in the Firebase Console (Authentication -> Settings).
2. **Stripe:** Update your Stripe Dashboard with your new production URL for success/cancel redirects.

---
**Elite Support:** If you encounter any issues during deployment, contact `acdcproservices@gmail.com`.
