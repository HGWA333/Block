import axios from "axios";
import styled from "styled-components";
import { useEffect, useState } from "react";
import "../fontCSS/Font.css";
import { Tween, SplitChars, Reveal } from "react-gsap";
interface nftData {
  name: string;
  description: string;
  image: string;
}

export const List = ({ account }: { account: string }) => {
  const [list, setList] = useState<Array<nftData>>([]);

  // API Server에서 리스트 받아서 출력하자
  useEffect(() => {
    (async () => {
      setList(
        (await axios.post("http://localhost:8080/api/list", { from: account }))
          .data
      );
    })();
  }, [account]);

  return (
    <TestStyle>
      <ul>
        {list.map((item, idx) => (
          <Item item={item} key={`item-${idx}`} />
        ))}
      </ul>
    </TestStyle>
    // <ul>
    //   {list.map((item, idx) => (
    //     <Item item={item} key={`item-${idx}`} />
    //   ))}
    // </ul>
  );
};

const Item = ({ item: { name, description, image } }: { item: nftData }) => {
  const testOnclick = () => {
    console.log("이미지 클릭");
  };
  const fontOnclick = () => {
    console.log("폰트 클릭");
  };

  return (
    <TestStyle2>
      <Reveal repeat>
        <Tween from={{ opacity: 0 }} duration={1}>
          <li>
            <Tween
              from={{ x: "300px", y: "200px" }}
              stagger={0.1}
              duration={1.97}
            >
              <SplitChars
                wrapper={
                  <div
                    onClick={fontOnclick}
                    className="fontTest2"
                    style={{
                      display: "inline-block",
                      fontSize: "25px",
                    }}
                  />
                }
              >
                {`NFT Name:${name}`}
              </SplitChars>
            </Tween>
            <Tween
              from={{ x: "415px", y: "-185px" }}
              stagger={-0.1}
              duration={1.91}
            >
              <SplitChars
                wrapper={
                  <div
                    onClick={fontOnclick}
                    className="fontTest2"
                    style={{
                      display: "inline-block",
                      fontSize: "25px",
                    }}
                  />
                }
              >
                {`NFT description:${description}`}
              </SplitChars>
            </Tween>
            {/* <div className="test1 taa">{name}</div>
          <div className="test2 taa">{description}</div> */}
            <div className="imgBox">
              <img onClick={testOnclick} className="img1" src={image} />
            </div>
          </li>
        </Tween>
      </Reveal>
    </TestStyle2>
    // <li>
    //   <div>{name}</div>
    //   <div>{description}</div>
    //   <div>
    //     <img src={image} />
    //   </div>
    // </li>
  );
};

export const TestStyle = styled.div`
  ul {
    padding: 0px;
    border-bottom: 1px solid black;
    display: flex;
    flex-direction: column;
    padding-left: 50px;
  }
`;
export const TestStyle2 = styled.div`
  margin-bottom: 250px;
  li {
    margin-top: 250px;
    display: flex;  
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    position: relative;
  }
  .test1 {
    flex 1 1 auto;
    font-family: ffProLight;
    font-size: 16px;
  }
  .test2 {
    flex 1 1 auto;    
    font-family: ffProLight;
    font-size: 16px;
  }

  .imgBox {
    padding:50px;
    width: 300px;
    height: 300px;
    overflow: hidden;
    margin: 0 auto;
   
  }
  .img1 {   
    width: 100%;
    height: 100%;
    object-fit: corver;
    align-self: center;
    justify-self: center;
    &:hover{  
      scale : 1.1
    }
  }
  .fontTest1{  

    flex 1 1 auto;    
    font-family: ffProBold;
    font-size: 16px;
    align-self: center;

  }
  .fontTest2{
    flex 1 1 auto;    
    font-family: ffProLight;
    font-size: 16px;
    align-self: center;
    padding-left:4.8px;
    cursor: pointer;

    &:hover{  
      color : red;
      font-size : 55px !important;

    }
  }
 
`;
export const TestStyle3 = styled.div``;
