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
  });
  describe("difficulty check", () => {
    const data = ["a"];
    const block = new Block(data);
    let tempDifficultyOptions;
    beforeEach(() => {
      tempDifficultyOptions = {
        previousDifficulty: 9,
        adjustmentDifficulty: 10,
        adjustmentTimestamp: Date.now(),
        DAI: 10,
        averageGenerationTime: 60 * 1000,
      };
      block.height = 30;
    });
    it("높이가 0~9까지 난이도 0일 때", () => {
      for (let i = 0; i < 10; i++) {
        block.height = i;
        block.getDifficulty(tempDifficultyOptions);
        expect(block.difficulty).toBe(0);
      }
    });
    it("높이가 10~19까지 난이도 1일 때", () => {
      for (let i = 10; i < 20; i++) {
        block.height = i;
        block.getDifficulty(tempDifficultyOptions);
        expect(block.difficulty).toBe(1);
      }
    });
    it("기준 시간보다 빠르게 생성되었을 경우 난이도를 높이겠다", () => {
      tempDifficultyOptions.adjustmentTimestamp -= 20 * 1000;
      block.getDifficulty(tempDifficultyOptions);
      expect(block.difficulty).toBe(
        tempDifficultyOptions.adjustmentDifficulty + 1
      );
    });
    it("기준 시간보다 허용 범위 이내에 생성되었을 경우 난이도를 유지하는지", () => {
      tempDifficultyOptions.adjustmentTimestamp -=
        tempDifficultyOptions.averageGenerationTime;
      block.getDifficulty(tempDifficultyOptions);
      expect(block.difficulty).toBe(tempDifficultyOptions.adjustmentDifficulty);
    });
    it("기준 시간보다 허용 범위 이내에 생성되었을 경우 난이도를 낮추는지", () => {
      tempDifficultyOptions.adjustmentTimestamp -= 100 * 1000;
      block.getDifficulty(tempDifficultyOptions);
      expect(block.difficulty).toBe(
        tempDifficultyOptions.adjustmentDifficulty - 1
      );
    });
  });
});
