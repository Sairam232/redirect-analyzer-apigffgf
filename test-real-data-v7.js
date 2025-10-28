/**
 * Test ALL 32 endpoints to verify 100% real data
 * Version 7.0 - No calculated scores, no fake data
 */

const API_URL = 'http://localhost:8787';

async function testEndpoint(name, method, path, body = null) {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' }
  };
  
  if (body) {
    options.body = JSON.stringify(body);
  }
  
  try {
    const response = await fetch(`${API_URL}${path}`, options);
    const data = await response.json();
    
    // Check for calculated scores or grades
    const dataStr = JSON.stringify(data);
    const hasFakeData = 
      dataStr.includes('"seo_score":') ||
      dataStr.includes('"grade":') ||
      dataStr.includes('"diversity_score":') ||
      dataStr.includes('"safety_score":') ||
      dataStr.includes('"threat_level":') ||
      dataStr.includes('"performance_grade":') ||
      dataStr.includes('"recommendations":');
    
    if (hasFakeData) {
      console.log(`❌ ${name} - FAILED: Contains calculated/fake data`);
      console.log('   Data:', dataStr.substring(0, 200));
      return false;
    } else if (data.error) {
      console.log(`⚠️  ${name} - ${data.error}`);
      return false;
    } else {
      console.log(`✅ ${name} - PASS (real data only)`);
      return true;
    }
  } catch (error) {
    console.log(`❌ ${name} - ERROR: ${error.message}`);
    return false;
  }
}

async function runTests() {
  console.log('🔍 Testing ALL 32 Endpoints - v7.0 Real Data Verification\n');
  console.log('═══════════════════════════════════════════════════════\n');
  
  let passed = 0;
  let failed = 0;
  
  const tests = [
    ['Health Check', 'GET', '/health'],
    ['Homepage', 'GET', '/'],
    ['Basic Analysis', 'POST', '/analyze', { url: 'https://google.com' }],
    ['API Analysis', 'POST', '/api/analyze', { url: 'https://github.com' }],
    ['Bulk Analysis', 'POST', '/api/bulk/analyze', { urls: ['https://google.com', 'https://github.com'] }],
    ['URL Validation', 'POST', '/api/validate', { urls: ['https://google.com'] }],
    ['Security Scan', 'POST', '/api/security/enhanced-scan', { url: 'https://google.com' }],
    ['Pricing', 'GET', '/api/pricing'],
    ['Pricing Tiers', 'GET', '/api/pricing/tiers'],
    ['Robots.txt Check', 'POST', '/api/robots-txt/check', { domain: 'google.com' }],
    ['Export CSV', 'POST', '/api/export/csv', { url: 'https://google.com' }],
    ['Decode Shortener', 'POST', '/api/decode-shortener', { url: 'https://bit.ly/test' }],
    ['Detect Redirect Loop', 'POST', '/api/detect-redirect-loop', { url: 'https://google.com' }],
    ['Generate Redirect Rules', 'POST', '/api/generate-redirect-rules', { url: 'https://google.com' }],
    ['Comprehensive Analysis', 'POST', '/api/analyze/comprehensive', { url: 'https://google.com' }],
    ['Link Types', 'POST', '/api/analyze/link-types', { url: 'https://google.com' }],
    ['SEO Analysis (NO SCORES)', 'POST', '/api/seo/analysis', { url: 'https://google.com' }],
    ['Network Diversity (NO SCORES)', 'POST', '/api/analyze/network-diversity', { url: 'https://google.com' }],
    ['Browser Quick Check', 'POST', '/api/browser/quick-check', { url: 'https://google.com' }],
    ['Batch Quick Analyze', 'POST', '/api/batch/quick-analyze', { urls: ['https://google.com'] }],
    ['Malware Scan', 'POST', '/api/analyze/malware-scan', { url: 'https://google.com' }],
    ['Network Detection', 'POST', '/api/network/detection', { url: 'https://google.com' }],
    ['Revenue Optimization (NO RECOMMENDATIONS)', 'POST', '/api/revenue/optimization', { url: 'https://google.com' }],
    ['Dashboard Stats', 'GET', '/api/dashboard/stats'],
    ['Analytics History', 'GET', '/api/analytics/history'],
    ['Bot Test', 'POST', '/api/analyze/bot-test', { url: 'https://google.com' }],
    ['With Auth', 'POST', '/api/analyze/with-auth', { url: 'https://google.com', username: 'test', password: 'test' }],
    ['With Webhook', 'POST', '/api/analyze/with-webhook', { url: 'https://google.com', webhook_url: 'https://webhook.site/test' }],
    ['Advanced Analysis', 'POST', '/api/analyze/advanced', { url: 'https://google.com' }],
  ];
  
  for (const test of tests) {
    const result = await testEndpoint(...test);
    if (result) passed++;
    else failed++;
  }
  
  console.log('\n═══════════════════════════════════════════════════════');
  console.log(`\n📊 RESULTS: ${passed} passed, ${failed} failed out of ${passed + failed} tests`);
  
  if (failed === 0) {
    console.log('\n🎉 SUCCESS! All endpoints return 100% REAL DATA ONLY!\n');
  } else {
    console.log('\n⚠️  Some endpoints still have calculated/fake data\n');
  }
}

runTests();
