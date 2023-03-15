// ts의 인터페이스는 미리 자료형을 설정해두어 바로 적용하기 위한 것

declare interface IBlockHeader {
  version: string;
  merkleRoot: string;
  timestamp: number;
  height: number;
  difficulty: number;
  nonce: number;
}

// extends는 상속과 같은 개념으로 IBlockHeader가 가지고 있는 자료형 설정 값을 IBlock에 넘겨주는 것
declare interface IBlock extends IBlockHeader {
  previousHash: string;
  hash: string;
  data: Array<string>;
  // data: string[]; 으로 사용 가능
  // Array<string>는 []을 string 자료형으로 사용
  // Array<number>는 []을 number 자료형으로 사용
}

declare interface IConfig {
  // 테스트를 위한 인터페이스
  DAI: number;
  averageGenerationTime: number;
}
