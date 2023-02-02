export default class TxIn implements ITxInput {
  public txOutId: string;
  public txOutIndex: number;
  public signature?: string;

  constructor(_txOutId: string, _txOutIndex: number, _signature?: string) {
    this.txOutId = _txOutId;
    this.txOutIndex = _txOutIndex;
    this.signature = _signature;
  }
  static createTxIns(_receivedTx, _myUTXO: Array<IUnspentTxOut>) {
    // 보내는 사람의 UTXO 기준으로 input(txIns)를 만든다.
    // createTxIns는 트랜잭션의 input을 만드는 과정
    // _myUTXO는 본인의 UTXO
    console.log("6-24  txIns(input) 생성 시작");
    let sum: number = 0;
    let txIns: Array<TxIn> = [];

    for (let i = 0; i < _myUTXO.length; ++i) {
      const { txOutId, txOutIndex, amount } = _myUTXO[i];
      // _myUTXO[i]는 본인 utxo를 기준으로
      const txIn = new TxIn(txOutId, txOutIndex, _receivedTx.signature);
      // txIn을 생성하고
      // UTXO에서 가져온 것을 new TxIn() 데이터로 txIn로 초기화 한 것은 Tx0000에 input으로 만드는 과정
      txIns.push(txIn);
      // 만들어진 txIn(input)을 txIns 빈 배열에 push
      sum += amount;
      // sum(총합)에 input의 잔액을 더해주고
      // sum은 UTXO에서 가져온 돈
      // 코인 값을 sum으로 초기화
      if (sum >= _receivedTx.amount) break;
      // 총합이 보낼 금액보다 크면 멈춘다.
    }
    return { sum, txIns };
    // sum은 총 얼마인 값
    // txIns는 목록
  }
}
