const net = require("net");

const reqParser = require("./lib/req");
const resParser = require("./lib/res");
const staticFunc = require("./lib/static");

global.isJson = true;
global.board = [];
global.isStatic = true;
// app.use(express.static(path.join(..., ..., ...)))

if (global.isStatic) staticFunc();

const server = net.createServer((client) => {
  client.on("data", (data) => {
    const req = reqParser(data.toString());
    const res = resParser(client, req);
    console.log(req.path);
    let isStatic = false;
    // static을 사용 안한 것으로 초기화

    if (global.isStatic) {
      // global.isStatic은 전역에 존재 하는 키
      // static이 있으면
      // const staticRoutes = staticFunc();
      if (req.method === "GET" && global.staticRoutes[req.path]) {
        // req GET형식 메서드 그리고 staticRoutes의 req.path가 있으면
        // 주소 브라우저 창으로 입력하는 것이기 때문에 POST형식은 적용이 안된다.
        console.log(global.staticRoutes[req.path]);
        isStatic = true;
        res.sendStaticFile(global.staticRoutes[req.path]);
      }
    }
    // if (req.method === "GET" && req.path === "/") {
    //   res.sendFile("index.html");
    // } else if (req.method === "GET" && req.path === "/index.css") {
    //   res.sendFile("index.css");
    // } else if (req.method === "GET" && req.path === "/index.js") {
    //   res.sendFile("index.js");
    // } else if (req.method === "GET" && req.path === "/board") {
    //   res.sendFile("board/index.html");
    // } else if (req.method === "GET" && req.path === "/board/index.js") {
    //   res.sendFile("board/index.js");
    // }
    if (!isStatic) {
      if (req.method === "GET" && req.path === "/board/list") {
        res.send(JSON.stringify(global.board));
      } else if (req.method === "POST" && req.path === "/board/add") {
        global.board.unshift(req.body.value);
        res.send(JSON.stringify(global.board));
      } else {
        res.send("404");
      }
    }
  });

  client.on("close", () => {
    console.log("요청에 대한 응답 완료");
  });
});

server.on("close", () => {
  console.log("연결이 끊겼다.");
});

server.on("connection", () => {
  console.log("연결이 생겼다.");
});

server.listen(4193, "127.0.0.1", () => {
  console.log("4193 서버를 열었다.");
});
