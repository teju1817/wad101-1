const http = require('http');
const fs = require('fs');
const path = require('path');
const minimist = require('minimist');


const args = minimist(process.argv.slice(2));
const port = args.port || 3000; // Default port is 3000 if not specified


function serveHTMLFile(filePath, res) {
  const fullPath = path.join(__dirname, filePath);
  fs.readFile(fullPath, (err, content) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content);
    }
  });
}

const server = http.createServer((req, res) => {
  const { url } = req;

  if (url === '/' || url === '/home.html') {
    serveHTMLFile('home.html', res);
  } else if (url === '/project.html') {
    serveHTMLFile('project.html', res);
  } else if (url === '/registration.html') {
    serveHTMLFile('registration.html', res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});


server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
