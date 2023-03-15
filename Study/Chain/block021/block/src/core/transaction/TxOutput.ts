import Wallet from "@core/wallet";

export default class TxOut implements ITxOutput {
  public address: string;
  public amount: number;

  constructor(_address: string, _amount: number) {
    this.address = _address;
    this.amount = _amount;
  }

  static createTxOuts(sum: number, _receivedTx): Array<TxOut> {
    // createTxIns는 트랜잭션의 output을 만드는 과정
    console.log("6-25  txOut(output) 생성 시작");
    const { sender, received, amount } = _receivedTx;
    // sender는 보내는 사람
    // received 받는 사람
    // amount 코인 값
    // _receivedTx는 사용자가 입력한 것을 구조분해 할당으로 {sender, received, amount} 로 초기화

    const senderAddress = Wallet.getAddress(sender);
    // 보내는 사람 주소 가져온다 .
    const receivedTxOut = new TxOut(received, amount);
    console.log("6-26  잔액을 다 썻으면 반환");
    // 받는 사람 정보를 가져온다.
    if (sum - amount === 0) return [receivedTxOut];
    console.log("6-27  잔액을 다 썻으면 반환");
    // sum은 input에서 리턴 된 총 값으로 남은 금액이 0이면 내보내지 않는다.
    const senderTxOut = new TxOut(senderAddress, sum - amount);
    // 남은 잔액을 내보내는 상황
    return [receivedTxOut, senderTxOut];
    // 잔액이 0이 아닐 때 보낸 사람에게 다시 넣어준다.
  }
}
