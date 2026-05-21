#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Full-Stack Portfolio - Development Setup${NC}"
echo -e "${BLUE}========================================${NC}"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js first.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Node.js found: $(node --version)${NC}"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed. Please install npm first.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ npm found: $(npm --version)${NC}"

# Install server dependencies if not already installed
if [ ! -d "server/node_modules" ]; then
    echo -e "${YELLOW}📦 Installing server dependencies...${NC}"
    cd server && npm install
    cd ..
fi

# Install client dependencies if not already installed
if [ ! -d "client/node_modules" ]; then
    echo -e "${YELLOW}📦 Installing client dependencies...${NC}"
    cd client && npm install
    cd ..
fi

echo -e "${GREEN}✓ Dependencies installed${NC}"

# Kill any existing processes on ports 5000 and 3000
echo -e "${YELLOW}🧹 Clearing ports...${NC}"
lsof -i :5000 2>/dev/null | grep -v COMMAND | awk '{print $2}' | xargs kill -9 2>/dev/null || true
lsof -i :3000 2>/dev/null | grep -v COMMAND | awk '{print $2}' | xargs kill -9 2>/dev/null || true
sleep 1

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}🚀 Starting Development Servers${NC}"
echo -e "${BLUE}========================================${NC}"

# Start backend in background
echo -e "${YELLOW}Starting backend server on port 5000...${NC}"
cd server && npm run dev > ../server.log 2>&1 &
SERVER_PID=$!
echo -e "${GREEN}✓ Backend server started (PID: $SERVER_PID)${NC}"

# Wait for backend to start
sleep 3

# Start frontend
echo -e "${YELLOW}Starting frontend server on port 3000...${NC}"
cd ../client && npm run dev > ../client.log 2>&1 &
CLIENT_PID=$!
echo -e "${GREEN}✓ Frontend server started (PID: $CLIENT_PID)${NC}"

sleep 2

echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}✓ Development servers are running!${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo -e "${YELLOW}📍 Access the application:${NC}"
echo -e "   Frontend: ${BLUE}http://localhost:3000${NC}"
echo -e "   Backend:  ${BLUE}http://localhost:5000${NC}"
echo -e "   Admin:    ${BLUE}http://localhost:3000/admin/login${NC}"
echo ""
echo -e "${YELLOW}📝 Default Admin Credentials:${NC}"
echo -e "   Email:    ${BLUE}admin@portfolio.com${NC}"
echo -e "   Password: ${BLUE}admin123${NC}"
echo ""
echo -e "${YELLOW}�� Logs:${NC}"
echo -e "   Backend log:  ${BLUE}./server.log${NC}"
echo -e "   Frontend log: ${BLUE}./client.log${NC}"
echo ""
echo -e "${YELLOW}⏹️  To stop the servers, press Ctrl+C${NC}"
echo ""

# Wait for both processes
wait

