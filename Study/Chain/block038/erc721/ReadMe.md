# IERC721MetaData 구현

- MetaData란
  - 데이터를 위한 데이터
  - 데이터에 대한 데이터다.
  - 데이터에 관환 구조화된 데이터, 다른 데이터를 설명해주는 데이터
    - 사전에서 ㄱ, ㄴ, ㄷ 순으로 나타낼 때 [ㄱ, ㄴ, ㄷ]을 메타데이터다.
    - 카메라 사진을 촬영 했을 때 그 사진에 관한 메타데이터는 사진을 찍었을 때 시간, 위치, 카메라 사양 등등 과 같은 것들의 정보를 확인할 수 있는 데이터로 이것을 메타데이터라고 할 수있다.

```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IERC721MetaData {
  function name() external view returns (string memory);

  function symbol() external view returns (string memory);

  function tokenURI(uint tokenId) external view returns (string memory);
}
```

- IERC721는 파일과 연동을 하기 때문에 해쉬 값과 주소 값이 중요하다.
- NFT의 ID는 URI가 된다. 즉 ID는 고유성을 가지게 되고 ID 해시 값이 들어간다.

- URI는 Uniform Resource Indentifier의 약자로 특정 데이터를 식별하는 식별자, 리소스를 구분하는 고유 문자열
  - URI : 데이터를 구분한다. (데이터를 구분하는 문자열) | URL : 데이터의 위치를 가르킨다. (어디있는지를 뜻하는 것으로 흔히 인터넷 주소로 인식하면 편함)
  - cmd / window 터미널 등에서 "ipconfig /all" 명령어를 사용
    - 물리적 주소(Mac 주소) : URI | IPv4 : URL

## IERC721 구현

```js
interface IERC721 {
  event Transfer( // 토큰 전송 시 이벤트
    address indexed _from,
    address indexed _to,
    uint indexed _tokenId
  );

  event Approval( // 토큰 하나에 관한 권한 위임 시 이벤트
    address indexed _from,
    address indexed _approved,
    uint indexed _tokenId
  );

  event ApprovalForAll( // 토큰 모두에 관한 권한 위임 시 이벤트 _approved가 true면 모든 권한을 위임한다.
    address indexed _owner,
    address indexed _operator,
    bool _approved
  );


  function balanceOf(address _owner) external view returns (uint balance);
  // 소유자의 토큰 총 갯 수 조회

  function ownerOf(uint _tokenId) external view returns (address owner);
  // 토큰 소유자 조회

  function transferFrom(address _from, address _to, uint _tokenId) external;
  // 토큰 전송

  function approve(address _to, uint _tokenId) external;
  // 토큰 하나에 관한 권한 위임

  function setApproveForAll(address _operator, bool _approved) external;
  // 모든 토큰에 대한 권한 위임을 설정(취소할 수도 있다.)

  function getApproved(uint _tokenId) external view returns (address operator);
  // 모든 토큰에 대한 권한 위임 받은 계정(대리인)

  function isApprovedForAll(address _owner,address _operator) external view returns (bool);
  // 모든 토큰에 대한 권한 위임 했는지 확인

}

```

## ERC721 구현

```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./IERC721.sol"; // IERC721 가져오기
import "./IERC721MetaData.sol"; // IERC721MetaData 가져오기

contract ERC721 is IERC721, IERC721MetaData {
// ERC721에 IERC721, IERC721MetaData 인터페이스를 상속
  string public override name;
  string public override symbol;
// IERC721MetaData에 name, symbol에 선언 되어있기 때문에 override 필요

  mapping(address => uint) private _balances; // 소유자의 토큰 총 갯 수
  mapping(uint => address) private _owners; // 토큰에 대한 소유자
  mapping(uint => address) private _tokenApprovals; // 토큰을 위임 받은 대리인 | { tokenId : operator }
  mapping(address => mapping(address => bool)) private _operatorApprovals; // 모든 토큰에 대한 대리인이 권한을 받았는지 확인 | { ower : { operator : approved }} ower를 기준으로 operator가 approved 권한을 받았는지로 mapping(address[ower 권한을 주는 자 기준] => mapping(address[operator 권한을 받는자] => bool)


  constructor(string memory _name, string memory _symbol) {
    name = _name;
    symbol = _symbol;
  }

  function balanceOf(address _owner) public view override returns (uint) {
   // 소유자의 토큰 총 갯 수
    require(_owner != address(0), "ERC721: address zero is not a valid owner"); // require(확인할 조건, false 시 로그 "ERC721: address zero is not a valid owner")
    return _balances[_owner];
  }

  function ownerOf(uint _tokenId) public view override returns (address) {
   // 토큰 소유자
    address owner = _owners[_tokenId];
    require(owner != address(0), "ERC721: valid owner");
    return owner;
  }



  function transferFrom(
    // 토큰 보내는 메서드 from에서 to로 토큰을 보낸다.
    address _from,
    address _to,
    uint _tokenId
  ) public view override {
    require(_isApproveOrOwner(_from, _tokenId));
    require(_from != _to);

    _beforeTokenTransfer(_from, _to, _tokenId);
    _balances[_from] -= 1;
    _balances[_to] += 1;
    _owners[_tokenId] = _to;

    emit Transfer(_from, _to, _tokenId);
  }



  function approve(address _to, uint _tokenId) external override {
    // _to 에게 _tokenId에 대한 권한을 위임한다.
    address owner = _owners[_tokenId]; // 위임할 토큰의 주인 확인
    // address owner = ownerOf(_tokenId); ownerOf 호출 시 자기 자신을 호출 했을 때 gas를 소모한다. 그래서 수수료가 필요하기 때문에 사용을 하지 않는다.
    require(_to != owner, "ERC721: approval to current owner"); // 소유자가 소유자에게 보냈는지 확인
    require(
      msg.sender == owner || isApprovedForAll(owner, msg.sender),
      "ERC721: approval caller is not token owner or approved for all"
    ); // 트랜잭션을 보낸 계정이 소유자이거나 위임 받은 대리인인지 확인
    _tokenApprovals[_tokenId] = _to; // 대리인 설정

    emit Approval(owner, _to, _tokenId); // 권한 위임 로그를 남긴다
  }


 function setApproveForAll(
    // 트랜잭션 보낸 계정의 모든 토큰에 대한 권한을 _operator에게 _approved로 설정한다.  _approved == true이면 모든 권한을 위임한다.  _approved == false면 모든 권한을 위임을 취소한다.

    address _operator,
    bool _approved
  ) external override {
    require(msg.sender != _operator, "ERC721: approval to caller");
    _operatorApprovals[msg.sender][_operator] = _approved;
    emit ApprovalForAll(msg.sender, _operator, _approved);
  }

  function getApproved(uint _tokenId) public view override returns (address) {
    // 토큰에 대한 대리인 확인
    require(_owners[_tokenId] != address(0), "ERC721: invalid tokenId");
  }

  function isApprovedForAll(
    // 소유주의 토큰에 대해서 대리인이 모든 권한을 갖고있는지 확인
    address _owner,
    address _operator
  ) public view override returns (bool) {
    return _operatorApprovals[_owner][_operator];
  }


  function _isApproveOrOwner(
    // 토큰 자체가 있는지 확인 하는 메서드
    address _spender,
    uint _tokenId
  ) private view returns (bool) {
    address owner = _owners[_tokenId]; // 토큰 자체가 있는지를 확인
    return (_spender == owner ||  // from이 소유주인가?
      isApprovedForAll(owner, _spender) || // _from이 토큰에 대해 모든 권한을 갖고 있는 대리인인가?
      getApproved(_tokenId) == _spender); // _from이 해당 토큰에 대해 각개 개별의 권한을 갖고 있는 대리인인가?
  }


  function tokenURI(
    uint tokenId
  ) external view virtual override returns (string memory) { // 여기서 붙은 virtual은 상속 받아서 override 했지만 다시 상속해서 재정의할 것이기 때문에 virtual 옵션을 추가 했다.

  }

  function _mint(address _to, uint _tokenId) public {
    // _mint는 토큰 추가 메서드로 토큰을 발행하는 것으로 보내는 사람은 null 값이 특징이다.
    require(_to != address(0)); // 받는 계정이 있는지 확인 address(0) null 값

    address owner = _owners[_tokenId];
    require(owner == address(0)); // 이미 있는 토큰인지 확인
    _beforeTokenTransfer(address(0), _to, _tokenId);
    _balances[_to] += 1;
    _owners[_tokenId] = _to;

    emit Transfer(address(0), _to, _tokenId);
  }

    function _beforeTokenTransfer(
    address _from,
    address _to,
    uint _tokenId
  ) internal virtual {}

}

```

## ERC721Enumerable 구현

- Minting 했을 때 tokenId를 자동으로 생성
- 특정 계정이 소유하고 있는 tokenId를 검색

```js

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./ERC721.sol";

contract ERC721Enumerable is ERC721 {
  uint[] private _allTokens; // minting(토큰 생성)된 모든 토큰의 ID 배열

  mapping(address => mapping(uint => uint)) private _ownedTokens; // 소유자의 토큰의 index와 id { owner : { index : id } }

  mapping(uint => uint) private _ownedTokensIndex; // 토큰 id에 대한 index | { tokenId : 소유자 기준의 index }


  constructor(
    string memory _name,
    string memory _symbol
  ) ERC721(_name, _symbol) {}

  function mint(address to) public {
    // 계정 주소만 받아서 minting 한다. tokenId 자동계수 생성
    _mint(_to, _allTokens.length);
  }


  function totalSupply() public view returns (uint) {
   // 모든 토큰의 갯수를 다 가져온다.
    return _allTokens.length;
  }

  function tokenByIndex(uint _index) public view returns (uint) {
    // index로 토큰 ID를 검색 할 수 있는 메서드
    require(_index < _allTokens.length);
    return _allTokens[_index];
  }

  function tokenOfOwnerByIndex(
    // 소유자와 소유자 기준의 토큰의 index로 토큰 Id 검색
    address _owner,
    uint _index
  ) public view returns (uint) {
    require(_index < balanceOf(_owner));
    return _ownedTokens[_owner][_index];
  }



}

```
