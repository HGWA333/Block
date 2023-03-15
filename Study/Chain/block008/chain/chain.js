const Block = require("../block/block");

class Chain {
  #chain;
  #DIFFICULTY_ADJUSTMENT_INTERVAL = 10;
  #BLOCK_GENERATION_INTERVAL = 10;
  #TIME_UNIT = 60 * 1000;

  constructor() {
    this.#chain = [];
    const genesis = new Block([`제네시스 블록 ${new Date()}`]);
    console.log(new Date());
    this.#chain.push(genesis);
  }
  get chain() {
    return [...this.#chain];
  } // 체인
  get lastBlock() {
    return this.#chain[this.#chain.length - 1];
  } // 마지막 블록
  get config() {
    return {
      DAI: this.#DIFFICULTY_ADJUSTMENT_INTERVAL,
      // 난이도 조절 단위 개수

      AGtime: this.#BLOCK_GENERATION_INTERVAL * this.#TIME_UNIT,
      // 10개 블록 생성 되는 시간
    };
  }

  get adjusetmentblock() {
    const length = this.#chain.length;
    // 현재 체인의 길이
    const interval = length - this.#DIFFICULTY_ADJUSTMENT_INTERVAL;
    // 난이도 조절 단위 갯수 전 index
    if (interval < 0) return this.#chain[0];
    // 예) 1 index에 블록이 추가 됐다. 1 index가 추가되기 전에 체인의 길이는 1
    // 1 - 10 = -9가 나올 경우 배열에는 -(음수)가 존재하지 않음. 그래서 문제가 생기지 않도록 예외처리
    return this.#chain[interval];

    // 현재 설정 기준

    // 1,2,3,4,5,6,7,8,9 = 난이도 0 상태
    // 제네시스 블록 생성 후 9개의 블록이 추가 됐음  = 난이도 0

    // 10,11,... 19 = 난이도 1 상태
    // 10이 추가될 때 난이도를 수정하게 된다. = 난이도 1 Up

    // 20,21,....29 = 난이도 2 상태
    // 20이 추가될 때 10 index의 블록 생성 시간과 비교해서 난이도를 조절
  }

  addBlock(_data) {
    const newBlock = new Block(
      _data,
      this.lastBlock,
      this.adjusetmentblock,
      this.config
    );
    // this.#chain = 블록, [this.#chain.length - 1]
    // 제네시스 블록만 있을 때 체인의 길이는 1
    //  - 제네시스 블록의 인덱스는 0
    // 블록 하나를 추가했다. [제네시스 블록, 하나 추가]
    //  - 체인의 길이는 2
    //  - 제네시스 블록의 인덱스는? 0
    //  - 제네시스 블록의 다음 블록의 인덱스는? 1
    //  - 제네시스 블록의 다음 블록의 다음 블록 인덱스는? 2일 경우 터진다.
    //  - 마지막 블록의 인덱스는 1 길이가 2일 때 1을 구해야 한다.
    // 블록 하나 더 추가했다. [제네시스 블록, 하나 추가, 하나 더 추가]
    //  - 체인의 길이는 3
    //  - 제네시스 블록의 인덱스는? 0
    //  - 제네시스 블록의 다음 블록의 인덱스는? 1
    //  - 제네시스 블록의 다음 블록의 다음 블록 인덱스는? 2일 경우 터진다.
    //  - 마지막 블록의 인덱스는 1 길이가 2일 때 1을 구해야 한다.

    // this.#chain.push(newBlock);
    // const isValid = Block.isValidBlock(newBlock, this.lastBlock);
    // if (isValid.isError) {
    //   console.error(isValid.msg);
    //   return null;
    // } else {
    //   this.#chain.push(newBlock);
    //   return newBlock;
    // }

    return this.add2Chain(newBlock);
  }

  // 현재 체인 chain=[1, 2, 3] 상태에서 4번 블록을 추가 할 경우
  // 추가 되는 4번 블록은 3번 블록을 알고 있어야 한다. 이전블록 (previousHash)
  // 만약 chain 기준으로 2번 인덱스 블록에서 chain의 길이에서 1을 빼면, 마지막 인덱스가 나온다.
  // 그렇게 될 경우 마지막 인덱스에 해당하는 블록을 가져와서 사용한다.

  add2Chain(_newBlock) {
    const isValid = Block.isValidBlock(_newBlock, this.lastBlock);
    if (isValid.isError) {
      console.error(isValid.msg);
      return null;
    } else {
      this.#chain.push(_newBlock);
      return _newBlock;
    }
  }
}
// const chain = new Chain();
// console.log(chain.chain);

// // const block = new Block(["test"], chain.lastBlock);
// // console.log("lastBlock:", chain.lastBlock);
// // console.log(block);

// chain.addBlock(["abc0"]);
// chain.addBlock(["abc1"]);
// chain.addBlock(["abc2"]);

// chain.add2Chain(block);

// const block = new Block(["test"], chain.lastBlock);
// console.log("lastBlock:", chain.lastBlock);
// console.log(block);

// console.log(chain.chain);

// chain.chain.push({ data: "???" });
// console.log(chain.chain);

// const a = [];
// a 는 어떤 위치에 []이라는 값을 넣었다. 어떤 위치의 이름이 a
// 어떤 위치는 메모리, 컴퓨터 상에서 어떤 용량
// const b = a;

// b.push("abc");
// console.log(a);
const chain = new Chain();

// 테스트용 블록 32개 추가
for (let i = 0; i < 32; i++) {
  chain.addBlock([`test block ${i}`]);
}
console.log(chain.chain);

module.exports = Chain;
