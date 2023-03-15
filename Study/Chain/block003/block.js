const merkle = require("merkle");
const SHA256 = require("crypto-js/sha256");

// 블록(block)의 헤더(Header) 클래스

class Header {
  constructor(_height, _previousHash) {
    this.version = Header.getVersion();
    // 블록의 버전
    this.height = _height;
    // 블록의 높이
    this.timeStamp = Header.getTimesStamp();
    // 블록의 생성 시간
    this.previousHash = _previousHash || "0".repeat(64);
    // 이전 블록의 해시값
    // 최초 블록은 이전 블록의 해시값이 없으니
    // 값이 없으면 0으로 만들려고 문자열에 넣어준다.
    // || : 조건문 앞이 값이 없으면 뒤의 값을 반환 있으면 앞의 값을 반환
  }

  static getVersion() {
    return "1.0.0";
  }
  // static으로 만들어서 전역으로 사용할 수 있는 함수
  // class는 동적 할당을 한다. (일반적인 함수로 만들면 생성된 객체의 함수다.)
  // static으로 만들면 불필요한 데이터를 절약할 수 있다.
  static getTimesStamp() {
    return Date.now();
  }
  // 예를 들면 일반적인 함수는 New로 동적할당 할 때마다 C라는 함수가 있으면 동적할당한 A와 B에 둘다 생성한 객체 안에 들어 있지만
  // static으로 선언 하면 클래스에 전역 함수 하나만 있게 된다. 동적할 때 마다 생성 될 필요가 없는 함수는 static으로 선언 해주는 것이 좋다.
  // 사용방법  Header.getVersion() , Header.getTimesStamp()
}

class Block {
  // 블록 그 자체가 될 클래스이다. 그래서 Header(Header), Block(Body) 클래스를 나누어 놓았다.
  // 구분을 하기 위해 Header , Body를 나눔
  constructor(_header, _data) {
    this.version = _header.version;
    // 받아온 헤더의 버전을 블록에게 준다.
    this.height = _header.height;
    // 블록의 높이도 헤더에서 가져온다.
    this.timeStamp = _header.timeStamp;
    // 블록의 생성 시간

    this.previousHash = _header.previousHash;
    // 이전 블록의 해시

    this.merkleRoot = Block.getMerkleRoot(_data);
    // 블록의 머클루트

    this.hash = Block.createBlockHash(_header, Block.getMerkleRoot(_data));
    // 블록의 해시

    this.data = _data;
    // 블록의 내용
  }
  static getMerkleRoot(_data) {
    // merkle 라이브러리를 사용해서 sha256 알고리즘으로 트리구조로 만들고 루트값을 반환한다.
    const merkleRoot = merkle("sha256").sync(_data).root();
    return merkleRoot;
  }
  static createBlockHash(_header, _merkelRoot) {
    // createBlockHash 함수는 블록의 해시 값을 반환해줄 함수
    const values = Object.values(_header);
    // _header의 value들을 뽑아서 담는다.
    const data = values.join("");
    // join배열을 문자열로 합쳐주는 함수다. 매개변수로 전달된 값이 구분 점이 된다.
    // 예) 매개변수로 전달 된 값 = [1,2,3,4,5,6,7] => join("") => "123456"
    // 예) 매개변수로 전달 된 값 = [1,2,3,4,5,6,7] => join(",") => "1,2,3,4,5,6"
    // 예) 매개변수로 전달 된 값 = [1,2,3,4,5,6,7] => join("/") => "1/2/3/4/5/6"
    return SHA256(data).toString().toLocaleUpperCase();
    // 데이터를 다 더해서 블록의 값을 해싱(암호화)해서 반환 한다.
  }
}

const data = ["The", "Times", "03", "Jan", "2009"];
// 변수에 데이터 내용을 담는다.
const header = new Header(0);
// block Header 생성
// 첫 번째 생성되는 블록이라 해시 값은 넣지 않는다.
const block = new Block(header, data);
// 블록에 첫번째 매개변수로 header를 넣고 두 번째 매개변수로 data로 초기화 한 배열 데이터를 넣어준다.

console.log(block);

// 두 번째 블록
const secondeHeader = new Header(1, block.hash);
const secondeBlock = new Block(secondeHeader, ["난 두 번째 블록이야"]);

console.log(secondeBlock);

// 세 번째 블록
const ThreeHeader = new Header(2, block.hash);
const ThreeBlock = new Block(secondeHeader, ["난 세 번째 블록이야"]);
console.log(ThreeBlock);

// 네 번째 블록
const fourHeader = new Header(3, block.hash);
const fourBlock = new Block(ThreeHeader, ["난 세 번째 블록이야"]);
console.log(fourBlock);

// 다섯 번째 블록
const fiveHeader = new Header(4, block.hash);
const fiveBlock = new Block(fourHeader, ["난 세 번째 블록이야 "]);
console.log(fiveBlock);

// 여섯 번째 블록
const sixHeader = new Header(5, block.hash);
const sixBlock = new Block(fiveHeader, ["난 6 번째 블록이야 "]);
console.log(sixBlock);
