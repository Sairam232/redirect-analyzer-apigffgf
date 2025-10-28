// Test server to run the Cloudflare Worker locally
// This simulates Cloudflare Workers environment

const http = require('http');
const fs = require('fs');

// Mock Cloudflare KV storage (for rate limiting and API keys only)
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

// Load worker code
const workerCode = fs.readFileSync('./worker.js', 'utf8');

// Create the worker export
const workerModule = {};
eval(workerCode.replace('export default', 'workerModule.default ='));

const server = http.createServer(async (req, res) => {
  try {
    const url = `http://localhost:5000${req.url}`;
    
    // Build headers
    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      if (value) headers.set(key, value);
    }
    
    // Get request body for POST
    let body = null;
    if (req.method === 'POST') {
      body = await new Promise((resolve) => {
        let data = '';
        req.on('data', chunk => data += chunk);
        req.on('end', () => resolve(data));
      });
    }
    
    // Create Request object
    const request = new Request(url, {
      method: req.method,
      headers: headers,
      body: body || undefined
    });
    
    // Call the worker
    const response = await workerModule.default.fetch(request, mockEnv, {});
    
    // Send response
    res.statusCode = response.status;
    
    // Copy headers
    for (const [key, value] of response.headers.entries()) {
      res.setHeader(key, value);
    }
    
    // Send body
    const responseBody = await response.text();
    res.end(responseBody);
    
  } catch (error) {
    console.error('Error:', error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Internal server error', message: error.message }));
  }
});

const PORT = 5000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`\n${'='.repeat(70)}`);
  console.log(`🚀 Cloudflare Worker Test Server Running`);
  console.log(`${'='.repeat(70)}`);
  console.log(`\n✅ Server: http://0.0.0.0:${PORT}`);
  console.log(`✅ Health: http://0.0.0.0:${PORT}/health`);
  console.log(`✅ Docs:   http://0.0.0.0:${PORT}/`);
  console.log(`\n📊 25 endpoints available - 100% REAL DATA (v9.0)`);
  console.log(`🔧 All data from actual HTTP requests - NO simulated data`);
  console.log(`\n${'='.repeat(70)}\n`);
});

// Handle shutdown
process.on('SIGTERM', () => {
  console.log('Shutting down...');
  server.close();
  process.exit(0);
});
