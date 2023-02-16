const MainComponents = ({ blockNumber }) => {
  const Number = [blockNumber];

  console.log("MainComponents blockNumber : ", blockNumber);
  console.log("MainComponents Number", Number);

  return (
    <>
      <div>{blockNumber}</div>
    </>
  );
};

export default MainComponents;
