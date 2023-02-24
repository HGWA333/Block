import axios from "axios";
const request = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "content-type": "application/json",
  },
});

export const blockAdd = async (blockAddData) => {
  const result = await request.post("/", blockAddData);
  return result.data.blockAddData;
};

export const lastBlockList = async (offset, limit) => {
  const result = await request.post("api/lb/blList", offset, limit);
  return result.data.lastBLData;
};

export const BlMaxList = async () => {
  const result = await request.post("api/lb/maxtr");
  return result.data.lastBLData.length;
};

export const lastTransactionList = async (offset, limit) => {
  const result = await request.post("api/lt/trList", offset, limit);
  return result.data.lastTRData;
};

export const TrMaxList = async () => {
  const result = await request.post("api/lt/maxtr");
  return result.data.lastTRData.length;
};

export const SearchList = async ({ string }) => {
  const result = await request.post("api/lb/search", { string: string });
  console.log("SearchList", result.data.search);
  return result.data.search;
};
