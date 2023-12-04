const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const argv = require('minimist')(process.argv.slice(2));

const port = argv.port || 3000; // Default port is 3000 or use the port provided in the command line argument

http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  let filePath = path.join(__dirname, parsedUrl.pathname);

  if (parsedUrl.pathname === '/registration') {
    // Serve the merged registration.html file
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
      let contentType = 'text/html';
      const ext = path.extname(filePath);

      if (ext === '.js') {
        contentType = 'text/javascript';
      } else if (ext === '.css') {
        contentType = 'text/css';
      }

      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
}).listen(port, () => {
  console.log(`Server running on port ${port}`);
});
