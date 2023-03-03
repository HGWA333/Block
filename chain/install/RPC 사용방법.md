# RPC

- Remote Proedure Call의 약자, 원격 프로시져 호출
- 별도의 코딩 없이 다른 공간에서 함수 등을 호출할 수 있는 통신 기술
- IPC를 사용하여 객체내의 함수"메서드" (admin, eth, miner ...) 등을 호출하는 것과 같은 방식

# IPC 파일이 아닌 HTTP 통신으로 조작하는 방법

## 1.geth를 HTTP 통신으로 사용할 수 있도록 실행

- HTTP 통신으로 사용할 수 있도록 실행 한다는 것은 지정된 라우터를 실행하면 작동
- HTTP 통신을 사용하기 때문에 port가 열려있으면 외부에서 조작이 가능하.

```sh
source ~/.bashrc
```

```sh
geth --datadir ~/myGeth --http --http.addr "0.0.0.0" --http.port 8080 --http.corsdomain "*" --http.api "admin,miner,txpool,web3,personal,eth,net" --allow-insecure-unlock --syncmode full --networkid 50 console  # IPC 서버 오픈
# console로 들어가면 RPC로 접근을 해서 curl과 같은 명령어를 사용하지 못함.
# RPC로 접근을 했으니 RPC 명령어를 사용하여 처리를 한다.
```

--datadir ~/myGeth : 개인 이더리움 네트워크 데이터 저장 폴더(~/myGeth)
--http : HTTP 서버를 배포, IPC로 조작하던 개인 이더리움 네트워크를 HTTP 통신으로 조작
--http.addr "0.0.0.0" : 요청 가능한 IP 주소 설정, 기본값 127.0.0.1(로컬 IP), 0.0.0.0(모든 IP 허용)은 모든 IP 주소 허용
-http.port 8080 : 요청 가능한 port 설정, port 설정을 하지 않을 경우 기본값 8545으로 자동 설정
--http.corsdomain : CORS에 대한 설정
"\*" : "\*"는 와일드 카드라고 부르며, 이것은 모든 것을 전부 허용한다. 단 권장하지 않음.
--http.api : 사용 가능한 RPC를 설정, 기본값은 eth, net, web3가 들어간다.
"admin,miner,
txpool,
web3,
personal,
eth,net"
--allow-insecure-unlock : HTTP 통신으로 계정을 열 수 있게 한다.(unlock) \* 공식 홈페이지에서는 전문가 이외에는 권장하지 않는다.
--syncmode full : 피어 연결 시 동기화 방법 설정으로 옵션으로 fast, full, light가 있다.

    - fast : 블록 헤더, 최신 1024개의 트랜잭션 동기화로 <최근 삭제>
    - syncmode 옵션 설정 되지 않았을 때 full이 기본 값이다.
    - full : 모든 데이터 동기화
    - light : 블록 헤더, 잔액 관련만 동기화
    - snap : 최근 128개 블록만 동기화, 기본값

--networkid 50 : 개인 이더리움 네트워크 아이디, 체인 아이디와 같게 설정 해야 한다. 뒤에 붙은 50이 ID

## 2번 실행전 해야 될 명령어

```sh
geth --datadir myGeth init genesis.json
```

- 위 명령어 입력후 아래로 진행 하면 됨.

## 2.geth에 HTTP 통신으로 연결 RPC

- 서버가 오픈 된 상태에서

```sh
geth attach http://localhost:8080
```

----- Ubuntu 새창을 열고 사용(RPC에 연결 된 창에서 실행하면 안됨.) -----

## 3.계정 생성 (서버가 연결 된 상태에서)

```sh
personal.newAccount()
```

## 3-1.계정 unlock 풀기 (계정 생성 하고 난 이후)

```sh
personal.unlockAccount(eth.accounts[0])
```

## 3-2.geth에 HTTP 통신으로 요청

- attach를 하지 않고 HTTP 통신을 사용한다. attach를 실행하지 않은 Ubuntu창에서만 명령어 입력 가능

## 4.생성된 지갑 조회

```sh
curl -X POST -H "content-type:application/json" --data '{"id":1337, "jsonrpc": "2.0", "method": "eth_accounts", "params": []}' http://127.0.0.1:8080 # 계정을 가져오기 위한 명령어  localhost 대신 http://15.165.160.40:8080를 사용 한 이유는 외부 ip를 이용하기 위해
```

```json
{
  // Ubuntu에서 위 명령어 실행시 나온 결과 값
  "jsonrpc": "2.0",
  "id": 50,
  "result": [
    "0xc6955348bf907edbe38006ba159bd50b4ecd12dc",
    "0x4f4e5779d9a8cb371a89ff8248838e49fdd1ecec",
    "0xee208c2983f67eb815e01452087c03ddc268d6ff",
    "0xab5ada374b6c54fd3cd29df96dc0424048d97e14",
    "0x95abb6575517c4d0ca15119ff9cef17a8538a03f"
  ]
}
```

- X : 통신에 사용하는 method
- H : header
- data : 보내는 요청 body {
  - id : 체인 아이디
  - jsonrpc : json을 사용하는 RPC의 버전
  - method : 이더리움의 호출 메서드명
  - params : 메서드의 인자값(매개변수)
    }

## 5.코인베이스 조회

```sh
curl -X POST -H "content-type:application/json" --data '{"id":1337, "jsonrpc": "2.0", "method": "eth_coinbase", "params": []}' http://localhost:8080
```

```json
{
  "jsonrpc": "2.0",
  "id": 50,
  "result": "0xc6955348bf907edbe38006ba159bd50b4ecd12dc" // 코인베이스로 설정된 지갑 주소 결과 값 나옴
}
```

## 6.새로운 계정 생성

```sh
curl -X POST -H "content-type:application/json" --data '{"id":1337, "jsonrpc": "2.0", "method": "personal_newAccount", "params": ["1234567890"]}' http://localhost:8080
```

- ["password"]를 비밀번호로 사용해서 계정 생성으로 password에 사용자가 원하는 임의의 값을 넣어서 사용 할 수 있음

## 7.계정 언락(unlock)

```sh
curl -X POST -H "content-type:application/json" --data '{"id":1337, "jsonrpc": "2.0", "method": "personal_unlockAccount", "params": ["0xB10424eD82893BeFF5584B26C479e9edC17D5981","1234567890"]}' http://localhost:8080 # params ["주소","입력한 10자리 비번"]
```

```json
{ "jsonrpc": "2.0", "id": 50, "result": true } // 계정 언락 입력시 나오는 결과 값
```

## 8.채굴 보상 받을 지갑 주소 설정

```sh
curl -X POST -H "content-type:application/json" --data '{"id":1337, "jsonrpc": "2.0", "method": "miner_setEtherbase", "params": ["0xbe732ec1c43215a62b551515dc8f4ee3d4a4d187"]}' http://localhost:8080 # method에서 miner_setEtherbase 중 _ 이것은 IPC에서 :와 같다.
```

```json
{ "jsonrpc": "2.0", "id": 50, "result": true } // 채굴 보상 받을 지갑 주소 설정 입력시 나오는 결과 값
```

## 9.채굴 시작

```sh
curl -X POST -H "content-type:application/json" --data '{"id":50, "jsonrpc": "2.0", "method": "miner_start", "params": [1]}' http://127.0.0.1:8080 # method에서 miner_setEtherbase 중 _ 이것은 IPC에서 :와 같다.
# miner.start(1) = "method": "miner_start", "params": [1]
# 여기서 매개변수로 들어간 1은 쓰레드 하나만 사용한다는 의미
# 쓰레드(thread)는 CPU의 작업 최소 단위로 매개변수가 입력이 되지 않으면 가용할 수 있는 모든 쓰레드를 사용하겠다는 의미
```

```json
{ "jsonrpc": "2.0", "id": 50, "result": null } // 채굴 시작 입력시 나오는 결과 값
```

## 10.채굴 멈춤

```sh
curl -X POST -H "content-type:application/json" --data '{"id":50, "jsonrpc": "2.0", "method": "miner_stop", "params": []}' http://127.0.0.1:8080 # method에서 miner_setEtherbase 중 _ 이것은 IPC에서 :와 같다.
```

```json
{ "jsonrpc": "2.0", "id": 50, "result": null } // 채굴 멈춤 입력시 나오는 결과 값
```

## 11.지갑 잔액 조회

```sh
curl -X POST -H "content-type:application/json" --data '{"id":50, "jsonrpc": "2.0", "method": "eth_getBalance", "params": ["0xc6955348bf907edbe38006ba159bd50b4ecd12dc", "latest"]}' http://localhost:8080 # method에서 miner_setEtherbase 중 _ 이것은 IPC에서 :와 같다.
```

```json
{"jsonrpc":"2.0","id":50,"result":"0x281d901f4fdd100000"},// 지갑 잔액 조회시 잔액 결과 값은 16진수로 받는다.
```

## 12.TxPool

```sh
curl -X POST -H "content-type:application/json" --data '{"id":50, "jsonrpc": "2.0", "method": "txpool_content"}' http://127.0.0.1:8080
```

```json
{ "jsonrpc": "2.0", "id": 50, "result": { "pending": {}, "queued": {} } } // txpool 관련 결과 값 출력. 현재는 거래 내역이 없어서 TxPool이 비어있음
```

## 13.Tx 트랜잭션 보내기

```sh
curl -X POST -H "content-type:application/json" --data '{"id":50, "jsonrpc": "2.0", "method": "eth_sendTransaction",  "params":[{"from":"0xc6955348bf907edbe38006ba159bd50b4ecd12dc","to":"0x68312847f12517934b4669b0a552d66f83a624cf","value":"0x3B9ACA00","gas":"0x15f90","gasPrice":"0x430e23400"}]}' http://127.0.0.1:8080
```

- gas : 본인이 트랜잭션에 사용한 수수료
- gasPrice : 가스당 가격(수수료 가격을 결정)

```json
{
  "jsonrpc": "2.0",
  "id": 50,
  "result": "0x84348179716ad683889a9676cb0077432b00a62203f008899b523bb5d0f5d1b3"
} // txpool 관련 결과 값 출력. 현재는 거래 내역이 없어서 TxPool이 비어있음
```

## 14.Tx 트랜잭션 보내고 난 이후 TxPool 확인 결과 값

```json
{
  "jsonrpc": "2.0",
  "id": 50,
  "result": {
    "pending": {
      "0xC6955348BF907eDBE38006BA159bd50b4ecd12dc": {
        "0": {
          "blockHash": null,
          "blockNumber": null,
          "from": "0xc6955348bf907edbe38006ba159bd50b4ecd12dc",
          "gas": "0x15f90",
          "gasPrice": "0x430e23400",
          "hash": "0x84348179716ad683889a9676cb0077432b00a62203f008899b523bb5d0f5d1b3",
          "input": "0x",
          "nonce": "0x0",
          "to": "0x68312847f12517934b4669b0a552d66f83a624cf",
          "transactionIndex": null,
          "value": "0x3b9aca00",
          "type": "0x0",
          "chainId": "0x32",
          "v": "0x88",
          "r": "0x2e28c7d93ac60308756b0d402e61f3892899f550950d07c3ef00f8f823a4d45b",
          "s": "0x3b7aa051c0a176ab6d9483e671771abe0fcafef2024b4d881b1a0e665aadd97c"
        }
      }
    },
    "queued": {}
  }
}
```

- TxPool 확인 이후 채굴 시작을 하면 TxPool이 초기화 된다.

```json
{ "jsonrpc": "2.0", "id": 50, "result": { "pending": {}, "queued": {} } } // txpool 관련 결과 값 출력. 현재는 거래 내역이 없어서 TxPool이 비어있음
```
