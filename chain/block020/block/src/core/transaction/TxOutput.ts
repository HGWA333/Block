export default class TxOut implements ITxOutput {
  public address: string;
  public amount: number;

  constructor(_address: string, _amount: number) {
    this.address = _address;
    this.amount = _amount;
  }
}
