#!/bin/bash

# E-Shop Verification Script
# Run this after setup to verify everything is working

echo "================================"
echo "E-Shop Verification Script"
echo "================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

ERRORS=0

# Function to check result
check_result() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ $1${NC}"
    else
        echo -e "${RED}✗ $1${NC}"
        ERRORS=$((ERRORS + 1))
    fi
}

echo "1. Checking Node.js..."
node --version > /dev/null 2>&1
check_result "Node.js installed"

echo "2. Checking npm..."
npm --version > /dev/null 2>&1
check_result "npm installed"

echo "3. Checking PostgreSQL..."
psql --version > /dev/null 2>&1
check_result "PostgreSQL installed"

echo "4. Checking database existence..."
sudo -u postgres psql -lqt | cut -d \| -f 1 | grep -qw eshop
check_result "Database 'eshop' exists"

echo "5. Checking environment file..."
if [ -f ".env.local" ]; then
    echo -e "${GREEN}✓ .env.local exists${NC}"
else
    echo -e "${YELLOW}⚠ .env.local not found (using .env.example)${NC}"
fi

echo "6. Checking dependencies..."
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓ node_modules exists${NC}"
else
    echo -e "${RED}✗ node_modules not found. Run: npm install${NC}"
    ERRORS=$((ERRORS + 1))
fi

echo "7. Checking critical files..."
FILES=(
    "src/app/layout.tsx"
    "src/app/page.tsx"
    "src/database/models/index.ts"
    "src/database/connection.ts"
    "next.config.js"
    "tsconfig.json"
    "package.json"
)

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓ $file${NC}"
    else
        echo -e "${RED}✗ $file missing${NC}"
        ERRORS=$((ERRORS + 1))
    fi
done

echo ""
echo "8. Checking database tables..."
TABLES=$(sudo -u postgres psql -d eshop -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';" 2>/dev/null | tr -d ' ')

if [ -z "$TABLES" ]; then
    echo -e "${RED}✗ Cannot connect to database${NC}"
    ERRORS=$((ERRORS + 1))
elif [ "$TABLES" -eq 0 ]; then
    echo -e "${YELLOW}⚠ No tables found. Run: npm run db:migrate${NC}"
    ERRORS=$((ERRORS + 1))
else
    echo -e "${GREEN}✓ Found $TABLES tables${NC}"
fi

echo ""
echo "9. Checking for data..."
PRODUCT_COUNT=$(sudo -u postgres psql -d eshop -t -c "SELECT COUNT(*) FROM products;" 2>/dev/null | tr -d ' ')

if [ -z "$PRODUCT_COUNT" ]; then
    echo -e "${YELLOW}⚠ Products table not accessible${NC}"
elif [ "$PRODUCT_COUNT" -eq 0 ]; then
    echo -e "${YELLOW}⚠ No products found. Run: npm run db:seed${NC}"
else
    echo -e "${GREEN}✓ Found $PRODUCT_COUNT products${NC}"
fi

echo ""
echo "================================"
echo "Verification Summary"
echo "================================"

if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✓ All checks passed!${NC}"
    echo ""
    echo "Ready to start development:"
    echo "  npm run dev"
    echo ""
    echo "Visit: http://localhost:3000"
    echo ""
else
    echo -e "${RED}✗ Found $ERRORS error(s)${NC}"
    echo ""
    echo "Please fix the errors above and run this script again."
    echo ""
    echo "Common fixes:"
    echo "  - Install dependencies: npm install"
    echo "  - Run migrations: npm run db:migrate"
    echo "  - Seed database: npm run db:seed"
    echo "  - Create .env.local: cp .env.example .env.local"
    echo ""
fi

exit $ERRORS
