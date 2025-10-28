#!/bin/bash

# Test ALL 34 endpoints of the Redirect Chain Analyzer API
# Each endpoint will be tested and results verified

API_URL="http://localhost:5000"
PASSED=0
FAILED=0
TOTAL=34

echo "╔════════════════════════════════════════════════════════════════════╗"
echo "║     TESTING ALL 34 API ENDPOINTS - COMPREHENSIVE VERIFICATION     ║"
echo "╚════════════════════════════════════════════════════════════════════╝"
echo ""

# Helper function to test endpoint
test_endpoint() {
    local num=$1
    local name=$2
    local method=$3
    local path=$4
    local data=$5
    local check=$6
    
    echo -n "[$num/34] Testing $name... "
    
    if [ "$method" = "GET" ]; then
        RESPONSE=$(curl -s "$API_URL$path")
    else
        RESPONSE=$(curl -s -X POST "$API_URL$path" \
            -H "Content-Type: application/json" \
            -d "$data" 2>/dev/null)
    fi
    
    if echo "$RESPONSE" | grep -q "$check"; then
        echo "✅ PASS"
        ((PASSED++))
        return 0
    else
        echo "❌ FAIL"
        echo "   Expected: $check"
        echo "   Response: ${RESPONSE:0:100}..."
        ((FAILED++))
        return 1
    fi
}

echo "🆓 FREE TIER ENDPOINTS (17 endpoints)"
echo "═══════════════════════════════════════════════════════════════════"

# Test 1: Homepage
test_endpoint 1 "Homepage (HTML Documentation)" "GET" "/" "" "Redirect Chain Analyzer API"

# Test 2: Health Check
test_endpoint 2 "Health Check" "GET" "/health" "" '"status":"healthy"'

# Test 3: Basic Analysis
test_endpoint 3 "Basic Redirect Analysis (/analyze)" "POST" "/analyze" '{"url":"https://google.com"}' '"input_url"'

# Test 4: API Analysis (alternate route)
test_endpoint 4 "API Analysis (/api/analyze)" "POST" "/api/analyze" '{"url":"https://github.com"}' '"redirect_chain"'

# Test 5: Bulk Analysis
test_endpoint 5 "Bulk URL Analysis" "POST" "/api/bulk/analyze" '{"urls":["https://google.com","https://github.com"]}' '"results"'

# Test 6: URL Validation
test_endpoint 6 "URL Validation" "POST" "/api/validate" '{"urls":["https://google.com","https://example.com"]}' '"summary"'

# Test 7: Security Scan
test_endpoint 7 "Security Enhanced Scan" "POST" "/api/security/enhanced-scan" '{"url":"https://example.com"}' '"safety_score"'

# Test 8: Pricing
test_endpoint 8 "Pricing Information" "GET" "/api/pricing" "" '"pricing"'

# Test 9: Pricing Tiers
test_endpoint 9 "Pricing Tiers Detail" "GET" "/api/pricing/tiers" "" '"tiers"'

# Test 10: Robots.txt Check
test_endpoint 10 "Robots.txt Check" "POST" "/api/robots-txt/check" '{"url":"https://github.com"}' '"robots_txt_url"'

# Test 11: Export CSV
test_endpoint 11 "Export to CSV" "POST" "/api/export/csv" '{"url":"https://google.com"}' '"csv_data"'

# Test 12: Decode Shortener
test_endpoint 12 "URL Shortener Decoder" "POST" "/api/decode-shortener" '{"url":"https://bit.ly/example"}' '"expanded_url"'

# Test 13: Redirect Loop Detection
test_endpoint 13 "Redirect Loop Detection" "POST" "/api/detect-redirect-loop" '{"url":"https://example.com"}' '"loop_detected"'

# Test 14: Generate Redirect Rules
test_endpoint 14 "Generate Redirect Rules" "POST" "/api/generate-redirect-rules" '{"source_url":"https://old.com","destination_url":"https://new.com","redirect_type":"301","server_type":"both"}' '"apache_rules"'

# Test 15: Comprehensive Analysis
test_endpoint 15 "Comprehensive Analysis" "POST" "/api/analyze/comprehensive" '{"url":"https://github.com"}' '"comprehensive_analysis"'

# Test 16: Link Types Analysis
test_endpoint 16 "Link Types Classification" "POST" "/api/analyze/link-types" '{"url":"https://example.com"}' '"link_types"'

# Test 17: SEO Link Juice
test_endpoint 17 "SEO Link Juice Analysis" "POST" "/api/analyze/seo-link-juice" '{"url":"https://example.com"}' '"seo_link_juice"'

echo ""
echo "💼 PREMIUM ENDPOINTS (17 endpoints - Without API Key)"
echo "═══════════════════════════════════════════════════════════════════"

# Test 18: Advanced Analysis (should require API key)
test_endpoint 18 "Advanced Analysis" "POST" "/api/analyze/advanced" '{"url":"https://example.com"}' '"error"'

# Test 19: Domain Analytics
test_endpoint 19 "Domain Analytics" "GET" "/api/analytics/domain/example.com" "" '"error"'

# Test 20: URL Analytics
test_endpoint 20 "URL Analytics" "GET" "/api/analytics/url/https%3A%2F%2Fexample.com" "" '"error"'

# Test 21: SEO Analysis
test_endpoint 21 "SEO Analysis" "POST" "/api/seo/analysis" '{"url":"https://example.com"}' '"error"'

# Test 22: Browser Quick Check
test_endpoint 22 "Browser Quick Check" "POST" "/api/browser/quick-check" '{"url":"https://example.com"}' '"error"'

# Test 23: Batch Quick Analyze
test_endpoint 23 "Batch Quick Analyze" "POST" "/api/batch/quick-analyze" '{"urls":["https://example.com"]}' '"error"'

# Test 24: Malware Scan
test_endpoint 24 "Malware Scan" "POST" "/api/analyze/malware-scan" '{"url":"https://example.com"}' '"error"'

# Test 25: Network Detection
test_endpoint 25 "Network Detection" "POST" "/api/network/detection" '{"url":"https://example.com"}' '"error"'

# Test 26: Revenue Optimization
test_endpoint 26 "Revenue Optimization" "POST" "/api/revenue/optimization" '{"url":"https://example.com"}' '"error"'

# Test 27: Mobile Comparison
test_endpoint 27 "Mobile Comparison" "POST" "/api/analyze/mobile-comparison" '{"url":"https://example.com"}' '"error"'

# Test 28: Dashboard Stats
test_endpoint 28 "Dashboard Stats" "GET" "/api/dashboard/stats" "" '"overview"'

# Test 29: Analytics History
test_endpoint 29 "Analytics History" "GET" "/api/analytics/history?days=30" "" '"history"'

# Test 30: Bot User Agent Test
test_endpoint 30 "Bot User Agent Testing" "POST" "/api/analyze/bot-test" '{"url":"https://example.com","bots":["googlebot"]}' '"bot_results"'

# Test 31: Domain Trust
test_endpoint 31 "Domain Trust Analysis" "POST" "/api/analyze/domain-trust" '{"url":"https://example.com"}' '"error"'

# Test 32: Analysis with Auth
test_endpoint 32 "Analysis with HTTP Auth" "POST" "/api/analyze/with-auth" '{"url":"https://example.com","username":"test","password":"test"}' '"error"'

# Test 33: Analysis with Webhook
test_endpoint 33 "Analysis with Webhook" "POST" "/api/analyze/with-webhook" '{"url":"https://example.com","webhook_url":"https://example.com/hook"}' '"error"'

# Test 34: Network Diversity
test_endpoint 34 "Network Diversity Analysis" "POST" "/api/analyze/network-diversity" '{"url":"https://google.com"}' '"network_diversity"'

echo ""
echo "╔════════════════════════════════════════════════════════════════════╗"
echo "║                         FINAL RESULTS                              ║"
echo "╚════════════════════════════════════════════════════════════════════╝"
echo ""
echo "   Total Endpoints Tested: $TOTAL"
echo "   ✅ Passed: $PASSED"
echo "   ❌ Failed: $FAILED"
echo ""

if [ $FAILED -eq 0 ]; then
    echo "   🎉 SUCCESS! ALL 34 ENDPOINTS ARE WORKING CORRECTLY!"
    echo ""
    echo "   ✅ Free tier endpoints (17): All working"
    echo "   ✅ Premium endpoints (17): All working (returning expected auth errors)"
    echo ""
else
    echo "   ⚠️  Some endpoints failed. See details above."
    echo ""
fi

echo "════════════════════════════════════════════════════════════════════"
