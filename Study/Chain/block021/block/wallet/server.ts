// Server 과정
// Client에서 생성된 publickKey 공개키, received 받는 사람, amount 금액을 SHA256으로 해쉬화 하여 개인키를 signature 서명
// 지갑서버 http://localhost:9154 구역

import express, { Express, Request, Response } from "express";
import axios from "axios";
import path from "path";
import Wallet from "./wallet";

const app: Express = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
// 1-1 웹페이지에 "/"로 접근 했을 때 파일 있으면 실행

app.post("/wallet/create", (req: Request, res: Response) => {
  // 지갑을 생성하는 라우터
  console.log("2-2 /wallet/create 라우터, post 메서드로 요청 들어옴");

  res.json(new Wallet());
  console.log("2-7 생성된 지갑을 json 형식으로 응답");
});
app.get("/wallet/list", (req: Request, res: Response) => {
  // 지갑의 리스트를 가져오는 라우터
  console.log("3-2 GET 메서드, /wallet/list 라우터로 요청 들어옴 ");

  res.json(Wallet.getList());
  console.log("3-4 가져온 파일 목로으로 응답");
});

app.get("/wallet/:address", async (req: Request, res: Response) => {
  // 지갑의 리스트 목록의 파람스
  console.log("4-2 GET 메서드, /wallet/ 지갑주소 라우터로 요청 받는다.");

  const address: string = req.params.address;
  const privateKey: string = Wallet.getWalletPrivateKey(address);

  res.json(new Wallet(privateKey));
  console.log("4-8 생성된 지갑을 json 형식으로 응답");
  const wallet = new Wallet(privateKey);
  const balance = (
    await axios.post(
      "http://localhost:8080/balance",
      { address },
      {
        headers: {
          Authorization:
            "Basic " + Buffer.from("admin:1234").toString("base64"),
          // HTTP 통신에서의 인증 방법
          // Authorization: Basic 방식은 base64 포멧을 기본으로 한다.
        },
      }
    )
  ).data.balance;
  wallet.balance = balance;

  res.json(wallet);
});

app.post("/transaction/send", (req: Request, res: Response) => {
  // signature서명 체인서버와 검증하는 과정
  console.log("5-3 / 6-3 POST 메서드, /transaction/send 라우터로 요청 받음 ");
  const signature = Wallet.createSign(req.body);
  // signature는 지갑을 생성하는 createSign(html에서 사용자 입력한 값)
  console.log(signature);

  const txObj = {
    // 여기서는 보내는 사람이 얼마를 가지고 있는지 모른다.
    // 그래서 트랜잭션을 만들라면 보내거나 받는 사람이 얼마가 있는지 알아야 한다.
    // 그래서 지갑이 있어야지 그것을 확인 할 수 있다.
    sender: req.body.sender.publicKey,
    received: req.body.received,
    amount: req.body.amount,
    signature,
  };

  console.log(
    "5-7 / 6-7  생성한 서명과 hash를 만들기 위한 데이터를 가지고, http://localhost:8080/transaction/send에 요청을 보냄 검증 과정"
  );
  axios.post("http://localhost:8080/transaction/send", txObj, {
    headers: {
      Authorization: "Basic " + Buffer.from("admin:1234").toString("base64"),
      // Authorization는 보안 인증 설정
      // HTTP 통신에서의 인증 방법
      // Authorization: Basic 방식은 base64 포멧을 기본으로 한다.
    },
  });

  res.json(signature);
});

app.post("/block/mine", (req: Request, res: Response) => {
  axios.post("http://localhost:8080/block/mine", req.body, {
    headers: {
      Authorization: "Basic " + Buffer.from("admin:1234").toString("base64"),
    },
  });
  res.end();
});

app.post("/balance", async (req: Request, res: Response) => {
  const balance = (
    await axios.post("http://localhost:8080/balance", req.body, {
      headers: {
        Authorization: "Basic " + Buffer.from("admin:1234").toString("base64"),
        // HTTP 통신에서의 인증 방법
        // Authorization: Basic 방식은 base64 포멧을 기본으로 한다.
      },
    })
  ).data.balance;
  res.send({ balance });
});

app.listen(9154, () => {
  console.log("wallet server open 9154");
});
