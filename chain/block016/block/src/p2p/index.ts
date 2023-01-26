import { WebSocket, WebSocketServer } from "ws";
import Chain from "@core/chain";

class P2P extends Chain {
  // P2P가 Chain을 상속 받는 이유 : 현재 P2P 서버에 기존의 체인을 상속함으로 블록 추가 등에 있어 편리하기 때문

  private sockets: Array<WebSocket>; // 연결된 peer의 목록

  constructor() {
    super();
    this.sockets = [];
  }

  get getSockets(): Array<WebSocket> {
    return [...this.sockets];
  }

  connectSocket(socket: WebSocket): void {
    // 2단계가 발생하기 위해서는 listen의 server.on("connection")에서 서버에서 연결 요청을 받아야지 2단계 발동
    // 서버에서 연결 요청이 들어온 것을 소켓에 연결함
    // 소켓을 연결한다. 소켓이 피어다. socket = peer
    this.sockets.push(socket);
    // 연결된 소켓을 소켓 목록에 추가한다. (peer 목록에 추가) 서버와 연결 후에 어디와 연결이 됐는지 확인할 때 사용

    socket.on("message", (_data: string) => {
      // message 이벤트가 발생하면 로그를 남긴다.
      console.log(_data.toString());
    });

    socket.send("💤💤💤💤💤💤💤💤💤💤💤💤💤");
    // 3단계
    // 연결한 소켓 서버에  messgase 이벤트를 보낸다.
  }
  listen(port: number): void {
    // 현재 로컬에 서버를 생성, 배포하는 용도
    // listen은 서버를 오픈 할 때 사용
    const server: WebSocketServer = new WebSocket.Server({ port });
    // 서버를 생성한다.

    // port: 7545의 의미 : 가나슈(Ganache)라는 개인(로컬)용 블록체인이 있다. (네트워크 없이 진행 가능) 가나슈의 초기 port 설정이 7545이다.
    // port 설정은 사용자 임의로 적용 가능

    server.on("connection", (socket: WebSocket) => {
      // 서버에서 연결 요청이 들어옴
      // 서버에 연결이 들어왔을 때 socket을 연결한다.
      console.log("socket start");
      this.connectSocket(socket);
      // socket을 추가한다.
    });
  }
  addToPeer(peer: string): void {
    // 1단계
    // 소켓을 생성하고 연결한다.
    // Peer2 상황 addToPeer는 연결할 때 사용  peer는 상대방이 받는 쪽
    const socket: WebSocket = new WebSocket(peer);
    // new WebSocket(peer)은 상대 소켓 서버 주소를 받아서 연결을 시도한다.
    // new WebSocket()의 인자는 주소를 적어준다.
    // 주소는 상대방이 받는 주소를 적어준다.
    socket.on("open", () => {
      // 연결 성공 시 open 이벤트가 발생한다.
      console.log("open");
      this.connectSocket(socket);
      // 연결에 성공하면 소켓을 추가
    });
  }
}

export default P2P;
