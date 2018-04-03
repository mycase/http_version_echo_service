const http = require('http');

const path = '/version';

function createServer(port) {
  const server = http.createServer((request, response) => {
    response.setHeader('Content-Type', 'application/json');

    if (request.url !== path || request.method !== 'GET') {
      const body = { error: 'Unknown path' };
      response.statusCode = 404;
      response.end(JSON.stringify(body));
      return;
    }

    const { httpVersion } = request;
    const body = { httpVersion };
    response.end(JSON.stringify(body));
  });

  server.listen(port, (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
      return;
    }

    console.log(`Server is listening on ${port}`);
  });

  return server;
}

module.exports = { createServer };
