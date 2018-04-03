const { createServer } = require('./lib/server');

const port = process.env.PORT;
const host = process.env.HOST || '0.0.0.0';
createServer(port, host);
