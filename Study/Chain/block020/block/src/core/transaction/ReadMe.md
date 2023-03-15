# Transaction

- Transaction은 거래 내역으로 거래에 대한 최소 단위로 보내는 내역과 받는 내역이 함께 있어야 한다.

예) miner(채굴자)가 BitCoin을 채굴했다.

-miner(채굴자) 큰틀 -

- 1. Tx 00000 형태 Tx 뒤에 0000은 hash 값이 들어간다.

  - 1.  채굴을 하면 Tx 00000 이 생성이되고
  - 2.  Tx 00000 안에는 input 값과 output 값이 존재
  - 3.  여기서 input안에는 값이 없고 output에서 값이 존재
  - 4.  output 값은 address: miner(채굴자 이름), amount: 50(값)
  - 여기서 1 ~ 4가 트랜잭션이다. 즉 트랜잭션이 추가가 되는 것.
  - Tx는 Transaction의 약자로 보통 hash를 뜻한다. Tx는 트랜잭션을 찾기 위한 고유 값

- input 값 : 이전 거래 결과 내역

  - 1. 현재 생성된 트랜잭션은 채굴(마이닝)을 통해서 처음 생성되어 input 내역이 없다. 이런 트랜잭션을 코인베이스 트랜잭션이라고 한다.
  - 2. 즉 채굴(마이닝)을 통해서 처음 생성되는 코인은 input 내역이 없고 이걸 코인베이스 트랜잭션이라고 명칭한다.

- output 값 : 이번 거래 결과 내역

  - 1.  miner가 50 BTC를 받게 되는 내용이 적혀 있다.
  - 2.  해당 output은 UnspentTransactionOutput에 저장된다.

- 2. UTXO 형태

  - 1. Unspent : 소비되지 않은 + Transaction은 Transaction + Output : 결과
  - 2.  소비되지 않은 Transaction 결과는 잔액
  - 3.  miner는 50 BTC를 가지고 있는 상태
  - 4.  Tx는 Transaction을 찾기 위한 값으로 어떤 Transaction에서 이 결과가 나왔는지 찾기 위해 존재

-miner(채굴자) 큰틀 -

예) 첫 번째 거래 miner(채굴자)가 tester에게 10 BTC를 보낸 상황

- Tx 0001 (현재 거래한 내역 장부) 추가

- input (보내기 바로 직전 내역)

  - adress : miner (계정 주인)
  - amount : 50
  - Tx : 0000 (보내기 전 장부)

- output (보낸 내역)

  - adress : tester (받는 사람)
  - amount :10

- output (현재 내역 잔액)

  - adress : miner (계정 주인)
  - amount :40

- UTXO

  - adress : tester (받는 사람)
  - amount : 10
  - Tx : 0001 (새로 생성된 트랜잭션)

  - adress : miner (계정 주인)
  - amount : 40
  - Tx : 0001 (새로 생성된 트랜잭션)

예) 두 번째 거래 miner(채굴자)가 tester에게 2 BTC를 보낸 상황

- Tx 0002 (현재 거래한 내역 장부) 추가

- input (보내기 바로 직전 내역)

  - adress : miner (계정 주인)
  - amount : 40
  - Tx : 0001 (보내기 전 장부)

- output (보낸 내역)

  - adress : tester (받는 사람)
  - amount :2

- output (현재 내역 잔액)

  - adress : miner (계정 주인)
  - amount :38

- UTXO

  - adress : tester (받는 사람)
  - amount : 10
  - Tx : 0001 (이전 생성된 트랜잭션)

  - adress : tester (받는 사람)
  - amount : 2
  - Tx : 0002 (새로 생성된 트랜잭션)

  - adress : miner (계정 주인)
  - amount : 38
  - Tx : 0002 (새로 생성된 트랜잭션)

- UTXO를 사용하는 이유는 각 거래에 대하여 확실한 기록(log, history)을 남기기 위해서 사용

예) 세 번째 거래 tester가 miner에게 2 BTC를 보낸 상황

- Tx 0003 (현재 거래한 내역 장부) 추가

- input (보내기 바로 직전 내역)

  - adress : tester (계정 주인)
  - amount : 10
  - Tx : 0001 (보내기 전 장부)

- input (보내기 바로 직전 내역)

  - adress : tester (계정 주인)
  - amount : 2
  - Tx : 0002 (보내기 전 장부)

- output (보낸 내역)

  - adress : miner (받는 사람)
  - amount : 11

- output (현재 내역 잔액)

  - adress : tester (계정 주인)
  - amount : 1

- UTXO

  - adress : miner (받는 사람)
  - amount : 38
  - Tx : 0002 (이전 생성된 트랜잭션)

  - adress : miner (받는 사람)
  - amount : 11
  - Tx : 0003 (새로 생성된 트랜잭션)

  - adress : tester (계정 주인)
  - amount : 1
  - Tx : 0003 (새로 생성된 트랜잭션)

- UTXO를 사용하는 이유는 각 거래에 대하여 확실한 기록(log, history)을 남기기 위해서 사용

- 위 설명과 같이 트랜잭션의 결과(output)을 UTXO에 추가 했다가 다음 생성되는 트랜잭션에 input을 가져와서 사용하는 방법으로 거래가 이루어짐
