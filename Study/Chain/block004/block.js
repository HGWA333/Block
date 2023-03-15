const IBlock = require("./block.interface");
// 블록 인터페이스 가져온다.

const {
  lib: { merkle, SHA256, hexToBinary },
  constant: {
    DIFFICULTY_ADJUSTMENT_INTERVAL,
    BLOCK_GERATION_INTERVAL,
    TIME_UNIT,
  },
} = require("./config");

class Block extends IBlock {
  // Block에 IBlock의 인터페이스를 상속한다.
  constructor() {
    // 부모 함수 사용
    super();
  }
  create(_previousBlock, _adjustmentDifficulty, _adjustmentTimestamp, _data) {
    // create() 함수는 블록을 생성 하는 함수

    try {
      const { height, hash: previousHash } = _previousBlock;
      // 이전 블록의 hash를 이전블록의 해시로 초기화한다.

      this.height = height + 1;
      // 기존 블록의 높이(갯수) 보다 하나 증가.(생성할 때 높이 증가시켜서 생성 )

      this.previousHash = previousHash;
      // 기존 블록의 hash 값을 갖는다. (오류 확인을 위해)

      const merkleRoot = this.getMerkleRoot(_data);
      // 머클 루트 임시값 초기화
      // 정장삭으로 Root를 구하도록 호출

      if (merkleRoot.isError) throw new Error(merkleRoot.error);
      // throw 명령어를 사용하여 try문을 멈추고 catch로 입력값을 전달한다.
      // merkleRoot에서 오류 발생 시 생성 멈춤
      this.merkleRoot = merkleRoot.value;

      // 논스 임시값 초기화
      this.nonce = 0;
      this.timestamp = Date.now();
      // 현재 시간으로 초기화

      this.difficulty = this.getDifficulty({
        // 난이도를 구하는 메서드를 호출한다.
        height: this.height,
        timestamp: this.timestamp,
        previousDifficulty: _previousBlock.difficulty,
        _adjustmentDifficulty,
        _adjustmentTimestamp,
      });

      this.hash = this.createHash(this);
      // 메서드 만들기 전에 초기화
      // createHash()메서드는 hash를 구하는 메서드 호출

      this.data = _data;
      // 데이터 저장 (블록에 담을 데이터)

      this.updateBlock(
        _previousBlock,
        _adjustmentDifficulty,
        _adjustmentTimestamp
      );
      return this;
      // 블록 생성(마이닝을 거친 후 )
    } catch (err) {
      throw new Error(err.message);
      // 에러 발생 시
      // 에러를 전달하고 종료
    }
  }
  getMerkleRoot(_data) {
    // getMerkleRoot() 함수는 머클루트를 구해주는 함수
    return Array.isArray(_data)
      ? {
          iserror: false,
          //iserror: false 는 에러가 아니다.

          value: _data.length // _data의 길이가 있다 = merkle 라이브러리 사용
            ? merkle("sha256").sync(_data).root()
            : // merkle 라이브러리 사용하며, sha256 방식의 hash 암호화를 사용, merkleRoot를 구한다.
              "0".repeat(64),
        }
      : {
          isError: true,
          error:
            "배열이 아닐 경우 이거 오류야 무조건 배열이 들어와야 되니 확인",
        };
    // 배열이 아닐 경우 에러가 난다.
  }
  createHash(_block) {
    return SHA256();
    // SHA256 방식의 hash 암호화 사용
    // 여기서 256은 256bit를 뜻 한다.
    // hash 생성 함수
    Object.entries(_block)
      //   Object.entries(block)는 객체의 키와 값을 배열로 변경 해준다. 객체를 배열 안에 배열로  [[key,value],[key,value],[key,value]]
      .filter((item) => item[0] !== "hash" && item[0] !== "data")
      // hash 생성 메서드기 때문에 hash를 제외, data는 merkleRoot로 대체 됨
      .join("");
    // 배열을 하나의 문자열로 연결
  }
  // 난이도 구하는 메서드
  getDifficulty({
    // getDifficulty로 매개변수로 받는 것은 객체로 전달 받기 때문에 _ 언더바는 생략한다.
    height, // 입력되는 높이
    timestamp, // 입력되는 시간
    previousDifficulty, // 이전 블록의 난이도
    adjustmentDifficulty, // 난이도 조절의 단위 갯수 전의 난이도 (이전에 조절된 난이도 값)
    adjustmentTimestamp, // 난이도 조절의 단위 갯수 전의 생성 시간(이전에 조절된 난이도 값)
  }) {
    if (height < DIFFICULTY_ADJUSTMENT_INTERVAL) return 0;
    // 높이가 난이도 조절 단위 갯수가 미만일 경우 최초 블록에서 현재까지로 난이도가 0이라는 뜻

    if (height < DIFFICULTY_ADJUSTMENT_INTERVAL * 2) return 1;
    // 높이가 난이도 조절 단위 갯수가 2배 미만일 경우 최초 블록이 포함된 단위 갯수 다음 갯수

    if (height % DIFFICULTY_ADJUSTMENT_INTERVAL !== 0)
      return previousDifficulty;
    // 높이의 난이도 조절 단위 갯수 나머지가 0이 아니면 갯수가 맞아 떨어지지 않아 이전 난이도를 이용한다.
    // 만약 난이도 조절 단위 갯수가 10이라면 10개 단위로 난이도 조절을 하게 된다.
    // 높이가 9까지는 0, 높이가 10~19까지는 1, 이후에는 각 10 단위마다 아래 코드로 난이도를 결정한다.

    const timeTaken = timestamp - adjustmentTimestamp;
    // 현재 시간과 난이도 조절 단위 갯수 이전의 시간의 차를 확인
    // 블록이 생성된 시간 - 10개 이전의 생성 시간 = 시간차

    // 블록 생성 기준시간 10분 블록  100개의 블록을 생성 되는 시간은 100분
    const timeExpected =
      TIME_UNIT * BLOCK_GERATION_INTERVAL * DIFFICULTY_ADJUSTMENT_INTERVAL;
    if (timeTaken < timeExpected * 0.5) return adjustmentDifficulty + 1;
    // 난이도 증가 if 조건문
    // 설정 된 블록 10개 생성 시간보다 0.5배 미만이면 난이도 증가 한다. 300초 보다 작은 경우

    if (timeTaken > timeExpected * 1.5) return adjustmentDifficulty - 1;
    // 난이도 감소 if 조건문
    // 설정 된 블록 10개 생성 시간보다 1.5배 초과이면 난이도 감소 한다. 900초 보다 작은 경우

    return adjustmentDifficulty;
    // 위 두 조건에 맞지 않으면  현재 기준 난이도로 리턴
  }

  // 블록 업데이트 구조
  updateBlock(_previousBlock, _adjustmentDifficulty, _adjustmentTimestamp) {
    // updateBlock() 함수는 블록 마이닝 (블록 채굴)을 하기 위한 함수

    let hashBinary = hexToBinary(this.hash);
    // 현재 hash를 bit 형식으로, binary 형식으로 바꾼다.

    while (!hashBinary.startsWith("0".repeat(this.difficulty))) {
      // startsWith() 함수는 시작부터 어떤 문자인지 특정 문자를 확인 하는 조건
      // 난이도를 구해야 하니 블록의 난이도를 전달해준다.
      // difficulty는 난이도가 2면 "0"의 갯수가 2개인지 확인을 한다.
      // !hashBinary 조건식은 블록의 난이도의 갯수만큼 "0" 이 붙을 때까지 반복한다.
      // 0과 1로 이루어진 hash 문자의 시작되는 0의 갯수가 0의 난이도 갯수와 같은지 확인

      this.nonce += 1;
      // nonce를 증가시킨다.

      this.timestamp = Date.now();
      // 블록 생성 시점이 달라졌으므로 현재 시간을 다시 설정 한다.

      this.difficulty = this.getDifficulty(
        // height,
        // timestamp,
        _previousBlock.difficulty,
        _adjustmentDifficulty,
        _adjustmentTimestamp
      );
      // 난이도를 다시 구하는 영역

      this.hash = this.createHash(this);
      hashBinary = hexToBinary(this.hash);
      // 생성할 블록의 해시 값으로 비교를 위하여 hash를 다시 bit, binary 형식으로 변경
    }
  }
  // 블록의 검증 함수
  isValidnewBlock(_newBlock, _previousBlock) {
    //  isValidnewBlock()는 생성된 블록이 문제가 없고, 정상적인지 검사하는 함수
    if (_newBlock.height !== _previousBlock.height + 1) {
      // 생성 된 블록의 이전의 높이가 1이 높은지 확인을 하는 조건식
      return { isError: true, error: "'Block's height is incorrect." };
    }
    if (_newBlock._previousHash !== _previousBlock.hash) {
      // 생성된 블록에 저장된 이전 블록 hash가 이전 블록 hash와 같은지 확인하는 조건식
      return { isError: true, err: "Hash of previous Block is incorrect." };
    }
    if (this.createHash(_newBlock) !== _newBlock.hash) {
      // hash를 다시 생성하여 생성된 블록의 hash와 맞는지 확인하는 조건식
      return { iserror: true, error: "Hash of block is incorrect." };
    }
    return { isError: false, value: _newBlock };
    // 앞에 있는 3개의 조건문을 모두 통과하여 생성 된 블록에 문제가 없으면 에러가 없는 것을 표시하고 블록을 반환
  }
}

module.exports = { Block };
