import Block from "@core/block/block";
import Transaction from "@core/transaction/Transaction";
import TxIn from "@core/transaction/TxIn";
import TxOut from "@core/transaction/TxOut";
import UnspentTxOut from "@core/transaction/UnspentTxOut";

class Chain implements IChain {
  // class Chain은 블록 추가, 추가 된 블록에 체인 추가, 체인의 유효성을 검증, 체인의 상태를 바꾸는, 블록을 채굴, UTXO의 상태를 업데이트(수정), 트랜잭션Tx을 추가하여 보관하는, 보관된 트랜잭션Tx의 상태를 업데이트(수정)는 메서드들이 있다.

  // Chain의 메서드들
  // addBlock : 블록 생성(추가)
  // add2Chain :  체인에 블록 추가
  // isValidChain : 체인의 유효성을 검증
  // replaceChain : 체인의 상태를 바꾸는
  // mineBlock : 블록을 채굴
  // updateUTXO : UTXO의 상태를 업데이트(수정)
  // addTxpool : 트랜잭션Tx을 추가하여 보관하는
  // updateTxPool : 보관된 트랜잭션Tx의 상태를 업데이트(수정)

  private chain: Array<IBlock>;
  private DIFFICULTY_ADJUSTMENT_INTERVAL: number = 10;
  private BLOCK_GENERATION_INTERVAL: number = 10;
  private TIME_UNIT: number = 60 * 1000;

  private utxos: Array<IUnspentTxOut>;
  // utxos 모아둘 내용
  private txPool: Array<ITransaction>;
  // Transaction 모아둘 내용

  constructor() {
    this.chain = [];
    const transaction = new Transaction(
      [new TxIn(`경훈의 제네시스 블록 ${new Date()}`, 0)],
      []
    );

    const genesis: IBlock = new Block([transaction]);
    this.chain.push(genesis);

    this.utxos = [];
    this.txPool = [];
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

  get getUtxo(): Array<IUnspentTxOut> {
    return [...this.utxos];
  }

  get getTxPool(): Array<ITransaction> {
    return [...this.txPool];
  }

  addBlock(_data: Array<ITransaction>): IBlock | null {
    // 블록 추가
    if (global.debug) console.log("addBlock");
    if (global.debug) console.log("_data :", _data);

    const newBlock: IBlock = new Block(
      _data,
      this.lastBlock,
      this.adjustmentBlock,
      this.config
    );
    // 블록을 생성하고
    return this.add2Chain(newBlock);
    // add2Chain에 생성된 블록 newBlock을 넘겨준다.
  }

  add2Chain(_newBlock: IBlock): IBlock | null {
    // 생성(추가) 된 블록에 체인 추가

    const isValid: TResult<IBlock, string> = Block.isValidBlock(
      _newBlock,
      this.lastBlock
    );
    // 생성된 블록의 유효성을 검증하는 것으로 현재 블록과 이전 블록을 비교한다.
    // isValidBlock에는 3개의 조건식에 따른 유효성을 검증하는 내용이 들어있음
    // 3개의 조건식은 높이가 다르다., 이전 블록의 hash와 새로운 블록의 이전 hash가 다르다., hash 생성 중 오류 발생 등 3가지의 조건식이 있고,
    // 만약 그 3개의 조건식에 해당이 되지 않는다면 유효성이 검증이 되여 새로운 블록을 생성하는 매개변수 키 value의 값 _newBlock의 값을 받는다.

    // 여기서 isValid에는 조건식 3개에는 isError의 값이 true이 설정 되어있고, 그 외는 isError의 값이 false로 설정이 되어있다.
    // isValid는  조건식 3개에는 {isError: true, msg: "메세지 내용" or value : _newBlock}
    // isValid는  조건식 3개 외에는 {isError: false, value : _newBlock} 객체 형태를 가지고 있다.

    if (isValid.isError) {
      console.error(isValid.msg);
      return null;
    } else {
      this.chain.push(_newBlock);
      // isError: false가 나오면 작동을 한다.
      // 현재 체인에 넣는다. 새롭게 생성된 블록을

      _newBlock.data.forEach((_tx: Transaction) => this.updateUTXO(_tx));
      // 새롭게 생성되는 블록에 UTXO로 넘어가는 블록에 트랜잭션을 부여하는 기능
      // 다른 peer가 블록이 추가 됐다는 걸 알리기 위해
      this.updateTxPool(_newBlock);

      return _newBlock;
    }
  }

  isValidChain(_chain: Array<IBlock>): TResult<undefined, string> {
    // 체인의 유효성을 검증

    //_chain에는
    // previousHash: string;
    // hash: string;
    // data: Array<ITransaction> <---

    // data: Array<ITransaction>에는
    // txIns: Array<ITxIn> <---
    // txOuts: Array<ITxOut> <---
    // hash: string; // 트랜잭션 해쉬 or 트랜잭션 아이디

    // txIns에는
    // txOutId: string; // transaction의 hash
    // txOutIndex: number; // transaction의 몇번째 output
    // signature?: string;

    // txOut에는
    // address: string;
    // amount: number;
    // 데이터 타입을 가지고 있다.

    // _chain.length의 형태는 [{previousHash: string, hash: string, data: Array<ITransaction>}, {previousHash: string, hash: string, data: Array<ITransaction>}, {previousHash: string, hash: string, data: Array<ITransaction>} ...]

    for (let i = 1; i < _chain.length; ++i) {
      // 체인의 길이만큼 for문 돌림
      const nowBlock = _chain[i]; // nowBlock은 매개변수 체인의[i] 번째
      const previousBlock = _chain[i - 1]; // previousBlock 매개변수 체인의[i-1] 번째

      const isValid = Block.isValidBlock(nowBlock, previousBlock);
      // isValid은 nowBlock, previousBlock로 초기화 한 것을 isValidBlock 메서드를 통해 유효성을 검사한다.
      if (isValid.isError == true) return isValid;
      // 문제가 있는 체인이면 에러를 반환한다.
    }
    return { isError: false, value: undefined };
    // 문제가 없는 체인임이 확인됐다.
  }

  replaceChain(_chain: Array<IBlock>): TResult<undefined, string> {
    // 체인의 상태를 바꾸는
    if (global.debug) console.log("replaceChain");
    const newLastBlock = _chain[_chain.length - 1];
    // newLastBlock은 현재 체인[체인의 길이 index - 1]
    // 현재 체인[체인의 길이 index - 1] = 이전체인
    const lastBlock = this.lastBlock;
    // lastBlock은 newBlock에 속한 this.lastBlock로 초기화
    if (newLastBlock.height === 0 && lastBlock.height !== 0) {
      // 이전체인.높이가 0이거나  그리고
      // this.lastBlock.높이가 0이 아닐 때 아래 리턴 실행
      return { isError: true, msg: "받은 블록이 제네시스 블록이다." };
    }
    if (newLastBlock.height < lastBlock.height) {
      // 롱기스트 체인 룰, 긴 체인을 적용한다.
      // 이전체인.높이 보다 this.lastBlock.높이가 크면
      // 아래 리턴 실행
      return { isError: true, msg: "내 체인이 더 길다." };
    }
    if (newLastBlock.hash === lastBlock.hash) {
      // 이전체인.해쉬와 this.lastBlock.해쉬가 같으면
      // 아래 리턴 실행
      return { isError: true, msg: "동기화 완료" };
    }

    // 매개변수 _chain은 this.chain 으로 초기화
    this.chain = _chain;

    // ------------------------------------------- //
    // 상대방 체인을 동기화 하는 시점
    this.chain.forEach((_block: IBlock) => {
      // 새로운 체인의 모든 블록을 가져다온다.
      this.updateTxPool(_block);
      // 트랜잭션 풀을 업데이트하고(여기서 트랜잭션을 삭제할 거 삭제하고, 추가할 것을 추가한다.)
      _block.data.forEach((_tx: Transaction) => {
        // data(트랜잭션)들을 순회한다.
        this.updateUTXO(_tx);
        // 그리고 각 블록의 data(트랜잭션)을 하나하나 가져와서 UTXO를 업데이트한다.
      });
      // 여기까지가 블록 추가 됐을 때 체인을 주고 받고 수정하는 부분이 끝나는 지점
    });

    return { isError: false, value: undefined };
  }

  mineBlock(_address: string) {
    // 블록을 채굴 하는 메서드
    const txIn: ITxIn = new TxIn("", this.lastBlock.height + 1);
    // ITxIn은 채굴하는 상황 코인베이스(제네시스 블록)은 트랜잭션의 특징으로 txOutIndex를 블록의 높이로 정의한다.
    const txOut: ITxOut = new TxOut(_address, 50);
    // txOut은 채굴 했을 때 보상
    // 첫 번째 매개변수 주소ID , 두 번째 매개변수 채굴 코인
    const coinbaseTransaction: Transaction = new Transaction([txIn], [txOut]);
    // 채굴시 트랜잭션을 넣는 내용
    // 코인베이스(제네시스 블록)에는 트랜잭션 풀에 안들어간다.
    // 코인베이스 트랜잭션을 기준으로 UTXO를 생성한다.

    return this.addBlock([...this.getTxPool, coinbaseTransaction]);
    // ...this.getTxPool 이전 트랜잭션을 추가한다. 분해해서
    // 채굴시 트랜잭션 추가
  }

  updateUTXO(_tx: Transaction) {
    // UTXO의 상태를 업데이트(수정)
    if (global.debug) console.log("6-34 UTXO 수정 시작");
    const utxos = this.getUtxo; // UTXO를 가져온다.
    const newUTXO: Array<IUnspentTxOut> = []; // 새로운 UTXO를 담을 용도로 newUTXO를 빈배열로 초기화
    for (let i = 0; i < _tx.txOuts.length; ++i) {
      // _tx.txOuts는 [{address:"string",amount:number},{address:"string",amount:number},{address:"string",amount:number}, ...] 이런 형태

      newUTXO.push(
        // 빈 배열에 새로운 UTXO를 넣는 상황
        new UnspentTxOut(
          _tx.txOuts[i].address, // [{address:"string",amount:number},{address:"string",amount:number},{address:"string",amount:number}, ...] 여기에 해당 index에 adress 값이 들어감
          _tx.txOuts[i].amount, // [{address:"string",amount:number},{address:"string",amount:number},{address:"string",amount:number}, ...] 여기에 해당 index에 amount 값이 들어감
          _tx.hash, // 트랜잭션
          i // index
        )
      );
    }

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

    if (global.debug)
      console.log("6-36 수정된 utxo에 새로운 utxo를 추가해서 정의");
    const result = [...temp, ...newUTXO];

    this.utxos = result.reduce((prev, curr) => {
      const find = prev.find(
        ({ txOutId, txOutIndex }) =>
          // 이전 txOutId, txOutIndex를 찾을 것이다. (utxos)
          txOutId === curr.txOutId && txOutIndex === curr.txOutIndex
        // 이전 txOutId가 현재 txOutId와 같고 이전 txOutIndex와 현재 txOutIndex와 같다면
      ); // 위에 것을 const find로 초기화
      if (!find) prev.push(curr);
      // 만약 find의 찾을 수 없다면 이전 txOutId, txOutIndex에 현재 txOutId, txOutIndex를 prev에 넣는다.
      return prev; // 위 푸쉬한 prev를 리턴 prev의 상태는 현재 상태의 txOutId, txOutIndex
    }, []);
  }

  addTxpool(_tx: ITransaction): void {
    // 트랜잭션Tx을 추가하여 보관하는
    this.txPool.push(_tx);
    // 매개변수 _tx에 기존 트랜잭션 풀을 만들기 위해 배열이 담는 용도
  }

  updateTxPool(_newBlock: IBlock): void {
    // 보관된 트랜잭션Tx의 상태를 업데이트(수정)

    // 블록 생성 후 해당 블록에 사용된 트랜잭션을 삭제한다.
    // 블록이 생성(채굴) 될 때 이전에 거래를 했던 트랜잭션들을 모두 담아둔다.
    let txPool: Array<ITransaction> = this.getTxPool; // 기존 트랜잭션 풀
    const tempTx: Array<ITransaction> = _newBlock.data; // 새로운 블록의 트랜잭션 = 사용된 트랜잭션
    for (let i = 0; i < tempTx.length; ++i) {
      const tempTxPool: Array<ITransaction> = [];
      // Tx 트랜잭션을 담을 용도
      for (let j = 0; j < txPool.length; ++j) {
        if (txPool[j].hash !== tempTx[i].hash) tempTxPool.push(txPool[j]);
      } // 기존 트랜잭션 풀과 사용된 트랜잭션들(블록 내의 트랜잭션)을 비교해서 사용되지 않은 트랜잭션을 새로운 배열에 넣어준다.
      // 여기서 txPool[j].hash는 기존 트랜잭션 풀
      // 여기서 tempTx[i].hash는 기존 트랜잭션 풀

      txPool = tempTxPool;

      // 아래 fillter 메서드를 이용하면 위의 for문과 작동 방식이 같다.
      // txPool = txPool.filter(_tx=>_tx.hash !== tempTx[i].hash)
    }
    this.txPool = txPool;
  }
}

export default Chain;
