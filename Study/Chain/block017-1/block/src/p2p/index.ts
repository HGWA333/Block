import { WebSocket, WebSocketServer } from "ws";
import Chain from "@core/chain";

enum MessageType {
  // MessageType은 메세지를 보내고 받기 위한 설정
  // enum은 배열과 비슷하며 순서가 있는 데이터로 열거형 이라고 한다.
  // 변수에 정의할 값을 미리 정의했다고 생각하면 됨
  // 어떤 메세지를 주고 받았는지 확인하기 위해 타입으로 설정함.
  // 어떤 내용을 주고 받았는지 알기 위한 용도
  lastBlock = 0, // 마지막 블록을 달라 하고 준다.
  allBlock = 1, // 전체 체인을 달라 하고 준다.
  addBlock = 2, // 블록이 추가 됐다고 알려주고 무엇이 추가 됐는지 알려준다.
}
interface IMessage {
  // 주고 받을 메세지에 대한 타입
  type: MessageType;
  // 어떤 메세지를 주고 받았는지 확인
  payload: any;
  // 메세지에 담긴 데이터
}

class P2P extends Chain {
  // Chain을 상속받는 이유 : 현재 P2P 서버에 기존의 체인을 상속함으로써 블록 추가 등에 있어서 편함
  private sockets: Array<WebSocket>; // 연결된 peer의 목록

  constructor() {
    super();
    this.sockets = [];
  }

  get getSockets(): Array<WebSocket> {
    return [...this.sockets];
  }

  connectSocket(socket: WebSocket, type?: MessageType): void {
    // 소켓을 연결한다.
    this.sockets.push(socket);
    // 연결된 소켓을 소켓 목록에 추가한다.(peer 목록에 추가)
    //   - 후에 어디랑 연결됐는지 확인할 때 등 사용한다.
    socket.on("message", (_data: string) => {
      // message 이벤트가 발생하면 로그로 남긴다.
      console.log(_data.toString());

      const data: IMessage = JSON.parse(_data.toString());
      // data를 JSON으로 파싱한다. (받은 메세지를 객체로 파싱하는 것)

      switch (data.type) {
        // 어떤 요청이 왔는지 type으로 확인하는 의미
        case MessageType.lastBlock: {
          // lastBlock type : 0
          // data.type이 MessageType.lastBlock로 들어왔을 때  const message: IMessage 실행
          // 마지막 블록을 달라는 의미

          // isError: false 데이터가 들어오면 message: IMessage 실행
          const message: IMessage = {
            type: MessageType.allBlock,
            payload: [this.lastBlock],
            // 마지막 블록을 payload에 담는다.
          };
          socket.send(JSON.stringify(message));
          // 메세지를 담아서 JSON.stringify(message) 객체화 해서 보냄
          break;
        }
        case MessageType.allBlock: {
          // allBlock type : 1
          // data.type이 MessageType.allBlock 들어왔을 때  const message: IMessage 실행후
          // socket.send(JSON.stringify(message)) 보내고 break 동작
          // allBlock은 다른 서버(상대방)에서 받아와서 type : 1 뜸
          const [newBlock]: [IBlock] = data.payload;
          const isValid: IBlock | null = this.add2Chain(newBlock);
          if (isValid !== null) break;
          // 정상적인 유효한 데이터가 들어오면 멈춤
          // isValid가 null이 아니라는 말은 체인에 블록이 정상적으로 추가 됐다는 의미

          // 체인에 블록이 정상적으로 추가되지 않았을 때 전체 체인을 보내서 확인한다.
          const message: IMessage = {
            type: MessageType.addBlock,
            payload: this.getChain,
          };
          socket.send(JSON.stringify(message));
          break;
        }
        case MessageType.addBlock: {
          // addBlock type:2
          const isValidChain = this.isValidChain(data.payload);
          if (isValidChain.isError === true) break;
          // 정상적인 유효한 데이터가 들어오면 멈춤
          // 여기서 data.payload로 받는 데이터는
          // chain 폴더의 index.ts중 isValidChain에서 리턴 값 isValid 이것을 받고
          // isValid는 Block.isValidBlock(nowBlock, previousBlock)이것을 받음

          const isValid = this.replaceChain(data.payload);
          if (isValid.isError === true) break;
          // 정상적인 유효한 데이터가 들어오면 멈춤
          // 여기서 data.payload로 받는 데이터는
          // chain 폴더의 index.ts중 replaceChain에서 리턴 값 {isError: true, msg: "메세지"}를 객체 형식으로 받음
          // 여기서 msg는 3가지가 있고 3가지 중 1개를 보내고 멈춤

          const message: IMessage = {
            type: MessageType.addBlock, // tpye : 2
            payload: data.payload, // data.payload는 this.chain = _chain 매개변수로 들어와서 작동한 _chain을  this.chain으로 초기화된 상태에서  { isError: false, value: undefined }인 객체 형태
          };

          console.log("addBlock payload:", message.payload);
          // isError: false 데이터가 들어오면 message: IMessage 실행
          // type은 MessageType.addBlock이며 = type 2 형태
          // replaceChain메서드에서 매개변수로 들어와서 작동한 _chain을  this.chain으로 초기화된 상태
          // payload: data.payload는 { isError: false, value: undefined }인 객체 형태

          this.sockets.forEach((item) => {
            // 나와 연결된 피어들에게 나의 데이터가 바뀌었음을 알려주는 의미
            item.send(JSON.stringify(message));
            // 바뀐 데이터를 객체로 바꿔서 보내줌
          });
          break;
          // 바뀐 데이터를 보내주고 멈춤
          // const message: IMessage = {
          //   type: MessageType.lastBlock,
          //   payload: [this.lastBlock],
          // };
        }
      }
    });

    const message: IMessage = {
      // 처음 연결 시 요청을 보내고 마지막 블럭을 달라고 한다.
      type: type | MessageType.lastBlock,
      // 라스트 블록 요청
      payload: type ? this.getChain : [],
    };
    socket.send(JSON.stringify(message));
    // message를 보낼 땐 JSON.stringify로 객체화하여 변환해서 보내야 됨
    // 방금 연결한 소켓 서버에 message 이벤트를 보낸다.
  }

  listen(port: number): void {
    // 현재 로컬에서 서버를 생성, 배포한다.
    const server: WebSocketServer = new WebSocket.Server({ port });
    // 서버를 생성한다.
    // 가나슈(Ganache) 라는 개인(로컬)용 블록체인이 있다. << 네트워크 없이 진행 가능하다.
    // 이 가나슈의 초기 port 설정이 7545이다.

    server.on("connection", (socket: WebSocket) => {
      // 서버에 연결이 들어왔을 때
      console.log("socket start");
      this.connectSocket(socket);
      // socket을 추가한다.
    });
  }

  addToPeer(peer: string): void {
    // 소켓을 생성하고 연결한다.
    const socket: WebSocket = new WebSocket(peer);
    // 상대 소켓 서버 주소를 받아서 연결을 시도한다.
    socket.on("open", () => {
      // 연결 성공 시 open 이벤트가 발생한다.
      console.log("open");
      this.connectSocket(socket, MessageType.addBlock);
      // 상대방이 나에게 접속을 했을 때 MessageType.addBlock 보낸다.
      // 연결에 성공하면 소켓을 추가한다.
      // hi
    });
  }
}

export default P2P;
