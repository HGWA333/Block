const Block = require("../block/block");

class Chain {
  #chain;
  #DIFFICULTY_ADJUSTMENT_INTERVAL = 10;
  #BLOCK_GENERATION_INTERVAL = 10;
  #TIME_UNIT = 60 * 1000;

  constructor() {
    this.#chain = [];
    const genesis = new Block([`제네시스 블록 ${new Date()}`]);
    this.#chain.push(genesis);
  }
  get chain() {
    return [...this.#chain];
  }
  get lastBlock() {
    return this.#chain[this.#chain.length - 1];
  }
  get config() {
    return {
      DAI: this.#DIFFICULTY_ADJUSTMENT_INTERVAL,
      AGtime: this.#BLOCK_GENERATION_INTERVAL * this.#TIME_UNIT,
    };
  }

  get adjusetmentblock() {
    const length = this.#chain.length;
    const interval = length - this.#DIFFICULTY_ADJUSTMENT_INTERVAL;
    if (interval < 0) return this.#chain[0];
    return this.#chain[interval];
  }

  addBlock(_data) {
    const newBlock = new Block(
      // block.js의 class Block의 constructor로 전달
      _data,
      this.lastBlock,
      this.adjusetmentblock,
      this.config
    );
    return this.add2Chain(newBlock);
  }

  add2Chain(_newBlock) {
    const isValid = Block.isValidBlock(_newBlock, this.lastBlock);
    // block.js의 class Block의 static isValidBlock로 전달
    if (isValid.isError) {
      // isError는 키를 갖고 있는 객체 형식 값은 true를 가지고 있음
      console.error(isValid.msg);
      return null;
    } else {
      this.#chain.push(_newBlock);
      // 배열에 넣는다. 인자 값으로 들어온 _newBlock이름을 가진 매개변수로
      return _newBlock;
      //  매개변수 값을 리턴
    }
  }
}

module.exports = Chain;
