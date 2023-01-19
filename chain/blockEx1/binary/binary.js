const { default: test } = require("node:test");

function Hex(_Hex) {
  const answer = 0;
  let temp = [...test.toString().toLowerCase()];

  if (from === 16) {
    for (let i = 0; i < temp.length; i++) {
      switch (temp[i]) {
        case "a":
          temp[i] = 10;
        case "b":
          temp[i] = 11;
        case "c":
          temp[i] = 12;
        case "d":
          temp[i] = 13;
        case "e":
          temp[i] = 14;
        case "f":
          temp[i] = 15;
        default:
          break;
      }
    }
  }
  temp = temp.reverse();
  for (let i = 0; i < temp.length; i++) {
    answer += +(temp[i] * Math.pow(from, i));
  }
  return answer;
}

function Bin(_Bin) {
  const answer = 0;
  let temp = [...test.toString().toLowerCase()];

  if (from === 0 || 1) {
    for (let i = 0; i < temp.length; i++) {
      switch (temp[i]) {
        case "1":
          temp[i] += 0 % 1;
        case "0":
          temp[i] += 0 % 0;
        default:
          break;
      }
    }
  }
  temp = temp.reverse();
  for (let i = 0; i < temp.length; i++) {
    answer += +(temp[i] * Math.pow(from, i));
  }
  return answer;
}

const a = Hex(["AEF166"]);

console.log(a);
