const SHA256 = require("crypto-js").SHA256;
const merkle = require("merkle");

const data = [1, 2, 3];

const merkleRoot = merkle("sha256").sync(data).root();

const firstTree = [];
for (let i = 0; i < data.length; i++) {
  firstTree.push(SHA256(data[i].toString()).toString().toUpperCase());
}

const secondTree = [];
for (let i = 0; i < firstTree.length; i += 2) {
  let temp = "";
  // 임시값을 주고 아래 if와 else의 조건에 따라 값을 정의함
  if (i + 1 === firstTree.length) {
    // (홀수 갯수) 다음 인덱스(아이템)이 없을 때
    temp = firstTree[i];
    // 홀수 갯수는 다음 아이템이 없을 때 기존의 아이템을 그대로 사용한다.
  } else {
    // (홀수 갯수) 다음 인덱스(아이템)이 있을 때
    temp = SHA256(firstTree[i] + firstTree[i + 1])
      .toString()
      .toUpperCase();
  }
  secondTree.push(temp);
}

const oddThirdRoot = SHA256(secondTree[0] + secondTree[1])
  .toString()
  .toUpperCase();

const createMerkleRoot = (_data) => {
  if (!Array.isArray(_data)) return { isError: true, msg: "너 배열 아님" };
  // isArray : Array(배열 객체)의 메서드로 배열인지 아닌지를 판단한다.
  // 배열이라면 true로 return (반환한다. 리턴한다.)
  // return을 객체로 내보내는 이유 : 블록 생성 이후 해당 블록이 정상적인 블록인지 확인하기 위해서 객체로 내보낸다.
  // isError를 통해서 생성 도중 문제가 발생했는지 먼저 파악할 수 있다.
  // jset에서 사용하는 것이 아닌 블록 생성 단계에서 사용
  // 매개변수에 _ 언더바를 붙이는 이유 : 매개변수 구분하는 것으로 이 변수는 매개변수라고 알려주는 것이다.
  let merkleArr = _data.map((item) =>
    SHA256(item).toString().toLocaleUpperCase()
  );
  while (merkleArr.length > 1) {
    const tempArr = [];
    for (let i = 0; i < merkleArr.length; i += 2) {
      if (i + 1 === merkleArr.length) {
        tempArr.push(merkleArr[i]);
      } else {
        tempArr.push(
          SHA256(merkleArr[i] + merkleArr[i + 1])
            .toString()
            .toLocaleUpperCase()
        );
      }
    }
    merkleArr = tempArr;
  }
  return { isError: false, value: merkleArr[0] };
  // isError가 false라 error가 없이 정상적으로  merkleArr[0] 값과 value 키로 반환
};

module.exports = {
  oddMerkelRoot: merkleRoot,
  oddThirdRoot,
};
