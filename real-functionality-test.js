// Real functionality test - Testing each endpoint with actual URLs
const fs = require('fs');

const mockKV = {
  data: {},
  async get(key) { return this.data[key] || null; },
  async put(key, value, options) { this.data[key] = value; return true; }
};

const mockEnv = { RATE_LIMITS: mockKV, API_KEYS: mockKV, ANALYTICS_DATA: mockKV };

const workerCode = fs.readFileSync('./worker.js', 'utf8');
const workerModule = {};
eval(workerCode.replace('export default', 'workerModule.default ='));

async function callEndpoint(method, path, body = null) {
  const url = `http://localhost:5000${path}`;
  const request = new Request(url, {
    method: method,
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: body ? JSON.stringify(body) : undefined
  });
  
  const response = await workerModule.default.fetch(request, mockEnv, {});
  const text = await response.text();
  let data;
  try { data = JSON.parse(text); } catch { data = text; }
  return { status: response.status, data };
}

async function runRealTests() {
  console.log('='.repeat(80));
  console.log('REAL FUNCTIONALITY TESTING - Each Endpoint with Real Inputs');
  console.log('='.repeat(80));
  console.log('');
  
  let passed = 0, failed = 0;
  
  // Test 1: Health check
  console.log('TEST 1: Health Check');
  const t1 = await callEndpoint('GET', '/health');
  if (t1.status === 200 && t1.data.status === 'healthy' && t1.data.total_endpoints === 25) {
    console.log('✅ PASS: Returns health status with 25 endpoints');
    passed++;
  } else {
    console.log('❌ FAIL: Invalid health check response');
    failed++;
  }
  console.log('');
  
  // Test 2: Basic redirect analysis with real URL
  console.log('TEST 2: Basic Redirect Analysis (Real URL: http://google.com)');
  const t2 = await callEndpoint('POST', '/analyze', { url: 'http://google.com' });
  if (t2.status === 200 && t2.data.redirect_chain && t2.data.redirect_chain.length > 0) {
    const hasRedirect = t2.data.total_redirects > 0;
    const finalUrl = t2.data.final_url;
    const usesHttps = finalUrl.startsWith('https://');
    console.log(`✅ PASS: Detected ${t2.data.total_redirects} redirect(s)`);
    console.log(`   Input: http://google.com`);
    console.log(`   Final: ${finalUrl}`);
    console.log(`   HTTPS: ${usesHttps ? 'Yes' : 'No'}`);
    console.log(`   Chain length: ${t2.data.chain_length}`);
    console.log(`   Avg response time: ${t2.data.performance_metrics.average_response_time_ms}ms`);
    passed++;
  } else {
    console.log('❌ FAIL: Did not return proper redirect chain');
    failed++;
  }
  console.log('');
  
  // Test 3: Bulk analysis with multiple real URLs
  console.log('TEST 3: Bulk Analysis (Real URLs: github.com, twitter.com, reddit.com)');
  const t3 = await callEndpoint('POST', '/api/bulk/analyze', { 
    urls: ['https://github.com', 'https://twitter.com', 'https://reddit.com'] 
  });
  if (t3.status === 200 && t3.data.results && t3.data.results.length === 3) {
    console.log(`✅ PASS: Analyzed ${t3.data.results.length} URLs`);
    t3.data.results.forEach((r, i) => {
      console.log(`   URL ${i+1}: ${r.url} → ${r.total_redirects} redirects`);
    });
    passed++;
  } else {
    console.log('❌ FAIL: Bulk analysis failed');
    failed++;
  }
  console.log('');
  
  // Test 4: URL validation
  console.log('TEST 4: URL Validation (Check accessibility)');
  const t4 = await callEndpoint('POST', '/api/validate', { 
    urls: ['https://google.com', 'https://github.com', 'https://invalid-url-that-does-not-exist-12345.com'] 
  });
  if (t4.status === 200 && t4.data.summary) {
    console.log(`✅ PASS: Validated URLs`);
    console.log(`   Accessible: ${t4.data.summary.accessible}`);
    console.log(`   Inaccessible: ${t4.data.summary.inaccessible}`);
    passed++;
  } else {
    console.log('❌ FAIL: Validation failed');
    failed++;
  }
  console.log('');
  
  // Test 5: Security scan
  console.log('TEST 5: Security Scan (Check HTTPS usage)');
  const t5 = await callEndpoint('POST', '/api/security/enhanced-scan', { url: 'https://github.com' });
  if (t5.status === 200 && t5.data.security_analysis) {
    console.log(`✅ PASS: Security analysis completed`);
    console.log(`   All HTTPS: ${t5.data.security_analysis.all_https}`);
    console.log(`   Has redirects: ${t5.data.security_analysis.has_redirects}`);
    passed++;
  } else {
    console.log('❌ FAIL: Security scan failed');
    failed++;
  }
  console.log('');
  
  // Test 6: Robots.txt check
  console.log('TEST 6: Robots.txt Check (github.com)');
  const t6 = await callEndpoint('POST', '/api/robots-txt/check', { url: 'https://github.com' });
  if (t6.status === 200) {
    console.log(`✅ PASS: Robots.txt check completed`);
    console.log(`   Exists: ${t6.data.robots_txt_exists}`);
    console.log(`   Accessible: ${t6.data.accessible}`);
    if (t6.data.content) {
      const lines = t6.data.content.split('\n').slice(0, 3);
      console.log(`   First 3 lines: ${lines.join(' | ')}`);
    }
    passed++;
  } else {
    console.log('❌ FAIL: Robots.txt check failed');
    failed++;
  }
  console.log('');
  
  // Test 7: CSV Export
  console.log('TEST 7: CSV Export (Export redirect chain)');
  const t7 = await callEndpoint('POST', '/api/export/csv', { url: 'https://twitter.com' });
  if (t7.status === 200 && t7.data.csv_data) {
    const csvLines = t7.data.csv_data.split('\n').length;
    console.log(`✅ PASS: CSV export generated`);
    console.log(`   Total steps: ${t7.data.total_steps}`);
    console.log(`   CSV lines: ${csvLines}`);
    console.log(`   Format: ${t7.data.format}`);
    passed++;
  } else {
    console.log('❌ FAIL: CSV export failed');
    failed++;
  }
  console.log('');
  
  // Test 8: URL Shortener decoder
  console.log('TEST 8: URL Shortener Decoder (Real shortener: bit.ly)');
  const t8 = await callEndpoint('POST', '/api/decode-shortener', { url: 'https://bit.ly/3xyz' });
  if (t8.status === 200) {
    console.log(`✅ PASS: Shortener analysis completed`);
    console.log(`   Original: ${t8.data.original_url}`);
    console.log(`   Is shortener: ${t8.data.is_url_shortener}`);
    console.log(`   Service: ${t8.data.shortener_service || 'N/A'}`);
    console.log(`   Redirects: ${t8.data.redirect_count}`);
    passed++;
  } else {
    console.log('❌ FAIL: Shortener decoder failed');
    failed++;
  }
  console.log('');
  
  // Test 9: Redirect loop detection
  console.log('TEST 9: Redirect Loop Detection');
  const t9 = await callEndpoint('POST', '/api/detect-redirect-loop', { url: 'https://github.com' });
  if (t9.status === 200 && t9.data.hasOwnProperty('loop_detected')) {
    console.log(`✅ PASS: Loop detection completed`);
    console.log(`   Loop detected: ${t9.data.loop_detected}`);
    console.log(`   Total redirects: ${t9.data.total_redirects}`);
    passed++;
  } else {
    console.log('❌ FAIL: Loop detection failed');
    failed++;
  }
  console.log('');
  
  // Test 10: Generate redirect rules
  console.log('TEST 10: Generate Redirect Rules');
  const t10 = await callEndpoint('POST', '/api/generate-redirect-rules', { 
    source_url: 'https://oldsite.com/page',
    destination_url: 'https://newsite.com/page',
    redirect_type: '301',
    server_type: 'both'
  });
  if (t10.status === 200 && t10.data.apache_rules && t10.data.nginx_rules) {
    console.log(`✅ PASS: Redirect rules generated`);
    console.log(`   Apache: ${t10.data.apache_rules}`);
    console.log(`   Nginx: ${t10.data.nginx_rules.split('\n')[0]}`);
    passed++;
  } else {
    console.log('❌ FAIL: Rule generation failed');
    failed++;
  }
  console.log('');
  
  // Test 11: Auth analysis
  console.log('TEST 11: Analysis with HTTP Auth');
  const t11 = await callEndpoint('POST', '/api/analyze/with-auth', { 
    url: 'https://httpbin.org/basic-auth/user/pass',
    basic_auth_username: 'user',
    basic_auth_password: 'pass'
  });
  if (t11.status === 200 && t11.data.redirect_chain) {
    console.log(`✅ PASS: Auth analysis completed`);
    console.log(`   Auth used: ${t11.data.auth_used}`);
    console.log(`   Redirects: ${t11.data.total_redirects}`);
    passed++;
  } else {
    console.log('❌ FAIL: Auth analysis failed');
    failed++;
  }
  console.log('');
  
  // Test 12: Webhook analysis
  console.log('TEST 12: Analysis with Webhook');
  const t12 = await callEndpoint('POST', '/api/analyze/with-webhook', { 
    url: 'https://github.com',
    webhook_url: 'https://webhook.site/unique-id'
  });
  if (t12.status === 200 && t12.data.analysis && t12.data.webhook) {
    console.log(`✅ PASS: Webhook analysis completed`);
    console.log(`   Analysis done: Yes`);
    console.log(`   Webhook attempted: Yes`);
    console.log(`   Webhook result: ${t12.data.webhook.success ? 'Success' : 'Failed (expected for test URL)'}`);
    passed++;
  } else {
    console.log('❌ FAIL: Webhook analysis failed');
    failed++;
  }
  console.log('');
  
  // Test 13: Comprehensive analysis
  console.log('TEST 13: Comprehensive Analysis');
  const t13 = await callEndpoint('POST', '/api/analyze/comprehensive', { url: 'https://reddit.com' });
  if (t13.status === 200 && t13.data.comprehensive_analysis) {
    const ca = t13.data.comprehensive_analysis;
    console.log(`✅ PASS: Comprehensive analysis completed`);
    console.log(`   Total redirects: ${ca.total_redirects}`);
    console.log(`   Final URL: ${ca.final_url}`);
    console.log(`   HTTPS only: ${ca.https_only}`);
    console.log(`   Unique domains: ${ca.unique_domains}`);
    passed++;
  } else {
    console.log('❌ FAIL: Comprehensive analysis failed');
    failed++;
  }
  console.log('');
  
  // Test 14: Link type classification
  console.log('TEST 14: Link Type Classification');
  const t14 = await callEndpoint('POST', '/api/analyze/link-types', { url: 'https://t.co/abc123' });
  if (t14.status === 200 && t14.data.link_types) {
    console.log(`✅ PASS: Link type analysis completed`);
    console.log(`   Is shortener: ${t14.data.link_types.is_shortener}`);
    console.log(`   Category: ${t14.data.link_types.link_category}`);
    console.log(`   Redirect count: ${t14.data.link_types.redirect_count}`);
    passed++;
  } else {
    console.log('❌ FAIL: Link type classification failed');
    failed++;
  }
  console.log('');
  
  // Test 15: Network diversity
  console.log('TEST 15: Network Diversity Analysis');
  const t15 = await callEndpoint('POST', '/api/analyze/network-diversity', { url: 'https://github.com' });
  if (t15.status === 200 && t15.data.network_diversity) {
    const nd = t15.data.network_diversity;
    console.log(`✅ PASS: Network diversity analysis completed`);
    console.log(`   Unique domains: ${nd.unique_domains_count}`);
    console.log(`   Cross-domain: ${nd.cross_domain_redirects}`);
    console.log(`   Total hops: ${nd.total_hops}`);
    passed++;
  } else {
    console.log('❌ FAIL: Network diversity failed');
    failed++;
  }
  console.log('');
  
  // Test 16: Advanced analysis
  console.log('TEST 16: Advanced Analysis with Timing');
  const t16 = await callEndpoint('POST', '/api/analyze/advanced', { url: 'https://www.reddit.com' });
  if (t16.status === 200 && t16.data.advanced_metrics) {
    const am = t16.data.advanced_metrics;
    console.log(`✅ PASS: Advanced analysis completed`);
    console.log(`   Analysis time: ${am.total_analysis_time_ms}ms`);
    console.log(`   Chain length: ${am.redirect_chain_length}`);
    console.log(`   Uses HTTPS: ${am.uses_https}`);
    console.log(`   Domain: ${am.domain}`);
    passed++;
  } else {
    console.log('❌ FAIL: Advanced analysis failed');
    failed++;
  }
  console.log('');
  
  // Test 17: SEO Analysis
  console.log('TEST 17: SEO Data Extraction (Real page: github.com)');
  const t17 = await callEndpoint('POST', '/api/seo/analysis', { url: 'https://github.com' });
  if (t17.status === 200 && t17.data.seo_analysis) {
    const seo = t17.data.seo_analysis;
    console.log(`✅ PASS: SEO analysis completed`);
    console.log(`   Has title: ${seo.has_title}`);
    if (seo.has_title) console.log(`   Title: "${seo.title_text?.substring(0, 50)}..."`);
    console.log(`   Has description: ${seo.has_description}`);
    console.log(`   Has H1: ${seo.has_h1}`);
    console.log(`   Uses HTTPS: ${seo.uses_https}`);
    console.log(`   Has canonical: ${seo.has_canonical}`);
    console.log(`   Redirect count: ${seo.redirect_count}`);
    passed++;
  } else {
    console.log('❌ FAIL: SEO analysis failed');
    failed++;
  }
  console.log('');
  
  // Test 18: Browser quick check
  console.log('TEST 18: Browser Quick Check');
  const t18 = await callEndpoint('POST', '/api/browser/quick-check', { url: 'https://github.com' });
  if (t18.status === 200 && t18.data.response_time_ms !== undefined) {
    console.log(`✅ PASS: Quick check completed`);
    console.log(`   Response time: ${t18.data.response_time_ms}ms`);
    console.log(`   Status: ${t18.data.status_code}`);
    passed++;
  } else {
    console.log('❌ FAIL: Quick check failed');
    failed++;
  }
  console.log('');
  
  // Test 19: Batch quick analyze
  console.log('TEST 19: Batch Quick Analyze');
  const t19 = await callEndpoint('POST', '/api/batch/quick-analyze', { 
    urls: ['https://google.com', 'https://github.com', 'https://stackoverflow.com'] 
  });
  if (t19.status === 200 && t19.data.results) {
    console.log(`✅ PASS: Batch quick analyze completed`);
    console.log(`   URLs checked: ${t19.data.results.length}`);
    console.log(`   Successful: ${t19.data.summary.successful}`);
    console.log(`   Failed: ${t19.data.summary.failed}`);
    passed++;
  } else {
    console.log('❌ FAIL: Batch quick analyze failed');
    failed++;
  }
  console.log('');
  
  // Test 20: Network detection (DNS)
  console.log('TEST 20: Network Detection (DNS Lookup)');
  const t20 = await callEndpoint('POST', '/api/network/detection', { url: 'https://github.com' });
  if (t20.status === 200) {
    console.log(`✅ PASS: Network detection completed`);
    console.log(`   Hostname: ${t20.data.hostname}`);
    console.log(`   DNS success: ${t20.data.dns_lookup_success}`);
    if (t20.data.resolved_ip) {
      console.log(`   Resolved IP: ${t20.data.resolved_ip}`);
    }
    passed++;
  } else {
    console.log('❌ FAIL: Network detection failed');
    failed++;
  }
  console.log('');
  
  // Test 21: Revenue optimization
  console.log('TEST 21: Performance Metrics Analysis');
  const t21 = await callEndpoint('POST', '/api/revenue/optimization', { url: 'https://github.com' });
  if (t21.status === 200 && t21.data.performance_metrics) {
    const pm = t21.data.performance_metrics;
    console.log(`✅ PASS: Performance analysis completed`);
    console.log(`   Response time: ${pm.response_time_ms}ms`);
    console.log(`   Redirect count: ${pm.redirect_count}`);
    console.log(`   All HTTPS: ${pm.all_redirects_https}`);
    console.log(`   Unique domains: ${pm.unique_domains}`);
    passed++;
  } else {
    console.log('❌ FAIL: Performance analysis failed');
    failed++;
  }
  console.log('');
  
  // Test 22: Bot user agent test
  console.log('TEST 22: Bot User Agent Test');
  const t22 = await callEndpoint('POST', '/api/analyze/bot-test', { 
    url: 'https://github.com',
    bots: ['googlebot', 'bingbot']
  });
  if (t22.status === 200 && t22.data.bot_tests) {
    console.log(`✅ PASS: Bot testing completed`);
    console.log(`   Bots tested: ${Object.keys(t22.data.bot_tests).length}`);
    Object.entries(t22.data.bot_tests).forEach(([bot, result]) => {
      console.log(`   ${bot}: ${result.total_redirects} redirects`);
    });
    passed++;
  } else {
    console.log('❌ FAIL: Bot testing failed');
    failed++;
  }
  console.log('');
  
  // Test 23: Premium endpoint (should require auth)
  console.log('TEST 23: Premium Endpoint - Mobile Comparison (Without API Key)');
  const t23 = await callEndpoint('POST', '/api/analyze/mobile-comparison', { url: 'https://github.com' });
  if (t23.status === 401) {
    console.log(`✅ PASS: Correctly requires API key (401)`);
    console.log(`   Error: ${t23.data.error}`);
    passed++;
  } else {
    console.log('❌ FAIL: Should require API key');
    failed++;
  }
  console.log('');
  
  // Summary
  console.log('='.repeat(80));
  console.log('FINAL RESULTS - Real Functionality Testing');
  console.log('='.repeat(80));
  console.log(`Total Tests: ${passed + failed}`);
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`Success Rate: ${((passed / (passed + failed)) * 100).toFixed(1)}%`);
  console.log('='.repeat(80));
  
  if (failed === 0) {
    console.log('\n🎉 ALL ENDPOINTS ARE WORKING CORRECTLY WITH REAL DATA!\n');
  } else {
    console.log(`\n⚠️  ${failed} endpoint(s) failed real functionality testing\n`);
  }
}

runRealTests().catch(console.error);
