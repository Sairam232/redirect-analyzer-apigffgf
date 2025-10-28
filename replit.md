# Redirect Chain Analyzer API

## Overview
The Redirect Chain Analyzer API is a production-ready web service designed for detailed analysis of URL redirect chains, deployed exclusively on Cloudflare Workers. It serves as a monetizable SaaS product, offering rate limiting and real-time redirect analysis. The system manually traces redirects to capture each step, providing comprehensive insights based solely on actual HTTP/DNS requests. The platform runs 100% on Cloudflare's global edge network using only JavaScript, with no Python dependencies. It is fully compatible with RapidAPI, supporting a wide array of free and premium features for diverse user needs. All fake/simulated features have been removed in v8.0.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Platform
- **Deployment**: Cloudflare Workers (Edge Network)
- **Language**: JavaScript (ES6+)
- **Storage**: Cloudflare KV Storage (Key-Value)
- **No Database**: Fully serverless, no SQLite or PostgreSQL
- **No Python**: Pure JavaScript implementation

### UI/UX Decisions
The API focuses on backend services, with UI/UX considerations primarily for the documentation and potential future integrations.

### Technical Implementations
- **Framework**: Native Cloudflare Workers fetch API with JavaScript routing
- **Redirect Analysis**: Manual following of redirects using native `fetch` with `redirect: 'manual'` to capture detailed hop-by-hop information
- **Real Data Only**: All endpoints return only observable data from actual HTTP/DNS requests
- **Analytics Engine**: Tracks URL analysis via Cloudflare KV Storage with real performance data
- **Bulk Processing**: Concurrent processing of multiple URLs using Promise.all() for parallel analysis
- **API Key System**: Multi-tier system using KV Storage for monetization, feature gating, usage analytics, and rate limiting
- **Cloudflare Workers**: All 31 API endpoints implemented in worker.js, ensuring global low-latency performance and serverless scalability
- **RapidAPI Compatibility**: All premium features are fully compatible with RapidAPI, supporting HTTP Basic Auth, webhook notifications, and white-label options
- **Competitive Features**: URL shortener decoding, redirect loop detection, and redirect rule generation (Apache/Nginx)
- **Data Authenticity**: Uses real, measurable data from actual redirect chains. No pattern-based guessing, fake detection, or simulated metrics.

### System Design Choices
- **Stateless Design**: Ensures horizontal scalability and easy integration with platforms like RapidAPI
- **Monetization Architecture**: Built-in KV-based rate limiting, usage analytics, and tier-based pricing structure
- **Security**: SSRF protection blocking private IPs, localhost, and cloud metadata endpoints
- **Edge Network**: Deployed globally on Cloudflare's edge for low latency worldwide
- **Zero Dependencies**: No external npm packages, fully self-contained in worker.js

## Technical Stack

### Runtime & Platform
- **Cloudflare Workers**: V8 JavaScript engine running on Cloudflare's edge network
- **Storage**: Cloudflare KV (Key-Value) for rate limits, API keys, and analytics
- **HTTP Client**: Native `fetch` API with manual redirect control
- **No Build Process**: Direct deployment of worker.js

### Features & Capabilities
- **31 API Endpoints**: Complete redirect analysis suite (v8.0)
- **Rate Limiting**: IP-based daily limits via KV Storage
- **API Key Authentication**: Premium endpoint access control
- **CORS**: Configured for browser/web application access
- **SSRF Protection**: Blocks internal networks and metadata endpoints
- **Performance**: Global edge deployment with < 50ms response times
- **Real Data Only**: No pattern-based guessing, fake scores, or simulated metrics

## Deployment

### Files Required
1. **worker.js** - Complete API (31 endpoints, v8.0)
2. **wrangler.toml** - Cloudflare configuration

### Deployment Steps
```bash
wrangler login
wrangler kv:namespace create "RATE_LIMITS"
wrangler kv:namespace create "API_KEYS"
wrangler kv:namespace create "ANALYTICS_DATA"
# Update wrangler.toml with KV namespace IDs
wrangler deploy
```

## Recent Changes
- **October 26, 2025 (Latest)**: v8.0 - Removed ALL fake/simulated features. Deleted affiliate link detection, tracking URL detection, suspicious domain detection, malware scanning endpoint, and hosting provider guessing. Fixed dashboard stats to return 404 when empty instead of fake zeros. Now 31 endpoints, all returning only real observable data from actual HTTP/DNS requests.
- **October 19, 2025**: Fixed local testing - Created Node.js test server to run the Cloudflare Worker locally. All endpoints tested and working with real data. Previous Python/Flask workflows replaced.
- **October 19, 2025**: Removed all Python files and dependencies. Project now runs 100% on Cloudflare Workers with zero Python code. Deleted 71 files (88% reduction), keeping only worker.js and wrangler.toml as essential files.

## Local Testing

### How to Run
**To start the server with ALL REAL DATA:**
```bash
node test-server.js
```
OR
```bash
bash start.sh
```

The server will run on port 5000 and show:
- ✅ 31 endpoints available - 100% REAL DATA (v8.0)
- ✅ All data from actual HTTP/DNS requests - NO simulated data or pattern-based guessing

### Quick Tests
- **Health Check**: `curl http://localhost:5000/health`
- **Analyze URL**: `curl -X POST http://localhost:5000/analyze -H "Content-Type: application/json" -d '{"url": "https://example.com"}'`
- **Automated Tests**: `bash run-api-test.sh` - Tests all endpoints

### Status
✅ **WORKING** - All 31 endpoints return real data from actual HTTP/DNS requests (v8.0)
✅ **NO FAKE FEATURES** - All pattern-based guessing and simulated metrics removed
✅ **Production Ready** - Ready to deploy to Cloudflare Workers

## Project Status
- ✅ Local testing: WORKING (via Node.js test server)
- ✅ All 31 endpoints (v8.0) return only real observable data
- ✅ Production ready for Cloudflare Workers deployment
- ✅ Zero Python dependencies
- ✅ Standalone JavaScript implementation
- ✅ All fake detection features removed (affiliate, tracking, malware, hosting provider)
- ✅ Ready to publish to Cloudflare's global edge network
