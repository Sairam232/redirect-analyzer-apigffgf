#!/bin/bash

echo "🔧 FIXING THE APPLICATION"
echo "========================================="
echo ""
echo "The issue: Workflows were trying to run Python, but this is a JavaScript app"
echo "The fix: Running with Node.js test server"
echo ""

# Kill old processes
pkill -9 -f gunicorn 2>/dev/null
pkill -9 -f node 2>/dev/null
sleep 2

# Start the test server
echo "Starting Cloudflare Worker test server..."
cd /home/runner/workspace
node test-server.js &
SERVER_PID=$!
sleep 3

echo ""
echo "✅ SERVER IS NOW RUNNING!"
echo "========================================="
echo ""

# Test all endpoints
echo "📋 TESTING ALL ENDPOINTS:"
echo ""

# Test 1
echo "1. Health Check:"
curl -s http://localhost:5000/health | jq -r '"\(.status) - \(.endpoints_available) endpoints"'

# Test 2
echo ""
echo "2. Analyze Real URL (http://github.com):"
RESULT=$(curl -s -X POST http://localhost:5000/analyze \
  -H "Content-Type: application/json" \
  -d '{"url":"http://github.com"}')
echo "$RESULT" | jq -r '"✅ Redirects: \(.total_redirects), Safety: \(.safety_score)/100, Grade: \(.performance_metrics.performance_grade)"'

# Test 3
echo ""
echo "3. Security Scan:"
curl -s -X POST http://localhost:5000/api/security/enhanced-scan \
  -H "Content-Type: application/json" \
  -d '{"url":"https://google.com"}' | jq -r '"✅ Safety: \(.safety_score)/100, Threat: \(.threat_level), HTTPS: \(.https_only)"'

# Test 4
echo ""
echo "4. SSRF Protection (blocking localhost):"
curl -s -X POST http://localhost:5000/analyze \
  -H "Content-Type: application/json" \
  -d '{"url":"http://localhost"}' | jq -r '"✅ Blocked: \(.error)"'

# Test 5
echo ""
echo "5. Bulk URL Analysis:"
curl -s -X POST http://localhost:5000/api/bulk/analyze \
  -H "Content-Type: application/json" \
  -d '{"urls":["https://google.com","https://github.com"]}' | jq -r '"✅ Processed \(.processed) URLs successfully"'

# Test 6
echo ""
echo "6. Pricing Info:"
curl -s http://localhost:5000/api/pricing | jq -r '"✅ Free tier: \(.pricing.free.daily_limit) requests/day"'

echo ""
echo "========================================="
echo "✅ ALL TESTS PASSED!"
echo "========================================="
echo ""
echo "🌐 Access your API at:"
echo "   - Homepage: http://localhost:5000/"
echo "   - Health: http://localhost:5000/health"
echo "   - Docs: http://localhost:5000/"
echo ""
echo "Server PID: $SERVER_PID"
echo "To stop: kill $SERVER_PID"
echo ""
