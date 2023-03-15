import React from "react";
import useWeb3 from "./useWeb3";
import axios from "axios";
import Word, { Cloud } from "./components/test/WordTest";
import { useEffect, useState } from "react";
function App() {
  const [web3, account] = useWeb3();
  const [candidateList, setCandidateList] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await axios.post("http://localhost:8080/api/send", {
        method: "candidates",
      });
      console.log("result", result);
      setCandidateList(result.data.candidates);
    })();
  }, []);

  if (!account) return <h1> 메타마스크 설치 및 계정 연결 해주세요</h1>;
  return (
    <>
      <div className="voteList">
        {candidateList.map((item, idx) => (
          <Candidate
            key={`candidate-${idx}`}
            item={item}
            web3={web3}
            account={account}
          />
        ))}
      </div>
      {candidateList.map((item, idx) => (
        <>
          <Word
            key={`candidate-${idx}`}
            item={item}
            web3={web3}
            account={account}
          />
          <Cloud item={item} />
        </>
      ))}
    </>
  );
}

export default App;

const Candidate = ({ item, account, web3 }) => {
  const [vote, setVote] = useState(0);
  useEffect(() => {
    (async () => {
      const result = await axios.post("http://localhost:8080/api/send", {
        method: "totalVotesFor",
        item,
      });
      console.log("result", result);
      setVote(result.data.totalVotesFor);
      web3.eth
        .subscribe("logs", { address: result.data.CA })
        .on("data", (log) => {
          const params = [
            { type: "string", name: "candidate" },
            { type: "uint", name: "votes" },
          ];
          const value = web3.eth.abi.decodeLog(params, log.data);

          console.log("value", value);
          console.log(
            "value.candidate, item, value.votes",
            value.candidate,
            item,
            value.votes
          );

          if (value.candidate == item) {
            setVote(value.votes);
            console.log("value.votes", value.votes);
          }
        });
    })();
  }, []);

  const onClick = async () => {
    const result = await axios.post("http://localhost:8080/api/send", {
      method: "voteForCandidate",
      candidate: item,
      from: account,
    });
    web3.eth.sendTransaction(result.data);
  };

  return (
    <div className="voteItem" onClick={onClick}>
      <h3> {item}</h3>
      <div> {vote}</div>
    </div>
  );
};
