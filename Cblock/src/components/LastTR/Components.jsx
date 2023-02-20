import { LastTRCSS } from "../../styleCSS/LastTRCSS";
const LastTRComponents = () => {
  return (
    <>
      <LastTRCSS>
        <p>Latest Transactions</p>
        <div>
          0xb86f960e569831 <span>15 secs ago</span>
        </div>
        <div>
          <div>
            From <span>0x5F9273...0F16844F</span>
          </div>
          <div>
            To <span>0x35101c...5c341935</span>
          </div>
        </div>
        <div>0.04534 Eth</div>
      </LastTRCSS>
    </>
  );
};

export default LastTRComponents;
