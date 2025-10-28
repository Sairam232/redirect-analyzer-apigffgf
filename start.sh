#!/bin/bash
# Start the Cloudflare Worker test server
# This runs all 34 endpoints with 100% REAL DATA
# No simulated or fake data - everything uses actual HTTP requests

echo "Starting Redirect Chain Analyzer API..."
echo "All 34 endpoints use REAL DATA from actual HTTP requests"
echo ""

node test-server.js
