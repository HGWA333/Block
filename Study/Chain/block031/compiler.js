const solc = require("solc");
const fs = require("fs");
const path = require("path");

// 모듈화

class Compiler {
  /**
   *
   * @param {string} _fileName 파일
   */
  static compile(_fileName) {
    const contractPath = path.join(__dirname, "contracts", _fileName);
    const data = JSON.stringify({
      language: "Solidity",
      sources: {
        [_fileName]: {
          content: fs.readFileSync(contractPath, "utf-8"),
        },
      },
      settings: {
        outputSelection: {
          "*": {
            "*": ["*"],
          },
        },
      },
    });
    // console.log("data:::", data);
    const compiled = solc.compile(data); // 현재 상태는 JSON 형태라서 compiled로 초기화 한 변수를 JSON.parse를 사용하여 파싱(변환)을 해줘야 한다.
    return Compiler.writeOutput(JSON.parse(compiled));
  }

  /**
   *
   * @param {*} _compiled 컴파일된 솔리디티 객체
   */
  static writeOutput(_compiled) {
    const result = {};
    console.log("_compiled:::", _compiled);
    for (const contractFileName in _compiled.contracts) {
      const [contractName] = contractFileName.split(".");
      // console.log("contractFileName:::", contractFileName);
      // console.log("contractName:::", contractName);
      const contract = _compiled.contracts[contractFileName][contractName]; // 객체에서 키에 대한 값을 가져오기 위해서는 대괄호 [] 이것을 사용한다. 리엑트는 {} 중괄호
      const abi = contract.abi; // abi = [ [Object], [Object], [Object] ] 상태
      const bytecode = contract.evm.bytecode.object; // bytecode = '608060405.....334FE42'상태
      const tempObj = { abi, bytecode };
      const buildPath = path.join(__dirname, "build", `${contractName}.json`);
      fs.writeFileSync(buildPath, JSON.stringify(tempObj)); //tempObj는 객체 상태라서 JSON.stringify로 감싸서 JSON화 하여 사용해야 한다. Sync 붙은 건 자동으로 동기화 되어 awit와 같은 프로미스를 사용하지 않아도 자동으로 동기화를 해준다.
      //   fs.writeFileSync(
      //     path.join(__dirname, "build", `${contractName}.abi`),
      //     JSON.stringify(abi)
      //   );
      //   fs.writeFileSync(
      //     path.join(__dirname, "build", `${contractName}.bin`),
      //     bytecode
      //   );
      result[contractName] = tempObj;
    }
    return result;
  }
}
module.exports = Compiler;

{
  //   const contractPath = path.join(__dirname, "contracts", "Test.sol");
  //   // readFile와 readFileSync의 차이점
  //   {
  //     // fs.readFile(contractPath, { encoding: "utf-8" }, (err, data) =>
  //     //   console.log("data:::", data)
  //     // );
  //     // const temp = fs.readFileSync(contractPath, "utf-8");
  //     // console.log("temp:::", temp);
  //   }
  // const data = JSON.stringify({
  //   language: "Solidity",
  //   sources: {
  //     "Test.sol": {
  //       content: fs.readFileSync(contractPath, "utf-8"),
  //     },
  //   },
  //   settings: {
  //     outputSelection: {
  //       "*": {
  //         "*": ["*"],
  //       },
  //     },
  //   },
  // });
  // // const compiled = solc.compile(data); // 현재 상황은 JSON으로 데이터가 나온다.
  // const compiled = JSON.parse(solc.compile(data)); // JSON.parse로 solc.compile(data) 이것을 감싸 파싱(변환)을 한다.
  // console.log("compiled", compiled);
  // console.log(compiled.contracts["Test.sol"]);
  // const {
  //   abi,
  //   evm: { bytecode },
  // } = compiled.contracts["Test.sol"].Test;
  // 위코드를 구조분해 할당을 하면 아래와 같다.
  // const abi = compiled.contracts["Test.sol"].Test.abi;
  // const bin = compiled.contracts["Test.sol"].Test.evm.bytecode.object;
  // console.log(abi);
  // console.log(bytecode);
  // console.log(bytecode.object);
  // 파일 만들기
  // fs.writeFileSync(path.join(__dirname, "Test.json"), compiled);
  // fs.writeFileSync(
  //   path.join(__dirname, "bytecode.json"),
  //   JSON.stringify(bytecode)
  // );
}
