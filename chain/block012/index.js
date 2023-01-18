const net = require("net");
const reqParser = require("./lib/req");
const resParser = require("./lib/res");

global.isJson = true;
global.board = ["abc", "123", "가나다"];
// global.board은 게시판 목록

const server = net.createServer((client) => {
  // TCP 서버를 만드는 과정
  client.on("data", (data) => {
    // 연결이 생성 되었을 때 서버는 연결된 클라이언트에서 요청이 들어온 것을 처리한다.
    const req = reqParser(data.toString());
    const res = resParser(client, req);
    console.log("req.pathList:", req.path);

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
    } else if (req.method === "GET" && req.path === "/board") {
      // GET 형식으로 /라우터로 요청이 왔을 때 public 폴더의 index.html 파일로 응답한다.
      res.sendFile("board.html");
    } else if (req.method === "GET" && req.path === "/board/list") {
      // app.get('board/list,(req, res)=>{}) 형태
      res.send(JSON.stringify(global.board));
      // JSON.stringify => json 형태로 변환
      // string + ify => string: 문자열로,  ify: 변환한다.

      const test = JSON.stringify(global.board);

      console.log("test:", test);
      console.log(typeof JSON.stringify(global.board));
      // 바로위 console.log의 typeof는 string으로 찍힌다.
      // string의 형태는 {"["abc","123","가나다"]"}
      // 기존 global.board = ["abc","123","가나다"] 형태를 => {"["abc","123","가나다"]"}

      // client가 받는 최종 형태는 {"["abc","123","가나다"]"}가 된다.
      console.log("/board/list: console");
    } else if (req.method === "POST" && req.path === "/board/add") {
      global.board.unshift(req.body.value);
      res.send(JSON.stringify(global.board));
    } else {
      // else가 작동하는 형식은 app.use('/*,(req, res)=>{}) 이것과 같다.
      // 요청으로 들어온 형식(GET, POST, PUT, DELETE)과 라우터가 정해진 형식(GET, POST, PUT, DELETE)과 라우터가 아닐 시 404를 응답한다.
      res.send("404");
    }

    // 위 라우터들을 switch를 사용하여 정리하는 과정
    if (req.method === "GET") {
      switch (req.path) {
        case "/":
          res.sendFile("index.html");
          break;
        case "/board":
          break;
        case "/board/list":
          break;
        case "/board/add":
          break;
        default:
          res.send("404");
      }
    }
  });

  client.on("close", () => {
    console.log("요청에 대한 응답 완료");
  });
});

server.on("close", () => {
  // 서버와 클라이언트가 연결 자체가 끊겼을 때
  // 연결된 클라이언트가 연결을 끊었을 때. res.js 10번줄 참고 Connection: Close
  console.log("연결이 끊겼다.");
});

server.on("connection", () => {
  // 서버와 클라이언트가 연결이 생성됐을 때
  // 핸드 쉐이킹이 일어남
  // 연결하는 과정이 핸드 쉐이킹

  // 핸드 쉐이킹 순서.

  // 1. 클라이언트가 요청을 서버에게 보낸다고 신호
  // 2. 서버는 클라이언트에게 응답을 보낸다고 신호 보냄
  // 3. 서버는 클라이언트에게 요청한 데이터를 보냄

  // 예) 클라이언트가 input 창에 string 데이터를 서버로 요청
  //     서버는 클라이언트 데이터를 받은 것을 원하는 걸로 파싱(변환)
  //     서버는 파싱된 데이터를 클라이언트에게 응답

  console.log("연결이 생겼다.");
});

server.listen(3838, "127.0.0.1", () => {
  // 서버를 여는 것으로 클라이언트에게 요청받을 준비를 해둔다.
  console.log("서버를 열었다.");
});
