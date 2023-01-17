const merkel = require("merkle");
const SHA256 = require("crypto-js").SHA256;

class BlockHeader {
  version;
  merkelRoot;
  timestamp;
  height;
  difficulty;
  nonce;
  // private 키로 정의(생성)할 경우 키들이 객체에서 보이지 않는다.
  // 후에 통신할 때 다른 처리를 하려 했으니 쉽게 가기 위해서 private를 취소한다.

  constructor(_data, _previousBlock) {
    this.version = "1.0.0";
    // this.merkelRoot = _data
    //   ? merkel("sha256").sync(_data).root()
    //   : "0".repeat(64);
    const merkelRoot = this.createMerkleRoot(_data);
    // 머클루트 생성 메서드 호출
    if (merkelRoot.isError) {
      this.merkelRoot = "";
      console.error(merkelRoot.msg);
    } else {
      this.merkelRoot = merkelRoot.value;
    }
    this.setTimestamp();
    // this.setTimestamp()는 체인을 블록에 추가하는 시점의 블록생성 시간을 정의하기 위해
    // this.timestamp = Date.now(); // Date는 Class , now()는 static
    this.height = _previousBlock ? _previousBlock.height + 1 : 0;
    this.difficulty = 0;
    this.nonce = 0;
  }
  // version() {
  //   return this.version;
  // }
  // merkelRoot() {
  //   return this.merkelRoot;
  // }
  // timestamp() {
  //   return this.timestamp;
  // }
  // height() {
  //   return this.height;
  // }
  // difficulty() {
  //   return this.difficulty;
  // }
  // nonce() {
  //   return this.nonce;
  // }

  setTimestamp() {
    this.timestamp = Date.now();
    // 밀리초(ms 0.001초 1000/1초)
  }
  createMerkleRoot(_data) {
    if (!Array.isArray(_data) || !_data.length) {
      // Array.isArray는 매개변수가 배열인지 확인 하는 검사하는 용도
      return { isError: true, msg: "data가 배열이 아니거나 빈배열." };
      // 인수로 들어온 매개변수 _data가 배열이 아니면 isError는 참
    }
    return { isError: false, value: merkel("sha256").sync(_data).root() };
    // 인수로 들어온 매개변수 _data가 배열이면 isError는 거짓으로 value키의 값에는  merkel("sha256").sync(_data).root()를 담아 리턴
  }
}

class Block extends BlockHeader {
  previousHash;
  hash;
  data;

  constructor(_data, _previousBlock) {
    super(_data, _previousBlock);
    // super는 부모 클래스의 counstructor를 호출(실행)한다.
    this.previousHash = _previousBlock ? _previousBlock.hash : "0".repeat(64);
    // this.hash =
    // _data && _previousBlock ? Block.createHash(this) : "0".repeat(64);
    if (this.merkelRoot) {
      // merkelRoot가 있으면 정상적인 배열로된 데이터가 입력(전달)되었다.
      this.hash = Block.createHash(this);
    } else {
      // merkelRoot가 없으면 정상적인 배열이 아닌 데이터가 입력(전달)되었다.
      this.hash = "";
      // 이후 오류 발생 여부 확인
    }
    this.data = _data;
  }
  previousHash() {
    return this.previousHash;
  }
  hash() {
    return this.hash;
  }
  data() {
    return this.data;
  }

  static createHash(_block) {
    let tempStr = "";
    // 블록의 정보를 임시로 합칠 string

    // _block.setTimestamp();
    // _block.setTimestamp() 실행 이후 블록을 체인에 연결

    // tempStr += _block.version;
    // tempStr += _block.merkelRoot;
    // tempStr += _block.timestamp;
    // tempStr += _block.height;
    // tempStr += _block.difficulty;
    // tempStr += _block.nonce;
    // tempStr += _block.previousHash;

    // hash는 현재 만들고 있는 키라 추가하지 않는다.
    // data는 merkelRoot로 합쳐져 있기 때문에 merkleRoot로 대처한다.

    const keys = Object.keys(_block);
    // Object.keys는 객체의 키들을 배열로 가져온다.(배열로 반환 리턴함)
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] === "hash" || keys[i] === "data") {
        continue;
        // continue는 for 나 while 같은 반복문에서 아래의 코드를 실행하지 않고 for 반복문을 실행
        // i가 0일 때 continue 시 아래의 코드를 실행하지 않고 위로 올라가 i++ 부터 실행하거나 건너뛴다.
      }
      tempStr += _block[keys[i]];
    }
    return SHA256(tempStr).toString().toUpperCase();
  }
  static isValidBlock(_newBlock, _previousBlock) {
    // 생성된 블록이 정상인지 확인 하는 용도
    if (_newBlock.height !== _previousBlock.height + 1) {
      return { isError: true, msg: "높이가 다르다." };
    }
    if (_newBlock.previousHash !== _previousBlock.hash) {
      return {
        isError: true,
        msg: "이전 블록의 hash와 새로운 블록의 이전 hash가 다르다.",
      };
    }
    if (_newBlock.hash !== Block.createHash(_newBlock)) {
      return {
        isError: true,
        msg: "hash 생성 중 오류 발생",
      };
    }
    return { isError: false, value: _newBlock };
  }
}

// const temp = new Block([]);
const temp = new Block(["a"]);
console.log("temp:", temp);
Block.createHash(temp);

module.exports = Block;
