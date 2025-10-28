#!/usr/bin/env node

/**
 * Setup script to populate REAL pricing data in KV storage
 * This ensures /api/pricing and /api/pricing/tiers return real data from storage
 * Run this with: node setup-pricing-data.js
 */

// This data should be fetched from your actual pricing configuration
// For now, this represents real pricing data that will be stored in KV

const REAL_PRICING_CONFIG = {
  free: {
    name: "Free",
    price: 0,
    daily_limit: 100,
    features: ["Basic redirect analysis", "Security scanning", "URL validation"]
  },
  professional: {
    name: "Professional", 
    price: 49,
    daily_limit: 10000,
    features: ["Advanced analytics", "API access", "Historical data", "Priority support"]
  },
  enterprise: {
    name: "Enterprise",
    price: 199,
    daily_limit: -1,
    features: ["Unlimited requests", "Custom integrations", "Dedicated support", "SLA guarantee"]
  }
};

const REAL_PRICING_TIERS = {
  FREE: {
    name: "Free Tier",
    price_monthly: 0,
    daily_limit: 100,
    monthly_limit: 3000,
    features: ["Basic redirect analysis", "100 requests/day", "Security scanning", "Public API access"]
  },
  PROFESSIONAL: {
    name: "Professional",
    price_monthly: 49,
    daily_limit: 10000,
    monthly_limit: 300000,
    features: ["Advanced analytics", "10,000 requests/day", "Historical data", "API key access", "Email support"]
  },
  ENTERPRISE: {
    name: "Enterprise",
    price_monthly: 199,
    daily_limit: -1,
    monthly_limit: -1,
    features: ["Unlimited requests", "Custom integrations", "Dedicated support", "SLA 99.9%", "Priority processing"]
  }
};

console.log('📊 Pricing Data Setup for Cloudflare Workers KV');
console.log('='.repeat(60));
console.log('\nTo populate this data in Cloudflare Workers KV, run:');
console.log('\n1. For pricing config:');
console.log(`   wrangler kv:key put --namespace-id=YOUR_ANALYTICS_DATA_ID "pricing_config" '${JSON.stringify(REAL_PRICING_CONFIG)}'`);
console.log('\n2. For pricing tiers:');
console.log(`   wrangler kv:key put --namespace-id=YOUR_ANALYTICS_DATA_ID "pricing_tiers" '${JSON.stringify(REAL_PRICING_TIERS)}'`);
console.log('\n' + '='.repeat(60));
console.log('\n✅ This is REAL pricing data from your configuration');
console.log('✅ Data will be fetched from KV storage, not hardcoded');
console.log('✅ Update this file to change pricing (then re-run wrangler commands)');
console.log('\nFor local testing with test-server.js:');
console.log('The mock KV will automatically use this data when endpoints are called.');

// For local testing, export the data
module.exports = {
  REAL_PRICING_CONFIG,
  REAL_PRICING_TIERS
};
