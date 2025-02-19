```sh
npm init -y
npm i truffle @openzeppelin/contracts
npm i -D prettier-plugin-solidity
npx truffle init
```

# OpenSea 등 NFT 마켓에서 사용하는 컨트랙트

```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol"; // ERC721 기본 컨트랙트
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol"; // owner 관련 컨트랙트 _owner 등을 추가한다.
import "../node_modules/@openzeppelin/contracts/utils/Strings.sol"; // toString을 위한 라이브러리로 기존 int, unint 등을 string화 하려면 byte로 바꿧다가 변경해야한다. 하지만 Strings.sol에 포함된 라이브러리는 위 기능을 편리하게 제공한다.

contract nftToken is ERC721Enumerable, Ownable {
    // is ERC721Enumerable, Ownable는 ERC721 기본 구현과 owner를 상속한다.

uint public constant MAX_TOKENT_COUNT = 1000; // NFT 최대 발행량으로 여기서 사용된 constant는 JS에서 const와 같은 역할로 바뀌지 않은 변수(상수) 상수의 변수명을 정할 때 전부 대문자로 적는다.

  uint public mint_price = 1 ether; // 민팅 가격으로 사용자가 nft를 올릴 때마다 1 이더씩 받는다. ether, gwei, second, minute, day 단위를 사용할 수 있다. ether의 경우 10 ** 18
  string public metadataURI; // nft의 tokenId 값에 매칭되는 tokenURI의 앞부분으로 웹페이지 구현에서의 baseURL과 같은 기능

  struct TokenData {
    // 토큰의 데이터로 현재 구현된 코드에서는 랜덤하게 넣을 예정이다. 무엇을? Rank와 Type을
    uint Rank;
    uint Type;
  }
  // - OpenSea에서 attributes에 출력된다.
  // - attributes에 출력되는 내용에 관해서는 아래의 주소를 참조.
  //   https://docs.opensea.io/docs/metadata-standards

  mapping(uint => TokenData) public TokenDatas;
  // tokenId => TokenData

  uint[4][4] public tokenCount;
  // 토큰 데이터에 따른 NFT 토큰 발행량 확인용
  //  uint[4][4]는 4 * 4 이중배열
  // [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]]


  constructor(
    string memory _name,
    string memory _symbol,
    string memory _metadataURI
  ) ERC721(_name, _symbol) {
    metadataURI = _metadataURI;
  }



  // 여기까지 변수명 정의한 부분



  function tokenURI(
    uint _tokenId
  ) public view override returns (string memory) {
    // tokenURI를 생성 메서드로 ERC721에 virtual 옵션을 포함하여 구현되어있다.
    string memory Rank = string.toString(TokenDatas[_tokenId].Rank);
    string memory Type = string.toString(TokenDatas[_tokenId].Type); // Strings 라이브러리를 사용하여 string화 한다. Rank, Type은 uint 타입이다.
    return string(abi.encodePacked(metadataURI, "/", Rank, "/", Type, ".json")); // nft에 대한 데이터를 저장한 URL 주소를 찾아 데이터를 받아올 수 있도록 구현
  }

  function mintToken() public payable {
    // NFT 생성 메서드
    require(msg.value >= mint_price); // 생성 시 이더를 받고 가격을 확인한다.
    require(MAX_TOKENT_COUNT > ERC721Enumerable.totalSupply()); // nft 최대 갯 수 확인, 현재 1000개 이하로만 생성가능

    uint tokenId = ERC721Enumerable.totalSupply() + 1; // nft 총 수량을 기준으로 ID 생성

    TokenData memory random = getRandomTokenData(msg.sender, tokenId); // 무작위 Rank와 Type을 만든다.
    TokenDatas[_tokenId] = random; // 생성한 토큰 데이터를 ID와 매칭하여 저장
    tokenCount[random.Rank - 1][random.Type - 1] += 1; // Rank와 Type을 기준으로 nft 토큰 수량 정리 [random.Rank - 1][random.Type - 1] 여기서 -1은 index 0부터 인식을 시키기 위해서다. 그리고 현재 random.Rank 과 random.Type은 4로 설정해 놓음

    payable(Ownable.owner()).transfer(msg.value); // 받은 이더 컨트랙트 소유자에게 전달 (nft 토큰 컨트랙트 등록자)
    _mint(msg.sender, toeknId);
  }


  function getRandomTokenData(
    address _owner,
    uint _tokenId
  ) private pure returns (TokenData memory) {
    // solidity에서는 random 함수가 없다. 그래서 유일한 값인 tokenId를 가져와서 암호화한 이후 나머지 연산 %100을 하여 0~99까지 랜덤수를 만든다.


    uint randomNum = uint(keccak256(abi.encodePacked(_owner, _tokenId))) % 100;

    TokenData memory data;

    if (randomNum < 5) {
      data.Rank = 4;
      if (randomNum == 1) {
        data.Type = 1;
      } else if (randomNum == 2) {
        data.Type = 2;
      } else if (randomNum == 3) {
        data.Type = 3;
      } else {
        data.Type = 4;
      }
    } else if (randomNum < 13) {
      data.Rank = 3;
      if (randomNum < 7) {
        data.Type = 1;
      } else if (randomNum < 9) {
        data.Type = 2;
      } else if (randomNum < 11) {
        data.Type = 3;
      } else {
        data.Type = 4;
      }
    } else if (randomNum < 37) {
      data.Rank = 2;
      if (randomNum < 19) {
        data.Type = 1;
      } else if (randomNum < 25) {
        data.Type = 2;
      } else if (randomNum < 31) {
        data.Type = 3;
      } else {
        data.Type = 4;
      }
    } else {
      data.Rank = 1;

      if (randomNum < 52) {
        data.Type = 1;
      } else if (randomNum < 68) {
        data.Type = 2;
      } else if (randomNum < 84) {
        data.Type = 3;
      } else {
        data.Type = 4;
      }
    }
    return data;
  }


  function setMetadataURI(string memory _uri) public onlyOwner {
    // metadataURI를 변경하는 메서드로 컨트랙트 등록자(소유자)만 수정할 수 있다. (owner == msg.sender)
    // Ownable에 포함된 onlyOwner라는 접근제한자를 사용한다.
    // onlyOwner를 실행하고 문제가 없으면 메서드를 실행하고 문제가 있으면 메서드를 실행하지 않는다.
    metadataURI = _uri;
  }

  function getTokenRank(uint _tokenId) public view returns (uint) {
    return TokenData[_tokenId].Rank;
  }

  function getTokenType(uint _tokenId) public view returns (uint) {
    return TokenData[_tokenId].Type;
  }

  function getTokenCount() public view returns (uint[4][4] memory) {
    // Rank와 Type을 구분하여 NFT의 수량을 확인한다. 배열과 같은 구조체를 매개변수로 받을 경우 무조건 memory를 적어줘야 한다. 이 함수가 끝날 때 까지 데이터가 남는 것이 storage이고 이 함수가 끝나면 바로 사라지는 것이 memory로 memory는 휘발성을 가진 램이라고 생각하면 된다.
    // memory vs calldata
    // memory는 수정 가능 calldata는 수정 불가능
    // 저장 공간은 둘다 임시 저장소
    return tokenCount;
  }




}

```

## NFT 거래 컨트랙트 구현 SaleToken

```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./nftToken.sol";

contract SaleToken {
  nftToken public Token;

  constructor(address _tokenAddress) {
    Token = nftToken(_tokenAddress);
  }


  struct TokenInfo {
    // 토큰 정보 구조체
    uint tokenId;
    uint Rank;
    uint Type;
    uint price;
    // 가격, 0 일 때 판매중이 아닌 것
  }


  mapping(uint => uint) public tokenPrices; // tokenId => price, NFT 가격 매핑
  uint[] public SaleTokenList; // 판매중인 NFT의 tokenId 목록


  function SalesToken(uint _tokenId, uint _price) public {
    // 판매 등록 메서드
    address tokenOwner = Token.ownerOf(_tokenId); // NFT의 소유자 찾기

    require(tokenOwner == msg.sender); // NFT의 소유자가 판매 등록을 했는가?
    require(_price > 0); // 가격이 0 초과인가?
    require(Token.isApprovedForAll(msg.sender, address(this))); // NFT에 대한 권한이 현재 컨트랙트에 있는지 확인
    // OpenSea를 기준으로 setApprovedForAll 메서드가 이미 있다.
    // - 메타마스크를 연결했을 때 or 로그인했을 때 -> 메타마스크의 계정에 대해 권한을 위임 받는다.(서명)
    // OpenSea에 토큰에 대한 권한을 위임했는지 확인한다.

    tokenPrices[_tokenId] = _price; // 가격 매핑 (키 값 매칭시키는 것을 매핑이라고 한다.)
    SaleTokenList.push(_tokenId); // 판매 목록에 추가
  }


  function PurchaseToken(uint _tokenId) public payable {
    // NFT 구매 했을때 메서드
    address tokenOwner = Token.ownerOf(_tokenId); // NFT 소유자 찾기

    require(tokenOwner = !msg.sender, "you are saler"); // 판매자가 구매하려고 하는가?
    require(tokenPrices[_tokenId] > 0, "not sales"); // 가격 확인, 판매중인가?
    require(tokenPrices[_tokenId] <= msg.value , "not enough price");  // 가격 확인, 구매자가 충분한 이더를 보냈는가?

    payable(tokenOwner).transfer(msg.value); // 현재 컨트랙트가 NFT 소유자에게 구매자로부터 받은 이더 전달
    Token.transferFrom(tokenOwner, msg.sender, _tokenId); // NFT 소유자로부터 구매자에게 NFT 전송
    tokenPrices[_tokenId] = 0; // 가격 0, 판매 중지
    popSaleToken(_tokenId); // 판매 목록에서 제외
  }


  function cancelSaleToken(uint _tokenId) public {
    // NFT 판매 취소 메서드
    address tokenOwner = Token.ownerOf(_tokenId);

    require(tokenOwner == msg.sender);
    require(tokenPrices[_tokenId] > 0);

    tokenPrices[_tokenId] = 0;
    popSaleToken(_tokenId);
  }

  function popSaleToken(uint _tokenId) private returns (bool) {
    // 전달받은 토큰을 SaleTokenList에서 삭제 하는 메서드
    // 만약 SaleTokenList = [1,2,3,4,5,6] 이 있고 삭제해야 할 토큰은 3일 경우

    for (uint i = 0; i < SaleTokenList.length; i++) {
      if (SaleTokenList[i] == _tokenId) {
        // i = 2 => aleTokenList[2] = 3) == (_tokenId = 3)

        SaleTokenList[i] = SaleTokenList[SaleTokenList.length - 1];
        //SaleTokenList = [1,2,6,4,5,6]

        SaleTokenList.pop();
        // SaleTokenList = [1,2,6,4,5]
        return true;
      }
    }
    return false;
  }


  function getSaleTokenList() public view returns (TokenInfo[] memory) {
    // 판매중인 전체 NFT 목록 가져오기 메서드

    require(SaleTokenList.length > 0); // NFT 없는지 확인

    TokenInfo[] memory list = new TokenInfo[](SaleTokenList.length);
    // 등록된 NFT 갯 수를 크기로 배열 생성
    // new TokenInfo[](SaleTokenList.length)는 JS에서 let list = new Array(SaleTokenList)

    for (uint i = 0; i < SaleTokenList.length; i++) {
      uint tokenId = SaleTokenList[i];
      uint Rank = Token.getTokenRank(tokenId);
      uint Type = Token.getTokenRank(tokenId);
      uint price = tokenPrices[tokenId];
      list[i] = TokenInfo(tokenId, Rank, Type, price);
      // NFT 정보 생성해서 list에 저장
    }
    return list;
  }


  function getOwnerTokens(
// NFT 소유자 기준으로 가지고 있는 NFT 목록 가져오기 메서드

    address _tokenOwner
  ) public view returns (TokenInfo[] memory) {
    uint balance = Token.balanceOf(_tokenOwner); // 가지고 있는 NFT 갯 수 가져오기
    require(balance > 0); // NFT 갯 수 확인, 없으면 멈춘다.

    TokenInfo[] memory list = new TokenInfo[](balance);

    for (uint i = 0; i < balance; i++) {
      uint tokenId = Token.tokenOfOwnerByIndex(_tokenOwner, i); // ERC721Enumerable 컨트랙트에 존재한 소유자의 NFT 목록 중 i 번째의 ID를 가져온다.
      uint Rank = Token.getTokenRank(tokenId);
      uint Type = Token.getTokenRank(tokenId);
      uint price = tokenPrices[tokenId];

      list[i] = TokenInfo(tokenId, Rank, Type, price);
    }
    return list;
  }

  function getLatestToken(
    address _tokenOwner
  ) public view returns (TokenInfo memory) {
    // 소유자 기준의 마지막 NFT 정보를 가져오는 메서드로 민팅 직후에 사용할 수 있다. 정보를 1개만 가져오기 때문에 TokenInfo에 []을 붙히지 않고 바로 memory를 붙혀서 사용한다. TokenInfo는 struct에 정의 해놓은 것을 확인

    uint balance = Token.balanceOf(_tokenOwner);
    uint tokenId = Token.tokenOfOwnerByIndex(_tokenOwner, balance - 1);
    // [1, 2, 3]의 마지막 index는 2다. 2는 [3] 그래서 -1을 해줘서 자리를 맞춘다.
    uint Rank = Token.getTokenRank(tokenId);
    uint Type = Token.getTokenRank(tokenId);
    uint price = tokenPrices[tokenId];

    list[i] = TokenInfo(tokenId, Rank, Type, price);
  }


}

```

# 시나리오

- minting(민팅) = nftToken의 mintToken을 호출한다. (호출할 때 이더도 같이 보내야 한다.)

  - require로 확인 후에 nftToken의 getRandomTokenData 메서드로 토큰 정보를 만든다.
  - \_mint 메서드로 NFT 추가

- 판매 등록 = SaleToken의 SalesToken 메서드를 호출한다.

  - require로 확인 후 가격 정의 및 판매 목록에 추가한다.

- 구매 = SaleToken의 PurchaseToken 메서드를 호출한다.

  - require로 확인 후에 이더 및 NFT 전송, 판매 목록에서 삭제한다.

- 웹페이지에서 목록 출력 = SaleToken 컨트랙트의 getSaleTokenList 메서드를 호출한다.

  - 판매 등록된 NFT 목록을 만들어서 반환한다.
  - NFT 목록을 만드는 도중 nftToken 컨트랙트의 getTokenRank, getTokenType메서드를 사용하여 정보를 받아온다.
  - nftToken에서 모든 정보를 한번에 바는 것이 아닌 따로 각개로 받은 후 TokenInfo 구조체를 사용해서 합쳐서 배열에 담아 반환하게 된다.
  - 사용자에게 출력을 해서 보여주고 사용자들이 판매 또는 구매를 가능하게 한다.

- 웹페이지에서 나의 NFT 목록 출력 = 메타마스크의 지갑 계정 주소를 기준으로 SaleToken 컨트랙트의 getOwnerTokens 메서드를 호출한다.

  - 이후 내용은 판매 NFT 목록 출력과 같다.

- 구현 시나리오에 따라 다르지만 만약 minting(민팅) 후에 NFT 정보 페이지로 이동 또는 등록한 NFT 정보를 모달창으로 출력하여 확인할 경우 getLatestToken 메서드를 사용(호출)하게 된다.
