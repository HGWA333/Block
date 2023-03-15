import P2P from "./p2p";
import express, { Express, Request, Response } from "express";

const app: Express = express();
const ws: P2P = new P2P();

app.use(express.json());

app.get("/chains", (req: Request, res: Response) => {
  // 체인확인 용도
  res.json(ws.getChain);
});

app.post("/block/mine", (req: Request, res: Response) => {
  // 블록생성 용도
  const { data }: { data: Array<string> } = req.body;
  const newBlock: IBlock | null = ws.addBlock(data);
  // newBlock 데이터면 인터페이스 IBlock로 설정한 타입을 ws.addBlock(data)에적용
  // newBlock이 null 타입이면  ws.addBlock(data)을 null로 적용
  if (newBlock === null) res.send("error data");
  // newBlock 데이터가아닌 null 타입이 들어오면 "error data" string 타입으로 보내준다.
  res.json(newBlock);
  // newBlock 데이터가 들어오면 newBlock을 json 객체 형식으로 보내준다.
});

app.post("/peer/add", (req: Request, res: Response) => {
  // peer 추가하는 용도
  const { peer }: { peer: string } = req.body;
  // "peer":"ws://192.168.0.243:7545" = req.body
  ws.addToPeer(peer);
  // 받는 사람은 addToPeer(peer) 실행
  res.end();
});

app.get("/peer", (req: Request, res: Response) => {
  // peer 누가 들어왔는지 확인하는 용도
  const sockets = ws.getSockets.map(
    (item: any) => item._socket.remoteAddress + ":" + item._socket.remotePort
  );
  res.json(sockets);
});

const ports = [
  [8080, 7545],
  [8081, 7546],
];
const idx = 0; // 테스트용

app.listen(ports[idx][0], () => {
  console.log("server start " + ports[idx][0]);
  ws.listen(ports[idx][1]);
  // WebSocket(P2P) 서버 생성/배포
});
