const Block = require("../block/block");

class Chain {
  // 체인은 배열로 설정
  #chain;

  #DIFFICULTY_ADJUSTMENT_INTERVAL = 10;

  #BLOCK_GENERATION_INTERVAL = 1;

  #TIME_UNIT = 1 * 1000;

  constructor() {
    this.#chain = [];
    // 체인은 배열로 설정
    const genesis = new Block([`제네시스 블록 ${new Date()}`]);
    // genesis는 block.js의 class Block([`제네시스 블록 ${new Date()}`])의 형태로 보내준다.
    this.#chain.push(genesis);
    // [Block([`제네시스 블록 ${new Date()}`])] 형태로 생성
  }

  get chain() {
    return [...this.#chain];
    // [...this.#chain]을 사용한 이유는 원본 훼손 방지를 위해 사용
    // 예) this.#chain에는 [a,b,c,d] 데이터가 담겨 있다.
    // 이걸 test = [a,b,c,k]로 바꾸었으면 원본 데이터인 [a,b,c,d] 가 [a,b,c,k] 이런식으로 변형이 된다.
    // 그래서 [...this.#chain]으로 return을 하면, test =[a,b,c,k]는 [...,[a,b,c,k]] 형식으로 인식
    // this.#chain과 [...this.#chain]은 다르다.
  }

  get lastBlock() {
    return this.#chain[this.#chain.length - 1];
    // [현재 체인[현재 체인의 길이 -1 ]]
  }

  get config() {
    return {
      DAI: this.#DIFFICULTY_ADJUSTMENT_INTERVAL,
      // 난이도 설정 조절 하기 위한 것
      averageGenerationTime: this.#BLOCK_GENERATION_INTERVAL * this.#TIME_UNIT,
      // 평균적인 세대(블록의 생성 시점) 생성 시간을 알기 위해 설정
    };
  }

  get adjustmentBlock() {
    // 블록의 설정을 조절 하기 위해 만듬
    const length = this.#chain.length;
    // 앞으로 length는 체인의 길이를 알 수 있다.
    // 예) [1,2,3,4,5].length = 5
    const interval = length - this.#DIFFICULTY_ADJUSTMENT_INTERVAL;
    // 체인의 길이의 간격을 알 수 있도록 만듬
    // 간격의 길이는 [1,2,3,4,5] = 5  <=>   5 - 난이도 간격이 조절 된 값  예) [1,2,3,4,5].lenght = 5, 난이도 조절 값 = 3 일경우 5-3 = 2
    if (interval < 0) return this.#chain[0];
    // interval = 체인길이 - 난이도 간격이 조절 된 값 < 0  [1,2,3,4,5]의 [0]번째 인덱스 값으로 리턴
    return this.#chain[interval];
    // [1,2,3,4,5[ 5 - 난이도 간격이 조절 된 값]]
    // 예) [1,2,3,4,5[ 5 - 3]] = [1,2,3,4,5[2]] = 배열 [1,2,3,4,5]의 [2]번째 인덱스를 리턴 하겠다.
    // [1,2,3,4,5] 2번째 인덱스 리턴 값은 3
  }

  // 블록에 체인을 결합하기전 데이터를 추가 하는 함수
  // 블록에 마지막 블록과, 난이도 조정 설정, 블록의 체인 길이 설정을 block.js의 Block의 constructor로 (_data, lastBlock, adjustmentBlock, config)를 넘겨줌
  // _data = 블록체인 사용자가 입력한 데이터를 _data 매개변수로 받음 형태는 ["test123"] 이런 형태
  addBlock(_data) {
    const newBlock = new Block(
      _data,
      this.lastBlock,
      this.adjustmentBlock,
      this.config
    );
    // newBlock에는 사용자가 입력한 배열 데이터, 마지막 블록과, 난이도 조정 설정, 블록의 체인 길이 설정
    // 총 4개의 데이터가 있음
    return this.add2Chain(newBlock);
    // add2Chain에 데이터 newBlock로 설정한 값을 보낸다.
  }

  // 블록에 체인을 결합하는 시점의 함수 add2Chain()
  add2Chain(_newBlock) {
    // 블록에 체인을 결합 하겠다.
    const isValid = Block.isValidBlock(_newBlock, this.lastBlock);
    // isValid는 검증 된 데이터들을 최종적으로 block.js의 class Block에서 만든 isValidBlock()메서드에
    // addBlock()에서 설정한 _newBlock과 lastBlock = [현재 체인[현재 체인의 길이 -1 ]]을 보낸다.
    if (isValid.isError) {
      // isValid의 isError는 객체 형식으로
      // 첫 번째 조건이 새로운 블럭 높이와 이전 블록의 높이 + 1이 같지 않을 때
      // isError가 true 이고 메세지는 "높이가 다르다" 라고 값을 리턴한다.

      // 두 번째 조건이 새로운 해쉬와 이전 해쉬가 같지 않을 때
      // isError가 true 이고 메세지는 "이전 블록의 hash와 새로운 블록의 이전 hash가 다르다."를 리턴

      // 세 번째 조건이새로운 해쉬와 이전 해쉬가 같지 않을 때
      // isError가 true 이고 메세지는 ""hash 생성 중 오류 발생" 라고 값을 리턴한다.

      console.error(isValid.msg);
      return null;
      // 조건문 3개중에 1개가 해당이 되면 null 값으로 리턴
    } else {
      // 조건문 3개중 1개도 해당이 되지 않으면
      // block.js의 isValidBlock에서는 객체로 { isError: false, value: _newBlock } 데이터를 보낸다.
      // 여기서 받은 객체 중 키 value의 값은 _newBlock이 들어오게 되어 isValid.isError를 건너띄고

      this.#chain.push(_newBlock);
      // _newBlock은 [_newBlock] 형태로
      // 매개변수 _newBlock를 리턴한다.
      return _newBlock;
    }
  }
}

const chain = new Chain();

for (let i = 0; i < 300; i++) {
  chain.addBlock([`test block ${i}`]);
}

module.exports = Chain;
