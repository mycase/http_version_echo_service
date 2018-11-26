# HTTP Version Echo Service

[![Greenkeeper badge](https://badges.greenkeeper.io/appfolio/http_version_echo_service.svg)](https://greenkeeper.io/)

This project runs an HTTP server that tells you what HTTP version you used to make your request.

## Usage

```
yarn install
PORT=3000 yarn start
```

```
$ curl -v http://localhost:3000/version
*   Trying ::1...
* TCP_NODELAY set
* Connected to localhost (::1) port 3000 (#0)
> GET /version HTTP/1.1
> Host: localhost:3000
> User-Agent: curl/7.54.0
> Accept: */*
>
< HTTP/1.1 200 OK
< Content-Type: application/json
< Date: Fri, 30 Mar 2018 01:01:41 GMT
< Connection: keep-alive
< Content-Length: 21
<
* Connection #0 to host localhost left intact
{"httpVersion":"1.1"}%
```

```
$ curl -v --http1.0 http://localhost:3000/version
*   Trying ::1...
* TCP_NODELAY set
* Connected to localhost (::1) port 3000 (#0)
> GET /version HTTP/1.0
> Host: localhost:3000
> User-Agent: curl/7.54.0
> Accept: */*
>
< HTTP/1.1 200 OK
< Content-Type: application/json
< Date: Fri, 30 Mar 2018 01:02:07 GMT
< Connection: close
<
* Closing connection 0
{"httpVersion":"1.0"}%
```

## Usage in Docker

```
docker build -t version-echo .
docker run -ti -p 3000:3000 --rm version-echo
```
