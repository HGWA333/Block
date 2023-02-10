# Ganache 서버 오픈 하기전에 무조건 해야 될 것

```sh
source ~/.bashrc
```

- 이것을 실행 시켜야 node -v 했을 때 node 버전 18.3
- 실행을 시키지 않으면 node 버전 12.2다. 그래서 무조건 실행 시켜서 초록색 글씨가 떠야 됨

# Ganache

- Ganache(가나슈)는 테스트용 로컬 이더리움 네트워크
- 장점
  - Geth 등보다 속도가 빠르다.
  - 별 다른 세팅 없이 바로 테스트 가능
  - 기본으로 10개의 계정이 생성되며 각 계정에 100 코인씩 지급된다.
- 단점
  - 채굴해도 보상이 없다.
  - 외부 네트워크 피어로 연결이 안된다.(로컬로만 사용 가능. 온전히 테스트용으로 다른 네트워크와 동기화가 될 수 없음)
  - 서버 종료 시 모든 데이터 삭제

# Ganache 설치

```sh
npm i -g ganache-cli # cli는 Commend Line Interface의 약어
```

# Ganache 실행

```sh
npx ganache-cli
```

# Ganache 실행 시 options

```sh
# Ganache 실행 시
npx ganache-cli # 시작 시 생성할 계정의 수, 기본 값은 10 (1회성으로 서버 종료시 계정이 다 날아감)
npx ganache-cli -a 100 # 서버 시작 시 계정 100개 생성
npx ganache-cli --accounts 100 # 서버 시작 시 계정 100개 생성
```

```sh
-a 100 | --accounts 100 # 서버 시작 시 계정 100개 생성
-e 1000 | --defaultBalanceether 1000 # 서버 시작 시 생성되는 계정이 가지고 있는 Ether의 수량으로 기본값은 100 Ether 지급
-b 60 | --blockTime 60 # 자동 마이닝 시간 간격으로 초 단위로 지정한다. 60일 경우 60초이다. 단 웬만해선 지정하지 않은 것이 좋다. 60초 마다 계속 마이닝을 하기 때문이다. 기본 값은 트랜잭션 발생 시 마이닝을 바로 진행한다.
-p | --port # 사용할 포트로 기본 값은 8545로 지정되어있다.
-h | --host | --hostname # 기본 접속 주소, http.addr과 같은 기능을 한다. 기본 값은 127.0.0.1

-g | --gasPrice # wei의 가스 가격, 기본값 2000000000 (20GWei)
-l | --gasLimit # wei의 가스 가격, 기본값 2000000000 (20GWei)
--chainId # 체인 아이디, 기본 값은 1337
``

url = http://localhost:8080
http는 프로토콜
localhost은 도메인, 호스트 = 127.0.0.1 아이피, 호스트 (집 주소)
8080은 포트 (방문짝)
```

# Ganache 실행 후 METAMASK에서의 작업

- 1. 오른쪽 최상단에 위치한 아이콘 클릭
- 2. 클릭 후 나오는 메뉴에서 맨 하단 톱니바퀴 모양 설정 버튼 클릭
- 3. 왼쪽 콘센트 모양 네트워크 클릭
- 4. 네트워크 추가 클릭 후 네트워크 수동 추가
- 5. 네트워크 이름

# RPC

- RPC는 modules: admin:1.0 debug:1.0 engine:1.0 eth:1.0 ethash:1.0 miner:1.0 net:1.0 rpc:1.0 txpool:1.0 web3:1.0 이것들이 RPC다.

## geth와 같은 RPC

- eth

  - accounts
  - blockNumber
  - coinbase
  - getBalance
  - sendTransaction

- miner

  - start : 자동 마이닝 시작
  - stop : 자동 마이닝 종료

- personal

  - unlockAccounts
  - newAccounts
  - sendTransaction : eth의 sendTransaction과 같음.

## Ganache 전용 RPC

- evm

- snapshot : 현재 상태를 저장한다.

```sh
{"id":1337,"jsonrpc":"2.0","result":"0x2"} # snapshot을 1회 사용하고 난 이후의 결과 값
{"id":1337,"jsonrpc":"2.0","result":"0x3"} # snapshot을 2회 사용하고 난 이후의 결과 값
{"id":1337,"jsonrpc":"2.0","result":"0x4"} # snapshot을 3회 사용하고 난 이후의 결과 값
```

- revert : snapshot으로 상태를 되돌린다. 되돌린 스냅샷 기준으로 이후 스냅샷은 삭제된다.

```sh
curl -X POST -H "content-type:application/json" --data '{"id":1337, "jsonrpc": "2.0", "method": "evm_revert", "params":["0x2"]}' http://localhost:8545 # snapshot을 1회 사용한 곳으로 되돌리고 1회 이후 2, 3회의 snapshot은 삭제 된다.

```

- unlockUnknownAccount : unlockAccount와 같음 비밀번호가 없다.
- lockUnknownAccount :lockAccount와 같음 비밀번호가 없다.

## RPC 연결 방법

- 서버가 오픈 된 상태에서

```sh
geth attach http://localhost:8545
```
