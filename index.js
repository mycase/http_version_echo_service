const { createServer } = require('./lib/server');

const port = process.env.PORT;
createServer(port);
