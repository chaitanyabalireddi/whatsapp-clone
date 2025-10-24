#!/bin/bash

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "========================================"
echo "WhatsApp Clone - Network Setup"
echo "========================================"
echo ""
echo "This script will help you set up the app for multiple devices"
echo ""

# Detect OS
OS=$(uname -s)

# Get IP address
echo -e "${BLUE}Finding your IP address...${NC}"
echo ""

if [ "$OS" = "Darwin" ]; then
    # macOS
    IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | head -n1 | awk '{print $2}')
elif [ "$OS" = "Linux" ]; then
    # Linux
    IP=$(hostname -I | awk '{print $1}')
else
    echo -e "${RED}Unsupported OS${NC}"
    exit 1
fi

if [ -z "$IP" ]; then
    echo -e "${RED}Could not detect IP address${NC}"
    echo "Please find your IP manually:"
    echo "  macOS: ifconfig | grep inet"
    echo "  Linux: hostname -I"
    exit 1
fi

echo -e "${GREEN}[FOUND] Your IP Address: $IP${NC}"
echo ""

echo "========================================"
echo "Configuration Instructions"
echo "========================================"
echo ""
echo "Please update the following files with your IP address:"
echo ""
echo "1. server/.env"
echo -e "   Change CLIENT_URL to: ${YELLOW}http://$IP:3000${NC}"
echo ""
echo "2. client/.env"
echo -e "   Change REACT_APP_API_URL to: ${YELLOW}http://$IP:5000/api${NC}"
echo -e "   Change REACT_APP_SOCKET_URL to: ${YELLOW}http://$IP:5000${NC}"
echo ""

# Update files automatically
echo -e "${BLUE}Would you like to update the files automatically? (y/n)${NC}"
read -r response

if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
    echo ""
    echo "Updating server/.env..."
    if [ -f "server/.env" ]; then
        sed -i.bak "s|CLIENT_URL=.*|CLIENT_URL=http://$IP:3000|g" server/.env
        echo -e "${GREEN}✓ Updated server/.env${NC}"
    else
        echo -e "${RED}✗ server/.env not found${NC}"
    fi
    
    echo "Updating client/.env..."
    if [ -f "client/.env" ]; then
        sed -i.bak "s|REACT_APP_API_URL=.*|REACT_APP_API_URL=http://$IP:5000/api|g" client/.env
        sed -i.bak "s|REACT_APP_SOCKET_URL=.*|REACT_APP_SOCKET_URL=http://$IP:5000|g" client/.env
        echo -e "${GREEN}✓ Updated client/.env${NC}"
    else
        echo -e "${RED}✗ client/.env not found${NC}"
    fi
    echo ""
fi

echo "========================================"
echo "Firewall Configuration"
echo "========================================"
echo ""

if [ "$OS" = "Darwin" ]; then
    echo "On macOS, the firewall typically allows local applications."
    echo "If you have issues, go to:"
    echo "System Preferences → Security & Privacy → Firewall → Firewall Options"
    echo "and allow Node.js"
elif [ "$OS" = "Linux" ]; then
    echo "Checking if UFW is active..."
    if command -v ufw &> /dev/null; then
        if [ "$EUID" -eq 0 ]; then
            echo "Adding firewall rules..."
            ufw allow 3000/tcp
            ufw allow 5000/tcp
            echo -e "${GREEN}✓ Firewall rules added${NC}"
        else
            echo -e "${YELLOW}Please run these commands to allow ports:${NC}"
            echo "  sudo ufw allow 3000/tcp"
            echo "  sudo ufw allow 5000/tcp"
        fi
    else
        echo "UFW not found. Check your firewall settings manually."
    fi
fi

echo ""
echo "========================================"
echo "Access URLs"
echo "========================================"
echo ""
echo "On this computer:"
echo -e "   ${GREEN}http://localhost:3000${NC}"
echo ""
echo "On other devices (same WiFi):"
echo -e "   ${GREEN}http://$IP:3000${NC}"
echo ""
echo "========================================"
echo "Next Steps"
echo "========================================"
echo ""
echo "1. Configuration files have been updated (if you selected yes)"
echo "2. Restart the application: npm run dev"
echo "3. On your phone/other device, connect to the same WiFi"
echo "4. Open browser and go to: http://$IP:3000"
echo "5. Register users on different devices and start chatting!"
echo ""
echo "For detailed instructions, see: NETWORK_SETUP.md"
echo ""

