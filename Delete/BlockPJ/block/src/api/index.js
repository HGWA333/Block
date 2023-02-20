import axios from "axios";
const request = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "content-type": "application/json",
  },
});

export const newBlock = async (blockData) => {
  return (await request.post("/", blockData)).data;
};
