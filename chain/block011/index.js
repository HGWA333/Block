const net = require("net");
const reqParser = require("./lib/req");
const resParser = require("./lib/res");

global.isJson = true;
// app.use(express.json())
const server = net.createServer((client) => {
  client.on("data", (data) => {
    console.log("첫 번째 data:", data);
    console.log("data:", data.toString());

    const req = reqParser(data.toString());
    console.log("req:", req);

    const res = resParser(client, req);
    // res.send(data);

    res.sendFile("index.html");

    //     client.write(`HTTP/1.1 200 OK
    // Connection: Close
    // Content-Type: image/avif,image/webp,image/apng,*/*;q=0.8; charset=UTF-8
    // Content-Length: 15

    // Hi Blo Hi Blo Hi Blo`);
  });
});
// client는 client 객체

server.on("close", () => {
  console.log("연결이 끊겼다.");
});

server.on("connection", () => {
  console.log("연결이 생겼다.");
});

server.listen(3838, "127.0.0.1", () => {
  console.log("서버를 열었다.");
});
