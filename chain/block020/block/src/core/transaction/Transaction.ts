import TxIn from "./TxInput";
import TxOut from "./TxOutput";
import UnspentTxOut from "./UnspentTxOut";
// 트랜잭션에 필요한 요소들을 불러온다. {TxIn, TxOut, UnspentTxOut}
import { SHA256 } from "crypto-js";

export default class Transaction implements ITransaction {
  public txIns: Array<ITxInput>;
  public txOuts: Array<ITxOutput>;
  public hash: string;

  constructor(_txIns: Array<ITxInput>, _txOuts: Array<ITxOutput>) {
    this.txIns = _txIns;
    this.txOuts = _txOuts;
    this.hash = this.createHash();
  }
  createHash(): string {
    //   const txOutStr: string = this.txOuts.reduce(
    //       (prev, curr) => prev + Object.values(curr).join(""),
    //       ""
    //       );

    // 위에 주석 방식과 같이 동작

    // ----- txOut -----
    let txOutStr: string = "";

    for (let i = 0; i < this.txOuts.length; i++) {
      const tempTxout: Array<string | number> = Object.values(this.txOuts[i]);
      // Output 내용의 값 들만 가져와 사용해야 한다. class는 객체 형식으로 만들어지기 때문에
      // Object.values를 사용하여 배열로 만들어서 키인 adress, amount의 값만 가져와서 사용
      // for문을 사용한 이유는 Output이 1개일 수 도 있지만 1개 이상 여러개가 있을 수 있는 상황이 있어서

      for (let j = 0; j < tempTxout.length; ++j) {
        txOutStr += tempTxout[j];
      }
    }

    // ----- txIn -----
    let txInStr: string = "";

    for (let i = 0; i < this.txIns.length; i++) {
      const tempTxIn: Array<string | number> = Object.values(this.txIns[i]);
      // Input 내용의 값 들만 가져와 사용해야 한다. class는 객체 형식으로 만들어지기 때문에
      // Object.values를 사용하여 배열로 만들어서 키인 adress, amount의 값만 가져와서 사용
      // for문을 사용한 이유는 Input이 1개일 수 도 있지만 1개 이상 여러개가 있을 수 있는 상황이 있어서

      for (let j = 0; j < tempTxIn.length; ++j) {
        txInStr += tempTxIn[j];
      }
    }

    return SHA256(txInStr + txOutStr)
      .toString()
      .toUpperCase();
    // 최종적으로 트랜잭션 Hash or 트랜잭션 ID를 리턴
  }
  createUTXO(): Array<IUnspentTxOut> {
    // transaction에서 utxo를 생성해서 내보내준다.
    const utxo: Array<IUnspentTxOut> = [];
    for (let i = 0; i < this.txOuts.length; ++i) {
      utxo.push(
        new UnspentTxOut(
          this.txOuts[i].address,
          this.txOuts[i].amount,
          this.hash,
          i
        )
      );
    }

    return utxo;
  }
}
