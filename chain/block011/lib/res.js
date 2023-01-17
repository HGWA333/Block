// HTTP/1.1 200 OK
// Connection: Close
// Content-Type: image/avif,image/webp,image/apng,*/*;q=0.8; charset=UTF-8
// Content-Length: 15

// Hi Blo Hi Blo Hi Blo

// ----- 파싱 -----

// 파싱은 객체나 배열안에 있는 자료형 데이터를 사용자가 원하는 것으로 변환을 하는 작업이다.
// 예) 객체를 받았는데 배열로 변환
// 예) 객체 형식의 number형 데이터를 받았는데, 배열 형식의 string형으로 변환을 하는 작업

// 파싱은 res를 파싱하는 것이 아닌 req에서 파싱을 한다.

// 파싱 순서
// 1. res = client에서 서버로 데이터를 보냄

// 2. 중간과정 = res에서 받은 데이터를 파싱한다.

// 3. req = 파싱된 데이터를 client에게 보냄

// parser 함수안의 데이터 중 data.length는 객체형식이다.
// data는 객체형식의 데이터다. 이것을 사용하기 위해서는
// Buffer 형식의 값으로 변환을 해야한다.
// Buffer 형식으로 변환을 하지 않으면 객체형식인 data.length의 길이를 확인하지 못한다.
// data를 인식하기 위해서는 기존 객체 형태를 Buffer 형식으로 변환을 해주어야 사용이 가능하다.

const fs = require("fs");
const path = require("path");

const parser = (client, req) => {
  function createMessage(data) {
    const dataBuffer = Buffer.from(data);
    // data를 Buffer 형식으로 바꿔준다.
    let contentType = req.headers.accept;
    if (contentType.indexOf("text/html") > -1) contentType = "text/html";
    client.write(`HTTP/1.1 200 OK 
Connection: Close
Content-Type: ${contentType}; charset=UTF-8
Content-Length: ${dataBuffer.length}

${dataBuffer.toString()}`);
  }
  return {
    send: (data) => {
      const messgae = createMessage(data);
      client.write(messgae);
    },
    sendFile(fileName) {
      const target = path.join(__dirname, "../public", fileName);
      const readLine = fs.readFileSync(target, "utf-8");
      const messgae = createMessage(readLine);
      client.write(messgae);
    },
  };
};

module.exports = parser;
