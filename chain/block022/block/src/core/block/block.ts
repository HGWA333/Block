import merkle from "merkle";
import { SHA256 } from "crypto-js";
import hexToBinary from "hex-to-binary";

class BlockHeader implements IBlockHeader {
  // class BlockHeader는 블록의 생성 시간, 머클루트를 생성, 블록 생성 시 난이도를 조절하는 메서드들이 있다.

  // BlockHeader의 메서드들
  // setTimestamp : 블록의 생성 시간
  // createMerkleRoot : 머클루트를 생성
  // getDifficulty : 블록 생성 시 난이도를 조절

  version: string;
  merkleRoot: string;
  timestamp: number;
  height: number;
  difficulty: number;
  nonce: number;
  ip: string = "192.168.0.140";

  constructor(_data: Array<ITransaction>, _previousBlock?: IBlock) {
    this.version = "1.0.0";
    const merkleRoot: TResult<string, string> = this.createMerkleRoot(_data);
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
    // 블록의 생성 시간을 입력하는 메서드

    // return 없으므로 void
    this.timestamp = Date.now();
  }

  createMerkleRoot(_data: Array<ITransaction>): TResult<string, string> {
    // 머클루트를 생성 해주는 메서드
    if (!Array.isArray(_data) || !_data.length) {
      return { isError: true, msg: "data가 배열이 아니거나 빈 배열" };
    }
    return {
      isError: false,
      value: merkle("sha256")
        .sync(_data.map((item) => item.hash))
        .root(),
    };
  }

  getDifficulty({
    // 블록 생성 시 난이도를 조절
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
    // string 타입의 키에 대해서 값은 number 타입을 가진다.
  }): void {
    if (this.height < DAI) {
      this.difficulty = 0;
    } else if (this.height < DAI * 2) {
      this.difficulty = 1;
    } else if (this.height % DAI !== 0) {
      this.difficulty = previousDifficulty;
    } else {
      const timeToken: number = this.timestamp - adjustmentTimestamp;

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
  // class Block은 블록의 생성 시간, 머클루트를 생성, 블록 생성 시 난이도를 조절하는 메서드들이 있다.

  // Block의 메서드들
  // createHash : 블록에 해쉬를 생성
  // updateBlock : 블록의 난이도 변화시 난이도 값 업데이트(수정)하는 메서드
  // isValidBlock : 블록의 유효성 검증

  previousHash: string;
  hash: string;
  data: Array<ITransaction>;

  constructor(
    _data: Array<ITransaction>,
    _previousBlock?: IBlock,
    _adjustmentBlock?: IBlock,
    _config?: IConfig
    // 앞에 빈칸이 있을 수 없기 때문에 입력되지 않을수도 있는 ?는 뒤로 빠져야한다.
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
    // if(global.debug)console.log(this);
  }

  static createHash(_block: IBlock): string {
    // 블록에 해쉬를 생성
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

  updateBlock(difficultyOptions: {
    // 블록의 난이도 변화시 난이도 값 업데이트(수정)하는 메서드
    previousDifficulty: number;
    adjustmentDifficulty: number;
    adjustmentTimestamp: number;
    DAI: number;
    averageGenerationTime: number;
  }): void {
    let hashBinary = hexToBinary(this.hash);
    while (!hashBinary.startsWith("0".repeat(this.difficulty))) {
      this.nonce += 1;
      this.setTimestamp();
      this.getDifficulty(difficultyOptions);
      this.hash = Block.createHash(this);
      hashBinary = hexToBinary(this.hash);
    }
    if (global.debug) console.log(hashBinary);
    if (global.debug) console.log(hashBinary.slice(0, this.difficulty));
  }

  static isValidBlock(
    // 블록의 유효성 검증
    _newBlock: IBlock,
    _previousBlock: IBlock
  ): TResult<IBlock, string> {
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
