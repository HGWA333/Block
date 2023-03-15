declare interface IChain {
  chain: Array<string>;
  DIFFICULTY_ADJUSTMENT_INTERVAL: number;
  BLOCK_GENERATION_INTERVAL: number;
  TIME_UNIT: number;
}
