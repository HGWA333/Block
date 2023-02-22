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

export const lastBlockList = async (lastBLData) => {
  const result = await request.post("api/lb/blList", lastBLData);
  return result.data.lastBLData;
};

export const lastTransactionList = async (lastTRData) => {
  const result = await request.post("api/lt/trList", lastTRData);
  return result.data.lastTRData;
};
