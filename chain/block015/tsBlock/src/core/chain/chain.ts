import Block from "../block/block";

class Chain implements IChain {
  #chain: Array<string>;
  #DIFFICULTY_ADJUSTMENT_INTERVAL: number;
  #BLOCK_GENERATION_INTERVAL: number;
  #TIME_UNIT: number;

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
      averageGenerationTime: this.#BLOCK_GENERATION_INTERVAL * this.#TIME_UNIT,
    };
  }

  get adjustmentBlock() {
    const length = this.#chain.length;
    const interval = length - this.#DIFFICULTY_ADJUSTMENT_INTERVAL;
    if (interval < 0) return this.#chain[0];
    return this.#chain[interval];
  }

  addBlock(_data: Array<string>) {
    const newBlock = new Block(
      _data,
      this.lastBlock,
      this.adjustmentBlock,
      this.config
    );

    return this.add2Chain(newBlock);
  }

  add2Chain(_newBlock?: Array<string>) {
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

const chain = new Chain();

module.exports = Chain;
