// GET / HTTP/1.1
// Content-Type: application/json
// User-Agent: PostmanRuntime/7.30.0
// Accept: */*
// Postman-Token: 1de6de23-4396-431e-8b25-df73dcc3b155
// Host: localhost:3838
// Accept-Encoding: gzip, deflate, br
// Connection: keep-alive
// Content-Length: 24

// {
//     "job":"getget"
// }

// POST / HTTP/1.1
// Content-Type: application/json
// User-Agent: PostmanRuntime/7.30.0
// Accept: */*
// Postman-Token: c53c83a6-a474-477c-9f74-b4c065c81a9a
// Host: localhost:3838
// Accept-Encoding: gzip, deflate, br
// Connection: keep-alive
// Content-Length: 22

// {
//     "job":"hoho"
// }

const getQuery = (queryString) => {
  if (!queryString) return {};
  // 입력된 queryString이 없으면 빈 객체 반환하는 조건식

  // 만약 입력된 queryString이 있으면
  const query = {};
  // queryString을 분해해서 담을 쿼리 객체로 생성해둔다.
  queryString = queryString.split("&");
  // 각 쿼리는 &표시로 나눠진다.
  for (let i = 0; i < queryString.length; i++) {
    const temp = queryString[i].split("=");
    // temp에 나눠진 각 쿼리를 '='을 기준으로 나눈다.
    query[temp[0].trim()] = temp[1].trim();
    // name = jhk => query { name : jkh }
  }
  return query;
};

const getMessage = (lines) => {
  const headers = {};
  while (true) {
    const temp = lines.shift();
    if (!temp) break;
    // 요청에 포함된 정보에서 body를 넣기 전에 빈줄을 넣어논 상태
    // 빈줄은 lines 내에서 빈 문자열(string)으로 저장됨.
    // 헤더(headers)만 파싱하기 위해 문자열 기준으로 반복을 멈추도록 한다.
    const index = temp.indexOf(":");
    // "Content-Type: application/json" 키 : 값 상태인 것을 찾는다.
    // "Content-Type: application/json" => ["Content-Type", "application/json"] 변환

    let value = temp.slice(index + 1).trim();
    if (!isNaN(+value)) value = +value;
    headers[temp[0].toLowerCase() + temp.slice(1, index).replaceAll("-", "")] =
      temp.slice(index + 1).trim();
  }

  let body = lines.join("");
  if (body) {
    if (
      global.isJson &&
      headers["contentType"].indexOf("application/json") > -1
    ) {
      body = JSON.parse(body);
    }

    // else {
    //   headers["contentType"].indexOf("application/json") > -1;
    // }
  }
  return { headers, body };
};

const myInfo = {
  이름: "cwg",
  언어: ["js", "cs", "as", "bs"],
  기택: ["rs", "ts", "xs", "ys"],
  직장: {
    이름: "경게미",
    주소: "서강천금4층",
    전화: "010123123",
  },
};

const parser = (_data) => {
  // parser는 parsing 하는 메서드에 붙이는 이름
  // parsing은 구문 분석, 문장을 구성 성분으로 붙해하고 위계 관계를 분석하여 문장의 구조를 결정
  // 정보를 분해하고 분석하여 원하는 형태로 조립한다.
  // 사용자가 원하는 자료형(형태)로 가공한다.

  // 이 함수에 들어오는 매개변수는 클라이언트에서 요청이 들어온 데이터

  const lines = _data.split("\r\n");
  // 매개변수 _data에 들어온 데이터는 각 줄마다 설정을 한다.
  console.log("lines:", lines);

  const firstLine = lines.shift().split(" ");
  // 첫 번째 줄 요청을 보낼 때 사용한 형식 (method), 주소(라우터, url), 프로토콜의 버전 (version)이 ' '를 사이에 두고 연결되어 있다.
  console.log("firstLine:", firstLine);

  const method = firstLine[0];
  const url = firstLine[1];
  const version = firstLine[2];
  // ' '를 기준으로 나눠 각 데이터를 객체에 넣어 바환할 수 있게 한다.

  console.log("method:", method);
  console.log("url:", url);
  console.log("version:", version);

  const path = url.split("?")[0];
  const queryString = url.split("?")[1];
  // url을 라우터(path)와 쿼리스트링(queryString)으로 나눈다.
  const query = getQuery(queryString);
  // 쿼리스트링(queryString)은 다시 각 쿼리로 나누어 객체에 담아 반환한다.

  console.log("path:", path);
  console.log("queryString:", queryString);
  console.log("query:", query);

  console.log(lines);
  // 위 lines에서 .shift().split(" ")로 lines의 데이터를 모두 사용을 했기 때문에 현재 lines에는 데이터가 없음

  const dataObj = getMessage(lines);
  console.log("dataObj", dataObj);

  return { method, url, version, path, queryString, query, ...dataObj };
};

module.exports = parser;
