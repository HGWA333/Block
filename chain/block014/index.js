const net = require("net");

const reqParser = require("./lib/req");
const resParser = require("./lib/res");
const staticFunc = require("./lib/static");
const templateFunc = require("./lib/temple");

global.isJson = true;
global.board = [];
global.isStatic = false;
// SSR 구현할 때는 static 방식을 사용하지 않는다.
// 서버에서 수정해서 보내기 때문에 isStatic을 false로 변경

// app.use(express.static(path.join(..., ..., ...)))
// SSR, Server Side Rendering : 화면을 서버에서 구성하여 클라이언트에게 보낸다. (랜더링을 서버에서 처리한다.)
// 예) HTML 파일을 서버에서 만들어서 응답
// CSR, Client Side Rendering : 서버에서 응답한 데이터를 Clinet, 브라우저에서 엘리먼트 등을 생성하여 완성한다.
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

    if (!isStatic) {
      if (req.method === "GET" && req.path === "/") {
        const temp = templateFunc(
          // createHtml(서버)에 string 형식으로 데이터를 보낸다.
          // string형식으로 받은 createHtml(서버)은 서버에서 데이터를 가공하여 클라이언트에게 보내준다.
          // templateFunc("index.html", {})
          // 첫 번째 매개변수 경로에 두 번째 매개변수로 키와 값인 객체형태의 데이터를 temple.js의 createHtml에 보낸다.
          "index.html",
          {
            title: "SSR 테스트중",
            text: req.query.text || "SSR 처음 써봄 ",
            link: "/board",
            linkName: "게시판",
          },
          { styleName: "index.css", scriptName: "index.js" }
          // 기존 "index.css"를 객체를 만들어 넣은 이유는 "index.js"를 scriptName로 초기화 하여
          // 사용할 데이터를 추가하기 위해서 만들었다. 즉 여러개 파일을 넣기 위해서 객체화 함
        );
        res.send(temp);
        // templateFunc을 temp로 초기화 해서 res.send에 담아  GET 형식으로 보내준다.
      } else if (req.method === "GET" && req.path === "/index.js") {
        res.sendFile("index.js");
      } else if (req.method === "GET" && req.path === "/board") {
        const temp = templateFunc(
          "board/index.html",
          {
            li: global.board,
            // "board/index.html" 경로에 객체화 한 {li:[]} 이런 형식으로 보내기 위한 세팅을 해둠.
          },
          { scriptName: "board/index.js" }
          // "board/index.html" 경로에 객체화 한 {scriptName:"board/index.js"} 이런 형식으로 보내기 위한 세팅을 해둠.
        );
        res.send(temp);
        // 위 templateFunc로 temp로 초기화 하여 GET 형식으로 res.send()를 사용하여 /board 경로로 보낸다.
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
