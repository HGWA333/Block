const Block = require("./block");
const merkel = require("merkle");

describe("data가 배열이 아닐 때", () => {
  const data = "a";
  const block = new Block(data);
  it("merkleRoot가 비어있는가?", () => {
    expect(block.merkelRoot).toBe("");
  });
  it("hash가 비어있는가?", () => {
    expect(block.hash).toBe("");
  });
});
describe("data가 배열일 때", () => {
  const data = ["a"];
  const block = new Block(data);
  it("merkleRoot가 정상인가?", () => {
    const merkelRoot = merkel("sha256").sync(data).root();
    expect(block.merkelRoot).toBe(merkelRoot);
  });
  it("hash와 merkleRoot의 길이가 64인가?", () => {
    expect(block.merkelRoot).toHaveLength(64);
    expect(block.hash).toHaveLength(64);
    // toHaveLenght = 길이 확인
  });
});
