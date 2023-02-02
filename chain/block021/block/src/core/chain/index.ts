import Block from "@core/block/block";
import Transaction from "@core/transaction/Transaction";
import TxIn from "@core/transaction/TxInput";
import TxOut from "@core/transaction/TxOutput";

class Chain implements IChain {
  private chain: Array<IBlock>;
  private DIFFICULTY_ADJUSTMENT_INTERVAL: number = 10;
  private BLOCK_GENERATION_INTERVAL: number = 10;
  private TIME_UNIT: number = 60 * 1000;

  private utxos: Array<IUnspentTxOut>;

  constructor() {
    this.chain = [];
    const transaction = new Transaction(
      [new TxIn(`제네시스 블록 ${new Date()}`, 0)],
      []
    );
    const genesis: IBlock = new Block([transaction]);
    this.chain.push(genesis);

    this.utxos = [];
  }

  get getUtxo(): Array<IUnspentTxOut> {
    return [...this.utxos];
  }

  get getChain(): Array<IBlock> {
    return [...this.chain];
  }

  get lastBlock(): IBlock {
    return this.chain[this.chain.length - 1];
  }

  get config(): IConfig {
    return {
      DAI: this.DIFFICULTY_ADJUSTMENT_INTERVAL,
      averageGenerationTime: this.BLOCK_GENERATION_INTERVAL * this.TIME_UNIT,
    };
  }

  get adjustmentBlock(): IBlock {
    const length: number = this.chain.length;
    const interval: number = length - this.DIFFICULTY_ADJUSTMENT_INTERVAL;
    if (interval < 0) return this.chain[0];
    return this.chain[interval];
  }

  addBlock(_data: Array<ITransaction>): IBlock | null {
    console.log("addBlock");
    console.log("_data :", _data);
    const newBlock: IBlock = new Block(
      _data,
      this.lastBlock,
      this.adjustmentBlock,
      this.config
    );
    return this.add2Chain(newBlock);
  }

  add2Chain(_newBlock: IBlock): IBlock | null {
    const isValid: TResult<IBlock, string> = Block.isValidBlock(
      _newBlock,
      this.lastBlock
    );
    if (isValid.isError) {
      console.error(isValid.msg);
      return null;
    } else {
      console.log(_newBlock);
      this.chain.push(_newBlock);
      return _newBlock;
    }
  }
  isValidChain(_chain: Array<IBlock>): TResult<undefined, string> {
    // 다른 서버에서 체인을 받았을 때 정상적인 체인인지 확인을 해야 한다.
    // 확인하는 방법은 반복문을 사용하여 확인한다.
    for (let i = 1; i < _chain.length; i++) {
      const nowBlock = _chain[i];
      // 현재 블록의 체인을 현재 블록으로 초기화
      const previousBlock = _chain[i - 1];
      // 이전 블록의 체인을 이전 블록으로 초기화
      const isValid = Block.isValidBlock(nowBlock, previousBlock);
      if (isValid.isError == true) return isValid;
      // 문제가 있는 체인이면 에러를 반환한다.
      // isValid로 리턴하는 이유는 멈추기 위해서다.
    }
    return { isError: false, value: undefined };
    // 문제가 없는 체인임이 확인하고 value를 undefined 값을 반환
  }

  replaceChain(_chain: Array<IBlock>): TResult<undefined, string> {
    const newLastBlock = _chain[_chain.length - 1];
    // 새로운 블록은 = 체인[현재체인의 길이idx - 1 idx] : [] 형태 IBlock 타입을 가지고 있음
    const lastBlock = this.lastBlock;

    console.log("this.lastBlock:", lastBlock);

    if (newLastBlock.height === 0 && lastBlock.height !== 0) {
      // newLastBlock.height === 0)는 상대방이 보낸 블록이 제네시스 블록이며, 내 마지막 블록의 높이가 제네시스블록이 아닐때 동작하게 설정
      return { isError: true, msg: "받은 블록이 제네시스 블록" };
    }
    if (newLastBlock.height < lastBlock.height) {
      // newLastBlock.height < lastBlock.height)는 상대방이 보낸 블록이 제네시스 블록보다 내 블록이 높이가 높을 때
      return { isError: true, msg: "내 체인이 더 길다" };
    }
    if (newLastBlock.height === lastBlock.height) {
      // newLastBlock.height < lastBlock.height)는 상대방이 보낸 블록이 제네시스 블록보다 내 블록이 높이가 같다면
      return { isError: true, msg: "동기화 완료" };
    }
    // 위 세개의 if 조건식이 아니라면 아래 실행

    this.chain = _chain; // 매개변수로 들어와서 작동한 _chain을  this.chain으로 초기화
    return { isError: false, value: undefined };
    // 여기서 value에 undefined 값을 넣어 리턴을 한 이유는
    // replaceChain에 리턴 값에 TResult<undefined, string>를 설정해서 value에 undefined를 넣음
  }

  mineBlock(_address: string) {
    const txIn: ITxInput = new TxIn("", this.lastBlock.height + 1);
    // 채굴하는 상황
    // 첫 번째 매개변수 ""을 넣은 이유는 채굴할 때 input 없기 때문에 "" 빈 값으로 넣었다.
    // 두 번째 매개변수 this.lastBlock.height + 1를 넣은 이유는 코인베이스 트랜잭션의 특징이다. 마지막 블록 + 1은 txOutIndex를 블록의 높이로 정의한다.
    // 여기서 this.lastBlock.height 설정 된 값은 0이다.
    const txOut: ITxOutput = new TxOut(_address, 50);
    //  상대방이 전송 버튼 눌렀을 때 상황
    //  첫 번째 매개변수 _address는 Postman에서 Body를 Json형식으로 바꾸고 "data":"사용자 아이디"
    //  두 번째 매개변수 50은 (채굴 or 거래시 코인의 변화 된 값)
    const coinbaseTransaction: Transaction = new Transaction([txIn], [txOut]);
    // coinbaseTransaction은 채굴 했을 때와 보냈을 때 상황을 설정해둔 txIn, txOut을
    // Transaction 타입으로 class Transaction을 새로 초기화
    const utxo = coinbaseTransaction.createUTXO();
    // utxo는 Transaction로 새롭게 초기화한 coinbaseTransaction에 createUTXO()을 사용
    // utxos는 현재 빈 배열 []형태이다. 이걸 pusu해서 넣을 것이다. 무엇을?
    // 위에 coinbaseTransaction.createUTXO()으로 초기화한 utxo 이것을 분해해서
    this.utxos.push(...utxo);
    // utxos를 푸쉬한다 utxo를 ... 분해해서

    // 여기서 mineBlock 설정이 끝났다.
    return this.addBlock([coinbaseTransaction]);
    //  설정이 끝났으니 this.addBlock에 JSON.stringify 객체 형태로 coinbaseTransaction를 담아서 리턴
  }

  updateUTXO(_tx: Transaction) {
    console.log("6-34  UTXO 수정(업데이트) 시작");
    const utxos = this.getUtxo;
    const newUTXO = _tx.createUTXO();

    let temp = utxos.filter((item) => {
      const txIn = _tx.txIns.find(
        (item1) =>
          item.txOutId === item1.txOutId && item.txOutIndex === item1.txOutIndex
        // 트랜잭션의 txIns에 들어갔다 => input으로 넣어서 사용했다
        // 그럼 기존의 utxos 에서 사용한 utxo들을 빼야한다.
        // 그래서 txIns와 utxos를 비교, 검색해서 나오면 filter에서 걸러진다
      );
      return !txIn;
    });

    // let temp = [];
    // for (let i = 0; i < utxos.length; ++i) {
    //   for (let j = 0; j < _tx.txIns.length; ++j) {
    //     if (
    //       !(utxos[i].txOutId === _tx.txIns[j].txOutId &&
    //       utxos[i].txOutIndex === _tx.txIns[j].txOutIndex)
    //     )
    //       temp.push(utxos[i]);
    // //    if (
    // //      utxos[i].txOutId !== _tx.txIns[j].txOutId ||
    // //      utxos[i].txOutIndex !== _tx.txIns[j].txOutIndex
    // //    )
    // //      temp.push(utxos[i]);
    //   }
    // }

    console.log("6-36 수정된 utxo에 새로운 utxo를 추가해서 정의");
    this.utxos = [...temp, ...newUTXO];
  }
}

export default Chain;
