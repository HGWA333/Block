# NodeJs에서 Block확인 하는 방법

```sh
    npm i web3 express # 설치
```

- 1. ws 웹소켓 서버 설정
- 2. geth 서버를 열고 설정을 해준다. 설정을 할 때 로컬 쪽 "\*" ws 쪽 "\*" 들어가는 설정을 확인한다. 로컬 port와 ws port 확인을 한다. 띄어쓰기 구분 확인 잘해야 됨.

- 2-1. geth 오픈 후 설정

```sh
source ~/.bashrc
```

    - http 로컬 영역
    - ws 웹소켓 영역

```sh
geth --datadir ~/myGeth --http --http.addr "0.0.0.0" --http.port 8080 --http.corsdomain "*" --ws --ws.port 8088 --ws.addr "0.0.0.0" --ws.origins "*" --http.api "admin,miner,txpool,web3,personal,eth,net" --allow-insecure-unlock --syncmode full --networkid 1337 console
```

- 3. miner.setEtherbase(eth.accounts[0]) 코인 베이스 계좌 설정
- 4. miner.start() 채굴 시작
- 5. ws 웹소켓 index 파일 경로 터미널에서 node index 쳐서 확인
- 6. miner.stop() 채굴 멈춤
