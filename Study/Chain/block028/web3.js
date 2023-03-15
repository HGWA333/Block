console.log("Web3:", Web3); // Web3는 Class  W는 대문자

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8080")); // Class라 new를 붙혀서 초기화

// const web3 = new Web3("http://localhost:8080");는 geth에서 geth attach http://www.localhost:8080를 사용한 것과 같음

console.log("web3.eth:", web3.eth);

// web3.eth.extend({
//   // RPC에 대한 메서드를 추가한다.
//   property: "txpool",
//   // 속성은 txpool로 모듈 이름을 설정하는 것으로 없어도 됨
//   methods: [
//     {
//       name: "content",
//       // name 메서드는 호출 할때의 이름(선언되는 메서드의 이름)
//       call: "txpool_content",
//       // call 메서드는 호출 할때의 이름(선언되는 메서드의 이름)
//     },
//     {
//       name: "inspect",
//       call: "txpool_inspect",
//     },
//     {
//       name: "status",
//       call: "txpool_status",
//     },
//   ],
// });

// web3.eth.txpool
//   .status()
//   .then((data) => console.log("txpoolData.status():", data))
//   .catch(console.error);

web3.eth.extend({
  // RPC에 대한 메서드를 추가한다.
  property: "txpool",
  // 속성은 txpool로 모듈 이름을 설정하는 것으로 없어도 됨
  methods: [
    {
      name: "content",
      // name 메서드는 호출 할때의 이름(선언되는 메서드의 이름)
      call: "txpool_content",
      // call 메서드는 호출 할때의 이름(선언되는 메서드의 이름)
    },
  ],
});

web3.eth.txpool.content().then((data) => {
  console.log("txpoolData", data);
});
