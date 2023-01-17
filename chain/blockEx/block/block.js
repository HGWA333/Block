const merkel = require("merkle");
const SHA256 = require("crypto-js").SHA256;

// static은 this를 사용할 수 없다. 곧 this.을 호출 할 수 없음.

class BlockHeader {
  version;
  merkelRoot;
  timestamp;
  height;
  difficulty;
  nonce;

  constructor(_data, _previousBlock) {
    this.version = "1.0.0";
    const merkelRoot = this.createMerkleRoot(_data);
    // Block에 속한 static createHash(_block) 메서드가 값을 리턴 후
    // BlockHeader에 속한 this.createMerkleRoot(_data); 요거 실행
    // merkelRoot는 객체 형태로
    // 키는 value 값은 merkel("sha256").sync(_data).root()를 가지고 있음
    if (merkelRoot.isError) {
      // isError는 객체의 키로 값은 ture와 false를 가지고 있음
      this.merkelRoot = "";
      console.error(merkelRoot.msg);
      // msg는 객체의 키로 값은 "빈배열" 이라는 string을 가지고 있음
    } else {
      this.merkelRoot = merkelRoot.value;
      // merkelRoot.value는 객체 형태로
      // 키는 value 값은 merkel("sha256").sync(_data).root()를 가지고 있음
    }
    this.setTimestamp();
    this.height = _previousBlock ? _previousBlock.height + 1 : 0;
    // 이전블록의 높이가 +1이 높거나 또는 0이면 height를 초기화
    this.difficulty = 0;
    this.nonce = 0;
  }

  setTimestamp() {
    this.timestamp = Date.now();
  }
  createMerkleRoot(_data) {
    if (!Array.isArray(_data) || !_data.length) {
      return { isError: true, msg: "data가 배열이 아니거나 빈배열." };
    }
    // 외부에서 들어온 매개변수 _data가 배열이 아니거나 매개변수로 들어오는 _data의 길이가 아니면 isError는 참이므로 msg 내용 리턴

    return { isError: false, value: merkel("sha256").sync(_data).root() };
    // if문 조건이 아니라면 키 value에  라이브러리 merkel를 sha256으로 암호화  하여 sync.(_data).root()로 전달
  }
  getDifficulty({
    previousDifficulty,
    adjustmentDifficulty,
    adjustmentTimestamp,
    DAI,
    AGtime,
  }) {
    if (this.height < DAI) {
      this.difficulty = 0;
    } else if (this.height < DAI * 2) {
      this.difficulty = 1;
    } else if (this.height % DAI !== 0) {
      this.difficulty = previousDifficulty;
    } else {
      const timeToken = this.timestamp - adjustmentTimestamp;
      console.log("블록 생성 시간 : ", this.timestamp);
      console.log("10개 전 블록 생성 시간 : ", adjustmentTimestamp);
      console.log("10개 전 블록과 현재 블록의 생성 시간 차이 : ", timeToken);
      console.log("10개당 블록 생성 시간 기준 : ", AGtime);

      if (timeToken < AGtime * 0.5) {
        this.difficulty = adjustmentDifficulty + 1;
      } else if (timeToken < AGtime * 1.5) {
        this.difficulty = adjustmentDifficulty - 1;
      } else {
        this.difficulty = adjustmentDifficulty;
      }
    }
  }
}

class Block extends BlockHeader {
  previousHash;
  hash;
  data;

  constructor(_data, _previousBlock, _adjusetmentblock, _config) {
    // 매개변수 _config는 chain.js의 Class Chain의 addBlock()에서
    //  const newBlock = new Block에 속한
    // _data, this.lastBlock, this.adjusetmentblock, this.config를
    // block.js 파일에 있는 Class Block에 _config 매개변수로 전달

    super(_data, _previousBlock);
    this.previousHash = _previousBlock ? _previousBlock.hash : "0".repeat(64);
    if (this.merkelRoot) {
      // merkleRoot가 있으면 조건문 실행
      if (_adjusetmentblock && _config) {
        this.getDifficulty({
          previousDifficulty: _previousBlock.difficulty,
          adjustmentDifficulty: _adjusetmentblock.difficulty,
          adjustmentTimestamp: _adjusetmentblock.timestamp,
          DAI: _config.DAI,
          AGtime: _config._AGtime,
        });
      }
      this.hash = Block.createHash(this);
    } else {
      this.hash = "";
    }
    this.data = _data;
  }

  static createHash(_block) {
    let tempStr = "";
    // ?
    const keys = Object.keys(_block);
    // createHash의 매개변수 __block는 객체로 들어온다.
    // 그래서객체를 배열로 변환 해주기 위해. Object.keys() 메서드를 사용하여
    // 객체를 배열로 변환 해준다.
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] === "hash" || keys[i] === "data") {
        continue;
      }
      tempStr += _block[keys[i]];
    }

    return SHA256(tempStr).toString().toUpperCase();
    // for문을 돌고 나온 값인 _block[keys[i]]은 string 형식인 빈값 tempStr에 대입 하여 리턴 하고
    // BlockHeader의 constructor로 전달
  }

  static isValidBlock(_newBlock, _previousBlock) {
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

module.exports = Block;
