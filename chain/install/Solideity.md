# EVM

- Ethereum Virtual Machine
- 스마트 컨트랙트를 실행하기 위한 가상 컴퓨터
- 블록체인 네트워크 노드(peer)에 포함되어 항상 실행
  - 노드(peer)끼리의 합의에 사용된다.
  - ByteCode 실행에 사용

# Solidity

- 스마트 컨트랙트 프로그래밍 언어
- 컴파일 하여 ByteCode를 생성
- ByteCode는 트랜잭션의 data로 저장되어 스마트 컨트랙트 실행 시 사용

# geth 새롭게 개인 네트워크 생성

```json
{
  "difficulty": "200000", // difficulty : 문제 난이도
  "gasLimit": "3100000", // gasLimit : 블록당 가스 지출 제한량(수수료)
  "alloc": {},
  "config": {
    "chainId": 53338885, // 볼록체인 네트워크 식별 ID
    "homesteadBlock": 0, // 이더리움 버전
    "eip150Block": 0, // Etherreum Improvement Proposal이며, 기본값은 0 eip는 이더리움 핵심 프로토콜 사양 등의 표준을 설명한다.
    "eip155Block": 0,
    "eip158Block": 0,
    "byzantiumBlock": 0, // 추가 1
    "constantinopleBlock": 0 // 추가 2
  }
}
```

- 추가 1,2 옵션은 스마트 컨트랙트를 실행하기 위한 옵션

  - 합의 방법이 달라지면서 추가 1,2 옵션이 필요하게 되었다.

# geth 새폴더 생성

```sh
geth --datadir newGeth init newGenesis.json
```

# geth 실행

```sh
geth --datadir ~/newGeth --http --http.addr "0.0.0.0" --http.port 8888 --http.corsdomain "*" --ws --ws.port 8082 --ws.addr "0.0.0.0" --ws.origins "*" --http.api "admin,miner,txpool,web3,personal,eth,net" --allow-insecure-unlock --syncmode full --networkid 53338885 console --nodiscover --unlock "0,1" --password ./newGeth/password
```

- ./newGeth/password : .은 상대 경로
- ~/newGeth/password : ~는 절대 경로
- unlock : accounts에서의 인덱스
- password : 비밀번호가 저장된 파일

  - password 파일 내에서 줄바꿈으로 입력된 unlock 인덱스들과 맞춰야한다.

- --nodiscover : 타인이 나의 노드(peer)를 못찾게 한다.
  - === maxpeers 0

# geth attach

- geth 실행 후 우분투 새창을 열고 attach 명령어 실행

```sh
geth attach http://localhost:8888
```

# geth 계성 생성

```sh
geth --datadir ~/newGeth account new
```

# geth 실행 시 unlock

- geth 실행 후 우분투 새창을 열고 attach 명령어 실행

```sh
echo 위에서 생성한 지갑 계정의 비밀번호 >> 폴더의 파일명
echo 1 >> ~/newGeth/password
```

- echo : cmd, bash, poweshell에서 사용하는 것으로 JS의 consolde.log 역할과 같음

- > > : 해당 파일에 출력 값을 저장
