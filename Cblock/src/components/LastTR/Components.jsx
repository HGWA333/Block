import { LastTRCSS } from "../../styleCSS/LastTRCSS";
const LastTRComponents = ({ lastTR }) => {
  console.log("lastTR를 찍었다.", lastTR);

  // let LastTR = JSON.stringify(lastTR);
  // console.log("JSON.stringify(lastTR)를 찍었다.", LastTR);

  return (
    <>
      <LastTRCSS>
        <p>Latest Transactions</p>
        <div>
          0xb86f960e569831
          <span>15 secs ago</span>
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
