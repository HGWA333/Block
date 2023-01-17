// 설치 명령어 -
// npm i --save-dev jest
// - 설치 명령어

const Block = require("./block");
// 블록을 생성하기 위해 클래스를 가져온다.

const IBlock = require("./block.interface");
// 제네시스 블록 생성

const genesis = new IBlock({
  version: "1.0.0",
  height: 0,
  timestamp: Date.now(),
  previousHash: "0".repeat(64),
  hash: "0".repeat(64),
  merkleRoot: "0".repeat(64),
  nonce: 0,
  difficilty: 0,
  data: ["this is genesis block in my blockchian"],
});

const {
  lib: { hexToBinary },
  constant: {
    DIFFICULTY_ADJUSTMENT_INTERVAL,
    BLOCK_GERATION_INTERVAL,
    TIME_UNIT,
  },
} = require("./config");

describe("최초 블록 체크", () => {
  // 테스트 묶음

  it(" 오브젝트인지 확인", () => {
    // 첫 블록의 객체인지 확인한다.
    // 블록이 같은지 확인하는 검사식으로 expect().toBe()
    expect(typeof genesis).toBe("object");
  });

  //테스트 내용
  it("최초 블록의 값을 확인", () => {
    // 블록의 정보를 확인 하는 작업
    expect(genesis.version).toBe("1.0.0");
    expect(genesis.data).toEqual(["this is genesis block in my blockchian"]);
    // toBe : 문자열 검사
    // toEqual : 객체나 배열을 검사하는 함수로서 객체 혹은 배열의 내용이 같은지 확인 할 수 있음
    // 예) expect({a:0}).toEqual({a:0}); 같아야 true (통과)
  });
});

describe("블록 체크", () => {
  // 블록에 대한 테스트 모음

  let block = new Block(genesis);
  // 블록을 생성해둔다.

  const adjustmentDifficulty = 0;
  // 난이도를 구하기 위한 이전 난이도를 정의한다.

  const adjustmentTimestamp = Date.now();
  // 난이도를 구하기 위한 이전 시간을 정의한다.

  describe("난이도 체크", () => {
    // 난이도에 대한 테스트 모음
    let tempBlockData;
    beboreEach(() => {
      tempBlockData = {
        height: 10,
        timestamp: Date.now(),
      };
    });
    // beboreEach 테스트를 실행하기전에 실행
  });
});
