# Geth RPC에 attach이후에 Javascript로 수행할수 있는 명령들의 모음

## RPC에 attach 하는 방법

- RPC 실행하는 Ubuntu는 서버라고 생각을 하면 된다.( RPC는 한개의 Ubuntu에서만 실행할 수 있음)
- Ubuntu 실행 후 아래 명령어 입력
- curl은 shell 혹은 Ubuntu에서 사용을 한다.

```sh
source ~/.bashrc
```

```sh
geth --datadir ~/myGeth --http --http.addr "0.0.0.0" --http.port 8080 --http.corsdomain "*" --http.api "admin,miner,txpool,web3,personal,eth,net" --allow-insecure-unlock --syncmode full --networkid 1337 console
```

- 위 명령어를 입력을 한 순간 RPC에 진입을 한 것이다.
- Ubuntu로 새창을 열은 것과는 완전히 별개다.

## Javascript 명령어

- eth
  eth.accounts : 현재 생성된 계정 배열
  eth.blockNumber : 현재 채굴된 블록의 번호
  eth.hashrate : 현재 해시레이트
  eth.coinbase : 채굴이 진행되면 보상을 받을 계정. 보통 이것을 eth.accounts[0]과 동일하게 셋팅한다.
  eth.mining : 현재 채굴중인지 여부
  eth.getBalance(account) : 계좌 잔고 조회
  eth.getTranaction(tx) : 트랜잭션의 정보
  eth.sendTransaction({from:"account", to:"account", value:50}) : 트랜잭션 보내기
  eth.sendTransaction({from:eth.accounts[0], to:eth.accounts[1], value:web3.toWei(1,"ether")})
  eth.pendingTransactions : 현재 진행을 기다리고 있는 트랜잭션

- miner
  miner.start() : 채굴을 시작
  miner.start(1) : 한 개의 스레드를 이용하여 채굴
  miner.stop() : 채굴을 정지한다.
  miner.setEtherbase(account) : coinbase를 계좌로 설정한다.

- admin
  admin.nodeinfo : admin의 node정보를 보여준다.
  admin.peers : admin에 연결된 peer를 보여준다.

- net
  net.peerCount : 네트워크에 연결된 peer의 수를 확인

- txpool
  txpool.inspect : 채굴을 기다리는 트랜잭션 pool을 확인
  txpool.status : 트랜잭션 pool의 갯 수를 확인

--------------- RPC에서 personal 삭제 됨 ---------------

- personal
  personal.newAccount(): 계좌를 생성하고 명령어를 입력하면 비밀번호 2번을 입력
  personal.unlockAccount(account): 계좌의 잠금을 해제한다. 트랜잭션을 발생시키 위해서는 필수적으로 해제해야 됨

## web3.js에서는 지원이 안되는 명령어

miner.start() : 채굴 시작. geth 시작하면 자동으로 시작되어 있음.
miner.stop() : 채굴 중단
miner.setEtherbase() : 채굴 보상을 줄 계정을 등록

personal.newAcconut(passwd) : 계정 생성
personal.unlockAccount(account, passwd) : 계정 잠금 해제. 송금등의 트랜잭션을 발생시키기 위해서는 반드시 잠금해제가 되어야 한다.
