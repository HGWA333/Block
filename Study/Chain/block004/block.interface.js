class IBlock {
  // Block 인터페이스
  version; // 블록 버전
  height; // 블록의 높이
  timestamp; // 블록 생성 시간
  previousHash; // 이전 블록의 해시
  hash; // 블록 자체의 해시
  merkleRoot; // 머클루트
  nonce; // 논스 (난이도에 대하여 퀴즈를 풀 때까지 시도한 횟수)
  difficulty; // 블록 난이도
  data; // 블록의 내용 [] 배열로 들어감

  constructor(_block = null) {
    // _block = null은 매개변수로 들어온 것 중 블록이 있으면 블록을 사용하고 블록이 없으면 null을 사용
    if (_block === null) {
      this.version = "1.0.0";
      return this;
    }
    this.version = _block.version;
    this.height = _block.height;
    this.timestamp = _block.timestamp;
    this.reviousHash = _block.reviousHash;
    this.hash = _block.hash;
    this.merkleRoot = _block.merkleRoot;
    this.nonce = _block.nonce;
    this.difficulty = _block.difficulty;
    this.data = _block.data;
  }
}
// 앞에 만들어 놓은 것은 자주 사용하려고 구조 설계도 처럼 작성한 것으로 미리 설정을 한 것이다.
// 함수 안에 구조를 만들고 필요한 것을 넣어 설계도 처럼 작성 한 것

module.exports = IBlock;
