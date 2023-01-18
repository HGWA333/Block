const net = require("net");
const reqParser = require("./lib/req");
const resParser = require("./lib/res");

global.isJson = true;
const server = net.createServer((client) => {
  client.on("data", (data) => {
    const req = reqParser(data.toString());
    const res = resParser(client, req);

    // 라우터 구현
    // req 요청으로 들어온 정보를 가져와서 path와 method에 따라 라우터를 구분하여 응답을 보낸다.
    if (req.method === "GET" && req.path === "/") {
      // GET 형식으로 /라우터로 요청이 왔을 때 public 폴더의 index.html 파일로 응답한다.
      res.sendFile("index.html");
    } else if (req.method === "GET" && req.path === "/index.css") {
      // css 파일을 GET형식으로 보낸다.
      res.sendFile("index.css");
    } else if (req.method === "GET" && req.path === "/index.js") {
      // js 파일을 GET형식으로 보낸다.
      res.sendFile("index.js");
    } else {
      // 요청으로 들어온 형식(GET, POST, PUT, DELETE)과 라우터가 정해진 형식(GET, POST, PUT, DELETE)과 라우터가 아닐 시 404를 응답한다.
      res.send("404");
    }
  });
});

server.on("close", () => {
  console.log("연결이 끊겼다.");
});

server.on("connection", () => {
  console.log("연결이 생겼다.");
});

server.listen(3838, "127.0.0.1", () => {
  console.log("서버를 열었다.");
});
