const Block = require("../block/block");

class Chain {
  // 체인은 배열 형태로 만든다.
  #chain;
  // Class Chain외에 다른 데이터, 정보 등등을 Chain에 넣지 못하도록 외부에서 접근을 막기 위해 # private를 설정
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

  addBlock(_data) {
    const newBlock = new Block(_data, this.#chain[this.#chain.length - 1]);
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

module.exports = Chain;
