// Simple direct test of API endpoints without running a server
const fs = require('fs');

// Mock Cloudflare KV storage
const mockKV = {
  data: {},
  async get(key) {
    return this.data[key] || null;
  },
  async put(key, value, options) {
    this.data[key] = value;
    return true;
  }
};

// Mock environment
const mockEnv = {
  RATE_LIMITS: mockKV,
  API_KEYS: mockKV,
  ANALYTICS_DATA: mockKV
};

// Load and execute worker code
const workerCode = fs.readFileSync('./worker.js', 'utf8');
const workerModule = {};
eval(workerCode.replace('export default', 'workerModule.default ='));

async function testEndpoint(name, method, path, body = null) {
  try {
    const url = `http://localhost:5000${path}`;
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    
    const request = new Request(url, {
      method: method,
      headers: headers,
      body: body ? JSON.stringify(body) : undefined
    });
    
    const response = await workerModule.default.fetch(request, mockEnv, {});
    const status = response.status;
    
    return { name, path, status, success: status >= 200 && status < 400 };
  } catch (error) {
    return { name, path, status: 'ERROR', success: false, error: error.message };
  }
}

async function runTests() {
  console.log('='.repeat(70));
  console.log('Testing All 25 API Endpoints');
  console.log('='.repeat(70));
  console.log('');
  
  const tests = [
    { name: '1. GET /', method: 'GET', path: '/' },
    { name: '2. GET /health', method: 'GET', path: '/health' },
    { name: '3. POST /analyze', method: 'POST', path: '/analyze', body: { url: 'https://google.com' } },
    { name: '4. POST /api/analyze', method: 'POST', path: '/api/analyze', body: { url: 'https://google.com' } },
    { name: '5. POST /api/bulk/analyze', method: 'POST', path: '/api/bulk/analyze', body: { urls: ['https://google.com'] } },
    { name: '6. POST /api/validate', method: 'POST', path: '/api/validate', body: { urls: ['https://google.com'] } },
    { name: '7. POST /api/security/enhanced-scan', method: 'POST', path: '/api/security/enhanced-scan', body: { url: 'https://google.com' } },
    { name: '8. POST /api/analyze/bot-test', method: 'POST', path: '/api/analyze/bot-test', body: { url: 'https://google.com' } },
    { name: '9. POST /api/robots-txt/check', method: 'POST', path: '/api/robots-txt/check', body: { url: 'https://google.com' } },
    { name: '10. POST /api/export/csv', method: 'POST', path: '/api/export/csv', body: { url: 'https://google.com' } },
    { name: '11. POST /api/decode-shortener', method: 'POST', path: '/api/decode-shortener', body: { url: 'https://bit.ly/test' } },
    { name: '12. POST /api/detect-redirect-loop', method: 'POST', path: '/api/detect-redirect-loop', body: { url: 'https://google.com' } },
    { name: '13. POST /api/generate-redirect-rules', method: 'POST', path: '/api/generate-redirect-rules', body: { source_url: 'https://old.com/page', destination_url: 'https://new.com/page' } },
    { name: '14. POST /api/analyze/with-auth', method: 'POST', path: '/api/analyze/with-auth', body: { url: 'https://google.com' } },
    { name: '15. POST /api/analyze/with-webhook', method: 'POST', path: '/api/analyze/with-webhook', body: { url: 'https://google.com', webhook_url: 'https://webhook.site/test' } },
    { name: '16. POST /api/analyze/comprehensive', method: 'POST', path: '/api/analyze/comprehensive', body: { url: 'https://google.com' } },
    { name: '17. POST /api/analyze/link-types', method: 'POST', path: '/api/analyze/link-types', body: { url: 'https://google.com' } },
    { name: '18. POST /api/analyze/network-diversity', method: 'POST', path: '/api/analyze/network-diversity', body: { url: 'https://google.com' } },
    { name: '19. POST /api/analyze/advanced', method: 'POST', path: '/api/analyze/advanced', body: { url: 'https://google.com' } },
    { name: '20. POST /api/seo/analysis', method: 'POST', path: '/api/seo/analysis', body: { url: 'https://google.com' } },
    { name: '21. POST /api/browser/quick-check', method: 'POST', path: '/api/browser/quick-check', body: { url: 'https://google.com' } },
    { name: '22. POST /api/batch/quick-analyze', method: 'POST', path: '/api/batch/quick-analyze', body: { urls: ['https://google.com'] } },
    { name: '23. POST /api/network/detection', method: 'POST', path: '/api/network/detection', body: { url: 'https://google.com' } },
    { name: '24. POST /api/revenue/optimization', method: 'POST', path: '/api/revenue/optimization', body: { url: 'https://google.com' } },
    { name: '25. POST /api/analyze/mobile-comparison', method: 'POST', path: '/api/analyze/mobile-comparison', body: { url: 'https://google.com' } }
  ];
  
  let success = 0;
  let fail = 0;
  
  for (const test of tests) {
    const result = await testEndpoint(test.name, test.method, test.path, test.body);
    
    // Special handling for premium endpoint
    if (test.name.includes('mobile-comparison') && result.status === 401) {
      console.log(`${result.name.padEnd(55)} ✅ WORKING (HTTP ${result.status} - Auth required)`);
      success++;
    } else if (result.success) {
      console.log(`${result.name.padEnd(55)} ✅ WORKING (HTTP ${result.status})`);
      success++;
    } else {
      console.log(`${result.name.padEnd(55)} ❌ FAILED (${result.status})`);
      fail++;
    }
  }
  
  console.log('');
  console.log('='.repeat(70));
  console.log('FINAL RESULTS');
  console.log('='.repeat(70));
  console.log(`Total Endpoints: 25`);
  console.log(`✅ Working: ${success}`);
  console.log(`❌ Failed: ${fail}`);
  console.log('='.repeat(70));
}

runTests().catch(console.error);
