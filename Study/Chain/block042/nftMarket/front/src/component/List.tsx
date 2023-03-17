import axios from "axios";
import styled from "styled-components";
import "../fontCSS/Font.css";
import { useEffect, useState } from "react";
import { Tween, SplitChars, Reveal } from "react-gsap";

interface nftData {
  name: string;
  description: string;
  image: string;
}

export const List = () => {
  const [list, setList] = useState<Array<nftData>>([]);
  // const [list, setList] = useState<Array<nftData>>([]); 중 <Array<nftData>>([])의 []에
  // server route 경로 api/mint에서 name, description, image 받은 데이터를 넣어주면 된다.
  // 형식은 객체 형식으로 넣어준다.

  useEffect(() => {
    (async () => {
      setList((await axios.get("http://localhost:8080/api/list")).data);
    })();
  }, []);

  return (
    <>
      <TestStyle>
        <ul>
          {list.map((item, idx) => (
            <Item item={item} key={`item-${idx}`} />
          ))}
        </ul>
      </TestStyle>
    </>
  );
};

const Item = ({ item: { name, description, image } }: { item: nftData }) => {
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
              <img className="img1" src={image} />
            </div>
          </li>
        </Tween>
      </Reveal>
    </TestStyle2>
  );
};

export const TestStyle = styled.div`
  ul {
    border-bottom: 1px solid black;
    display: flex;
    flex-direction: column;
    padding-left: 100px;
  }
`;
export const TestStyle2 = styled.div`
  margin-bottom: 250px;
  li {
    margin-top: 250px;
    padding: 80px;
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
    width: 500px;
    height: 500px;
    overflow: hidden;
    margin: 0 auto;
    border-left: 2.5px solid yellow;
    padding-right:50px;
  }
  .img1 {
    width: 100%;
    height: 100%;
    object-fit: corver;
    align-self: center;
    justify-self: center;
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
  }&:hover{  
    cursor: pointer;
  }
 
`;
export const TestStyle3 = styled.div``;
