import { WebSocket, WebSocketServer } from "ws";
import Chain from "@core/chain";

export enum MessageType {
  lastBlock = 0, // 마지막 블록을 달라 하고 준다.
  allBlock = 1, // 전체 체인을 달라 하고 준다.
  addBlock = 2, // 블록이 추가 됐다고 알려주고 무엇이 추가 됐는지 알려준다.
}
export interface IMessage {
  type: MessageType;
  payload: any;
  msg: string;
}

class P2P extends Chain {
  private sockets: Array<WebSocket>; // 연결된 peer의 목록

  constructor() {
    super();
    this.sockets = [];
  }

  get getSockets(): Array<WebSocket> {
    return [...this.sockets];
  }

  connectSocket(socket: WebSocket, type?: MessageType): void {
    this.sockets.push(socket);
    socket.on("message", (_data: string) => {
      console.log(_data.toString());

      const data: IMessage = JSON.parse(_data.toString());

      switch (data.type) {
        case MessageType.lastBlock: {
          const message: IMessage = {
            type: MessageType.allBlock,
            payload: [this.lastBlock],
            msg: "lastBlock을 보냈다.",
          };
          socket.send(JSON.stringify(message));
          break;
        }
        case MessageType.allBlock: {
          // allBlock type : 1
          const [newBlock]: [IBlock] = data.payload;
          const isValid: IBlock | null = this.add2Chain(newBlock);
          if (isValid !== null) break;

          const message: IMessage = {
            type: MessageType.addBlock,
            payload: this.getChain,
            msg: "allBlock을 보냈다.",
          };
          socket.send(JSON.stringify(message));
          break;
        }

        case MessageType.addBlock: {
          // addBlock type:2
          const isValidChain = this.isValidChain(data.payload);
          if (isValidChain.isError === true) break;

          const isValid = this.replaceChain(data.payload);
          if (isValid.isError === true) break;

          const message: IMessage = {
            type: MessageType.addBlock, // tpye : 2
            payload: data.payload, // data.payload는 this.chain = _chain 매개변수로 들어와서 작동한 _chain을  this.chain으로 초기화된 상태에서  { isError: false, value: undefined }인 객체 형태
            msg: "addBlock을 보냈다.",
          };

          console.log("addBlock payload:", message.payload);
          this.broadcast(message);

          break;
        }
      }
    });

    const message: IMessage = {
      // 처음 연결 시 요청을 보내자, 마지막 블럭 주세요
      type: type | MessageType.lastBlock,
      payload: type ? this.getChain : [],
      msg: "처음 누가 보냈다.",
    };
    socket.send(JSON.stringify(message));
    // 방금 연결한 소켓 서버에 message 이벤트를 보낸다.
  }

  // 메서드 따로 빼놓음 (왜냐면 편하게 가져와서 사용하려고)

  listen(port: number): void {
    // 현재 로컬에서 서버를 생성, 배포한다.
    const server: WebSocketServer = new WebSocket.Server({ port });

    server.on("connection", (socket: WebSocket) => {
      console.log("socket start");
      this.connectSocket(socket);
    });
  }

  addToPeer(peer: string): void {
    const socket: WebSocket = new WebSocket(peer);
    socket.on("open", () => {
      console.log("open");
      this.connectSocket(socket, MessageType.addBlock);
    });
  }

  broadcast(message: IMessage) {
    this.sockets.forEach((item) => {
      item.send(JSON.stringify(message));
    });
  }
}

export default P2P;
