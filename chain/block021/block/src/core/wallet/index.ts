// transaction/send 경로  BlockChain verify 검증 과정

import Transaction from "@core/transaction/Transaction";
import UnspentTxOut from "@core/transaction/UnspentTxOut";
import { SHA256 } from "crypto-js";
import elliptic from "elliptic";

const ec: elliptic.ec = new elliptic.ec("secp256k1");

type TSignature = elliptic.ec.Signature;

class Wallet {
  public address: string;
  public publicKey: string;
  public balance: number;
  public signature: TSignature;

  constructor(
    _sender: string,
    _signature: TSignature,
    _utxos: Array<IUnspentTxOut>
  ) {
    console.log("6-16 지갑 객체 생성 시작");
    this.publicKey = _sender;
    this.address = Wallet.getAddress(this.publicKey);
    this.balance = Wallet.getBalance(this.address, _utxos);
    // address, balance 지갑을 만든다.
    this.signature = _signature;
  }

  static getAddress(_publicKey: string): string {
    console.log("6-17 지갑 주소 가져오기");
    return _publicKey.slice(26);
  }

  static getBalance(_address: string, _utxos: Array<IUnspentTxOut>) {
    // 잔액 계산 하는 기능 메서드
    console.log("6-18 지갑 잔액 가져오기");
    return (
      _utxos
        .filter((item) => item.address === _address)
        // filter는 해당 아이템을 찾는다. item.adress === _address는 입력된 매개변수가 저장된 adress와 값이 같은 것을 찾음
        .reduce((prev, curr) => prev + curr.amount, 0)
      // reduce는 이전, 현재를 합치는 함수
    );
    // reduce는 이전과 현재 합치는 메서드
    // 리듀서 메서드에서 매개변수 0은 초기 값 설정
    // 위 코드를 for으로 돌리면 아래와 같다.
    // let temp = 0;
    // for (let i = 0; i < _utxos.length; ++i) {
    //   if (_utxos[i].address === _address) temp += _utxos[i].amount;
    // }
    // return;
  }

  static verify(_receivedTx: {
    // static createSign(_data) 와 검증을 하기 때문에
    // static createSign(_data) {} 값 과  static verify(_receivedTx){} 값이 똑같아야 된다.

    sender: string;
    received: string;
    amount: number;
    signature: TSignature;
  }): TResult<undefined, string> {
    console.log("5-11 /6-13 서명 확인");
    const { sender, received, amount, signature } = _receivedTx;
    const hash = SHA256(sender + received + amount)
      .toString()
      .toUpperCase();
    const keyPair = ec.keyFromPublic(sender, "hex");
    const isValid = keyPair.verify(hash, signature);
    console.log("5-12 서명 확인 결과 출력");
    if (!isValid) return { isError: true, msg: "서명오류" };
    return { isError: false, value: undefined };
  }

  static sendTransaction(
    _receivedTx: {
      sender: string;
      received: string;
      amount: number;
      signature: TSignature;
    },
    _utxos: Array<IUnspentTxOut>
  ) {
    console.log("6-12 sendTransaction 트랜잭션을 추가 함수 실행");
    const isValid = Wallet.verify(_receivedTx);
    console.log("6-14 만약 서명에 문제가 있으면 끝");
    if (isValid.isError === true) return isValid;

    console.log("6-15 만약 서명에 문제가 없으면 지갑 객체 생성");
    const wallet = new this(_receivedTx.sender, _receivedTx.signature, _utxos);
    // wallet은 지갑을 새로 생성하는 기능
    // 이 지갑은 8080 블록체인 서버에 있는 지갑으로 실제 지갑이 아니라 임시 지갑이다.

    console.log("6-19 잔액과 보낼 금액 확인");
    if (wallet.balance < _receivedTx.amount) {
      // 만약 내 돈이 부족할 때
      // wallet.balance 내가 가진 돈
      // _receivedTx.amount 보낼 돈
      return { isError: true, msg: "잔액 부족" };
    }

    // 만약 돈이 부족하지 않았을 때 이후 아래 것들 실행
    console.log("6-20 보내는 사람의(본인) utxo 목록 가져오기");
    const myUTXO = UnspentTxOut.getMyUTXO(wallet.address, _utxos);
    // getMyUTXO는 필요한 코인을 찾아서 가져오는 기능. 같은 것들을 모두 가져온다.

    console.log("6-22 트랜잭션 생성 함수 호출");
    const tx = Transaction.createTx(_receivedTx, myUTXO);
    // tx는 myUTXO에 대한 트랜잭션으로 createTx는 TxIn(트랜잭션의 input 값),  TxOut(트랜잭션의 output 값)을 hash화 한다.
    // 이후 해쉬화한 TxIn + TxOut을 합쳐 tx로 초기화 한다.
    return { isError: false, value: tx };
  }
}

export default Wallet;
