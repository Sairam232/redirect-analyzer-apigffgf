/**
 * Comprehensive Test Script for All 25 API Endpoints
 * Tests each endpoint with real data and verifies correct output
 */

import worker from './worker.js';

// Mock environment for testing
const mockEnv = {
  RATE_LIMITS: {
    get: async () => null,
    put: async () => {},
  },
  ANALYTICS_DATA: {
    get: async () => null,
    put: async () => {},
  },
  API_KEYS: {
    get: async () => null,
  }
};

const mockCtx = {
  waitUntil: () => {},
};

// Helper function to make requests
async function makeRequest(path, method = 'GET', body = null) {
  const url = `http://localhost${path}`;
  const headers = {
    'Content-Type': 'application/json',
  };
  
  const request = new Request(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  return await worker.fetch(request, mockEnv, mockCtx);
}

// Test results tracker
const results = {
  passed: [],
  failed: [],
  total: 0
};

async function testEndpoint(name, path, method, body, validator) {
  results.total++;
  console.log(`\n🧪 Testing ${results.total}: ${name}`);
  console.log(`   ${method} ${path}`);
  
  try {
    const response = await makeRequest(path, method, body);
    const data = await response.json();
    
    console.log(`   Status: ${response.status}`);
    console.log(`   Response Preview:`, JSON.stringify(data).substring(0, 150) + '...');
    
    if (response.status >= 200 && response.status < 300) {
      if (validator && !validator(data)) {
        results.failed.push({ name, reason: 'Invalid response format', data });
        console.log('   ❌ FAILED - Invalid response format');
      } else {
        results.passed.push(name);
        console.log('   ✅ PASSED');
      }
    } else {
      results.failed.push({ name, reason: `Bad status: ${response.status}`, data });
      console.log(`   ❌ FAILED - Status ${response.status}`);
    }
  } catch (error) {
    results.failed.push({ name, reason: error.message });
    console.log(`   ❌ FAILED - ${error.message}`);
  }
}

// Run all endpoint tests
async function runAllTests() {
  console.log('='.repeat(80));
  console.log('🚀 TESTING ALL 25 API ENDPOINTS');
  console.log('='.repeat(80));

  // 1. GET / - Documentation
  await testEndpoint(
    'API Documentation',
    '/',
    'GET',
    null,
    null // HTML response, skip validation
  );

  // 2. GET /health - Health Check
  await testEndpoint(
    'Health Check',
    '/health',
    'GET',
    null,
    (data) => data.status === 'healthy' && data.total_endpoints === 25
  );

  // 3. POST /analyze - Basic Analysis
  await testEndpoint(
    'Basic Analyze',
    '/analyze',
    'POST',
    { url: 'https://httpbin.org/redirect/2' },
    (data) => data.redirect_chain && Array.isArray(data.redirect_chain)
  );

  // 4. POST /api/analyze - Alternative Basic Analysis
  await testEndpoint(
    'API Analyze',
    '/api/analyze',
    'POST',
    { url: 'https://httpbin.org/redirect/1' },
    (data) => data.redirect_chain && Array.isArray(data.redirect_chain)
  );

  // 5. POST /api/bulk/analyze - Bulk Analysis
  await testEndpoint(
    'Bulk Analyze',
    '/api/bulk/analyze',
    'POST',
    { urls: ['https://httpbin.org/get', 'https://example.com'] },
    (data) => data.results && Array.isArray(data.results)
  );

  // 6. POST /api/validate - URL Validation
  await testEndpoint(
    'Validate URLs',
    '/api/validate',
    'POST',
    { urls: ['https://httpbin.org/get', 'https://example.com'] },
    (data) => data.results && data.summary
  );

  // 7. POST /api/security/enhanced-scan - Security Scan
  await testEndpoint(
    'Security Scan',
    '/api/security/enhanced-scan',
    'POST',
    { url: 'https://example.com' },
    (data) => data.url && data.security_analysis
  );

  // 8. POST /api/analyze/bot-test - Bot User Agent Test
  await testEndpoint(
    'Bot User Agent Test',
    '/api/analyze/bot-test',
    'POST',
    { url: 'https://httpbin.org/user-agent' },
    (data) => data.url && data.results
  );

  // 9. POST /api/robots-txt/check - Robots.txt Check
  await testEndpoint(
    'Robots.txt Check',
    '/api/robots-txt/check',
    'POST',
    { url: 'https://example.com' },
    (data) => data.robots_txt_url && typeof data.robots_txt_exists === 'boolean'
  );

  // 10. POST /api/export/csv - Export to CSV
  await testEndpoint(
    'Export to CSV',
    '/api/export/csv',
    'POST',
    { url: 'https://httpbin.org/redirect/1' },
    (data) => data.csv_data && data.format === 'CSV'
  );

  // 11. POST /api/decode-shortener - Decode Shortener
  await testEndpoint(
    'Decode Shortener',
    '/api/decode-shortener',
    'POST',
    { url: 'https://bit.ly/test' },
    (data) => data.input_url && data.final_url
  );

  // 12. POST /api/detect-redirect-loop - Detect Redirect Loop
  await testEndpoint(
    'Detect Redirect Loop',
    '/api/detect-redirect-loop',
    'POST',
    { url: 'https://httpbin.org/redirect/2' },
    (data) => typeof data.loop_detected === 'boolean' && data.redirect_chain
  );

  // 13. POST /api/generate-redirect-rules - Generate Redirect Rules
  await testEndpoint(
    'Generate Redirect Rules',
    '/api/generate-redirect-rules',
    'POST',
    { url: 'https://httpbin.org/redirect/1' },
    (data) => data.apache_rules || data.nginx_rules
  );

  // 14. POST /api/analyze/with-auth - Analyze with Auth
  await testEndpoint(
    'Analyze with Auth',
    '/api/analyze/with-auth',
    'POST',
    { 
      url: 'https://httpbin.org/basic-auth/user/pass',
      username: 'user',
      password: 'pass'
    },
    (data) => data.url && data.redirect_chain
  );

  // 15. POST /api/analyze/with-webhook - Analyze with Webhook
  await testEndpoint(
    'Analyze with Webhook',
    '/api/analyze/with-webhook',
    'POST',
    { 
      url: 'https://httpbin.org/get',
      webhook_url: 'https://httpbin.org/post'
    },
    (data) => data.analysis && data.webhook
  );

  // 16. POST /api/analyze/comprehensive - Comprehensive Analysis
  await testEndpoint(
    'Comprehensive Analysis',
    '/api/analyze/comprehensive',
    'POST',
    { url: 'https://example.com' },
    (data) => data.url && data.redirect_analysis
  );

  // 17. POST /api/analyze/link-types - Link Types Analysis
  await testEndpoint(
    'Link Types Analysis',
    '/api/analyze/link-types',
    'POST',
    { url: 'https://example.com' },
    (data) => data.url && data.link_analysis
  );

  // 18. POST /api/analyze/network-diversity - Network Diversity
  await testEndpoint(
    'Network Diversity Analysis',
    '/api/analyze/network-diversity',
    'POST',
    { url: 'https://httpbin.org/redirect/2' },
    (data) => data.url && data.network_analysis
  );

  // 19. POST /api/analyze/advanced - Advanced Analysis
  await testEndpoint(
    'Advanced Analysis',
    '/api/analyze/advanced',
    'POST',
    { url: 'https://example.com' },
    (data) => data.url && data.redirect_chain
  );

  // 20. POST /api/seo/analysis - SEO Analysis
  await testEndpoint(
    'SEO Analysis',
    '/api/seo/analysis',
    'POST',
    { url: 'https://example.com' },
    (data) => data.url && data.seo_data
  );

  // 21. POST /api/browser/quick-check - Browser Quick Check
  await testEndpoint(
    'Browser Quick Check',
    '/api/browser/quick-check',
    'POST',
    { url: 'https://httpbin.org/get' },
    (data) => data.url && typeof data.response_time_ms === 'number'
  );

  // 22. POST /api/batch/quick-analyze - Batch Quick Analyze
  await testEndpoint(
    'Batch Quick Analyze',
    '/api/batch/quick-analyze',
    'POST',
    { urls: ['https://example.com', 'https://httpbin.org/get'] },
    (data) => data.results && Array.isArray(data.results)
  );

  // 23. POST /api/network/detection - Network Detection
  await testEndpoint(
    'Network Detection',
    '/api/network/detection',
    'POST',
    { url: 'https://example.com' },
    (data) => data.url && data.network_info
  );

  // 24. POST /api/revenue/optimization - Revenue Optimization
  await testEndpoint(
    'Revenue Optimization',
    '/api/revenue/optimization',
    'POST',
    { url: 'https://example.com' },
    (data) => data.url && data.performance_metrics
  );

  // 25. POST /api/analyze/mobile-comparison - Mobile Comparison (Premium)
  await testEndpoint(
    'Mobile Comparison (Premium)',
    '/api/analyze/mobile-comparison',
    'POST',
    { url: 'https://example.com' },
    (data) => data.url || data.error // May fail without API key
  );

  // Print summary
  console.log('\n' + '='.repeat(80));
  console.log('📊 TEST SUMMARY');
  console.log('='.repeat(80));
  console.log(`Total Endpoints Tested: ${results.total}`);
  console.log(`✅ Passed: ${results.passed.length}`);
  console.log(`❌ Failed: ${results.failed.length}`);
  
  if (results.passed.length > 0) {
    console.log('\n✅ PASSED ENDPOINTS:');
    results.passed.forEach((name, i) => {
      console.log(`   ${i + 1}. ${name}`);
    });
  }
  
  if (results.failed.length > 0) {
    console.log('\n❌ FAILED ENDPOINTS:');
    results.failed.forEach((test, i) => {
      console.log(`   ${i + 1}. ${test.name}`);
      console.log(`      Reason: ${test.reason}`);
      if (test.data) {
        console.log(`      Response:`, JSON.stringify(test.data).substring(0, 200));
      }
    });
  }
  
  console.log('\n' + '='.repeat(80));
  
  const successRate = ((results.passed.length / results.total) * 100).toFixed(1);
  console.log(`🎯 Success Rate: ${successRate}%`);
  console.log('='.repeat(80));
  
  // Exit with appropriate code
  process.exit(results.failed.length > 0 ? 1 : 0);
}

// Run tests
runAllTests().catch(console.error);
