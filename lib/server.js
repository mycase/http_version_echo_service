const http = require('http');

const path = '/version';

function createServer(port, host) {
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

  function onError(err) {
    if(err.code == 'EADDRINUSE') {
      console.error(`${host}:${port} is already in use, please try another port...`);
    } else {
      console.error(err);
    }
    process.exit(1);
  }

  server.once('error', onError);
  server.listen(port, host, () => {
    console.log(`Server is listening on ${host}:${port}`);
  });

  return server;
}

module.exports = { createServer };
