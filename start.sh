#!/bin/bash

echo "🚀 Starting WhatsApp Clone..."
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

# Check if MongoDB is running
echo -e "${BLUE}Checking MongoDB...${NC}"
if ! pgrep -x mongod > /dev/null; then
    echo -e "${RED}⚠️  MongoDB is not running!${NC}"
    echo "Please start MongoDB first:"
    echo "  macOS: brew services start mongodb-community"
    echo "  Linux: sudo systemctl start mongod"
    echo "  Or run: mongod"
    echo ""
    read -p "Press Enter to continue anyway or Ctrl+C to exit..."
fi

# Check if dependencies are installed
if [ ! -d "node_modules" ] || [ ! -d "server/node_modules" ] || [ ! -d "client/node_modules" ]; then
    echo -e "${RED}⚠️  Dependencies not installed!${NC}"
    echo "Please run './setup.sh' first"
    exit 1
fi

echo -e "${GREEN}✓ All checks passed${NC}"
echo ""
echo -e "${BLUE}Starting development servers...${NC}"
echo ""
echo "Frontend will run on: http://localhost:3000"
echo "Backend will run on:  http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Start both servers
npm run dev

