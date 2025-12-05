#!/bin/bash

# E-Shop Migration Setup Script
# This script helps set up the Next.js e-commerce application

set -e

echo "================================"
echo "E-Shop Setup Script"
echo "================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}Error: Node.js is not installed${NC}"
    echo "Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

echo -e "${GREEN}✓ Node.js found: $(node --version)${NC}"

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo -e "${RED}Error: PostgreSQL is not installed${NC}"
    echo "Please install PostgreSQL"
    exit 1
fi

echo -e "${GREEN}✓ PostgreSQL found${NC}"

# Check if database exists
DB_EXISTS=$(sudo -u postgres psql -tAc "SELECT 1 FROM pg_database WHERE datname='eshop'" 2>/dev/null || echo "")

if [ "$DB_EXISTS" != "1" ]; then
    echo -e "${YELLOW}Database 'eshop' not found. Creating...${NC}"
    sudo -u postgres psql -c "CREATE DATABASE eshop;"
    echo -e "${GREEN}✓ Database 'eshop' created${NC}"
else
    echo -e "${GREEN}✓ Database 'eshop' exists${NC}"
fi

# Backup old package.json if exists
if [ -f "package.json" ] && [ ! -f "package.old.json" ]; then
    echo -e "${YELLOW}Backing up old package.json...${NC}"
    mv package.json package.old.json
    echo -e "${GREEN}✓ Old package.json backed up${NC}"
fi

# Use new package.json
if [ -f "package-new.json" ]; then
    echo -e "${YELLOW}Using new package.json...${NC}"
    cp package-new.json package.json
    echo -e "${GREEN}✓ New package.json in place${NC}"
fi

# Install dependencies
echo -e "${YELLOW}Installing dependencies...${NC}"
npm install
echo -e "${GREEN}✓ Dependencies installed${NC}"

# Setup environment file
if [ ! -f ".env.local" ]; then
    echo -e "${YELLOW}Creating .env.local file...${NC}"
    cp .env.example .env.local
    
    # Generate a random secret for NEXTAUTH_SECRET
    SECRET=$(openssl rand -base64 32)
    
    # Update .env.local with the secret
    if [[ "$OSTYPE" == "darwin"* ]]; then
        sed -i '' "s/your-super-secret-key-change-this-in-production/$SECRET/g" .env.local
    else
        sed -i "s/your-super-secret-key-change-this-in-production/$SECRET/g" .env.local
    fi
    
    echo -e "${GREEN}✓ .env.local created${NC}"
    echo -e "${YELLOW}⚠ Please update database password in .env.local${NC}"
else
    echo -e "${GREEN}✓ .env.local already exists${NC}"
fi

# Run migrations
echo -e "${YELLOW}Running database migrations...${NC}"
npm run db:migrate
echo -e "${GREEN}✓ Migrations completed${NC}"

# Seed database
echo -e "${YELLOW}Seeding database...${NC}"
npm run db:seed
echo -e "${GREEN}✓ Database seeded${NC}"

echo ""
echo "================================"
echo -e "${GREEN}Setup Complete!${NC}"
echo "================================"
echo ""
echo "Next steps:"
echo "1. Update database password in .env.local"
echo "2. Run: npm run dev"
echo "3. Visit: http://localhost:3000"
echo ""
echo "Default admin login:"
echo "  Email: admin@eshop.com"
echo "  Password: Admin@123"
echo ""
echo "For more information, see README-NEW.md"
echo ""
