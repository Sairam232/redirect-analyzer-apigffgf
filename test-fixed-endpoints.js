#!/usr/bin/env node

/**
 * Test script for the 3 fixed API endpoints that were returning 404 errors
 * Now they return real data with proper fallbacks
 */

const TEST_URL = 'http://localhost:5000';

async function testEndpoint(name, url) {
  try {
    console.log(`\n🧪 Testing: ${name}`);
    console.log(`   URL: ${url}`);
    
    const response = await fetch(url);
    const data = await response.json();
    
    console.log(`   Status: ${response.status} ${response.ok ? '✅' : '❌'}`);
    console.log(`   Data: ${JSON.stringify(data, null, 2).substring(0, 500)}...`);
    
    return { name, url, status: response.status, ok: response.ok, data };
  } catch (error) {
    console.error(`   Error: ${error.message} ❌`);
    return { name, url, error: error.message };
  }
}

async function runTests() {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('Testing 3 Fixed API Endpoints - Real Data Validation');
  console.log('═══════════════════════════════════════════════════════════');
  
  const tests = [
    {
      name: 'Endpoint 1: /api/pricing',
      url: `${TEST_URL}/api/pricing`,
      description: 'Should return real pricing data with fallback (not 404)'
    },
    {
      name: 'Endpoint 2: /api/pricing/tiers',
      url: `${TEST_URL}/api/pricing/tiers`,
      description: 'Should return real tier data with fallback (not 404)'
    },
    {
      name: 'Endpoint 3: /api/dashboard/stats',
      url: `${TEST_URL}/api/dashboard/stats`,
      description: 'Should return real stats or zeros (not 404)'
    }
  ];
  
  const results = [];
  
  for (const test of tests) {
    console.log(`\n${test.description}`);
    const result = await testEndpoint(test.name, test.url);
    results.push(result);
  }
  
  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('Test Summary:');
  console.log('═══════════════════════════════════════════════════════════');
  
  let passed = 0;
  let failed = 0;
  
  results.forEach(result => {
    if (result.ok && result.status === 200) {
      console.log(`✅ PASS: ${result.name} - Status ${result.status}`);
      passed++;
    } else {
      console.log(`❌ FAIL: ${result.name} - ${result.error || `Status ${result.status}`}`);
      failed++;
    }
  });
  
  console.log(`\nTotal: ${passed} passed, ${failed} failed`);
  console.log('═══════════════════════════════════════════════════════════\n');
}

runTests().catch(console.error);
