# Geth 실행 시 Ubuntu 창은 총 3개를 사용 (IPC용 , geth실행용, clef 계정 생성용)

## IPC는 Ubuntu로 조작하는 방식

# Private Etherreum Network

```json
{
  "difficulty": "200000", // difficulty : 문제 난이도
  "gasLimit": "3100000", // gasLimit : 블록당 가스 지출 제한량(수수료)
  "alloc": {
    // 제네시스 블록 생성 시 지갑에 보상 지급(빈 객체도 상관이 없다.)
    "0xA3e9Ab71E70086fd470587428aF5c9a003CA0338": {
      "balance": "100000000"
    }
  },
  "config": {
    "chainId": 50, // 볼록체인 네트워크 식별 ID
    "homesteadBlock": 0, // 이더리움 버전
    "eip150Block": 0, // Etherreum Improvement Proposal이며, 기본값은 0 eip는 이더리움 핵심 프로토콜 사양 등의 표준을 설명한다.
    "eip155Block": 0,
    "eip158Block": 0
  }
}
```

# Genesis.json 생성

- Ubuntu 계정 ~(홈) /(루트) 경로에서 아래 명령어 입력

```sh
 vi ~/genesis.json # vi로 ~(홈) /(루트)에 genesis.json 파일을 생성
```

- genesis.json 파일을 생성 후 Private Etherreum Network에 적힌 JSON 파일 내용을 복사해서 vi로 생성된 genesis.json에 붙혀 넣는다.
- 만약 내용이 제대로 복사해서 붙혀넣기가 안된다면, vscode로 genesis.json를 열어 내용을 수정을 하면 된다.

# Geth로 개인 이더리움 네트워크 생성하는 명령어

```sh
geth --datadir myGeth init genesis.json
```

- myGeth 폴더가 생성되고 그 안에서 아래와 같은 폴더와 파일이 생성 됨

```sh

├── geth
│   ├── LOCK
│   ├── chaindata : 블록 헤더 내용, 블록 바디의 트랜잭션 내용 파일이 저장
│   ├── lightchaindata
│   └── nodekey
└── keystore : geth가 갖고있는 계정 정보가 저장

```

- 생성된 개인 이더리움 네트워크를 실행한다. ~/경로명 ~/ 홈에서 Ubuntu 새창으로 실행하여 아래 명령어 입력

```sh
geth --datadir ~/myGeth # 서버오픈
```

# IPC 실행 (Ubuntu IPC 전용 새창으로 연다.)

- Inter-Process Communication
- Process간에 통신을 말한다.
  - Process는 컴퓨터에서 실행되고 있는 프로그램을 말한다.
- geth로 열어둔 서버에 접근 명령어

```sh
geth attach ~/myGeth/geth.ipc
```

- IPC 연결 후에 사용하는 명령어들은 Javascript 기준의 객체와 같음

- IPC로 접근 시 Javascript로 구현된 모듈을 사용하게 되며 그 객체들은 아래와 같다.
  modules: admin:1.0 debug:1.0 engine:1.0 eth:1.0 ethash:1.0 miner:1.0 net:1.0 rpc:1.0 txpool:1.0 web3:1.0 (기본 값)
- admin:1.0 = Peer의 정보
- debug:1.0
- engine:1.0
- eth:1.0 = 체인 정보
- ethash:1.0
- miner:1.0 = 채굴 정보
- net:1.0
- rpc:1.0
- txpool:1.0 = 트랜잭션 풀
- web3:1.0 = 통신 관련 정보

- IPC에서 사용하는 명령어

```sh
eth.accounts # Geth가 갖고있는 계정 배열, 계정이 1개일 경우 ["0xc6955348bf907edbe38006ba159bd50b4ecd12dc"] / 계정이 2개일 경우 ["0xc6955348bf907edbe38006ba159bd50b4ecd12dc"],["0xc6955348bf907edbe38006ba159bd50b4ecd12dc"]
```

```sh
eth.getBalance(eth.accounts[0]) # 계정의 지갑의 현재 상태
```

```sh
eth # eth가 가지고 있는 객체들 데이터 리스트 나옴
```

```sh
admin # admin가 가지고 있는 객체들 데이터 리스트 나옴
```

```sh
miner # miner가 가지고 있는 객체들 데이터 리스트 나옴
```

- 계정 생성과 흐름

```sh
clef newaccount --keystore ~/myGeth/keystore # 계정 생성
eth.getBalance(개인지갑 주소) # 제네시스 블록 생성
eth.getBalance("0xA3e9Ab71E70086fd470587428aF5c9a003CA0338") # 제네시스 블록 생성 예
eth.getBlock(0) # 제네시스 블록 가져와 출력 해준다.
web3.fromWei(eth.getBalance(eth.accounts[0]), 'ether') # 지갑 잔액 확인
```

# IPC 창 입력 순서

```sh
eth.accounts
miner.setEtherbase(eth.accounts[0]) # 채굴할 때 계정 중 0번째 계정을 보상 받을 계정으로 설정
eth.coinbase # 현재 채굴 보상을 받을 계정을 확인
miner.start() # 채굴 시작
miner.stop() # 채굴 멈춤
eth.getBlock('latest') # 마지막 블록을 가져온다.
web3.fromWei(eth.getBalance(eth.accounts[0]), 'ether')

eth.sendTransaction({from:eth.accounts[0], # 트랜잭션 보내는 사람
to:eth.accounts[1], # 트랜잭션 받는 사람
value:web3.toWei(1,"ether"),}) # 트랜잭션 거래(보낸 사람, 받은 사람) 이후 둘 중 하나가 miner.start() 채굴을 시작해야 거래에 대한  동기화가 됨

```

- 트랜잭션 거래시 동기화
  "0xc6955348bf907edbe38006ba159bd50b4ecd12dc"
  트랜잭션 거래(보낸 사람, 받은 사람) 후 거래를 한 대상 둘 중 1명이 채굴을 해야 동기화가 됨

# clef (계정 생성 과정)

- 기존에 personal 객체를 사용하던 지갑 계정 기능을 외부로 추출하고 수업에는 계정 생성으로만 한다.

```sh
clef newaccount --keystore ~/myGeth/keystore
```

- clef 명령어 입력 후 이것을 사용할 것인지 물어본다. 입력창에 ok를 입력 하여 사용한다고 표시
- 10글자 이상의 비밀번호를 입력하면 계정이 생성된다.
- myGeth에 keystore 폴더에 들어가면 clef를 생성한 계정 정보 파일이 있다.
  - clef 명령어 입력 후 이것을 사용할 것인지 묻는 이유는 personal 객체를 없애면서 만들고 있는 도중이라 오류가 많음

# 트랜잭션 하기 전 계정 잠금 풀기 (# 실행 창 1에서 실행)

```sh
geth --datadir ~/myGeth --unlock "지갑 주소" # 서버 실행 후 엔터 트랜잭션 보내는 사람 주소로만 가능
```

1. geth --datadir ~/myGeth --unlock " "0xc6955348bf907edbe38006ba159bd50b4ecd12dc" 입력
2. 1번 입력 이후 계정 생성했을 때 적었던 비밀번호 10자리 입력

# 이더리움에서 사용하는 코인 단위

- wei : 이더리움의 최소 단위
- Kwei : 1,000 wei
- Mwei : 1,000,000 wei
- Gwei : 1,000,000,000 wei
- Twei : 1,000,000,000,000,000 wei
- Pwei : 1,000,000,000,000,000,000 wei
- Ether : 1,000,000,000,000,000,000,000 wei
- 예) 0.2 Ether 200,000,000,000,000,000,000 wei

# Geth 추가 설명

- datadir 옵션을 사용하지 않았을 때 네트워크 정보가 저장 되는 곳

  - Linux : ~/.ethereum
  - Mac : ~/.Libraray/Ethereum (기본 숨긴 폴더로 저장 되어있어서 숨긴 폴더 보기로 설정)

- Looking for peers가 계속 나오는 이유
- peer가 충분히 연결되지 않으면 계속 peer를 추가하도록 시도하기 때문이다.
- peer의 최대 피어 수는 50개
