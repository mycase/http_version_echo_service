# HTTP Version Echo Service

This project runs an HTTP server that tells you what HTTP version you used to make your request.

## Usage

```
yarn install
PORT=3000 HOST=localhost yarn start
```

```
$ curl -v4 http://localhost:3000/version
*   Trying 127.0.0.1...
* TCP_NODELAY set
* Connected to localhost (127.0.0.1) port 3000 (#0)
> GET /version HTTP/1.1
> Host: localhost:3000
> User-Agent: curl/7.54.0
> Accept: */*
>
< HTTP/1.1 200 OK
< Content-Type: application/json
< Date: Tue, 03 Apr 2018 23:50:27 GMT
< Connection: keep-alive
< Content-Length: 21
<
* Connection #0 to host localhost left intact
{"httpVersion":"1.1"}%
```

```
$ curl -v4 --http1.0 http://localhost:3000/version
*   Trying 127.0.0.1...
* TCP_NODELAY set
* Connected to localhost (127.0.0.1) port 3000 (#0)
> GET /version HTTP/1.0
> Host: localhost:3000
> User-Agent: curl/7.54.0
> Accept: */*
>
< HTTP/1.1 200 OK
< Content-Type: application/json
< Date: Tue, 03 Apr 2018 23:50:50 GMT
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
