// 순서

// npm init -y

// 설치 명령어
// ----------------------------------------
// npm i merkle crypto-js hex-to-binary
// ----------------------------------------

const merkle = require("merkle");
// 머클 라이브러리를 가져온다.
const SHA256 = require("crypto-js").SHA256;
// const SHA256 = require("crypto-js").SHA256;
// const SHA256 = require("crypto-js/sha256")
// SHA256 가져올 때 위 2가지 방법 중 하나 선택 해서 가져오면 된다. 결과 는 같음

const hexToBinary = require("hex-to-binary");
const { constants } = require("buffer");
// hey 방식(0~F)으로 지정된 데이터를 바이너리 방식의 (0~1)으로 변환시켜준다.

// 난이도 조절ㄹ용 수치를 미리 정해놓는다. (블록 생성 시간을 조절하기 위해)

const DIFFICULTY_ADJUSTMENT_INTERVAL = 10;
// 변수명은 대문자로만 설정을 한다.
// 10의 값은 난이도 조절에 대한 단위 갯수로, 난이도를 변경하는데 기준으로 잡는다.
// 최초에 난이도 조절할 때 최초블록부터 이 수치까지는 난이도 증가 없이 0으로 주려고 만든 값이다.
// 최초블록에서 10번째 블록까지는 난이도가 0이다.
// 생성되는 블록의 21번째 부터는 난이도 수치가 조절 될 수 있도록 DIFFICULTY_ADJUSTMENT_INTERVAL 을 사용한다.

const BLOCK_GERATION_INTERVAL = 10;
// 블록이 하나가 생성(만들어지는)되는 시간

const TIME_UNIT = 60 * 1000;
// TIME_UNIT = 60 * 1000 이렇게 설정하면, BLOCK_GERATION_INTERVAL 이 값의 갯수를 10분동안 생성을 한다.

module.exports = {
  lib: {
    merkle,
    SHA256,
    hexToBinary,
  },
  constant: {
    DIFFICULTY_ADJUSTMENT_INTERVAL,
    BLOCK_GERATION_INTERVAL,
    TIME_UNIT,
  },
};
