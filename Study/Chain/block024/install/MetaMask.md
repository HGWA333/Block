# geth를 HTTP 통신으로 사용할 수 있도록 실행에 추가

```sh
source ~/.bashrc
```

```sh
geth --datadir ~/myGeth --http --http.addr "0.0.0.0" --http.port 8080 --http.corsdomain "*" --http.api "admin,miner,txpool,web3,personal,eth,net" --allow-insecure-unlock --syncmode full --networkid 50 console #옵션으로 console을 사용하면 바로 IPC로 자동으로 연결되어, 서버에서 바로 명령어를 입력하여 사용할 수 있음
# console을 입력하지 않을 경우 따로 Ubuntu를 새창으로 열어 IPC를 입력하여 사용해야 됨.

```

# MetaMask 설정

0. 메타마스크 실행 후 로그인 후 최상단 오른쪽에 위치한 아이콘 클릭
1. 아이콘 클릭 이후 설정을 누르고 네트워크로 들어간다.
2. 현재 http://localhost:8545로 되어있는 네트워크에 들어가서 수정을 한다.

   - 네트워크 이름 : 사용자의 임의
   - 새 RPC URL : 현재 잡으려는 이더리움 네트워크 주소(port 포함)
   - 체인 ID : 체인 ID
   - 통화 기호 : 사용하는 코인 표기법

# MetaMask 지갑 가져오기

0. 최상단 오른쪽에 위치한 아이콘 클릭
1. 계정 가져오기 클릭
2. 유형 선택 JSON 파일로 선택
3. 파일 선택 클릭
4. Ubuntu 폴더에서 ether 설치된 폴더에 들어가 myGeth 폴더에 들어간다.
5. keystore 폴더에 들어간다.
6. keystore 폴더에 있는 가져올 지갑을 선택하여 열기
