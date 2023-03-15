const merkle = require("merkle");
const SHA256 = require("crypto-js").SHA256;
const hexToBinary = require("hex-to-binary");
// static은 this를 사용할 수 없다. 곧 this.을 호출 할 수 없음.
// BlockHeader에는 버전, 머클루트, 타임스탬프, 높이, 난이도, 시도 횟수의 데이터가 있다.
// BlockHeader의 주 용도는 Block에서 사용할 데이터를 생성하여 상속 하여 사용한다.
// 그 이유는 Header와 Body를 임시적으로라도 구분을 하기 위해서 이다.
class BlockHeader {
  version;
  merkleRoot;
  timestamp;
  height;
  difficulty;
  nonce;

  constructor(_data, _previousBlock) {
    // constructor가 받는 매개변수 중 _previousBlock는 받을 수가 없다.
    // 보내는 곳이 없기 때문이다.
    this.version = "1.0.0";
    const merkleRoot = this.createMerkleRoot(_data);
    if (merkleRoot.isError) {
      this.merkleRoot = "";
      console.error(merkleRoot.msg);
    } else {
      this.merkleRoot = merkleRoot.value;
    }

    this.setTimestamp();
    this.height = _previousBlock ? _previousBlock.height + 1 : 0;
    this.difficulty = 0;
    this.nonce = 0;
  }

  setTimestamp() {
    this.timestamp = Date.now();
  }

  createMerkleRoot(_data) {
    if (!Array.isArray(_data) || !_data.length) {
      return { isError: true, msg: "data가 배열이 아니거나 빈 배열" };
      // 데이터가 배열이 아니거나 배열의 길이가 없을 때 빈 배열로 판단.
      // length 자체는 배열인지 아닌지 판별 할 수 있음. 객체는 count
    }
    return { isError: false, value: merkle("sha256").sync(_data).root() };
  }

  getDifficulty({
    // getDifficulty() 역시 설정의 용도로 Class Block에 속한
    // updateBlock(difficultyOptions를) 메서드에 difficultyOptions를 변수로 넣고 (매개변수 아님)
    // updateBlock() 안의 this.getDifficulty(difficultyOptions)로 넣고
    // difficultyOptions의 값은 let hashBinary = this.hash; 이것이다.
    // 여기서 this.difficulty 값은 0 이다.
    // getDifficulty에 속한 조건문을 4개를 통하여 난이도를 조절 할 수 있다.

    // 가져온 곳은 BlockHeader에게 상속 받은 constructor this.difficulty = 0;

    previousDifficulty, // 이전 블록의 난이도
    adjustmentDifficulty, // 난이도 조절 단위 개수 이전의 블록의 난이도, 10개 전 블록의 난이도
    adjustmentTimestamp, // 난이도 조절 단위 개수 이전의 블록의 생성 시간, 10개 전 블록의 생성 시간
    DAI, // 난이도 조절 단위 개수
    averageGenerationTime, // 블록 세대당 생성 시간, 블록 10개당 생성 시간
  }) {
    if (this.height < DAI) {
      this.difficulty = 0;
    } else if (this.height < DAI * 2) {
      this.difficulty = 1;
    } else if (this.height % DAI !== 0) {
      this.difficulty = previousDifficulty;
    } else {
      const timeToken = this.timestamp - adjustmentTimestamp;

      // console.log("블록 생성 시간 : ", this.timestamp);
      // console.log("10개 전 블록 생성 시간 : ", adjustmentTimestamp);
      // console.log("10개 전 블록과 현재 블록의 생성 시간 차이 : ", timeToken);
      // console.log("10개당 블록 생성 시간 기준 : ", averageGenerationTime);

      if (timeToken < averageGenerationTime * 0.5) {
        this.difficulty = adjustmentDifficulty + 1;
      } else if (timeToken > averageGenerationTime * 1.1) {
        this.difficulty = adjustmentDifficulty - 1;
      } else {
        this.difficulty = adjustmentDifficulty;
      }
    }
  }
}

// Block에는 BlockHeader의 constructor를 상속을 받고
// 상속 받는 데이터는 총 6가지다.
// 버전, 시간, 난이도, 시도 횟수 , 머클루트, 높이를 상속 받는다.
// 여기서 중요한 건 머클루트와 높이는 조건에 따라서 다르게 상속을 받는다.
// 머클루트의 조건 중 merkleRoot.isError 데이터 값을 가지고 있다면
// 머클루트는 "" string 형식의 빈값으로 초기화 되고
// 만약 merkleRoot.isError 값이 들어오지 않는다면
// 머클루트는 merkleRoot.value 값을 대입하여 초기화 한다.
// 높이는 이전 블록의 높이가 + 1일 때 혹은 0일 경우 둘 중에 해당 되는 값을 보내준다.

class Block extends BlockHeader {
  previousHash;
  hash;
  data;

  constructor(_data, _previousBlock, _adjustmentBlock, _config) {
    // Class Block은 사용자가 입력한 []형식의 _data를 매개변수로 받고

    // _previousBlock는 block.test.js의 describe("difficulty check")에서
    // ["이전 블록"] 형태로 받는다.

    // _adjustmentBlock와 _config는 chain.js의 Class Chain에 속한
    //addBlock()에서 받아온다.

    super(_data, _previousBlock);
    this.previousHash = _previousBlock ? _previousBlock.hash : "0".repeat(64);
    if (this.merkleRoot) {
      if (_adjustmentBlock && _config) {
        this.getDifficulty({
          previousDifficulty: _previousBlock.difficulty,
          adjustmentDifficulty: _adjustmentBlock.difficulty,
          adjustmentTimestamp: _adjustmentBlock.timestamp,
          DAI: _config.DAI,
          averageGenerationTime: _config.averageGenerationTime,
        });
      }

      this.hash = Block.createHash(this);
    } else {
      this.hash = "";
    }

    if (_adjustmentBlock && _config) {
      this.updateBlock({
        // updateBlock도 getDifficulty 값을 사용하기 때문에 그대로 값을 넘기기 때문에 사용
        // 문제풀이 추가
        // 문제를 풀어야지만 체인을 블록에 넣을 수 있음
        previousDifficulty: _previousBlock.difficulty,
        adjustmentDifficulty: _adjustmentBlock.difficulty,
        adjustmentTimestamp: _adjustmentBlock.timestamp,
        DAI: _config.DAI,
        averageGenerationTime: _config.averageGenerationTime,
      });
    }

    this.data = _data;
    console.log(this);
  }

  static createHash(_block) {
    let tempStr = "";

    const keys = Object.keys(_block);
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] === "hash" || keys[i] === "data") {
        continue;
      }
      tempStr += _block[keys[i]]; // string 형식
    }

    return SHA256(tempStr).toString().toUpperCase();
  }

  updateBlock(difficultyOptions) {
    let hashBinary = this.hash;
    // 현재 들어오는 해쉬는 16진수로
    // 현재 hash를 2진수로 변환한다.
    // 난이도는 2진수로 바꿔서 확인

    // 16진수 3 => 10진수 3 => 2진수 0011
    // 16진수 A => 10진수 10 => 2진수 1010
    // 16진수 F => 10진수 15 => 2진수 1111
    // difficulty == 1 일 때 2진수에서 0으로 시작 "16진수 8보다 작으면 된다."
    // 16진수의 8은 2진수의 1000이고 그보다 작은 0111, 7 이하의 숫자면 가능

    // difficulty == 2 일 때 hash의 첫 자리는 3 이하면 된다."
    // 0011 => 3 => 16진수에도 3 (0011, 0010, 0001, 0000)

    // 여기서 부터 2진수
    while (!hashBinary.startsWith("0".repeat(this.difficulty))) {
      // startsWith()는 hashBinary 0의 갯수가 difficulty와 같은지 확인
      // startsWith는 string의 메서드로 시작하는 문장(string)을 확인
      this.nonce += 1;
      // hash가 변경될 수 있도록 nonce를 증가시킨다.
      // 문제를 풀어야 블록 생성 시간을 확인 할 수 있음

      this.setTimestamp();
      // 블록 생성 시간은 chain에 추가되는 시간이기 때문에 문제 풀이 시점을 생성 시간으로 재설정(재정의)한다.
      // 현재 시간이 바뀌었으니 난이도를 재설정(재정의)

      this.getDifficulty(difficultyOptions);
      // difficultyOptions 라는 변수로 넣은 이유는 updateBlock 메서드 또한 매개변수로 해당정보를 받아와야하기 때문
      // 시간이 재설정이 되었기 때문에 기준 시간과 비교하여 난이도를 재설정(재정의)

      // hash 재설정이 끝나 Block.createHash에 다시 넣어줌
      this.hash = Block.createHash(this);
      // 변경된 값에 따라서 hash를 다시 설정한다.

      hashBinary = hexToBinary(this.hash);
      // 2진수로 바뀌어 while의 조건문(문제 조건)에 해당하지 않는지 확인한다.
      // while의 조건문이 부정이기 때문에 해당하지 않으면 문제 해결
    }
    console.log(hashBinary);
    console.log(hashBinary.slice(0, this.difficulty));
  }
  // 난이도와 논스를 사용해서 문제를 푸는 메서드
  // 난이도와 논스의 문제는 difficulty 알고리즘 이라고 한다.

  // difficulty 알고리즘은

  //  1. 2진수로 변화하여 앞의 0의 갯수와 difficulty와 비교하여 difficulty 보다 0의 갯수가 많으면 문제를 해결한 것이다.
  //  Block의 암호화된 hash는 64자리의 16진수 수로 이루어져 있다.

  //  2. hash를 2진수로 바꾸고 2진수의 숫자의 맨 앞자리에서부터 연속되는 0의 갯수가
  //  difficulty 보다 크면 해결한 것이고 그것이 아니면 해결하지 못한 것으로 처리

  // 예1) hash == AAAA => 1010 1010 1010 1010
  // difficulty가 0이면 0이 0개 있으면 해결로  바로 위 hash는 해결 상태

  // difficulty가 1이면 0이 1개  있으면 해결로 바로 위 hash는 해결 하지 못함

  // 예2) hash == 1AAA => 0001 1010 1010 1010
  // difficulty가 0이면 0이 0개 있으면 해결로  바로 위 hash는 해결 상태

  // difficulty가 1이면 0이 1개 있으면 해결로  바로 위 hash는 해결 상태

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
      return { isError: true, msg: "hash 생성 중 오류 발생" };
    }
    return { isError: false, value: _newBlock };
  }
}

module.exports = Block;
