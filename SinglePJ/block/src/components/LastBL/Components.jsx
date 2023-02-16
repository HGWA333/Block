const LastBlComponents = ({ LastBlock }) => {
  console.log("LastBlock", LastBlock);
  console.log("block", LastBlock.block.difficulty);
  console.log("blockNumber", LastBlock.blockNumber);
  return (
    <>
      <h1>
        Latest Blocks
        <h6>
          Block Height : <span>{LastBlock.blockNumber}</span>
        </h6>
        {/* <h6>
          Status : <span></span>
        </h6> */}
        <h6>
          Timestamp : <span>{LastBlock.block.timestamp}</span>
        </h6>
        <h6>
          Transactions : <span>{LastBlock.block.transactions}</span>
        </h6>
        <h6>
          Gas Used : <span>{LastBlock.block.gasUsed}</span>
        </h6>
        <h6>
          Gas Limit : <span>{LastBlock.block.gasLimit}</span>
        </h6>
        <h6>
          Extra Data : <span>{LastBlock.block.extraData}</span>
        </h6>
      </h1>
    </>
  );
};

export default LastBlComponents;
