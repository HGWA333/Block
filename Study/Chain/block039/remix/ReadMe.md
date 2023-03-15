```sh
mkdir remix
cd remix
npm init -y
npm i truffle @openzeppelin/contracts @remix-project/remixd
npm i -D prettier-plugin-solidity
npx truffle init
```

# Remix 사용

- 위 터미널에 설치해야 될 파일 설치후 Minting .sol 파일 작성 후 아래 터미널 명령어 입력
- https://remix.ethereum.org 에서 사용한다.
- VSCode에서 작성한 로컬 파일을 Remix에서 연동

```sh
npx remixd -s . --remix-ide https://remix.ethereum.org

or

npx remixd -s . -u https://remix.ethereum.org
```

- -s : 로컬 폴더 위치 옵션
- -u : 연결할 주소

## OpenSea에서 확인하기

- https://testnets.opensea.io/

## pinata 사용하기

- pinata는 ipfs 서비스 웹페이지이다.
- ipfs : InterPlanetary File System
  - 블록체인 이더리움 네트워크에서 사용하는 P2P 파일 저장 방식
- ipfs를 사용할 경우 ubuntu, Linux 등 OS에서 프로그램 설치
  - 간단하게 테스트 하기 위해 pinata 사용

## NTF 객체 만들기

```json
{
  "name": "test NFT", // NFT 이름
  "description": "testing NFT with Pinata", // NFT 설명
  "image": "https://gateway.pinata.cloud/ipfs/QmP8dufkjkTqQs1HMr3u9UxVSA28HEdH38oHFyrJvomhGC", // NFT 이미지 주소,  "https://gateway.pinata.cloud/ipfs/ + pinata 웹페이지에서의 파일의 CID" ,CID == URI 로 CID는 식별자이다.
  "attributes": [
    // attributes는 Levels에서 출력되는 내용
    {
      "trait_type": "Rank", // 카테고리 이름
      "value": 1 // 값
    },
    {
      "trait_type": "Type",
      "value": 1
    }
  ]
}
```
