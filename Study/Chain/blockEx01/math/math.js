function Dec2Hex(_dec) {
  let value = "";
  while (_dec) {
    switch (_dec % 16) {
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

      default:
        value = (_dec % 16) + value;
        break;
    }
    _dec = parseInt(_dec / 16);
  }
  return value;
}

function Hex2Dec(_hex) {
  let value = 0;
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
