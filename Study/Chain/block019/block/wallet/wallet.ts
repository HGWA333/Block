// Client 클라이언트 과정

import { SHA256, lib } from "crypto-js";
import elliptic from "elliptic";

// 데이터(지갑 계정)을 저장하기 위해 설정
import fs from "fs";
import path from "path";

// 지갑 계정을 저장할 위치 경로
const addresDir: string = path.join(__dirname, "../walletData");

const ec: elliptic.ec = new elliptic.ec("secp256k1");

class Wallet implements IWallet {
  public address: string;
  public publicKey: string;
  public privateKey: string;
  public balance: number;

  constructor(_privateKey: string = "") {
    console.log(
      "2-3(지갑이 없을 때)/4-4(지갑이 있고 주소 목록이 있는 상황) 지갑 생성 시작"
    );

    this.privateKey = _privateKey || this.getPrivateKey(); // 개인키를 먼저 만들어야 공개키를 만들 수 있음. 그래서 순서가 중요
    this.publicKey = this.getPublickKey();
    this.address = this.getAddress();
    this.balance = 0;

    console.log(
      "2-6(지갑이 없을 때)/4-7(지갑이 있고 주소 목록이 있는 상황) 지갑 주소 이름으로 파일 생성 후 그 내용으로 개인키 저장"
    );
    // address가 파일명이 됨

    const fileName = path.join(addresDir, this.address);
    fs.writeFileSync(fileName, this.privateKey);
  }
  public getAddress(): string {
    // 주소 만들어진 용도
    console.log(
      "2-5(공개키로 지갑 주소 생성하는 상황)/4-6(지갑이 있고 주소 목록이 있는 상황) 공개키로 지갑 주소 생성"
    );
    return this.publicKey.slice(26);
    // 66자 02 - A3BD734233...  을 앞에서 부터 -26을 하여 총 40자를 가져온다.
  }

  public getPrivateKey(): string {
    // 개인키 가져오는 용도
    console.log("2-3-1 개인키가 없으면 생성");
    return lib.WordArray.random(32).toString().toUpperCase();
  }
  public getPublickKey(): string {
    // 공개키를 가져오는 용도
    console.log(
      "2-4(개인키 있을 때 공개키 생성하는 상황)/4-5(지갑이 있고 주소 목록이 있는 상황) 생성된 개인키로 공개키 생성"
    );
    return ec
      .keyFromPrivate(this.privateKey) // 1. 개인키를 만들어서 this의 privateKey 사용하고 있으며, 매우 중요하다.
      .getPublic() // 2. 공개키를 가져오겠다. 공개키 가져오는 메서드
      .encode("hex", true) // 3. 16진수로 인코딩 하겠다.
      .toUpperCase(); // 4. 대문자로 바꿔주겠다.
  }

  static getList(): Array<string> {
    // 만들어진 지갑 주소 가져오는 용도
    console.log("3-3 walletData 폴더의 파일 목록을 가져온다.");
    const files: Array<string> = fs.readdirSync(addresDir);
    return files;
  }
  static getWalletPrivateKey(_address) {
    // 지갑에서 개인키를 가져오는 용도  매개변수는 주소
    console.log(
      "4-3(지갑이 있고 지갑 주소가 목록이 있을 때)/5-5 지갑 주소를 파일 명으로 생성한 파일을 불러와서 그 내용의 개인키를 가져온다."
    );
    const filePath = path.join(addresDir, _address);
    // 파일의 경로를 합치는 용도
    const fileContent = fs.readFileSync(filePath);
    // fileContent는 filePath로 합친 파일 경로를 동기적으로 사용
    return fileContent.toString();
    // fileContent를 문자화 하여 리턴
  }

  static createSign(_data) {
    // 개인키를 서명하는 용도
    console.log("5-4 서명 생성 시작");
    const hash = SHA256(_data.sender.publicKey + _data.received + _data.amount)
      .toString()
      .toUpperCase();
    // 사용자가 입력한 데이터 값 hash화
    const privateKey = Wallet.getWalletPrivateKey(_data.sender.address);
    // 개인키 만든다.
    const keyPair = ec.keyFromPrivate(privateKey);
    // 만들어진 개인키를 사용하여 키페어를 만든다.
    console.log("5-6 서명 반환(return)");
    return keyPair.sign(hash, "hex");
    // 만들어진 키페어를 signature 서명을 한다.
  }
}

export default Wallet;
