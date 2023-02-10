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
-e 100 | --defaultBalanceether 1000 # 서버 시작 시 생성되는 계정이 가지고 있는 Ether의 수량으로 기본값은 100 Ether 지급
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

# npx ganache-cli 실행시 나오는 화면

## Available Accounts

==================
(0) 0x18fAA63C7C82Cece0759D3856f049Cb33E30e1fd (100 ETH)
(1) 0x87394085B4861dfD85Df5b2878DF58Cd086e4FA3 (100 ETH)
(2) 0xCa47fF48583c1A5643525445A751a92373cE6Ff5 (100 ETH)
(3) 0xad67ee0443bB77DDdaB2597615b70872dFE347C3 (100 ETH)
(4) 0x2B8D6A19fb25c3f2967f62039934fdD8E7701343 (100 ETH)
(5) 0x443E555664A8AAe56B0c1eD0245be8dED44b91e7 (100 ETH)
(6) 0x90cf998927e785044f6D191466db1D97871863FE (100 ETH)
(7) 0x276A9e19E255727B2c9C71D6581365940DDa654b (100 ETH)
(8) 0x7DeB8654d14BB3Ed93Ddb919C390bbcdb368EA16 (100 ETH)
(9) 0x0f9Ed9B229c61f4339E0040F78d93DEC6f579386 (100 ETH)

## Private Keys

==================
(0) 0x04fe31be791ed14c8ec891882cff88816ed51a1fb2adbb3af4956c7050e3212d
(1) 0xb5205a40cf726bc044433fe43d5f640c08534539163c6e2fca13b3ed457f6cac
(2) 0xcb65fbfa01cf1c0b0863b8693550b48f4f7aa37387f9021cd65500e9cf29c8fa
(3) 0x2c43a5b4715cc447ce6f327c37cadfcc8ab38fa6edd67f481570d12a97578c87
(4) 0xa6dc9e8fbc4122f07a1544e9c62b0bf66b6727e4717911c13673e2abd2a38cdd
(5) 0x0dfa6a35da08d7f17fdbc8da6258e0ecc09bb3986eef2df673cae537378aff18
(6) 0x0eedf80958ef67eb2700f3d7ac4c538d98907cdae053e6a0ff1dbd008bbe6b11
(7) 0x296052c011c093510317bb1fb4055b220dd01150188163984e4da9d5c81a6588
(8) 0x43e55361c6da72d7bcbed8d68640bd7e6a676b30a2ffb5e2b41b45c0973e87aa
(9) 0x9f165ab9880eabbd5a866470eb0fe9c39a8aeff8ea6bfd40041b0b6e1c0bc1d3

## HD Wallet

==================
Mnemonic: entire unknown churn carry learn mixed junior kiwi myth hurt item swim
Base HD Path: m/44'/60'/0'/0/{account_index}

## Gas Price

==================
20000000000

## Gas Limit

6721975

## Call Gas Limit

9007199254740991
```

# Ganache 실행 후 METAMASK에서의 작업

- 1. 오른쪽 최상단에 위치한 아이콘 클릭
- 2. 클릭 후 나오는 메뉴에서 맨 하단 톱니바퀴 모양 설정 버튼 클릭
- 3. 왼쪽 콘센트 모양 네트워크 클릭
- 4. 네트워크 추가 클릭 후 네트워크 수동 추가
- 5. 네트워크 이름

# RPC

- eth
