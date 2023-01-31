declare interface IConfig {
  DAI: number;
  averageGenerationTime: number;
}

declare interface IChain {
  getChain: Array<IBlock>;
  lastBlock: IBlock;
  config: IConfig;
  adjustmentBlock: IBlock;
  addBlock(_data: Array<string>): IBlock | null;
  add2Chain(_newBlock: IBlock): IBlock | null;
}
