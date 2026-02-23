# Invoice Generator (Vercel-ready)

This project contains a simple static frontend and a tiny serverless API suitable for deployment to Vercel.

How it works
- `index.html` — Single-file frontend. Use the form to preview invoices locally and POST data to the API.
- `api/generate-invoice.js` — Serverless function (POST) that computes totals and returns a rendered HTML invoice string.
- `vercel.json` — Ensures builds route API requests to the serverless function.

Local testing
1. Install the Vercel CLI (optional but recommended):

```bash
npm i -g vercel
```

2. From the project folder run in dev mode:

```bash
npx vercel dev
```

This runs a local server that serves `index.html` and the `api/*` endpoints.

Deploying

```bash
vercel --prod
```

Notes
- If you previously deployed and saw a 404, ensure your root has `index.html` (this repo now does).
- The serverless API here is intentionally small and returns HTML as text; extend it to generate PDFs or persist invoices as needed.
