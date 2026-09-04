# Marco Elétrica

This repository contains the source for a small electrical contractor business website and a protected admin dashboard for managing clients, services, quotations, pricing, expenses, and gallery content.

The actual application code lives in the nested folder `marco-eletrica/`.

## Project overview

The app is a Next.js 16 application using the App Router and Prisma with PostgreSQL. It serves two main surfaces:

- Public website: landing page for the electrical company, with service sections, showcase gallery, FAQ, contact details, and WhatsApp CTA.
- Admin panel: authenticated dashboard for managing customer data, service lifecycle, quotations, budgets, item catalog, monthly revenue/profit, and photo uploads.

The codebase is organized around the following primary areas:

- `marco-eletrica/src/app` — route pages, protected admin flows, and API routes
- `marco-eletrica/src/components` — marketing UI and admin UI components
- `marco-eletrica/src/lib` — database access, auth, validation, business calculations, and helpers
- `marco-eletrica/prisma` — Prisma schema, data seed files, and migrations
- `marco-eletrica/public` — static assets and images

## Tech stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- Vercel Analytics
- @vercel/blob for gallery uploads
- @react-pdf/renderer for quotation PDF generation
- Zod for validation
- bcryptjs + jose for admin authentication

## Application features

### Public site

The public site includes:

- Hero section and company branding
- Services overview and detailed service cards
- Why-us section
- Awards / trust section
- Showcase gallery
- FAQ
- Contact section with WhatsApp and phone links
- SEO metadata and structured data for the company profile

### Admin system

The protected admin area provides:

- Dashboard with month filters, KPI cards, revenue/profit charts, and upcoming warranty expirations
- Client management with search, activation/deactivation, demo client flag, and service history
- Service tracking with status, labor value, warranty configuration, and completion reports
- Quote creation and management with line items, discounts, approval status, and PDF export
- Price catalog management by category and item
- Expense tracking
- Site gallery upload/delete management
- Seed endpoint to populate the initial catalog and gallery data

## Runtime requirements

Before running the app, make sure you have:

- Node.js 20+
- npm
- A PostgreSQL database instance
- Access to a Vercel Blob token if you plan to upload gallery images in production

## Repository layout

```text
.
├── README.md                     # This document
├── marco-eletrica/
│   ├── package.json
│   ├── next.config.ts
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── seed.ts
│   │   ├── priceCatalogData.ts
│   │   ├── galleryData.ts
│   │   └── migrations/
│   ├── public/
│   └── src/
│       ├── app/
│       ├── components/
│       ├── lib/
│       └── proxy.ts
└── .gitignore
```

## Environment variables

Create a `.env.local` file inside `marco-eletrica/` with the required configuration.

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE_NAME"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD_HASH="$2a$10$your.bcrypt.hash.here"
ADMIN_SESSION_SECRET="replace-with-a-long-random-secret"

# Optional but recommended for production gallery uploads on Vercel
BLOB_READ_WRITE_TOKEN="your-vercel-blob-token"
```

Important notes:

- `DATABASE_URL` is required because Prisma schema reads it from `env("DATABASE_URL")`.
- `ADMIN_USERNAME` is the login username for the protected admin area.
- `ADMIN_PASSWORD_HASH` must be a bcrypt hash, because the app uses `bcrypt.compare()` during login.
- `ADMIN_SESSION_SECRET` is required for the JWT session used by the admin cookie. Without it, the app throws an error at runtime.
- `BLOB_READ_WRITE_TOKEN` is used by `@vercel/blob` for gallery uploads. The upload code calls `put()` and `del()` from that package.

Example generation for the admin password hash:

```bash
cd marco-eletrica
node -e "const bcrypt=require('bcryptjs'); const salt=10; bcrypt.hash('your-password', salt).then(console.log)"
```

## Installing dependencies

From the repository root:

```bash
cd marco-eletrica
npm install
```

This project includes a Prisma postinstall step via `postinstall: prisma generate` in `package.json`.

## Database setup

The database schema is defined in `marco-eletrica/prisma/schema.prisma`.

The project uses the following core tables:

- `Client`
- `Service`
- `ServiceItem`
- `PriceItem`
- `Expense`
- `Quotation`
- `QuotationItem`
- `GalleryItem`

To initialize the database with the schema and seed data:

```bash
cd marco-eletrica
npx prisma migrate deploy
npx prisma db seed
```

The seed script loads the catalog and gallery data from:

- `prisma/priceCatalogData.ts`
- `prisma/galleryData.ts`

If you are starting from a fresh local PostgreSQL instance, `migrate deploy` is the normal deployment step, and the seed script populates the default price list and gallery items.

## Running the app locally

From `marco-eletrica/`:

```bash
npm run dev
```

Then open:

- http://localhost:3000 — public website
- http://localhost:3000/admin/login — admin login

## Admin login flow

The application uses a cookie-based JWT session for the admin UI.

Relevant auth logic:

- `src/lib/auth/session.ts` creates a signed JWT with `ADMIN_SESSION_SECRET`
- `src/app/admin/(protected)/layout.tsx` redirects unauthenticated users to `/admin/login`
- `src/lib/actions/auth.ts` validates `ADMIN_USERNAME` and `ADMIN_PASSWORD_HASH` against the submitted login form

The login form lives at `/admin/login`, and the admin routes are protected by `verifySessionToken()`.

## Key application routes

Public routes:

- `/` — landing page
- `/robots` and `/sitemap` — generated metadata routes

Admin routes:

- `/admin/login` — login page
- `/admin` — dashboard
- `/admin/clientes` — customer management
- `/admin/servicos` — service tracking
- `/admin/orcamentos` — quotations
- `/admin/precos` — price catalog
- `/admin/despesas` — expenses
- `/admin/galeria` — image gallery management

Protected API routes:

- `GET /api/admin/seed` — seeds catalog and gallery data after auth
- `GET /api/admin/orcamentos/[id]/pdf` — exports a quotation as PDF after auth
- `POST /api/admin/logout` — clears the admin session cookie

## Important business logic

Several areas of the app implement real operational features:

### Pricing and quotations

- Quote totals are calculated in `src/lib/quotationTotals.ts`
- Quotation items include unit price, quantity, discount percent, and line totals
- Quotation statuses are: `rascunho`, `enviado`, `aprovado`, `recusado`

### Service lifecycle

- Service statuses are: `aberto`, `em_andamento`, `revisao`, `concluido`
- `warrantyMonths` and `warrantyUntil` are calculated automatically when a service includes a warranty
- The dashboard flags services whose warranties are expiring in the next 30 days

### Client records

- Each client can be marked as `active` or `inactive`
- `isDemo` is a special demo-client flag used to exclude demo records from business metrics
- Duplicate phone numbers are blocked when creating a new client

### Gallery uploads

- Uploads are sent to Vercel Blob storage using `put()`
- The database stores the public URL and caption
- Deleting an item removes the DB record and also deletes the remote blob if the URL belongs to Vercel Blob storage

## API documentation

### Authenticated admin seed API

Request:

```bash
curl -b "admin_session=<token>" http://localhost:3000/api/admin/seed
```

Response shape:

```json
{
  "priceItems": { "total": 100, "created": 12 },
  "galleryItems": { "total": 15, "created": 3 },
  "message": "Catálogo: ..."
}
```

This route is protected and returns `401` when the admin session is missing or invalid.

### Authenticated quotation PDF API

Request:

```bash
curl -b "admin_session=<token>" -L http://localhost:3000/api/admin/orcamentos/<quotation-id>/pdf -o orcamento.pdf
```

The route returns a PDF file with the `Content-Disposition: attachment` header.

## Validation and linting

The repository includes:

- `npm run lint` — runs ESLint
- `npx prisma validate` — validates the Prisma schema and requires `DATABASE_URL` to be set

There is no dedicated automated test runner configured in `package.json` at the moment. The project uses linting and Prisma validation as the available verification steps.

## Production build

Build the app:

```bash
cd marco-eletrica
npm run build
```

Run the production server:

```bash
npm run start
```

For production deployment, the app is designed for a Next.js hosting platform such as Vercel. In that setup:

1. Connect the repository or the `marco-eletrica/` folder as the app root.
2. Add the environment variables above.
3. Provide a PostgreSQL connection.
4. Add the Vercel Blob token if you use image uploads.
5. Deploy the project and confirm the login page is available at `/admin/login`.

## Deployment notes

This app is ready for a standard Vercel deployment because it uses Next.js conventions and Vercel-specific packages, including `@vercel/analytics` and `@vercel/blob`.

For non-Vercel environments, the app still runs as a normal Next.js project as long as:

- PostgreSQL is reachable through `DATABASE_URL`
- the app can read the same environment variables listed above
- the public base URL is set appropriately for SEO metadata

## Troubleshooting

Common setup issues:

- `Prisma schema validation - Environment variable not found: DATABASE_URL` — add `DATABASE_URL` in `.env.local`
- admin login returns an error — verify `ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH`, and `ADMIN_SESSION_SECRET`
- gallery upload fails — ensure Vercel Blob is configured and `BLOB_READ_WRITE_TOKEN` is available in the environment
- app does not load after install — run `npm install` and then `npx prisma generate` if needed

## Recommended development workflow

1. Clone the repository.
2. `cd marco-eletrica`
3. Create `.env.local` with required variables.
4. Run `npm install`.
5. Run `npx prisma migrate deploy`.
6. Run `npx prisma db seed`.
7. Start the app with `npm run dev`.
8. Access `/admin/login` and sign in with the configured admin user.

This repository is a practical business administration app for an electrical contracting company: it combines a branded public website with a full operational admin tool for scheduling, quoting, pricing, and reporting.

