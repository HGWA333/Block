declare interface IWallet {
  address: string;
  publicKey: string;
  privateKey: string;
  balance: number; // 돈 잔액

  getPrivateKey(): string;
  getPublickKey(): string;
  getAddress(): string;
}
