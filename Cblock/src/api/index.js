import axios from "axios";
const request = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "content-type": "application/json",
  },
});

export const blockAdd = async (blockAddData) => {
  const result = await request.post("/", blockAdd);
  return result.data.blockAddData;
};

export const lastTransactionList = async (lastTRData) => {
  console.log("리액트 실행할거");
  const result = await request.post("api/lt/trList", lastTRData);

  return result.data.lastTRData;
};
