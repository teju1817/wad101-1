const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const argv = require('minimist')(process.argv.slice(2));

const port = argv.port || 3000; 

http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  let filePath = path.join(
    __dirname,
    parsedUrl.pathname === '/' ? 'home.html' : parsedUrl.pathname
  );

  
  if (parsedUrl.pathname === '/registration') {
    filePath = path.join(__dirname, 'registration.html');
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
     
        res.writeHead(404);
        res.end('Page not found');
      } else {
       
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content, 'utf-8');
    }
  });
}).listen(port, () => {
  console.log(`Server running on port ${port}`);
});
