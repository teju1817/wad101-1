const http = require("http");
const fs = require("fs");
const argv = require("minimist")(process.argv.slice(2));
let contentHome = "";
let contentProject = "";
let contentRegistration = "";
let contentCSS = "";
let contentJS = "";

fs.readFile("registration.html", (error, registration) => {
  if (error) {
    throw error;
  }
  contentRegistration = registration;
});

fs.readFile("home.html", (error, home) => {
  if (error) {
    throw error;
  }
  contentHome = home;
});

fs.readFile("project.html", (error, project) => {
  if (error) {
    throw error;
  }
  contentProject = project;
});

fs.readFile("index.css", (error, css) => {
  if (error) {
    throw error;
  }
  contentCSS = css;
});

fs.readFile("script.js", (error, js) => {
  if (error) {
    throw error;
  }
  contentJS = js;
});

const port = argv.port || 5000;
http.createServer((request, response) => {
  let url = request.url;
  if (url === "/index.css") {
    response.writeHead(200, { "Content-Type": "text/css" });
    response.write(contentCSS);
    response.end();
    return;
  } else if (url === "/script.js") {
    response.writeHead(200, { "Content-Type": "text/javascript" });
    response.write(contentJS);
    response.end();
    return;
  }

  response.writeHead(200, { "Content-Type": "text/html" });

  switch (url) {
    case "/registration":
      response.write(contentRegistration);
      break;
    case "/project":
      response.write(contentProject);
      break;
    default:
      response.write(contentHome);
      break;
  }

  response.end();
}).listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
