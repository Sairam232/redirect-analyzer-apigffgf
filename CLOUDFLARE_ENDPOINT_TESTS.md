# 🧪 Cloudflare Workers API - Endpoint Test Examples

## ✅ **ALL 34 ENDPOINTS - CURL TEST COMMANDS**

Replace `YOUR-API-URL` with your actual Cloudflare Workers URL:  
`https://redirect-analyzer-api.YOUR-SUBDOMAIN.workers.dev`

---

## 🆓 **FREE TIER ENDPOINTS (17 Tests)**

### **Test 1: Homepage / Documentation**
```bash
curl https://YOUR-API-URL/
# Expected: HTML documentation page
```

### **Test 2: Health Check**
```bash
curl https://YOUR-API-URL/health | jq .
# Expected:
# {
#   "status": "healthy",
#   "version": "2.0.0",
#   "platform": "Cloudflare Workers",
#   "endpoints_available": 34
# }
```

### **Test 3: Basic Redirect Analysis**
```bash
curl -X POST https://YOUR-API-URL/analyze \
  -H "Content-Type: application/json" \
  -d '{"url": "https://bit.ly/3vZ8YzL"}' | jq .
# Expected: Full redirect chain analysis with performance metrics
```

### **Test 4: Bulk URL Analysis**
```bash
curl -X POST https://YOUR-API-URL/api/bulk/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "urls": [
      "https://github.com",
      "https://google.com",
      "https://example.com"
    ]
  }' | jq .
# Expected: Analysis results for all 3 URLs
```

### **Test 5: URL Validation**
```bash
curl -X POST https://YOUR-API-URL/api/validate \
  -H "Content-Type: application/json" \
  -d '{
    "urls": [
      "https://google.com",
      "https://invalid-url-12345.com",
      "https://github.com"
    ]
  }' | jq .
# Expected: Accessibility status for each URL
```

### **Test 6: Security Scan**
```bash
curl -X POST https://YOUR-API-URL/api/security/enhanced-scan \
  -H "Content-Type: application/json" \
  -d '{"url": "https://bit.ly/example"}' | jq .
# Expected: Security analysis with safety score and threat level
```

### **Test 7: Pricing Information**
```bash
curl https://YOUR-API-URL/api/pricing | jq .
# Expected: Pricing tiers (Free, Professional, Enterprise)
```

### **Test 8: Pricing Tiers Detail**
```bash
curl https://YOUR-API-URL/api/pricing/tiers | jq .
# Expected: Detailed pricing with features list
```

### **Test 9: Robots.txt Check**
```bash
curl -X POST https://YOUR-API-URL/api/robots-txt/check \
  -H "Content-Type: application/json" \
  -d '{"url": "https://github.com"}' | jq .
# Expected: robots.txt content and accessibility status
```

### **Test 10: Export to CSV**
```bash
curl -X POST https://YOUR-API-URL/api/export/csv \
  -H "Content-Type: application/json" \
  -d '{"url": "https://google.com"}' | jq .
# Expected: CSV formatted redirect chain data
```

### **Test 11: Decode URL Shortener**
```bash
curl -X POST https://YOUR-API-URL/api/decode-shortener \
  -H "Content-Type: application/json" \
  -d '{"url": "https://bit.ly/example"}' | jq .
# Expected: Expanded URL and shortener service identification
```

### **Test 12: Detect Redirect Loop**
```bash
curl -X POST https://YOUR-API-URL/api/detect-redirect-loop \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}' | jq .
# Expected: Loop detection result with chain analysis
```

### **Test 13: Generate Redirect Rules**
```bash
curl -X POST https://YOUR-API-URL/api/generate-redirect-rules \
  -H "Content-Type: application/json" \
  -d '{
    "source_url": "https://old.example.com/page",
    "destination_url": "https://new.example.com/page",
    "redirect_type": "301",
    "server_type": "both"
  }' | jq .
# Expected: Apache and Nginx redirect rules
```

### **Test 14: Comprehensive Analysis**
```bash
curl -X POST https://YOUR-API-URL/api/analyze/comprehensive \
  -H "Content-Type: application/json" \
  -d '{"url": "https://github.com"}' | jq .
# Expected: Complete analysis with all metrics
```

### **Test 15: Link Type Classification**
```bash
curl -X POST https://YOUR-API-URL/api/analyze/link-types \
  -H "Content-Type: application/json" \
  -d '{"url": "https://amazon.com/dp/B08XYZ?tag=example-20"}' | jq .
# Expected: Link type (affiliate, tracking, standard)
```

### **Test 16: SEO Link Juice Analysis**
```bash
curl -X POST https://YOUR-API-URL/api/analyze/seo-link-juice \
  -H "Content-Type: application/json" \
  -d '{"url": "https://bit.ly/example"}' | jq .
# Expected: Link juice score and SEO grade (A/B/C/D)
```

### **Test 17: Network Diversity Analysis**
```bash
curl -X POST https://YOUR-API-URL/api/analyze/network-diversity \
  -H "Content-Type: application/json" \
  -d '{"url": "https://google.com"}' | jq .
# Expected: Cross-domain redirect analysis
```

---

## 💼 **PREMIUM ENDPOINTS (17 Tests - Require API Key)**

Add API key to all premium requests:
```bash
-H "X-API-Key: YOUR_API_KEY_HERE"
```

### **Test 18: Advanced Analysis**
```bash
curl -X POST https://YOUR-API-URL/api/analyze/advanced \
  -H "Content-Type: application/json" \
  -H "X-API-Key: YOUR_API_KEY" \
  -d '{"url": "https://example.com"}' | jq .
# Expected: Advanced metrics and deep analysis
```

### **Test 19: Domain Analytics**
```bash
curl https://YOUR-API-URL/api/analytics/domain/example.com \
  -H "X-API-Key: YOUR_API_KEY" | jq .
# Expected: Historical analytics for domain
```

### **Test 20: URL Analytics**
```bash
curl https://YOUR-API-URL/api/analytics/url/https%3A%2F%2Fexample.com \
  -H "X-API-Key: YOUR_API_KEY" | jq .
# Expected: Historical analytics for specific URL
```

### **Test 21: SEO Analysis**
```bash
curl -X POST https://YOUR-API-URL/api/seo/analysis \
  -H "Content-Type: application/json" \
  -H "X-API-Key: YOUR_API_KEY" \
  -d '{"url": "https://example.com"}' | jq .
# Expected: SEO impact analysis of redirects
```

### **Test 22: Browser Quick Check**
```bash
curl -X POST https://YOUR-API-URL/api/browser/quick-check \
  -H "Content-Type: application/json" \
  -H "X-API-Key: YOUR_API_KEY" \
  -d '{"url": "https://example.com"}' | jq .
# Expected: Browser compatibility results
```

### **Test 23: Batch Quick Analyze (Premium)**
```bash
curl -X POST https://YOUR-API-URL/api/batch/quick-analyze \
  -H "Content-Type: application/json" \
  -H "X-API-Key: YOUR_API_KEY" \
  -d '{
    "urls": ["https://url1.com", "https://url2.com", "...up to 50"]
  }' | jq .
# Expected: Fast analysis of up to 50 URLs
```

### **Test 24: Malware Scan**
```bash
curl -X POST https://YOUR-API-URL/api/analyze/malware-scan \
  -H "Content-Type: application/json" \
  -H "X-API-Key: YOUR_API_KEY" \
  -d '{"url": "https://example.com"}' | jq .
# Expected: Malware and threat detection results
```

### **Test 25: Network Detection (CDN Identification)**
```bash
curl -X POST https://YOUR-API-URL/api/network/detection \
  -H "Content-Type: application/json" \
  -H "X-API-Key: YOUR_API_KEY" \
  -d '{"url": "https://cloudflare.com"}' | jq .
# Expected: CDN provider and network information
```

### **Test 26: Revenue Optimization**
```bash
curl -X POST https://YOUR-API-URL/api/revenue/optimization \
  -H "Content-Type: application/json" \
  -H "X-API-Key: YOUR_API_KEY" \
  -d '{"url": "https://example.com"}' | jq .
# Expected: Performance optimization recommendations
```

### **Test 27: Mobile vs Desktop Comparison**
```bash
curl -X POST https://YOUR-API-URL/api/analyze/mobile-comparison \
  -H "Content-Type: application/json" \
  -H "X-API-Key: YOUR_API_KEY" \
  -d '{"url": "https://example.com"}' | jq .
# Expected: Redirect differences between mobile and desktop
```

### **Test 28: Dashboard Stats**
```bash
curl https://YOUR-API-URL/api/dashboard/stats \
  -H "X-API-Key: YOUR_API_KEY" | jq .
# Expected: Usage statistics and limits
```

### **Test 29: Analytics History**
```bash
curl https://YOUR-API-URL/api/analytics/history?days=30 \
  -H "X-API-Key: YOUR_API_KEY" | jq .
# Expected: 30-day analytics history
```

### **Test 30: Bot User Agent Testing**
```bash
curl -X POST https://YOUR-API-URL/api/analyze/bot-test \
  -H "Content-Type: application/json" \
  -H "X-API-Key: YOUR_API_KEY" \
  -d '{
    "url": "https://example.com",
    "bots": ["googlebot", "bingbot", "facebookbot"]
  }' | jq .
# Expected: URL behavior for different bot user agents
```

### **Test 31: Domain Trust Analysis**
```bash
curl -X POST https://YOUR-API-URL/api/analyze/domain-trust \
  -H "Content-Type: application/json" \
  -H "X-API-Key: YOUR_API_KEY" \
  -d '{"url": "https://example.com"}' | jq .
# Expected: Domain trust score and reputation
```

### **Test 32: Analysis with HTTP Auth**
```bash
curl -X POST https://YOUR-API-URL/api/analyze/with-auth \
  -H "Content-Type: application/json" \
  -H "X-API-Key: YOUR_API_KEY" \
  -d '{
    "url": "https://protected.example.com",
    "username": "testuser",
    "password": "testpass"
  }' | jq .
# Expected: Analysis of password-protected URLs
```

### **Test 33: Analysis with Webhook**
```bash
curl -X POST https://YOUR-API-URL/api/analyze/with-webhook \
  -H "Content-Type: application/json" \
  -H "X-API-Key: YOUR_API_KEY" \
  -d '{
    "url": "https://example.com",
    "webhook_url": "https://your-webhook.com/callback"
  }' | jq .
# Expected: Analysis with async webhook callback
```

### **Test 34: Network Diversity (Premium)**
```bash
curl -X POST https://YOUR-API-URL/api/analyze/network-diversity \
  -H "Content-Type: application/json" \
  -H "X-API-Key: YOUR_API_KEY" \
  -d '{"url": "https://example.com"}' | jq .
# Expected: Network diversity metrics
```

---

## 🔐 **RATE LIMITING TESTS**

### **Test Rate Limit (Free Tier)**
```bash
# Make 101 requests to exceed free tier limit
for i in {1..101}; do
  curl -X POST https://YOUR-API-URL/analyze \
    -H "Content-Type: application/json" \
    -d '{"url": "https://example.com"}' \
    -o /dev/null -w "Request $i: %{http_code}\n"
done
# Expected: First 100 return 200, 101st returns 429 (Rate Limit Exceeded)
```

### **Test Invalid API Key**
```bash
curl -X POST https://YOUR-API-URL/api/analyze/advanced \
  -H "Content-Type: application/json" \
  -H "X-API-Key: invalid-key-12345" \
  -d '{"url": "https://example.com"}' | jq .
# Expected: 401 Unauthorized with error message
```

---

## 🛡️ **SECURITY TESTS**

### **Test SSRF Protection - Localhost**
```bash
curl -X POST https://YOUR-API-URL/analyze \
  -H "Content-Type: application/json" \
  -d '{"url": "http://localhost:8080"}' | jq .
# Expected: 400 Bad Request - "Access to localhost not allowed"
```

### **Test SSRF Protection - Private IP**
```bash
curl -X POST https://YOUR-API-URL/analyze \
  -H "Content-Type: application/json" \
  -d '{"url": "http://192.168.1.1"}' | jq .
# Expected: 400 Bad Request - "Private/reserved IP address not allowed"
```

### **Test SSRF Protection - Cloud Metadata**
```bash
curl -X POST https://YOUR-API-URL/analyze \
  -H "Content-Type: application/json" \
  -d '{"url": "http://169.254.169.254/metadata"}' | jq .
# Expected: 400 Bad Request - "Private/reserved IP address not allowed"
```

### **Test Invalid URL Scheme**
```bash
curl -X POST https://YOUR-API-URL/analyze \
  -H "Content-Type: application/json" \
  -d '{"url": "ftp://example.com"}' | jq .
# Expected: 400 Bad Request - "Only HTTP/HTTPS schemes allowed"
```

---

## 📊 **AUTOMATED TEST SCRIPT**

Save as `test-all-endpoints.sh`:

```bash
#!/bin/bash

API_URL="https://YOUR-API-URL"
PASSED=0
FAILED=0

echo "🧪 Testing Cloudflare Workers API - All Endpoints"
echo "=================================================="

# Test 1: Health Check
echo -n "Test 1: Health Check... "
RESPONSE=$(curl -s "$API_URL/health")
if echo "$RESPONSE" | grep -q '"status":"healthy"'; then
  echo "✅ PASSED"
  ((PASSED++))
else
  echo "❌ FAILED"
  ((FAILED++))
fi

# Test 2: Basic Analysis
echo -n "Test 2: Basic Analysis... "
RESPONSE=$(curl -s -X POST "$API_URL/analyze" \
  -H "Content-Type: application/json" \
  -d '{"url":"https://google.com"}')
if echo "$RESPONSE" | grep -q '"input_url"'; then
  echo "✅ PASSED"
  ((PASSED++))
else
  echo "❌ FAILED"
  ((FAILED++))
fi

# Test 3: Bulk Analysis
echo -n "Test 3: Bulk Analysis... "
RESPONSE=$(curl -s -X POST "$API_URL/api/bulk/analyze" \
  -H "Content-Type: application/json" \
  -d '{"urls":["https://github.com","https://google.com"]}')
if echo "$RESPONSE" | grep -q '"results"'; then
  echo "✅ PASSED"
  ((PASSED++))
else
  echo "❌ FAILED"
  ((FAILED++))
fi

# Test 4: URL Validation
echo -n "Test 4: URL Validation... "
RESPONSE=$(curl -s -X POST "$API_URL/api/validate" \
  -H "Content-Type: application/json" \
  -d '{"urls":["https://google.com"]}')
if echo "$RESPONSE" | grep -q '"summary"'; then
  echo "✅ PASSED"
  ((PASSED++))
else
  echo "❌ FAILED"
  ((FAILED++))
fi

# Test 5: Security Scan
echo -n "Test 5: Security Scan... "
RESPONSE=$(curl -s -X POST "$API_URL/api/security/enhanced-scan" \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com"}')
if echo "$RESPONSE" | grep -q '"safety_score"'; then
  echo "✅ PASSED"
  ((PASSED++))
else
  echo "❌ FAILED"
  ((FAILED++))
fi

# Test 6: SSRF Protection
echo -n "Test 6: SSRF Protection... "
RESPONSE=$(curl -s -X POST "$API_URL/analyze" \
  -H "Content-Type: application/json" \
  -d '{"url":"http://localhost"}')
if echo "$RESPONSE" | grep -q '"error"'; then
  echo "✅ PASSED"
  ((PASSED++))
else
  echo "❌ FAILED"
  ((FAILED++))
fi

echo ""
echo "=================================================="
echo "Test Results: $PASSED passed, $FAILED failed"
echo "=================================================="
```

Make executable: `chmod +x test-all-endpoints.sh`
Run: `./test-all-endpoints.sh`

---

## ✅ **EXPECTED RESULTS**

All free tier endpoints should return:
- **Status 200**: Successful request
- **JSON Response**: Properly formatted JSON
- **Rate Limiting**: After 100 requests, returns 429

All premium endpoints without API key should return:
- **Status 401**: Unauthorized
- **Error Message**: "API key required"

Security tests should return:
- **Status 400**: Bad Request
- **Error Message**: Specific SSRF protection message

---

**Test Date**: October 19, 2025  
**Total Endpoints**: 34  
**Free Tier**: 17 endpoints  
**Premium Tier**: 17 endpoints  
**All Tests**: Ready to run after deployment
