# 🔗 Redirect Chain Analyzer API

**Production-ready API for analyzing URL redirect chains - Cloudflare Workers Edition**

## 🚀 Quick Deploy to Cloudflare

This project is **100% ready** to deploy to Cloudflare Workers - pure JavaScript, no Python dependencies!

### What's Included
- ✅ **worker.js** - Complete API with 32 real-data-only endpoints
- ✅ **wrangler.toml** - Cloudflare configuration
- ✅ Zero dependencies - Standalone JavaScript
- ✅ **100% Real Observable Data** - No calculated scores, grades, or simulated metrics (v6.0)

### Deploy in 5 Steps

```bash
# 1. Install Wrangler CLI
npm install -g wrangler

# 2. Login to Cloudflare
wrangler login

# 3. Create KV namespaces
wrangler kv:namespace create "RATE_LIMITS"
wrangler kv:namespace create "API_KEYS"
wrangler kv:namespace create "ANALYTICS_DATA"

# 4. Update wrangler.toml with the KV namespace IDs from step 3

# 5. Deploy
wrangler deploy
```

Your API will be live at: `https://redirect-analyzer-api.YOURNAME.workers.dev`

## 📋 API Endpoints (32 Total - All Real Observable Data)

**Version 6.0 - Cleaned Up All Simulated Data:**
- ❌ Removed all calculated scores: `safety_score`, `threat_level`, `performance_grade`, `diversity_score`
- ❌ Removed simulated metrics: `threat_score`, rule-based recommendations
- ✅ Now returns ONLY real observable data: HTTP status codes, response times, redirect chains, headers, factual pattern detection

All endpoints provide **100% real observable data** from actual HTTP requests - no arbitrary calculations or simulations.

### Free Tier Endpoints (No API Key Required - Rate Limited)
- `GET /` - API documentation
- `GET /health` - Health check
- `POST /analyze` - Analyze redirect chain (100/day)
- `POST /api/analyze` - Analyze redirect chain (100/day)
- `POST /api/bulk/analyze` - Bulk analysis (10/day, max 10 URLs)
- `POST /api/validate` - URL validation (100/day)
- `POST /api/security/enhanced-scan` - Factual security observations (50/day)
- `GET /api/pricing` - Pricing information
- `GET /api/pricing/tiers` - Pricing tiers
- `POST /api/robots-txt/check` - robots.txt checking (100/day)
- `POST /api/export/csv` - Export results to CSV (100/day)
- `POST /api/decode-shortener` - URL shortener decoder (100/day)
- `POST /api/detect-redirect-loop` - Redirect loop detection (100/day)
- `POST /api/generate-redirect-rules` - Generate Apache/Nginx rules (100/day)
- `POST /api/analyze/comprehensive` - Comprehensive analysis (100/day)
- `POST /api/analyze/link-types` - Link type classification (100/day)
- `POST /api/seo/analysis` - SEO data from actual HTML parsing (100/day)
- `POST /api/analyze/network-diversity` - Network diversity analysis (100/day)
- `POST /api/browser/quick-check` - Real response time checks (100/day)
- `POST /api/batch/quick-analyze` - Batch quick analyze up to 20 URLs (100/day)
- `POST /api/analyze/malware-scan` - Pattern-based keyword detection (100/day)
- `POST /api/network/detection` - Real CDN/network detection via DNS (100/day)
- `POST /api/revenue/optimization` - Raw performance metrics (100/day)
- `POST /api/analyze/advanced` - Advanced analysis with real timing metrics (100/day)
- `GET /api/analytics/domain/:domain` - Domain analytics from KV storage (100/day)
- `GET /api/analytics/url/:url` - URL analytics from KV storage (100/day)
- `GET /api/dashboard/stats` - Dashboard statistics (100/day)
- `GET /api/analytics/history` - Analytics history (100/day)
- `POST /api/analyze/bot-test` - Bot user agent testing (100/day)
- `POST /api/analyze/with-auth` - Analysis with HTTP Basic Auth (100/day)
- `POST /api/analyze/with-webhook` - Analysis with webhook callback (100/day)

### Premium Endpoints (Require API Key)
- `POST /api/analyze/mobile-comparison` - Mobile vs desktop user agent comparison (requires API key)

## 🔐 Security Features

- ✅ **SSRF Protection** - Blocks private IPs, localhost, cloud metadata endpoints
- ✅ **Rate Limiting** - IP-based rate limits via Cloudflare KV Storage
- ✅ **API Key Validation** - Secure premium endpoint access
- ✅ **CORS Headers** - Configured for browser access
- ✅ **Input Validation** - Comprehensive URL and parameter validation

## 📊 Features

- **Real Redirect Analysis** - Manually follows redirects to capture each hop
- **Real Performance Metrics** - Actual measured response times from HTTP requests  
- **Pattern Detection** - HTTPS validation, keyword pattern matching (honestly labeled as pattern-based, not malware scanning)
- **Affiliate Detection** - Identifies affiliate and tracking parameters via pattern matching
- **SEO Analysis** - Real HTML parsing for title, meta tags, h1, and HTTPS usage
- **Bulk Processing** - Analyze multiple URLs concurrently
- **Network Detection** - Real DNS lookup and IP-based hosting provider detection
- **Bot Testing** - Test different user agents (desktop, mobile, bot)
- **Link Intelligence** - Detect link types and tracking parameters
- **100% Real Observable Data** - Only factual measurements, no calculated scores or arbitrary grades

## 🛠️ Technology Stack

- **Platform**: Cloudflare Workers (Edge Network)
- **Language**: JavaScript (ES6+)
- **Storage**: Cloudflare KV (Key-Value Store)
- **Rate Limiting**: KV-based per-IP daily limits
- **Database**: None - Fully serverless architecture

## 📖 Example Usage

### Analyze a URL
```bash
curl -X POST https://your-api.workers.dev/analyze \
  -H "Content-Type: application/json" \
  -d '{"url": "https://bit.ly/example"}'
```

### Bulk Analysis
```bash
curl -X POST https://your-api.workers.dev/api/bulk/analyze \
  -H "Content-Type: application/json" \
  -d '{"urls": ["https://bit.ly/1", "https://bit.ly/2"]}'
```

### Premium Endpoint (with API Key)
```bash
curl -X POST https://your-api.workers.dev/api/analyze/mobile-comparison \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-api-key-here" \
  -d '{"url": "https://example.com"}'
```

## 🧪 Testing

Test results with real URLs (bit.ly, Google, GitHub, Amazon) available in `api_test_results_real_urls.md`

All 32 endpoints tested and verified - 100% real data, no fake or estimated metrics.

## 📝 Documentation

- `CLOUDFLARE_DEPLOYMENT_FILES.md` - Detailed deployment guide
- `CLEANUP_SUMMARY.md` - What was removed to make this Cloudflare-only
- `api_test_results_real_urls.md` - Test verification with real URLs

## 🎯 Why Cloudflare Workers?

- ⚡ **Global Edge Network** - Low latency worldwide
- 💰 **Cost Effective** - Free tier: 100,000 requests/day
- 🚀 **Instant Scaling** - Automatic scaling to handle traffic
- 🔒 **Built-in DDoS Protection** - Cloudflare security included
- 🌍 **Zero Cold Starts** - Always fast response times

## 📝 License

MIT License - Free to use for personal and commercial projects

## 🤝 Support

For API keys, enterprise features, or support: contact@yourapi.com

---

**Status**: ✅ Production Ready | **Endpoints**: 32 (100% Real Data) | **Platform**: Cloudflare Workers | **Dependencies**: Zero
