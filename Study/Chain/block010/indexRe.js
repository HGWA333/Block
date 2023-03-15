const net = require("net");

// Buffer 생성 방법
// 1. 데이터를 받아서 버퍼로 변환한다.
const tempBuffer1 = Buffer.from("buffer test 'from'");
console.log("tempBuffer1:", tempBuffer1.toString(), tempBuffer1);

// 2. 버퍼의 길이를 정해 버퍼를 만든다.
const tempBuffer3 = Buffer.alloc(5);
console.log(tempBuffer3.length); // 버퍼의 길이

// TCP 서버를 생성하는 과정
const server = net.createServer((client) => {
  // SYN 단계
  client.on("data", (data) => {
    console.log("첫 번째 data:", data.toString(), data);
  });

  // ACK 단계
  client.write(`HTTP/1.1 200 OK 
  Connection:Close
  Content-Type:image/avif,image/webp,image/apng,*/*;q=0.8;
  charset=UTF-8
  Content-Length:10
  
  Hi Block7`);
  // 프로토콜 HTTP 상태코드 메세지
  // Connection: Close는 연결을 끊어라라는 의미
  // Content-Type: 어떤 데이터로 응답할 것인지 어떤 정보를 보낼지 포멧(확장자 등등)을 설정
  // Content-Length: 데이터의 길이
  // --------------  줄바꿈을 한번 해야 한다. 엔터 한번 치면 됨
  // Hi Block7 : 보낼 데이터 그 자체
});

server.on("close", () => {
  // Socket 통신과 같은 방식으로 통신에 대한 이벤트를 추가해준다.
  console.log("연결이 끊겼다.");
});

server.on("connection", () => {
  console.log("연결이 생겼다.");
});

server.listen(3838, "127.0.0.1", () => {
  // listen는 서버가 받아 들일 준비를 하는 용도
  // client의 요청을 받을 수 있도록 대기한다.
  console.log("서버를 열었다.");
});
