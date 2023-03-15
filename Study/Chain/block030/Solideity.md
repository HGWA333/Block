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
    "chainId": 50, // 볼록체인 네트워크 식별 ID
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
