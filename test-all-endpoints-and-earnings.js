#!/usr/bin/env node

/**
 * Complete API Endpoints Test + RapidAPI Earnings Calculator
 * Tests all 32 endpoints and calculates potential revenue
 */

const BASE_URL = 'http://localhost:5000';

// Test URLs for analysis
const TEST_URLS = {
  simple: 'https://example.com',
  redirect: 'https://bit.ly/3x1y2z3',
  https: 'https://google.com'
};

const endpoints = [
  // ===== FREE TIER ENDPOINTS (16 endpoints) =====
  {
    id: 1,
    method: 'GET',
    path: '/health',
    name: 'Health Check',
    tier: 'free',
    description: 'API health check and status',
    test: async () => {
      const res = await fetch(`${BASE_URL}/health`);
      return await res.json();
    }
  },
  {
    id: 2,
    method: 'POST',
    path: '/analyze',
    name: 'Main URL Analysis',
    tier: 'free',
    description: 'Complete redirect chain analysis with performance metrics',
    test: async () => {
      const res = await fetch(`${BASE_URL}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: TEST_URLS.simple })
      });
      return await res.json();
    }
  },
  {
    id: 3,
    method: 'POST',
    path: '/api/bulk/analyze',
    name: 'Bulk URL Analysis',
    tier: 'free',
    description: 'Analyze up to 10 URLs in one request',
    test: async () => {
      const res = await fetch(`${BASE_URL}/api/bulk/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ urls: [TEST_URLS.simple, TEST_URLS.https] })
      });
      return await res.json();
    }
  },
  {
    id: 4,
    method: 'POST',
    path: '/api/validate',
    name: 'URL Validation',
    tier: 'free',
    description: 'Validate URL accessibility (up to 20 URLs)',
    test: async () => {
      const res = await fetch(`${BASE_URL}/api/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ urls: [TEST_URLS.simple] })
      });
      return await res.json();
    }
  },
  {
    id: 5,
    method: 'POST',
    path: '/api/security/enhanced-scan',
    name: 'Security Scan',
    tier: 'free',
    description: 'Security and safety analysis',
    test: async () => {
      const res = await fetch(`${BASE_URL}/api/security/enhanced-scan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: TEST_URLS.simple })
      });
      return await res.json();
    }
  },
  {
    id: 6,
    method: 'GET',
    path: '/api/pricing',
    name: 'Pricing Information',
    tier: 'free',
    description: 'Get pricing information',
    test: async () => {
      const res = await fetch(`${BASE_URL}/api/pricing`);
      return await res.json();
    }
  },
  {
    id: 7,
    method: 'GET',
    path: '/api/pricing/tiers',
    name: 'Pricing Tiers',
    tier: 'free',
    description: 'Detailed pricing tiers',
    test: async () => {
      const res = await fetch(`${BASE_URL}/api/pricing/tiers`);
      return await res.json();
    }
  },
  {
    id: 8,
    method: 'POST',
    path: '/api/robots-txt/check',
    name: 'Robots.txt Check',
    tier: 'free',
    description: 'Check robots.txt file',
    test: async () => {
      const res = await fetch(`${BASE_URL}/api/robots-txt/check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: TEST_URLS.simple })
      });
      return await res.json();
    }
  },
  {
    id: 9,
    method: 'POST',
    path: '/api/export/csv',
    name: 'Export to CSV',
    tier: 'free',
    description: 'Export analysis results to CSV',
    test: async () => {
      const res = await fetch(`${BASE_URL}/api/export/csv`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          analysis_results: [{ url: TEST_URLS.simple, status: 200 }]
        })
      });
      return await res.text();
    }
  },
  {
    id: 10,
    method: 'POST',
    path: '/api/decode-shortener',
    name: 'URL Shortener Decoder',
    tier: 'free',
    description: 'Decode shortened URLs',
    test: async () => {
      const res = await fetch(`${BASE_URL}/api/decode-shortener`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: TEST_URLS.simple })
      });
      return await res.json();
    }
  },
  {
    id: 11,
    method: 'POST',
    path: '/api/detect-redirect-loop',
    name: 'Redirect Loop Detection',
    tier: 'free',
    description: 'Detect infinite redirect loops',
    test: async () => {
      const res = await fetch(`${BASE_URL}/api/detect-redirect-loop`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: TEST_URLS.simple })
      });
      return await res.json();
    }
  },
  {
    id: 12,
    method: 'POST',
    path: '/api/generate-redirect-rules',
    name: 'Generate Redirect Rules',
    tier: 'free',
    description: 'Generate Apache/Nginx redirect rules',
    test: async () => {
      const res = await fetch(`${BASE_URL}/api/generate-redirect-rules`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ redirects: [{ from: '/old', to: '/new', type: 301 }] })
      });
      return await res.json();
    }
  },
  {
    id: 13,
    method: 'POST',
    path: '/api/analyze/comprehensive',
    name: 'Comprehensive Analysis',
    tier: 'free',
    description: 'Complete URL analysis with all metrics',
    test: async () => {
      const res = await fetch(`${BASE_URL}/api/analyze/comprehensive`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: TEST_URLS.simple })
      });
      return await res.json();
    }
  },
  {
    id: 14,
    method: 'POST',
    path: '/api/analyze/link-types',
    name: 'Link Type Classification',
    tier: 'free',
    description: 'Classify link types',
    test: async () => {
      const res = await fetch(`${BASE_URL}/api/analyze/link-types`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: TEST_URLS.simple })
      });
      return await res.json();
    }
  },
  {
    id: 15,
    method: 'POST',
    path: '/api/seo/analysis',
    name: 'SEO Analysis',
    tier: 'free',
    description: 'SEO metrics analysis',
    test: async () => {
      const res = await fetch(`${BASE_URL}/api/seo/analysis`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: TEST_URLS.simple })
      });
      return await res.json();
    }
  },
  {
    id: 16,
    method: 'POST',
    path: '/api/analyze/network-diversity',
    name: 'Network Diversity',
    tier: 'free',
    description: 'Network diversity analysis',
    test: async () => {
      const res = await fetch(`${BASE_URL}/api/analyze/network-diversity`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: TEST_URLS.simple })
      });
      return await res.json();
    }
  },
  {
    id: 17,
    method: 'POST',
    path: '/api/browser/quick-check',
    name: 'Quick Response Check',
    tier: 'free',
    description: 'Quick response time measurement',
    test: async () => {
      const res = await fetch(`${BASE_URL}/api/browser/quick-check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: TEST_URLS.simple })
      });
      return await res.json();
    }
  },
  {
    id: 18,
    method: 'POST',
    path: '/api/batch/quick-analyze',
    name: 'Batch Quick Analysis',
    tier: 'free',
    description: 'Fast batch URL checking (up to 20 URLs)',
    test: async () => {
      const res = await fetch(`${BASE_URL}/api/batch/quick-analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ urls: [TEST_URLS.simple] })
      });
      return await res.json();
    }
  },
  {
    id: 19,
    method: 'POST',
    path: '/api/analyze/malware-scan',
    name: 'Malware Scan',
    tier: 'free',
    description: 'Enhanced malware and security scanning',
    test: async () => {
      const res = await fetch(`${BASE_URL}/api/analyze/malware-scan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: TEST_URLS.simple })
      });
      return await res.json();
    }
  },

  // ===== PREMIUM/PRO ENDPOINTS (13 endpoints) =====
  {
    id: 20,
    method: 'POST',
    path: '/api/analyze/mobile-comparison',
    name: 'Mobile vs Desktop Comparison',
    tier: 'pro',
    description: 'Compare redirects between mobile and desktop',
    test: async () => {
      const res = await fetch(`${BASE_URL}/api/analyze/mobile-comparison`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: TEST_URLS.simple })
      });
      return await res.json();
    }
  },
  {
    id: 21,
    method: 'GET',
    path: '/api/dashboard/stats',
    name: 'Dashboard Statistics',
    tier: 'pro',
    description: 'Dashboard statistics',
    test: async () => {
      const res = await fetch(`${BASE_URL}/api/dashboard/stats`);
      return await res.json();
    }
  },
  {
    id: 22,
    method: 'GET',
    path: '/api/analytics/history',
    name: 'Analytics History',
    tier: 'pro',
    description: 'Historical analytics data',
    test: async () => {
      const res = await fetch(`${BASE_URL}/api/analytics/history?days=7`);
      return await res.json();
    }
  },
  {
    id: 23,
    method: 'POST',
    path: '/api/analyze/bot-test',
    name: 'Bot User Agent Test',
    tier: 'pro',
    description: 'Test with bot user agents',
    test: async () => {
      const res = await fetch(`${BASE_URL}/api/analyze/bot-test`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: TEST_URLS.simple })
      });
      return await res.json();
    }
  },
  {
    id: 24,
    method: 'POST',
    path: '/api/analyze/with-auth',
    name: 'Authenticated Analysis',
    tier: 'pro',
    description: 'Analyze password-protected URLs',
    test: async () => {
      const res = await fetch(`${BASE_URL}/api/analyze/with-auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: TEST_URLS.simple, username: 'test', password: 'test' })
      });
      return await res.json();
    }
  },
  {
    id: 25,
    method: 'POST',
    path: '/api/analyze/with-webhook',
    name: 'Webhook Analysis',
    tier: 'pro',
    description: 'Analysis with webhook callback',
    test: async () => {
      const res = await fetch(`${BASE_URL}/api/analyze/with-webhook`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          url: TEST_URLS.simple, 
          webhook_url: 'https://webhook.site/test'
        })
      });
      return await res.json();
    }
  },
  {
    id: 26,
    method: 'POST',
    path: '/api/analyze/advanced',
    name: 'Advanced Analysis',
    tier: 'pro',
    description: 'Advanced analysis with timing measurements',
    test: async () => {
      const res = await fetch(`${BASE_URL}/api/analyze/advanced`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: TEST_URLS.simple })
      });
      return await res.json();
    }
  },
  {
    id: 27,
    method: 'GET',
    path: '/api/analytics/domain/example.com',
    name: 'Domain Analytics',
    tier: 'pro',
    description: 'Domain-specific analytics',
    test: async () => {
      const res = await fetch(`${BASE_URL}/api/analytics/domain/example.com`);
      return await res.json();
    }
  },
  {
    id: 28,
    method: 'GET',
    path: '/api/analytics/url/https://example.com',
    name: 'URL Analytics',
    tier: 'pro',
    description: 'URL-specific analytics',
    test: async () => {
      const res = await fetch(`${BASE_URL}/api/analytics/url/${encodeURIComponent('https://example.com')}`);
      return await res.json();
    }
  },
  {
    id: 29,
    method: 'POST',
    path: '/api/network/detection',
    name: 'Network Detection',
    tier: 'pro',
    description: 'IP geolocation and hosting detection',
    test: async () => {
      const res = await fetch(`${BASE_URL}/api/network/detection`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: TEST_URLS.simple })
      });
      return await res.json();
    }
  },
  {
    id: 30,
    method: 'POST',
    path: '/api/revenue/optimization',
    name: 'Revenue Optimization',
    tier: 'pro',
    description: 'Revenue optimization with performance metrics',
    test: async () => {
      const res = await fetch(`${BASE_URL}/api/revenue/optimization`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: TEST_URLS.simple })
      });
      return await res.json();
    }
  }
];

// RapidAPI Earnings Calculator
const RAPIDAPI_CONFIG = {
  marketplaceFee: 0.20, // 20% fee
  paypalFee: 0.029 + 0.30, // ~3% + $0.30
  
  pricingPlans: {
    free: { price: 0, quota: 100, name: 'Free' },
    basic: { price: 10, quota: 1000, name: 'Basic' },
    pro: { price: 49, quota: 10000, name: 'Pro' },
    ultra: { price: 149, quota: 50000, name: 'Ultra' },
    mega: { price: 299, quota: 100000, name: 'Mega' }
  }
};

function calculateEarnings(scenarios) {
  console.log('\n' + '═'.repeat(80));
  console.log('💰 RAPIDAPI EARNINGS POTENTIAL CALCULATOR');
  console.log('═'.repeat(80));
  
  scenarios.forEach(scenario => {
    console.log(`\n📊 ${scenario.name}`);
    console.log('─'.repeat(80));
    
    let monthlyRevenue = 0;
    let totalUsers = 0;
    
    Object.entries(scenario.users).forEach(([plan, count]) => {
      const planConfig = RAPIDAPI_CONFIG.pricingPlans[plan];
      const gross = planConfig.price * count;
      const rapidapiFee = gross * RAPIDAPI_CONFIG.marketplaceFee;
      const net = gross - rapidapiFee;
      
      if (count > 0) {
        console.log(`   ${planConfig.name}: ${count} users × $${planConfig.price} = $${gross}`);
        console.log(`      - RapidAPI fee (20%): -$${rapidapiFee.toFixed(2)}`);
        console.log(`      ✅ You earn: $${net.toFixed(2)}`);
      }
      
      monthlyRevenue += net;
      totalUsers += count;
    });
    
    const yearlyRevenue = monthlyRevenue * 12;
    
    console.log('\n   📈 TOTALS:');
    console.log(`      Total Users: ${totalUsers}`);
    console.log(`      Monthly Revenue: $${monthlyRevenue.toFixed(2)}`);
    console.log(`      Yearly Revenue: $${yearlyRevenue.toFixed(2)}`);
  });
  
  console.log('\n' + '═'.repeat(80) + '\n');
}

async function testAllEndpoints() {
  console.log('\n' + '═'.repeat(80));
  console.log('🧪 TESTING ALL 32 API ENDPOINTS');
  console.log('═'.repeat(80) + '\n');
  
  const results = {
    working: [],
    failed: [],
    total: endpoints.length
  };
  
  for (const endpoint of endpoints) {
    process.stdout.write(`Testing ${endpoint.id}/32: ${endpoint.method} ${endpoint.path}...`);
    
    try {
      const startTime = Date.now();
      const result = await endpoint.test();
      const time = Date.now() - startTime;
      
      const isWorking = !result.error;
      
      if (isWorking) {
        results.working.push({
          ...endpoint,
          responseTime: time,
          sample: JSON.stringify(result).substring(0, 100)
        });
        console.log(` ✅ ${time}ms`);
      } else {
        results.failed.push({
          ...endpoint,
          error: result.error || 'Unknown error'
        });
        console.log(` ❌ ${result.error}`);
      }
    } catch (error) {
      results.failed.push({
        ...endpoint,
        error: error.message
      });
      console.log(` ❌ ${error.message}`);
    }
    
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  return results;
}

async function main() {
  console.log('Starting comprehensive API test and earnings analysis...\n');
  
  const results = await testAllEndpoints();
  
  console.log('\n' + '═'.repeat(80));
  console.log('📊 TEST RESULTS SUMMARY');
  console.log('═'.repeat(80));
  console.log(`✅ Working: ${results.working.length}/${results.total} endpoints`);
  console.log(`❌ Failed: ${results.failed.length}/${results.total} endpoints`);
  console.log(`📈 Success Rate: ${((results.working.length / results.total) * 100).toFixed(1)}%`);
  
  if (results.working.length > 0) {
    console.log('\n✅ WORKING ENDPOINTS:');
    results.working.forEach(ep => {
      console.log(`   ${ep.id}. ${ep.method} ${ep.path} [${ep.tier}] - ${ep.responseTime}ms`);
      console.log(`      ${ep.description}`);
    });
  }
  
  if (results.failed.length > 0) {
    console.log('\n❌ FAILED ENDPOINTS:');
    results.failed.forEach(ep => {
      console.log(`   ${ep.id}. ${ep.method} ${ep.path} - ${ep.error}`);
    });
  }
  
  // Calculate earnings potential
  calculateEarnings([
    {
      name: 'Conservative Scenario (First 3 months)',
      users: { free: 500, basic: 20, pro: 5, ultra: 1, mega: 0 }
    },
    {
      name: 'Moderate Growth (6-12 months)',
      users: { free: 2000, basic: 100, pro: 30, ultra: 10, mega: 2 }
    },
    {
      name: 'Successful API (1-2 years)',
      users: { free: 5000, basic: 300, pro: 100, ultra: 30, mega: 10 }
    },
    {
      name: 'Popular/Viral API (2+ years)',
      users: { free: 15000, basic: 1000, pro: 300, ultra: 100, mega: 50 }
    }
  ]);
  
  console.log('═'.repeat(80));
  console.log('💡 RAPIDAPI TIPS:');
  console.log('═'.repeat(80));
  console.log('1. RapidAPI takes 20% fee + PayPal fees (~3%)');
  console.log('2. Payouts happen ~2 months after subscription (Jan subs = March payout)');
  console.log('3. 4+ million developers on RapidAPI marketplace');
  console.log('4. Good documentation + SEO = more users');
  console.log('5. Free tier attracts users, paid tiers generate revenue');
  console.log('6. Most providers earn $0-$500/month initially');
  console.log('7. Successful APIs can reach $5K-$20K/month');
  console.log('8. Top performers: $50K-$100K+/month (rare)');
  console.log('═'.repeat(80) + '\n');
}

main().catch(console.error);
