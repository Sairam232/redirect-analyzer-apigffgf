#!/bin/bash

echo "======================================================================="
echo "Comprehensive API Endpoint Test - All 25 Endpoints"
echo "======================================================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

SUCCESS=0
FAIL=0

test_endpoint() {
    local num="$1"
    local name="$2"
    local method="$3"
    local path="$4"
    local data="$5"
    
    printf "${num}. %-50s " "$name"
    
    if [ "$method" = "GET" ]; then
        response=$(curl -s -w "\n%{http_code}" "http://localhost:5000$path" 2>&1)
    else
        response=$(curl -s -w "\n%{http_code}" -X POST \
            -H "Content-Type: application/json" \
            -d "$data" \
            "http://localhost:5000$path" 2>&1)
    fi
    
    http_code=$(echo "$response" | tail -n 1)
    
    if [ "$http_code" = "200" ] || [ "$http_code" = "201" ]; then
        printf "${GREEN}✅ WORKING${NC} (HTTP $http_code)\n"
        ((SUCCESS++))
    elif [ "$http_code" = "401" ] && [ "$num" = "25" ]; then
        printf "${GREEN}✅ WORKING${NC} (HTTP $http_code - Auth required)\n"
        ((SUCCESS++))
    else
        printf "${RED}❌ FAILED${NC} (HTTP $http_code)\n"
        ((FAIL++))
    fi
}

echo "FREE TIER ENDPOINTS (24 endpoints)"
echo "-------------------------------------------------------------------"
test_endpoint "1" "GET /" "GET" "/" ""
test_endpoint "2" "GET /health" "GET" "/health" ""
test_endpoint "3" "POST /analyze" "POST" "/analyze" '{"url":"https://google.com"}'
test_endpoint "4" "POST /api/analyze" "POST" "/api/analyze" '{"url":"https://google.com"}'
test_endpoint "5" "POST /api/bulk/analyze" "POST" "/api/bulk/analyze" '{"urls":["https://google.com"]}'
test_endpoint "6" "POST /api/validate" "POST" "/api/validate" '{"urls":["https://google.com"]}'
test_endpoint "7" "POST /api/security/enhanced-scan" "POST" "/api/security/enhanced-scan" '{"url":"https://google.com"}'
test_endpoint "8" "POST /api/analyze/bot-test" "POST" "/api/analyze/bot-test" '{"url":"https://google.com"}'
test_endpoint "9" "POST /api/robots-txt/check" "POST" "/api/robots-txt/check" '{"url":"https://google.com"}'
test_endpoint "10" "POST /api/export/csv" "POST" "/api/export/csv" '{"url":"https://google.com"}'
test_endpoint "11" "POST /api/decode-shortener" "POST" "/api/decode-shortener" '{"url":"https://bit.ly/test"}'
test_endpoint "12" "POST /api/detect-redirect-loop" "POST" "/api/detect-redirect-loop" '{"url":"https://google.com"}'
test_endpoint "13" "POST /api/generate-redirect-rules" "POST" "/api/generate-redirect-rules" '{"source_url":"https://old.com/page","destination_url":"https://new.com/page"}'
test_endpoint "14" "POST /api/analyze/with-auth" "POST" "/api/analyze/with-auth" '{"url":"https://google.com"}'
test_endpoint "15" "POST /api/analyze/with-webhook" "POST" "/api/analyze/with-webhook" '{"url":"https://google.com","webhook_url":"https://webhook.site/test"}'
test_endpoint "16" "POST /api/analyze/comprehensive" "POST" "/api/analyze/comprehensive" '{"url":"https://google.com"}'
test_endpoint "17" "POST /api/analyze/link-types" "POST" "/api/analyze/link-types" '{"url":"https://google.com"}'
test_endpoint "18" "POST /api/analyze/network-diversity" "POST" "/api/analyze/network-diversity" '{"url":"https://google.com"}'
test_endpoint "19" "POST /api/analyze/advanced" "POST" "/api/analyze/advanced" '{"url":"https://google.com"}'
test_endpoint "20" "POST /api/seo/analysis" "POST" "/api/seo/analysis" '{"url":"https://google.com"}'
test_endpoint "21" "POST /api/browser/quick-check" "POST" "/api/browser/quick-check" '{"url":"https://google.com"}'
test_endpoint "22" "POST /api/batch/quick-analyze" "POST" "/api/batch/quick-analyze" '{"urls":["https://google.com"]}'
test_endpoint "23" "POST /api/network/detection" "POST" "/api/network/detection" '{"url":"https://google.com"}'
test_endpoint "24" "POST /api/revenue/optimization" "POST" "/api/revenue/optimization" '{"url":"https://google.com"}'

echo ""
echo "PREMIUM ENDPOINT (1 endpoint - Requires API Key)"
echo "-------------------------------------------------------------------"
test_endpoint "25" "POST /api/analyze/mobile-comparison" "POST" "/api/analyze/mobile-comparison" '{"url":"https://google.com"}'

echo ""
echo "======================================================================="
echo "                         FINAL RESULTS"
echo "======================================================================="
echo "Total Endpoints Tested:    25"
echo "✅ Working Correctly:       $SUCCESS"
echo "❌ Failed:                  $FAIL"
if [ $FAIL -eq 0 ]; then
    echo ""
    printf "${GREEN}SUCCESS: All 25 endpoints are working correctly!${NC}\n"
else
    echo ""
    printf "${RED}WARNING: $FAIL endpoint(s) failed the test${NC}\n"
fi
echo "======================================================================="
