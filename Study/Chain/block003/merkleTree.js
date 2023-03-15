// merkle, crypto-js 라이브러리를 가져온다.

const merkle = require("merkle");
const SHA256 = require("crypto-js/sha256");

// 트리를 만들고 루트값을 반환해주는 함수
const createMerkle = (_data) => {
  // data 앞에 언더바 _가 붙은 이유는 매개변수로 구분을 하기 위하여 붙힘. 예)_data
  // _data = ["123","asd","321","dsa"]
  // 받은 매개변수 값이 배열인지 확인
  if (!Array.isArray(_data)) return "너 배열 아님";

  let merkleArr = _data.map((item) =>
    SHA256(item).toString().toLocaleUpperCase()
  );
  // 배열의 값을 전체 암호화해서 merkleArr 변수에 반환 해준다.

  // 머클루트가 나올 수 있는 조건은 한개의 값이 나올 때 까지 계속 돌려야 한다.
  // 그래서 while 반복문을 사용 해준다.
  // merkleArr 배열의 길이가 1이 될 떄까지 while 문으로 돌리고 반복한다.
  while (merkleArr.length > 1) {
    const tempArr = [];
    // 배열 하나 만들어준다.

    for (let i = 0; i < merkleArr.length; i += 2) {
      if (i + 1 === merkleArr.length) {
        tempArr.push(merkleArr[i]);
      }
      //  merkleArr.length 길이가 1이 됐을 때  merkleArr = tempArr;로 넘어가고 끝.
      else {
        tempArr.push(
          SHA256(merkleArr[i] + merkleArr[i + 1])
            .toString()
            .toLocaleUpperCase()
        );
      }
      //  merkleArr.length 길이가 1 아니면
    }
    merkleArr = tempArr;
  }
  return merkleArr[0];
};

const LiveMerkle = (_data) => {
  const merkleRoot = merkle("sha256").sync(_data).root();
  // 암호화 방식은 sha256이고 매개변수로 전달받은 배열을 트리구조로 만들어 주고 root 값을 가져온다.
  return merkleRoot;
};

const data = ["123", "321", "123"];
console.log("createMerkle:", createMerkle(data));
console.log("LiveMerkle:", LiveMerkle(data));
