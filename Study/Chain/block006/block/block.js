const merkel = require("merkle");
const SHA256 = require("crypto-js").SHA256;

class BlockHeader {
  #version;
  #merkelRoot;
  #timestamp;
  #height;
  #difficulty;
  #nonce;

  constructor(_data) {
    this.#version = "1.0.0";
    this.#merkelRoot = _data
      ? merkel("sha256").sync(_data).root()
      : "0".repeat(64);
    this.setTimestamp();
    // this.setTimestamp()는 체인을 블록에 추가하는 시점의 블록생성 시간을 정의하기 위해
    // this.#timestamp = Date.now(); // Date는 Class , now()는 static
    // this.#height = _previousBlock ? _previousBlock.height + 1 : 0;
    this.#difficulty = 0;
    this.#nonce = 0;
  }
  get version() {
    return this.#version;
  }
  get merkelRoot() {
    return this.#merkelRoot;
  }
  get timestamp() {
    return this.#timestamp;
  }
  get height() {
    return this.#height;
  }
  get difficulty() {
    return this.#difficulty;
  }
  get nonce() {
    return this.#nonce;
  }

  setTimestamp() {
    this.#timestamp = Date.now();
  }
}

class Block extends BlockHeader {
  #previousHash;
  #hash;
  #data;

  constructor(_data, _previousBlock) {
    super(_data, _previousBlock);
    // super는 부모 클래스의 counstructor를 호출(실행)한다.
    this.#previousHash = _previousBlock ? _previousBlock.hash : "0".repeat(64);
    this.#hash =
      _data && _previousBlock ? Block.createHash(this) : "0".repeat(64);
    this.#data = _data;
  }
  get previousHash() {
    return this.#previousHash;
  }
  get hash() {
    return this.#hash;
  }
  get data() {
    return this.#data;
  }

  static createHash(_block) {
    let tempStr = "";
    // 블록의 정보를 임시로 합칠 string

    _block.setTimestamp();
    // _block.setTimestamp() 실행 이후 블록을 체인에 연결

    tempStr += _block.version;
    tempStr += _block.merkelRoot;
    tempStr += _block.timestamp;
    tempStr += _block.height;
    tempStr += _block.difficulty;
    tempStr += _block.nonce;
    tempStr += _block.previousHash;
    // hash는 현재 만들고 있는 키라 추가하지 않는다.
    // data는 merkelRoot로 합쳐져 있기 때문에 merkleRoot로 대처한다.
    return SHA256(tempStr).toString().toUpperCase();
  }
}

const temp = new Block(["a"]);
console.log("temp:", temp);
Block.createHash(temp);

module.exports = Block;
