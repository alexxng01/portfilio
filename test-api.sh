#!/bin/bash

echo "🧪 Testing Backend API..."
echo ""

# Test 1: Check if server is running
echo "1️⃣  Checking if server is running on port 5000..."
curl -s http://localhost:5000/api/health > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ Server is responding"
else
    echo "❌ Server is not responding. Make sure to run: npm run dev in the server directory"
    exit 1
fi

echo ""
echo "2️⃣  Testing Portfolio API..."
response=$(curl -s http://localhost:5000/api/portfolio)
echo "Response: $response"

echo ""
echo "3️⃣  Testing Skills API..."
response=$(curl -s http://localhost:5000/api/skills)
echo "Response: $response"

echo ""
echo "4️⃣  Testing Projects API..."
response=$(curl -s http://localhost:5000/api/projects)
echo "Response: $response"

echo ""
echo "✅ API tests completed!"

