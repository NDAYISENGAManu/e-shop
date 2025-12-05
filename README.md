# E-Shop - Modern Next.js E-Commerce Platform

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-336791)
![License](https://img.shields.io/badge/License-MIT-green)

A full-stack e-commerce application built with Next.js 14, TypeScript, and PostgreSQL.

</div>

---

## ⚡ Quick Start

```bash
# Automated setup
./setup.sh

# Start development
npm run dev
```

Visit: http://localhost:3000

**Default Login:** admin@eshop.com / Admin@123

## 📚 Full Documentation

This project has been completely migrated to Next.js 14 with TypeScript and PostgreSQL.

- [**📖 Complete Documentation**](README-NEW.md) - Full setup and usage guide
- [**🔄 Migration Guide**](MIGRATION.md) - Upgrade instructions
- [**🚀 Deployment Guide**](DEPLOYMENT.md) - Production deployment
- [**⚡ Quick Reference**](QUICK-REFERENCE.md) - Common commands
- [**📊 Project Summary**](PROJECT-SUMMARY.md) - Overview & features
- [**⚡ Performance Guide**](PERFORMANCE.md) - **NEW!** Optimization details
- [**🏭 Production Guide**](PRODUCTION.md) - **NEW!** Deployment checklist
- [**📈 Optimization Summary**](OPTIMIZATION-SUMMARY.md) - **NEW!** Performance improvements

## 🌟 Features

✅ Next.js 14 with App Router
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

**Frontend:** Next.js 14, TypeScript, Styled Components, React Query
**Backend:** Next.js API Routes, PostgreSQL, Sequelize
**Auth:** NextAuth.js with bcryptjs

## 📦 Installation

### Prerequisites
- Node.js 18+
- PostgreSQL 14+

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
