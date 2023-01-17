const net = require("net");
// require로 불러오는 "net"은 Node.js에서 제공하는 것으로 TCP 서버를 열 수 있는 모듈이다. (Node.js 자체에서 가지고 있는 내장모듈)

// Buffer란
// Node.js 사용하는 바이너리 데이터를 저장하는 객체
// Binary data = 2진 데이터 = 컴퓨터가 저장, 처리 등등을 계산할 때 사용
// RAM 등에 저장되는 데이터를 저장된 그대로 보여준다. (보여줄 때는 16진수로 바꿔서 보여준다.)
// 예) 2진수 <=> 16진수  0101101010101011111 <=> AC8B428
// 한번 생성하면 크기를 변경할 수 없음
// 배열에 push하는 것을 얼마나 넣을지 파악할 수 없다.
// 버퍼는 처음 정한 크기를 넘겨 저장할 수 없다.

// Buffer 생성 방법
// 1. 데이터를 받아서 버퍼로 변환한다.
const tempBuffer1 = Buffer.from("buffer test 'from'");
// <Buffer 62 75 66 66 65 72 20 74 65 73 74 20 27 66 72 6f 6d 27>
console.log("tempBuffer1:", tempBuffer1);
console.log("tempBuffer1:", tempBuffer1.toString(), tempBuffer1);

const tempBuffer2 = Buffer.from("가 각 간 갇 갈 한글 테스트'");
//  <Buffer ea b0 80 20 ea b0 81 20 ea b0 84 20 ea b0 87 20 ea b0 88 20 ed 95 9c ea b8 80 20 ed 85 8c ec 8a a4 ed 8a b8 27>
// URL Encode는 url에서 사용하는 포맷
// 예) %ea%b0%80 = 컴퓨터가 인식을 하는 한글
console.log("tempBuffer2:", tempBuffer2);
console.log("tempBuffer2:", tempBuffer2.toString(), tempBuffer2);

const tempBufferArr1 = Buffer.from([1, 2, 3, 300]);
console.log("tempBuffer1:", tempBufferArr1);
// toString을 해도 결과 값이 안나온다.
// 300을 넣을 경우 44가 찍힌다. FF는 255까지만 저장할 수 있기 때문에 300에서 256을 빼서 저장한다.
// 255이 넘는 수는 256으로 나눈 나머지 값만 저장
// 16진수 FF를 2진수로 바꾸면 1111 1111 / 8bit == 1byte
// Buffer 1칸당 1bye

const tempBufferArr2 = Buffer.from(["가", "나", "3", "4", "a", "b"]);
console.log("tempBuffer2:", tempBufferArr2);
// 배열을 버퍼로 변환 시 아이템 하나하나가 버퍼 한칸한칸으로 변환된다.
// 버퍼는 16진수로 최대 FF(255)까지만 나타낼 수 있다.

// 2. 버퍼의 길이를 정해 버퍼를 만든다.
const tempBuffer3 = Buffer.alloc(5);
tempBuffer3[3] = 255;
console.log(tempBuffer3);
console.log(tempBuffer3.length); // 버퍼의 길이
tempBuffer3.write("abcdefghijklmn");
console.log("tempBuffer3:", tempBuffer3.toString());

// JAVA는 컴퓨터가 계산, 저장하는 이진수를 그대로 가져오기 때문에 빠르다.

const tempBuffer4 = Buffer.from([99, 100, 101, 102, 103, 104, 105]);
console.log("tempBuffer4:", tempBuffer4.toString());

// toString() 영향으로 tempBuffer4 = [99, 100, 101, 102, 103, 104, 105]는
// abcde와 같은 = 아스키코드 변환화여 문자열로 변환해서 나옴

const tempBuffer5 = Buffer.from([0x62, 0x63, 0x64, 0x65, 0x66, 0x67]);
console.log("tempBuffer5:", tempBuffer5.toString(), 0x62);
// 16진수는 0xXX로 바로 작성 할 수 있다. => 0x11 = 17 (16 + 1)
// 8진수는 앞에 0을 하나 더 작성한다. => 015 => 13 (8 + 5)

const server = net.createServer((client) => {
  // TCP 서버를 생성하는 과정
  client.on("data", (data) => {
    console.log("첫 번째 data:", data);
    // 컴퓨터가 데이터를 처리할 때 이진수로 처리한다.
    // 이진수를 저장하려면 Buffer를 사용한다.
    // 그래서 data를 받으면 그 data(정보)는 Buffer이다.
    // 컴퓨터는 Buffer를 2진수로 보고 작업하는 사람은 Buffer를 16진수를 본다.

    // * 여기서 받은 매개변수 data는 문자열로 들어온다.

    console.log("data:", data.toString());
    // 브라우저 정보를 서버로 보내는 과정
    // GET / HTTP/1.1   ------> 어떤 메서드를 사용해서 어떤 라우터(주소)로 들어왔는지, 프로토콜로 보냈는지에 관한 정보를 알려준다. 쿼리스트링도 포함된다.
    // Host: localhost:3838  ------> 요청한 주소로 어떤 주소로 요청했냐
    // Connection: keep-alive  ------> Connection은 통신 연결에 대한 설정으로 keep-alive : 연결을 유지해야 한다.
    // Cache-Control: max-age=0  ------> 캐시 제어 설정으로 max-age=0  0이면 캐시를 바로 삭제한다. 숫자는 ms 단위 = 1/1000
    // sec-ch-ua: "Not_A Brand";v="99", "Google Chrome";v="109", "Chromium";v="109"  ------> 간략한 브라우저 버전 정보
    // sec-ch-ua-mobile: ?0  ------> 모바일인지 아닌지 확인
    // sec-ch-ua-platform: "Windows"  ------> OS 정보
    // Upgrade-Insecure-Requests: 1  ------> 암호화되고 인증된 응답에 대한 클라이언트 기본 설정
    // User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36  ------> 브라우저의 각종 버전 정보
    // Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9  ------> 브라우저에서 요청한 정보 타입, 앞에서부터 우선순위
    // Sec-Fetch-Site: none  ------> CORS 설정(해당 정보를 요청한 주소가 서버의 주소가 맞는지 확인하는 것으로 서버의 데이터를 조금이라도 안전하게 지키기 위해 확인한다.)
    // Sec-Fetch-Mode: navigate  ------> CORS 설정
    // Sec-Fetch-User: ?1  ------> CORS 설정
    // Sec-Fetch-Dest: document  ------> CORS 설정
    // Accept-Encoding: gzip, deflate, br  ------> 브라우저가 읽을 수 있는 인코딩
    // Accept-Language: ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7  ------> 브라우저가 이해할 수 있는 언어

    client.write(`HTTP/1.1 200 OK 
Connection: Close
Content-Type: image/avif,image/webp,image/apng,*/*;q=0.8; charset=UTF-8
Content-Length: 15

Hi Blo Hi Blo Hi Blo`);
    //  client.write() 안에 들어가는 내용은 줄바꿈, 띄어쓰기 등등 규칙을 무조건 지켜야 됨
    // 프로토콜 HTTP 상태코드 메세지
    // Connection: Close는 연결을 끊어라라는 의미
    // Content-Type: 어떤 데이터로 응답할 것인지 어떤 정보를 보낼지 포멧(확장자 등등)을 설정
    // Content-Length: 데이터의 길이로 데이터 길이로 설정한 값 보다 데이터 값 길이가 길면 짤라서 적용함
    // --------------  줄바꿈을 한번 해야 한다. 엔터 한번 치면 됨
    // Hi Block7 : 보낼 데이터 그 자체
  });
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
