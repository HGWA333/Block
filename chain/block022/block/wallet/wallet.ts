import { SHA256, lib } from "crypto-js";
import elliptic from "elliptic";
// 데이터(지갑 계정)을 저장하기 위해서
import fs from "fs";
import path from "path";

// 지갑 계정을 저장할 위치
const addressDir: string = path.join(__dirname, "../walletData");

const ec: elliptic.ec = new elliptic.ec("secp256k1");

class Wallet implements IWallet {
  // class Wallet은 블록 추가, 추가 된 블록에 체인 추가, 체인의 유효성을 검증, 체인의 상태를 바꾸는, 블록을 채굴, UTXO의 상태를 업데이트(수정), 트랜잭션Tx을 추가하여 보관하는, 보관된 트랜잭션Tx의 상태를 업데이트(수정)는 메서드들이 있다.

  //  Wallet의 메서드들  (이 클래스 Wallet은 개인키 생성, 개인키로 공용키 생성, 지갑 생성, 지갑 리스트 불러오는 역할)
  // getPrivateKey : 개인키가 없으면 개인키를 생성해주는 메서드
  // getPublicKey : 만들어진 개인키를 공용키로 만드는 메서드
  // createSign : 키페어(keyPair : 서명)를 만드는 메서드
  // getAddress : 공개키로 지갑 주소를 생성해주는 메서드
  // getWalletPrivateKey : 사용자의 ID(address 주소)를 파일로 만들어주는 메서드
  // getList : 파일로 만들어진 사용자의 ID(address 주소)를 목록으로 가져오는 메서드

  public address: string;
  public publicKey: string;
  public privateKey: string;
  public balance: number;

  constructor(_privateKey: string = "") {
    if (global.debug) console.log("2-3/4-4 지갑 생성 시작");
    // 2-3, 4-6
    this.privateKey = _privateKey || this.getPrivateKey();
    this.publicKey = this.getPublicKey();
    this.address = this.getAddress();
    this.balance = 0;

    if (global.debug)
      console.log(
        "2-6/4-7 지갑 주소 이름으로 파일 생성하고 그 내용으로 개인키 저장"
      );
    // 2-4, 4-7
    !fs.existsSync(addressDir) && fs.mkdirSync(addressDir);
    const fileName = path.join(addressDir, this.address);
    fs.writeFileSync(fileName, this.privateKey);
  }

  public getAddress(): string {
    // 공개키로 지갑 주소를 생성해주는 메서드
    if (global.debug) console.log("2-5/4-6 공개키로 지갑 주소 생성");
    return this.publicKey.slice(26);
  }

  public getPrivateKey(): string {
    // 개인키가 없으면 개인키를 생성해주는 메서드
    if (global.debug) console.log("2-3-1 개인키가 없으면 생성");
    return lib.WordArray.random(32).toString().toUpperCase();
  }

  public getPublicKey(): string {
    // 만들어진 개인키를 공용키로 만드는 메서드
    if (global.debug) console.log("2-4/4-5 개인키로 공개키 생성");
    return ec
      .keyFromPrivate(this.privateKey) // 요부분 중요
      .getPublic() // 공개키 가져온다.
      .encode("hex", true)
      .toUpperCase();
  }

  static getList(): Array<string> {
    // 파일로 만들어진 사용자의 ID(address 주소)를 목록으로 가져오는 메서드
    if (global.debug)
      console.log("3-3 walletData 폴더의 파일 목록을 가져온다.");
    const files: Array<string> = fs.readdirSync(addressDir);
    // files는 문자열 타입의 배열 형태로 파일화된 addressDir(사용자ID)의 리스트를 배열에 쌓도록 설정
    return files; // 위에 설정 된 files를 리턴 한다.
  }

  static getWalletPrivateKey(_address) {
    // 사용자의 ID(address 주소)를 파일로 만들어주는 메서드
    if (global.debug)
      console.log(
        "4-3/5-5/6-5 지갑 주소 파일 명으로 파일을 불러와서 그 내용의 개인키를 가져온다."
      );
    const filePath = path.join(addressDir, _address);
    // filePath는 path(JS내장 기능)을 join메서드를 사용해서 addressDir와 매개변수 _address를 치도록 설정
    const fileContent = fs.readFileSync(filePath);
    return fileContent.toString();
  }

  static createSign(_data) {
    // 키페어(keyPair : 서명)를 만드는 기능
    if (global.debug) console.log("5-4/6-4 서명 생성 시작");
    const hash = SHA256(_data.sender.publicKey + _data.received + _data.amount)
      .toString()
      .toUpperCase();
    // hash는 SHA256을 사용하여 암호화 할 것이다. 매개변수 _data의 sender.publicKey, received, amount를
    // 여기서 sender.publicKey는 보내는 사람의 공용키이고,
    // 여기서 received는 받는 사람이고,
    // 여기서 amount는 코인의 금액을 나타낸다.
    // 위에 것들을 문자열 대문자 형태로 나타낸다.
    const privateKey = Wallet.getWalletPrivateKey(_data.sender.address);
    // privateKey은 getWalletPrivateKey메서드에 매개변수 _data 보내는 사람의 공용키를 인수로 넣어서 초기화 한다.

    const keyPair = ec.keyFromPrivate(privateKey);
    // keyPair는  ec라이브러리 keyFromPrivate 내장 메서드에 위에 초기화 한 privateKey를 인수를 넣어서 keyPair로 초기화한다.
    if (global.debug) console.log("5-6/6-6 서명 반환(return)");
    return keyPair.sign(hash, "hex");
    // 위에 초기화한 keyPair를 ec라이브러리 sign 내장 메서드에 hash 값 과 "hex"(인코딩)를 인수로 넣어서 리턴한다.
  }
}

export default Wallet;
