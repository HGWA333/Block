// 체인서버 http://localhost:8080 구역

import P2P, { IMessage, MessageType } from "./p2p";
import express, { Express, Request, Response } from "express";
import Wallet from "@core/wallet";

const app: Express = express();
const ws: P2P = new P2P();

app.use(express.json());

// 보안 작업은 보낼때랑 받을 때만 한다.
// 보안 작업을 하는 이유는 아무나 본인(내) 블록체인 네트워크(서버 또는 peer)에 블록을 추가하지 못하게 하기 위해서

app.use((req: Request, res: Response, next) => {
  console.log("5-8 / 6-8 지갑 서버에서 보낸 요청 받음");
  const baseAuth = req.headers.authorization?.split(" ")[1] || "";
  console.log("baseAuth :", baseAuth);
  if (!baseAuth || baseAuth === "") return res.status(401).end();
  // 인증 정보가 없으면 401(유효 하지 않은 인증)을 응답한다.
  console.log("check");

  const [userId, userPw] = Buffer.from(baseAuth, "base64")
    .toString()
    .split(":");
  if (userId !== "admin" || userPw !== "1234") return res.status(401).end();

  console.log("5-9 / 6-9 인증이 확인되면 다음으로 넘어감");
  next();
});

// http 통신에서 header를 이용한 인증 방법
// Authorization을 사용하는 이유는 아무나 본인 블록체인 네트워크(서버 또는 peer)에 블록을 추가하지 못하게 하기 위해서다.
// Authorization: Basic 방식을 사용한다.

app.get("/chains", (req: Request, res: Response) => {
  // 체인확인 용도
  console.log("GET /chains");
  res.json(ws.getChain);
});

app.post("/block/mine", (req: Request, res: Response) => {
  // 블록생성 용도
  console.log("POST /block/mine");
  // const { data }: { data: Array<string> } = req.body;
  const { data }: { data: string } = req.body;
  // 채굴시 output에 address or amount 중에서 address 주소만 받기 위해서
  // const newBlock: IBlock | null = ws.addBlock(data);
  const newBlock: IBlock | null = ws.mineBlock(data);
  if (newBlock === null) res.send("error data");
  // 오류가 안났다면 잘 끝난 상태

  const message: IMessage = {
    type: MessageType.allBlock,
    payload: [newBlock],
    msg: "",
  };
  ws.broadcast(message);

  res.json(newBlock);
});

app.post("/peer/add", (req: Request, res: Response) => {
  // peer 추가하는 용도
  console.log("POST /peer/add");
  const { peer }: { peer: string } = req.body;
  ws.addToPeer(peer);
  res.end();
});

app.get("/peer", (req: Request, res: Response) => {
  // peer 누가 들어왔는지 확인하는 용도
  console.log("GET /peer");
  const sockets = ws.getSockets.map(
    (item: any) => item._socket.remoteAddress + ":" + item._socket.remotePort
  );
  res.json(sockets);
});

app.post("/transaction/send", (req: Request, res: Response) => {
  //  signature 서명 지갑서버와 검증하는 과정
  console.log("5-10 / 6-10 지갑 서버에서 보낸 요청 받음");
  console.log(req.body);
  //  {
  //   sender: '03765DC5F39AED4F75C53AB3907606A37F6F4EE78A573F8C289D1F33C90E74FCE3',
  //   received: '7606A37F6F4EE78A573F8C289D1F33C90E74FCE3',
  //   amount: '3',
  //   signature: {
  //     r: '90f68f8cca3fdb71d32f2323a90a3c5daf3f65fe6913b99217e440e2e0771904',
  //     s: '3778a76d3fc093f8d9e8cb906f9279e8248d9595792c1686d79e5c9ecbc97217',
  //     recoveryParam: 0
  //   }
  // }

  // const isValid = Wallet.verify(req.body);
  // console.log(isValid);

  console.log("6-11 sendTransaction 트랜잭션을 추가 함수를 호출한다.");
  const result = Wallet.sendTransaction(req.body, ws.getUtxo);
  console.log("result::::::", result);

  console.log("6-32  트랜잭션이 정상적으로 추가되었는지 확인");
  if (result.isError === true) res.send(result.msg);
  else {
    console.log("6-33  UTXO 수정(업데이트) 함수 호출");
    ws.updateUTXO(result.value);

    console.log("6-37  트랜잭션의 추가 및 UTXO 수정 끝");
    res.end();
  }
  // res.end();
});

app.get("/utxo", (req: Request, res: Response) => {
  res.json(ws.getUtxo);
  // 라우터 utxo로 요청 받은 데이터는 ws.getUtxos json 형태로 응답
});

app.post("/balance", (req: Request, res: Response) => {
  res.json({ balance: Wallet.getBalance(req.body.address, ws.getUtxo) });
});

const ports = [
  [8080, 7545],
  [8081, 7546],
];
const idx = 0; // 테스트용

app.listen(ports[idx][0], () => {
  console.log("server start " + ports[idx][0]);
  ws.listen(ports[idx][1]);
});
