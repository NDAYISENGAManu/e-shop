# E-Shop - Modern Next.js Platform

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16+-336791)
![License](https://img.shields.io/badge/License-MIT-green)

A full-stack application built with Next.js 16, TypeScript, and PostgreSQL.

</div>

---

Visit: http://localhost:3000

**Default Login:** admin@eshop.com / Admin@123

## 🌟 Features

✅ Next.js 16 with App Router
✅ TypeScript for type safety
✅ PostgreSQL + Sequelize ORM
✅ NextAuth.js authentication
✅ Shopping cart & checkout
✅ Product filtering & sorting
✅ Responsive design
✅ Server-side rendering
✅ **Production-optimized** (75-85% faster!)
✅ **Database indexed** (19 indexes)
✅ **Smart caching** (5-min React Query cache)
✅ **Connection pooling** (20 connections max)

## 🛠️ Tech Stack

**Frontend:** Next.js 16, TypeScript, TailwindCss, React Query
**Backend:** Next.js API Routes, PostgreSQL, Sequelize
**Auth:** NextAuth.js with bcryptjs

## 📦 Installation

### Prerequisites
- Node.js 18+
- PostgreSQL 16+

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env.local
# Edit .env.local with your database password

# 3. Setup database
npm run db:migrate
npm run db:seed

# 4. Start development
npm run dev
```

## 🗂️ Project Structure

```
src/
├── app/              # Next.js pages & API routes
├── components/       # React components
├── database/         # Models, migrations, seeders
├── types/            # TypeScript types
└── utils/            # Helper functions
```

## 🔧 Common Commands

```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm run db:migrate       # Run database migrations
npm run db:seed          # Seed database
npm run db:reset         # Reset database
./verify.sh              # Verify setup
```

## 🗃️ Database

8 interconnected tables:
- users, products, product_images, product_colors
- carts, cart_items, orders, order_items

## 📝 License

MIT License

---
