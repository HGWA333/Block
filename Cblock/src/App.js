import MainContaniner from "./components/MainPage/Container";
import { blockAdd } from "./api/index";

function App() {
  blockAdd({}).then((blockAddData) => {
    console.log(blockAddData);
  });
  {
    // const [blockNumber, setBlockNumber] = useState(-1);
    // const [pageNumber, setPageNumber] = useState(0);
    // useEffect(() => {
    //   console.log(" 이펙트 ㅎㅇㅎㅇ");
    //   for (let i = 0; i < 68; ++i) {
    //     if (5 * 7 <= i && i < 5 * (7 + 1)) console.log(i);
    //   }
    // }, []);
    // for문에서의 i는 블록넘버가 들어간다.
    // 5 * 7 <= i 는 0 페이지   i < 5 * (7 + 1)는 1페이자가 된다. 여기서 &&으로 0페이지와 1페이지의 간격 사이로 볼 수 있다.
    // 여기서 5는 페이지의 리스트 숫자가 되고  뒤에 7은 페이지 숫자가 된다. 즉 5자리에 들어가는 숫자는 0페이지와 1페이지의 간격에서 리스트를 5개를 뽑아낸다.
  }

  return (
    <>
      <MainContaniner></MainContaniner>
    </>
  );
}

export default App;
