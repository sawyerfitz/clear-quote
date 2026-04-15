const http = require('http');
const https = require('https');

http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  if (req.method === 'OPTIONS') { res.writeHead(200); res.end(); return; }
  
  let body = '';
  req.on('data', d => body += d);
  req.on('end', () => {
    const r = https.request({
      hostname: 'api.anthropic.com',
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY
        'anthropic-version': '2023-06-01'
      }
    }, resp => {
      res.writeHead(resp.statusCode, {'Content-Type': 'application/json'});
      resp.pipe(res);
    });
    r.write(body);
    r.end();
  });
}).listen(3001, () => console.log('Proxy running on port 3001'));
