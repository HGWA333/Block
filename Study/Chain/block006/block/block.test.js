const Block = require("./block");
const merkel = require("merkle");

describe("Block Test", () => {
  it("merkle Test", () => {
    // merkelRoot를 확인한다.
    const data = ["a", "b", "c"];
    const block = new Block(data);
    const merkelRoot = merkel("sha256").sync(data).root();

    expect(block.merkelRoot).toBe(merkelRoot);
  });

  it("hash Test", () => {
    // hash를 확인한다.
    // const data = ["a", "b", "c"];
    const data = [];
    const block1 = new Block(data); // block1이 1번 블록
    const block2 = new Block(data, block1); // block2가 2번 블록
    const hash = Block.createHash(block2); // block2가 2번 블록
    // 즉 block1, block2로 연결 되어있음

    expect(block2.hash).toBe(hash);
  });
});
