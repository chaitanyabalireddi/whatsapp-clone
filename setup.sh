#!/bin/bash

echo "🚀 WhatsApp Clone - Setup Script"
echo "================================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check Node.js
echo -e "${BLUE}Checking Node.js installation...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js v16 or higher.${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js $(node --version) found${NC}"

# Check npm
echo -e "${BLUE}Checking npm installation...${NC}"
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed.${NC}"
    exit 1
fi
echo -e "${GREEN}✓ npm $(npm --version) found${NC}"

# Check MongoDB
echo -e "${BLUE}Checking MongoDB installation...${NC}"
if ! command -v mongod &> /dev/null; then
    echo -e "${RED}⚠️  MongoDB not found in PATH. Make sure MongoDB is installed and running.${NC}"
else
    echo -e "${GREEN}✓ MongoDB found${NC}"
fi

echo ""
echo -e "${BLUE}Installing dependencies...${NC}"
echo ""

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install server dependencies
echo "📦 Installing server dependencies..."
cd server
npm install
cd ..

# Install client dependencies
echo "📦 Installing client dependencies..."
cd client
npm install
cd ..

echo ""
echo -e "${GREEN}✅ Installation complete!${NC}"
echo ""
echo "📝 Next steps:"
echo "1. Make sure MongoDB is running (mongod)"
echo "2. Check environment variables in server/.env and client/.env"
echo "3. Run 'npm run dev' to start both servers"
echo ""
echo "🌐 The app will be available at:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:5000"
echo ""
echo -e "${GREEN}Happy coding! 🎉${NC}"

