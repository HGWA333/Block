import Transaction from "@core/transaction/Transaction";
import UnspentTxOut from "@core/transaction/UnspentTxOut";
import { SHA256 } from "crypto-js";
import elliptic from "elliptic";

const ec = new elliptic.ec("secp256k1");

type TSignature = elliptic.ec.Signature;

class Wallet {
  // class Wallet은 지갑의 상태를 관리해주는 클래스

  //  Wallet의 메서드들 (이 클래스 Wallet은 만들어진 지갑 상태를 관리 해주는 메서드)
  // getAddress : 만들어진 지갑 주소를 가져오는 메서드
  // getBalance : 지갑의 잔액을 가져오는 메서드
  // verify : 개인키로 생성된 공용키 서명의 유효성을 검증하는 메서드
  // sendTransaction : 트랜잭션을 생성해 주는 메서드

  public publicKey: string;
  public address: string;
  public balance: number;
  public signature: TSignature;

  constructor(
    _sender: string,
    _signature: TSignature,
    _utxos: Array<IUnspentTxOut>
  ) {
    if (global.debug) console.log("6-16 지갑 객체 생성 시작");
    this.publicKey = _sender;
    this.address = Wallet.getAddress(this.publicKey);
    this.balance = Wallet.getBalance(this.address, _utxos);
    this.signature = _signature;
  }

  static getAddress(_publicKey: string): string {
    // 만들어진 지갑 주소를 가져오는 메서드
    if (global.debug) console.log("6-17 지갑 주소 가져오기");
    return _publicKey.slice(26);
    // _publicKey는 현재 66자리 hash 값 공개키를 26자리 수를 자른다.
    // 기존 66자인 해쉬 값을 앞에서 부터 26자를 잘라서 40자리 수 hash로 리턴
  }

  static getBalance(_address: string, _utxos: Array<IUnspentTxOut>) {
    // 지갑의 잔액을 가져오는 메서드
    if (global.debug) console.log("6-18 지갑 잔액 가져오기");
    return (
      _utxos
        // _utxos에는
        // address: string;
        // amount: number;
        // txOutId: string; // transaction의 hash
        // txOutIndex: number; // transaction의 몇번째 output
        // 값이 들어있다.

        .filter((item) => item.address === _address)
        // _utxos.address(사용자 ID) 와 매개변수로 들어온 값 _address(사용자 ID)와 같은 것을 찾는다.
        // 1개가 될 수도 있고 1개 이상이 될 수도 있다.
        // 현재 사용자 ID를 필터해서 필터에 걸린 것을 모두 가져온 상태
        .reduce((prev, curr) => prev + curr.amount, 0)
      // 첫 번째 매개변수는 이전 코인 갯 수와 현재 코인 갯 수를 합친다.
      // 두 번째 매개변수는 이전 코인 갯 수와 현재 코인 갯 수를 합쳤으니 0값 으로 전달
    );
  }

  static verify(_receivedTx: {
    // 개인키로 생성된 공용키 서명의 유효성을 검증하는 메서드
    sender: string;
    received: string;
    amount: number;
    signature: TSignature;
  }): TResult<undefined, string> {
    if (global.debug) console.log("5-11/6-13 서명 확인");

    const { sender, received, amount, signature } = _receivedTx;

    const hash = SHA256(sender + received + amount)
      .toString()
      .toUpperCase();
    const keyPair = ec.keyFromPublic(sender, "hex");
    const isValid = keyPair.verify(hash, signature);
    if (!isValid) return { isError: true, msg: "서명 오류" };
    return { isError: false, value: undefined };
  }

  static sendTransaction(
    // 트랜잭션을 생성해 주는 메서드
    _receivedTx: {
      sender: string;
      received: string;
      amount: number;
      signature: TSignature;
    },
    _utxos: Array<IUnspentTxOut>
    // 매개변수 _utxos는
    // address: string;
    // amount: number;
    // txOutId: string; // transaction의 hash
    // txOutIndex: number; // transaction의 몇번째 output
    // 데이터를 타입을 가지고 있다.
  ) {
    const isValid = Wallet.verify(_receivedTx);
    if (global.debug) console.log("6-12 트랜잭션 추가 함수 실행");
    if (isValid.isError === true) return isValid;
    if (global.debug) console.log("6-14 서명 문제 있으면 끝");

    const wallet = new this(_receivedTx.sender, _receivedTx.signature, _utxos);
    if (global.debug) console.log("6-15 지갑 객체 생성");
    if (wallet.balance < _receivedTx.amount) {
      if (global.debug) console.log("6-19 잔액과 보낼 금액 확인");
      return { isError: true, msg: "잔액 부족" };
    }

    const myUTXO = UnspentTxOut.getMyUTXO(wallet.address, _utxos);
    if (global.debug) console.log("6-20 보내는 사람의 utxo 목록 가져오기");
    const tx = Transaction.createTx(_receivedTx, myUTXO);
    if (global.debug) console.log("6-22 트랜잭션 생성 함수 호출");
    return { isError: false, value: tx };
  }
}

export default Wallet;
