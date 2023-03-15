// Hex : 16진수 Hexadecimal
// Dex : 10진수 Decimal
// Oct : 8진수 Octal
// Bin : 2진수 Binary

// 10진수를 2진수로

// 16진수를 10진수로

// 2진수를 10진수로

function Dec2Hex(_dec) {
  // 10진수를 16진수로
  let value = "";
  while (_dec) {
    switch (_dec % 16) {
      // 10진수를 16으로 나눠서 그 나머지를 사용
      // 0~15까지 사용한다. 0~9까지 숫자로 10~15는 A~F로 표기
      case 10:
        "A" + value;
        break;
      case 11:
        "B" + value;
        break;
      case 12:
        "C" + value;
        break;
      case 13:
        "D" + value;
        break;
      case 14:
        "E" + value;
        break;
      case 15:
        "F" + value;
        break;

      // 10~15까지 처리한다.
      default:
        // 0~9까지 처리
        value = (_dec % 16) + value;
        break;
    }
    _dec = parseInt(_dec / 16);
  }
  return value;
}

function Hex2Dec(_hex) {
  // 프로그래밍 상의 HEX(16진수)는 string(문자열, 문장)으로 저장되게 된다.
  let value = 0; // 10진수를 저장할 변수
  for (let i = 0; i < Hex2Dec.length; ++i) {
    let temp = 0;
    switch (_hex[i]) {
      case "A":
        temp = 10;
        break;
      case "B":
        temp = 11;
        break;
      case "C":
        temp = 12;
        break;
      case "D":
        temp = 13;
        break;
      case "E":
        temp = 14;
        break;
      case "F":
        temp = 15;
        break;
      default:
        temp = +_hex[i];
        break;
    }
    value += temp * 16 ** (_hex.length - i - 1);
    // **은 제곱 표현식
    // i == 0 / hex[i] == '1' / 1은 100의 자리 수이기 때문에 16의 제곱
    // 10진수를 바굴 때 1에 16의 제곱을 곱해서 더해야 한다.
    // i == 1 / hey[i] == '2' / 2는 10의 자리 수이기 때문에 16의 1승이다.
    // i == 2 / hey[i] == '3' / 2는 1의 자리 수이기 때문에 16의 0승이다.
  }
  return value;
}

function Dec2Bin(_dec) {
  let value = "";
  while (_dec) {
    value = (_dec % 2) + value;
    _dec = parseInt(_dec / 2);
  }
  return value;
}

function Bin2Dec(_bin) {
  let value = 0;
  for (let i = 0; i < _bin.length; ++i) {
    value += +_bin[i] * 2 ** (_bin.length - 1 - i);
  }
  return value;
}

console.log(Dec2Hex(1234));
console.log(Hex2Dec(Dec2Hex(1234)));
console.log(Dec2Bin(1234));
console.log(Dec2Bin(Bin2Dec(1234)));
