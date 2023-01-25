// const merkle = require("merkle");
// const SHA256 = require("crypto-js").SHA256;
// const hexToBinary = require("hex-to-binary");
import merkle from "merkle";
import { SHA256 } from "crypto-js";
import hexToBinary from "hex-to-binary";

class BlockHeader implements IBlockHeader {
  // implements는 interface를 기준으로 타입을 확인한다.
  // implements는 class의 프로퍼티의 타입을 선언해주는 것이 아닌 정상적으로 타입이 정의 되었는지 확인한다.
  // 고로 implements는 IBlockHeader의 타입을 확인한다.
  version: string;
  merkleRoot: string;
  timestamp: number;
  height: number;
  difficulty: number;
  nonce: number;

  constructor(_data: Array<string>, _previousBlock?: IBlock) {
    // 제네시스 블록과 같이 이전 블록의 정보를 확인 할 수 없기 때문에 _previousBlock? 즉 ?를 붙혀서 undefined 값도 허용 시킨다.
    this.version = "1.0.0";
    const merkleRoot: TError<string> | TResult<string> =
      this.createMerkleRoot(_data);
    if (merkleRoot.isError === true) {
      // 확실하게 확인하면 msg 또는 value를 구분할 수 있다.
      this.merkleRoot = "";
      console.error(merkleRoot.msg);
    } else if (merkleRoot.isError === false) {
      this.merkleRoot = merkleRoot.value;
    }

    this.setTimestamp();
    this.height = _previousBlock ? _previousBlock.height + 1 : 0;
    this.difficulty = 0;
    this.nonce = 0;
  }

  setTimestamp(): void {
    // return 없으므로 void 타입을 적용
    this.timestamp = Date.now();
  }

  createMerkleRoot(_data: Array<string>): TError<string> | TResult<string> {
    if (!Array.isArray(_data) || !_data.length) {
      return { isError: true, msg: "data가 배열이 아니거나 빈 배열" };
    }
    return { isError: false, value: merkle("sha256").sync(_data).root() };
  }

  getDifficulty({
    previousDifficulty,
    adjustmentDifficulty,
    adjustmentTimestamp,
    DAI,
    averageGenerationTime,
  }: {
    // previousDifficulty: number;
    // adjustmentDifficulty: number;
    // adjustmentTimestamp: number;
    // DAI: number;
    // averageGenerationTime: number;
    [keys: string]: number;
    // 매개변수 타입이 모두 동일 할 때만 사용
    // 매개변수가 string으로 들어와도 number 타입을 가지게 된다.
    // 여기서 keys는 작업자가 임의로 설정 가능
    // keys는 {내용물}:{[keys:string]:number} 내용물을 지칭함
    // keys를 따로 불러서 사용 안함. 예) keys.previousDifficulty X
    // 매개변수 타입 설정
  }): void {
    // 함수 타입 설정 (리턴이 없어서 void)
    if (this.height < DAI) {
      this.difficulty = 0;
    } else if (this.height < DAI * 2) {
      this.difficulty = 1;
    } else if (this.height % DAI !== 0) {
      this.difficulty = previousDifficulty;
    } else {
      const timeToken = this.timestamp - adjustmentTimestamp;
      if (timeToken < averageGenerationTime * 0.9) {
        this.difficulty = adjustmentDifficulty + 1;
      } else if (timeToken > averageGenerationTime * 1.1) {
        this.difficulty = adjustmentDifficulty - 1;
      } else {
        this.difficulty = adjustmentDifficulty;
      }
    }
  }
}

class Block extends BlockHeader implements IBlock {
  previousHash: string;
  hash: string;
  data: Array<string>;
  // data의 형식 ["스트링"]

  constructor(
    _data: Array<string>,
    // 매개변수 _data의 형식 ["스트링"]
    _previousBlock?: IBlock,
    _adjustmentBlock?: IBlock,
    _config?: IConfig
    // 앞에 빈칸이 있을 수 없기 때문에 입력되지 않을수도 있는 ?는 뒤로 빠져야 한다.
    // _config에 들어올 데이터 자료형 형식 데이터는
    // DAI: number;
    // averageGenerationTime: number;
    // undefined;
  ) {
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

      if (_adjustmentBlock && _config) {
        this.updateBlock({
          previousDifficulty: _previousBlock.difficulty,
          adjustmentDifficulty: _adjustmentBlock.difficulty,
          adjustmentTimestamp: _adjustmentBlock.timestamp,
          DAI: _config.DAI,
          averageGenerationTime: _config.averageGenerationTime,
        });
      }
    } else {
      this.hash = "";
    }

    this.data = _data;
  }

  static createHash(_block: IBlock): string {
    // 매개변수로 받는 _block에 데이터 형식을 아래와 같이 설정하겠다.
    // version: string,
    // merkleRoot: string,
    // timestamp: number,
    // height: number,
    // difficulty: number,
    // nonce: number;
    // previousHash: string;
    // hash: string;
    // data: Array<string>;

    // createHash의 메서드 형식을 string으로 설정한다.

    let tempStr = "";
    const keys = Object.keys(_block);
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] === "hash" || keys[i] === "data") {
        continue;
      }
      tempStr += _block[keys[i]];
    }

    return SHA256(tempStr).toString().toUpperCase();
  }

  updateBlock(difficultyOptions: { [keys: string]: number }): void {
    let hashBinary = hexToBinary(this.hash);
    while (!hashBinary.startsWith("0".repeat(this.difficulty))) {
      this.nonce += 1;
      this.setTimestamp();
      this.getDifficulty(difficultyOptions);
      this.hash = Block.createHash(this);
      hashBinary = hexToBinary(this.hash);
    }
    console.log(hashBinary);
    console.log(hashBinary.slice(0, this.difficulty));
  }

  static isValidBlock(
    _newBlock: IBlock,
    // 매개변수로 받는 _newBlock에 데이터 형식을 아래와 같이 설정하겠다.
    // version: string,
    // merkleRoot: string,
    // timestamp: number,
    // height: number,
    // difficulty: number,
    // nonce: number;
    // previousHash: string;
    // hash: string;
    // data: Array<string>;

    _previousBlock: IBlock
    // 매개변수로 받는 _newBlock에 데이터 형식을 아래와 같이 설정하겠다.
    // version: string,
    // merkleRoot: string,
    // timestamp: number,
    // height: number,
    // difficulty: number,
    // nonce: number;
    // previousHash: string;
    // hash: string;
    // data: Array<string>;
  ): TError<string> | TResult<IBlock> {
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

export default Block;
