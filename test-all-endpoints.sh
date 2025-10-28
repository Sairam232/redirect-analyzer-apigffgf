#!/bin/bash

echo "==============================================="
echo "Testing All 25 API Endpoints"
echo "==============================================="
echo ""

# Test counter
SUCCESS=0
FAIL=0

# Helper function to test endpoint
test_endpoint() {
    local name="$1"
    local method="$2"
    local path="$3"
    local data="$4"
    
    echo -n "Testing $name ... "
    
    if [ "$method" = "GET" ]; then
        response=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:5000$path")
    else
        response=$(curl -s -o /dev/null -w "%{http_code}" -X POST -H "Content-Type: application/json" -d "$data" "http://localhost:5000$path")
    fi
    
    if [ "$response" = "200" ] || [ "$response" = "201" ]; then
        echo "✅ WORKING (HTTP $response)"
        ((SUCCESS++))
    else
        echo "❌ FAILED (HTTP $response)"
        ((FAIL++))
    fi
}

# Test all endpoints
test_endpoint "1. GET /" "GET" "/" ""
test_endpoint "2. GET /health" "GET" "/health" ""
test_endpoint "3. POST /analyze" "POST" "/analyze" '{"url":"https://google.com"}'
test_endpoint "4. POST /api/analyze" "POST" "/api/analyze" '{"url":"https://google.com"}'
test_endpoint "5. POST /api/bulk/analyze" "POST" "/api/bulk/analyze" '{"urls":["https://google.com","https://github.com"]}'
test_endpoint "6. POST /api/validate" "POST" "/api/validate" '{"urls":["https://google.com"]}'
test_endpoint "7. POST /api/security/enhanced-scan" "POST" "/api/security/enhanced-scan" '{"url":"https://google.com"}'
test_endpoint "8. POST /api/analyze/bot-test" "POST" "/api/analyze/bot-test" '{"url":"https://google.com"}'
test_endpoint "9. POST /api/robots-txt/check" "POST" "/api/robots-txt/check" '{"url":"https://google.com"}'
test_endpoint "10. POST /api/export/csv" "POST" "/api/export/csv" '{"url":"https://google.com"}'
test_endpoint "11. POST /api/decode-shortener" "POST" "/api/decode-shortener" '{"url":"https://bit.ly/test"}'
test_endpoint "12. POST /api/detect-redirect-loop" "POST" "/api/detect-redirect-loop" '{"url":"https://google.com"}'
test_endpoint "13. POST /api/generate-redirect-rules" "POST" "/api/generate-redirect-rules" '{"source_url":"https://old.com/page","destination_url":"https://new.com/page"}'
test_endpoint "14. POST /api/analyze/with-auth" "POST" "/api/analyze/with-auth" '{"url":"https://google.com"}'
test_endpoint "15. POST /api/analyze/with-webhook" "POST" "/api/analyze/with-webhook" '{"url":"https://google.com","webhook_url":"https://webhook.site/test"}'
test_endpoint "16. POST /api/analyze/comprehensive" "POST" "/api/analyze/comprehensive" '{"url":"https://google.com"}'
test_endpoint "17. POST /api/analyze/link-types" "POST" "/api/analyze/link-types" '{"url":"https://google.com"}'
test_endpoint "18. POST /api/analyze/network-diversity" "POST" "/api/analyze/network-diversity" '{"url":"https://google.com"}'
test_endpoint "19. POST /api/analyze/advanced" "POST" "/api/analyze/advanced" '{"url":"https://google.com"}'
test_endpoint "20. POST /api/seo/analysis" "POST" "/api/seo/analysis" '{"url":"https://google.com"}'
test_endpoint "21. POST /api/browser/quick-check" "POST" "/api/browser/quick-check" '{"url":"https://google.com"}'
test_endpoint "22. POST /api/batch/quick-analyze" "POST" "/api/batch/quick-analyze" '{"urls":["https://google.com"]}'
test_endpoint "23. POST /api/network/detection" "POST" "/api/network/detection" '{"url":"https://google.com"}'
test_endpoint "24. POST /api/revenue/optimization" "POST" "/api/revenue/optimization" '{"url":"https://google.com"}'

echo ""
echo -n "Testing 25. POST /api/analyze/mobile-comparison (Premium) ... "
response=$(curl -s -o /dev/null -w "%{http_code}" -X POST -H "Content-Type: application/json" -d '{"url":"https://google.com"}' "http://localhost:5000/api/analyze/mobile-comparison")
if [ "$response" = "401" ]; then
    echo "✅ WORKING (HTTP $response - API key required as expected)"
    ((SUCCESS++))
else
    echo "❌ UNEXPECTED RESPONSE (HTTP $response)"
    ((FAIL++))
fi

echo ""
echo "==============================================="
echo "Test Results Summary"
echo "==============================================="
echo "Total Endpoints: 25"
echo "✅ Working: $SUCCESS"
echo "❌ Failed: $FAIL"
echo "==============================================="
