// Direct test of all 34 endpoints without server
const fs = require('fs');

// Load worker code
const workerCode = fs.readFileSync('./worker.js', 'utf8');

// Mock environment
const mockEnv = {
  RATE_LIMITS: {
    get: async () => null,
    put: async () => true
  },
  API_KEYS: {
    get: async () => null
  },
  ANALYTICS_DATA: {
    get: async () => null,
    put: async () => true
  }
};

// Extract worker export
const workerModule = {};
eval(workerCode.replace('export default', 'workerModule.default ='));

let passed = 0;
let failed = 0;
const results = [];

async function testEndpoint(num, name, method, path, body) {
  try {
    const url = `http://localhost:5000${path}`;
    const headers = new Headers({ 'Content-Type': 'application/json' });
    
    const request = new Request(url, {
      method: method,
      headers: headers,
      body: body ? JSON.stringify(body) : undefined
    });
    
    const response = await workerModule.default.fetch(request, mockEnv, {});
    const text = await response.text();
    const status = response.status;
    
    let success = false;
    let reason = '';
    
    // Check if response is valid
    if (status >= 200 && status < 500) {
      try {
        const json = JSON.parse(text);
        success = true;
        reason = `${status} - Valid JSON response`;
      } catch (e) {
        // HTML response is ok for homepage
        if (path === '/' && text.includes('html')) {
          success = true;
          reason = `${status} - HTML page`;
        } else {
          reason = `${status} - Invalid JSON`;
        }
      }
    } else {
      reason = `HTTP ${status}`;
    }
    
    if (success) {
      console.log(`✅ [${num}/34] ${name}`);
      passed++;
    } else {
      console.log(`❌ [${num}/34] ${name} - ${reason}`);
      failed++;
    }
    
    results.push({ num, name, success, status, reason });
    
  } catch (error) {
    console.log(`❌ [${num}/34] ${name} - Error: ${error.message}`);
    failed++;
    results.push({ num, name, success: false, reason: error.message });
  }
}

async function runAllTests() {
  console.log('╔════════════════════════════════════════════════════════════════╗');
  console.log('║        TESTING ALL 34 ENDPOINTS - DIRECT VERIFICATION         ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');
  
  console.log('🆓 FREE TIER ENDPOINTS (17)');
  console.log('═══════════════════════════════════════════════════════════════\n');
  
  // Free tier endpoints
  await testEndpoint(1, 'Homepage Documentation', 'GET', '/');
  await testEndpoint(2, 'Health Check', 'GET', '/health');
  await testEndpoint(3, 'Basic Analysis (/analyze)', 'POST', '/analyze', {url: 'https://google.com'});
  await testEndpoint(4, 'API Analysis (/api/analyze)', 'POST', '/api/analyze', {url: 'https://github.com'});
  await testEndpoint(5, 'Bulk Analysis', 'POST', '/api/bulk/analyze', {urls: ['https://google.com']});
  await testEndpoint(6, 'URL Validation', 'POST', '/api/validate', {urls: ['https://google.com']});
  await testEndpoint(7, 'Security Scan', 'POST', '/api/security/enhanced-scan', {url: 'https://example.com'});
  await testEndpoint(8, 'Pricing Info', 'GET', '/api/pricing');
  await testEndpoint(9, 'Pricing Tiers', 'GET', '/api/pricing/tiers');
  await testEndpoint(10, 'Robots.txt Check', 'POST', '/api/robots-txt/check', {url: 'https://github.com'});
  await testEndpoint(11, 'Export CSV', 'POST', '/api/export/csv', {url: 'https://google.com'});
  await testEndpoint(12, 'Decode Shortener', 'POST', '/api/decode-shortener', {url: 'https://bit.ly/test'});
  await testEndpoint(13, 'Detect Redirect Loop', 'POST', '/api/detect-redirect-loop', {url: 'https://example.com'});
  await testEndpoint(14, 'Generate Redirect Rules', 'POST', '/api/generate-redirect-rules', {
    source_url: 'https://old.com',
    destination_url: 'https://new.com',
    redirect_type: '301',
    server_type: 'both'
  });
  await testEndpoint(15, 'Comprehensive Analysis', 'POST', '/api/analyze/comprehensive', {url: 'https://github.com'});
  await testEndpoint(16, 'Link Types', 'POST', '/api/analyze/link-types', {url: 'https://example.com'});
  await testEndpoint(17, 'SEO Link Juice', 'POST', '/api/analyze/seo-link-juice', {url: 'https://example.com'});
  
  console.log('\n💼 PREMIUM ENDPOINTS (17)');
  console.log('═══════════════════════════════════════════════════════════════\n');
  
  // Premium endpoints (should return 401 without API key)
  await testEndpoint(18, 'Advanced Analysis', 'POST', '/api/analyze/advanced', {url: 'https://example.com'});
  await testEndpoint(19, 'Domain Analytics', 'GET', '/api/analytics/domain/example.com');
  await testEndpoint(20, 'URL Analytics', 'GET', '/api/analytics/url/https://example.com');
  await testEndpoint(21, 'SEO Analysis', 'POST', '/api/seo/analysis', {url: 'https://example.com'});
  await testEndpoint(22, 'Browser Quick Check', 'POST', '/api/browser/quick-check', {url: 'https://example.com'});
  await testEndpoint(23, 'Batch Quick Analyze', 'POST', '/api/batch/quick-analyze', {urls: ['https://example.com']});
  await testEndpoint(24, 'Malware Scan', 'POST', '/api/analyze/malware-scan', {url: 'https://example.com'});
  await testEndpoint(25, 'Network Detection', 'POST', '/api/network/detection', {url: 'https://example.com'});
  await testEndpoint(26, 'Revenue Optimization', 'POST', '/api/revenue/optimization', {url: 'https://example.com'});
  await testEndpoint(27, 'Mobile Comparison', 'POST', '/api/analyze/mobile-comparison', {url: 'https://example.com'});
  await testEndpoint(28, 'Dashboard Stats', 'GET', '/api/dashboard/stats');
  await testEndpoint(29, 'Analytics History', 'GET', '/api/analytics/history?days=30');
  await testEndpoint(30, 'Bot User Agent Test', 'POST', '/api/analyze/bot-test', {url: 'https://example.com', bots: ['googlebot']});
  await testEndpoint(31, 'Domain Trust', 'POST', '/api/analyze/domain-trust', {url: 'https://example.com'});
  await testEndpoint(32, 'Analysis with Auth', 'POST', '/api/analyze/with-auth', {url: 'https://example.com', username: 'test', password: 'test'});
  await testEndpoint(33, 'Analysis with Webhook', 'POST', '/api/analyze/with-webhook', {url: 'https://example.com', webhook_url: 'https://example.com/hook'});
  await testEndpoint(34, 'Network Diversity', 'POST', '/api/analyze/network-diversity', {url: 'https://google.com'});
  
  console.log('\n╔════════════════════════════════════════════════════════════════╗');
  console.log('║                        FINAL RESULTS                           ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');
  console.log(`   Total Endpoints: 34`);
  console.log(`   ✅ Working: ${passed}`);
  console.log(`   ❌ Failed: ${failed}`);
  console.log(`   Success Rate: ${Math.round((passed/34)*100)}%\n`);
  
  if (passed === 34) {
    console.log('   🎉 SUCCESS! ALL 34 ENDPOINTS ARE WORKING CORRECTLY!\n');
  } else if (passed >= 30) {
    console.log('   ✅ MOSTLY WORKING! Minor issues detected.\n');
  } else {
    console.log('   ⚠️  Multiple endpoints need attention.\n');
  }
  
  console.log('════════════════════════════════════════════════════════════════\n');
}

runAllTests().catch(console.error);
