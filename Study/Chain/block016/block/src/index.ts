{
  // import Block from "@core/block/block";
  // import Chain from "@core/chain/index";
  // const genesis = new Block(["첫 블록"]);
  // console.log("genesis :", genesis);
  // const second = new Block(["두번째 블록"], genesis);
  // console.log("second :", second);
  // const previousBlock = new Block(["이전 블록"]);
  // previousBlock.height = 29;
  // previousBlock.difficulty = 10;
  // const adjustmentBlock = new Block(["단위 개수 전 블록"]);
  // adjustmentBlock.height = 20;
  // adjustmentBlock.difficulty = 11;
  // const newBlock = new Block(["asdf"], previousBlock, adjustmentBlock, {
  //   DAI: 10,
  //   averageGenerationTime: 60 * 1000,
  // });
  // console.log(newBlock);
  // const chain = new Chain();
  // for (let i = 0; i < 300; i++) {
  //   chain.addBlock([`test block ${i}`]);
  // }
}

import P2P from "./p2p";
import express, { Express, Request, Response } from "express";

const app: Express = express();
const ws: P2P = new P2P();

app.use(express.json());

app.get("/chains", (req: Request, res: Response) => {
  res.json(ws.getchain);
  // http 통신을 통해서 chian의 index.ts에 getchain을 가져온다.
});
app.post("/block/mine", (req: Request, res: Response) => {
  const { data }: { data: Array<string> } = req.body;

  const newBlock = ws.addBlock(data);
  if (newBlock === null) res.send("err data");
  // newBlock 타입이 null로 들어오면 res.send("err data") 실행
  // null을 넣은 이유는 chian의 index.ts에 add2Chain() 메서드에서 리턴 값 null이 들어올 수 있기 때문
  //  if (isValid.isError) {
  // console.error(isValid.msg);
  // return null;

  res.json(newBlock);
  // newBlock 타입이 null이 아니면  res.json(newBlock);
});

app.post("/peer/add", (req: Request, res: Response) => {
  const { peer }: { peer: string } = req.body;
  ws.addToPeer(peer);
  res.end();
});

app.get("/peer", (req: Request, res: Response) => {
  const sockets = ws.getSockets.map(
    (item: any) => item._socket.Address + ":" + item._socket.remotePort
  );
  res.json(sockets);
});

const ports = [
  [8080, 7545],
  [8081, 7546],
];
const idx = 0; // 테스트용

app.listen(ports[idx][0], () => {
  // ports[idx][0] =   [8080, 7545]
  console.log("server start 8080" + ports[idx][0]);
  ws.listen(ports[idx][1]);
  // idx[idx][1] =   [8081, 7546]
  // ws.listen()은 WebSocket(P2P) 서버 생성과 배포 하는 용도
});
