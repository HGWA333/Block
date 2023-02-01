declare interface ITxOutput {
  // transaction의 결과(output)
  // Tx Out은 transaction의 결과 값으로
  // 새로운 트랜잭션이 발생 되었을 때 UTO에서 내용을 가져올 때 input이 된다.
  address: string; // address는 채굴자 혹은 거래를 했을 때 본인 or 상대방이 되기 때문에 string 타입으로 설정
  amount: number; // amount는 채굴 했을 때와 거래를 했을 때 나오는 코인의 수량을 나타내기 때문에 number 타입으로 설정 하였다.
}
declare interface ITxInput {
  // transaction에서 사용되는 잔액(input)
  txOutId: string; // transaction의 hash 값
  txOutIndex: number; //  transaction의 몇번째 output인지 알기 위해서 Index를 사용
  // output 갯 수가 여러개가 존재한다. 그렇기 때문에 이 각 갯수가 몇 번째 Index인지 알 수 있어야 한다.
  signature?: string; // 최초 채굴(miner)한 상황이 있을 수 있으므로 선택 연산자(프로퍼티? / signature?) 사용하여 undefined 값을 받을 수 있도록 설정   | 는 비트연산자 중 or를 뜻한다. 연산에 있어 2진수로 바꿔서 연산을 한다. 예) 10101011 | 1010111
}

declare interface ITransaction {
  // interface로 만든 ITxOutput ITxInput를 담아주기 위해 ITransaction를 만든다.
  txIns: Array<ITxInput>; //  txIns는 [[ITxInput],[ITxInput],[ITxInput],[ITxInput]] 형태
  txOuts: Array<ITxOutput>; // txOuts는 [[ITxOutput],[ITxOutput],[ITxOutput],[ITxOutput]] 형태
  hash: string; // hash는 A245BC4F .... 값을 받기 때문에 string 타입으로 설정
  // hash는 TxHash or TxID 라고 부른다.
}

declare interface IUnspentTxOut {
  // 트랜잭션 안에서 채굴 또는 거래 된 상황 이후에 UTO로 넘어가 현재 내역을 보여준다.
  // 그리고 새로운 트랜잭션이 발생할 때 가져오고 거래 하고 남은 잔액은 UTO로 넘어가고 남지 않는다면 소멸이 된다.
  address: string; // address가 string 타입인 이유는 채굴 또는 거래를 한 사용자의 이름을 사용한다. 그래서 string 타입으로 설정
  amount: number; // amount가 number 타입인 이유는 채굴 또는 거래를 한 사용자의 잔액을 표시한다. 그래서 number 타입으로 설정
  txOutId: string; // transaction의 hash 값으로 검증용
  txOutIndex: number; // txOutIndex가 number 타입인 이유는 채굴(새로 1개 생성) 또는 거래(UTO에서 가져온다.)를 했을 때 사용되는 output이 몇번째 output인지 알기 위해서 number 타입을 사용한다. 그리고 output은 배열에 담겨 있다.
}
