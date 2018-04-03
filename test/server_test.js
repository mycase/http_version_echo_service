const assert = require('assert');
const http = require('http');
const net = require('net');
const { Buffer } = require('buffer');
const { createServer } = require('../lib/server');

describe('HTTP version echo server', function () {
  before(function () {
    this.host = 'localhost';
    this.port = 8080;
    this.server = createServer(this.port);
    this.path = '/version';
  });

  after(function () {
    this.server.close();
  });

  it('should return http version 1.1 for a http 1.1 request', function (done) {
    const options = {
      hostname: this.host,
      port: this.port,
      path: this.path,
      headers: {
        Accept: 'application/json',
      },
    };
    const req = http.request(options, (res) => {
      assert.equal(res.statusCode, 200);
      assert.equal(res.headers['content-type'], 'application/json');

      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => {
        const buffer = Buffer.concat(chunks);
        const response = JSON.parse(buffer.toString('utf8'));
        assert.deepStrictEqual(response, { httpVersion: '1.1' });
        done();
      });
    });

    req.on('error', (e) => {
      console.error(`problem with request: ${e.message}`);
    });

    req.end();
  });

  it('should return http version 1.0 for a http 1.0 request', function (done) {
    const opts = {
      host: this.host,
      port: this.port,
    };

    const socket = net.connect(opts, () => {
      const lines = [
        `GET ${this.path} HTTP/1.0`,
        'Accept: application/json',
      ];
      const crlf = '\r\n';
      const request = lines.join(crlf) + crlf + crlf;
      socket.end(request);
    });

    const chunks = [];
    socket.on('data', (chunk) => { chunks.push(chunk); });
    socket.on('error', console.error);
    socket.on('end', () => {
      const buffer = Buffer.concat(chunks);
      const response = buffer.toString('utf8');
      assert(/HTTP\/1.1 200 OK/.test(response));
      assert(/Content-Type: application\/json/.test(response));
      assert(/{"httpVersion":"1.0"}/.test(response));
      done();
    });
  });
});
