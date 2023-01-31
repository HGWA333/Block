// transaction/send 경로  BlockChain verify 검증 과정

import { SHA256 } from "crypto-js";
import elliptic from "elliptic";

const ec: elliptic.ec = new elliptic.ec("secp256k1");

type TSignature = elliptic.ec.Signature;

class Wallet {
  public address: string;
  public publicKey: string;
  public balance: number;
  public signature: elliptic.ec.Signature;

  constructor(_sender: string, _signature: TSignature) {
    this.address = _sender;
    this.publicKey = Wallet.getAddress(this.publicKey);
    this.balance = 0;
    this.signature = _signature;
  }

  static getAddress(_publicKey: string): string {
    return _publicKey.slice(26);
  }

  static verify(_receivedTx: {
    // static createSign(_data) 와 검증을 하기 때문에
    // static createSign(_data) {} 값 과  static verify(_receivedTx){} 값이 똑같아야 된다.

    sender: string;
    received: string;
    amount: number;
    signature: TSignature;
  }): TResult<undefined, string> {
    console.log("5-11 서명 확인");
    console.log(_receivedTx);
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
}

export default Wallet;
