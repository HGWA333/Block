# 블록 익스플로러

## 개요

- 블록, 트랜잭션, 지갑 주소에 관한 모든 정보를 확인할 수 있다.

## stack

- HTML, CSS, JS, REACT, NODE.JS, MYSQL, METAMASK, WEB3, GETH

## 최소 기능 구현

- 블록, 트랜잭션, 지갑 주소 정보 출력
- 토큰의 코인에 대한 가격은 적당히 각자의 판단에
- 검색 기능
  - 지갑 주소를 검색 했을 때 내역들
  - 검색할 때 mySQL 사용하고 트랜잭션 해쉬(채굴 시 생성) 될 값을 DB에 저장

## 기능 구현 순서

- geth 또는 ganache의 정보의 입력을 받아서 프론트에 띄운다.
- Latest Blocks , Latest Transactions
- 프론트에 띄어야 할 정보 ( Transaction Hash, Status, Block, Timestamp, From, To, Value, Transaction Fee, Gas Price )
- 검색 기능 구현
