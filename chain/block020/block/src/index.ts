// 체인서버 http://localhost:8080 구역

import P2P from "./p2p";
import express, { Express, Request, Response } from "express";
import Wallet from "@core/wallet";

const app: Express = express();
const ws: P2P = new P2P();

app.use(express.json());

// 보안 작업은 보낼때랑 받을 때만 한다.
// 보안 작업을 하는 이유는 아무나 본인(내) 블록체인 네트워크(서버 또는 peer)에 블록을 추가하지 못하게 하기 위해서

// app.use((req: Request, res: Response, next) => {
//   console.log("5-8 지갑 서버에서 보낸 요청 받음");
//   const baseAuth = req.headers.authorization?.split(" ")[1] || "";
//   console.log("baseAuth :", baseAuth);
//   if (!baseAuth || baseAuth === "") return res.status(401).end();
//   // 인증 정보가 없으면 401(유효 하지 않은 인증)을 응답한다.
//   console.log("check");

//   const [userId, userPw] = Buffer.from(baseAuth, "base64")
//     .toString()
//     .split(":");
//   if (userId !== "admin" || userPw !== "1234") return res.status(401).end();
//   console.log("5-9 인증이 확인되면 다음으로 넘어감");
//   next();
// });

// http 통신에서 header를 이용한 인증 방법
// Authorization을 사용하는 이유는 아무나 본인 블록체인 네트워크(서버 또는 peer)에 블록을 추가하지 못하게 하기 위해서다.
// Authorization: Basic 방식을 사용한다.

app.get("/chains", (req: Request, res: Response) => {
  // 체인확인 용도
  res.json(ws.getChain);
});

app.post("/block/mine", (req: Request, res: Response) => {
  // 블록생성 용도
  // const { data }: { data: Array<string> } = req.body;
  const { data }: { data: string } = req.body;
  // 채굴시 output에 address or amount 중에서 address 주소만 받기 위해서
  // const newBlock: IBlock | null = ws.addBlock(data);
  const newBlock: IBlock | null = ws.mineBlock(data);
  if (newBlock === null) res.send("error data");
  res.json(newBlock);
});

app.post("/peer/add", (req: Request, res: Response) => {
  // peer 추가하는 용도
  const { peer }: { peer: string } = req.body;
  ws.addToPeer(peer);
  res.end();
});

app.post("/transaction/send", (req: Request, res: Response) => {
  //  signature 서명 지갑서버와 검증하는 과정
  console.log("5-10 지갑 서버에서 보낸 요청 받음");
  console.log(req.body);
  const isValid = Wallet.verify(req.body);
  console.log(isValid);
  res.end();
});

app.get("/peer", (req: Request, res: Response) => {
  // peer 누가 들어왔는지 확인하는 용도
  const sockets = ws.getSockets.map(
    (item: any) => item._socket.remoteAddress + ":" + item._socket.remotePort
  );
  res.json(sockets);
});

app.get("/utxo", (req: Request, res: Response) => {
  res.json(ws.getUtxos);
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

// 보안 작업
