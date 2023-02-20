import axios from "axios";
const request = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "content-type": "application/json",
  },
});

export const lastBlock = async (lastBlockData) => {
  return (await request.post("/lastblock", lastBlockData)).lastBlockData;
};

export const lastTransaction = async (lastTransactionData) => {
  return (await request.post("/lastTransaction", lastTransactionData))
    .lastTransactionData;
};

export const Search = async (searchData) => {
  return (await request.post("/search", searchData)).searchData;
};

export const SearchAddress = async (SearchAddressData) => {
  return (await request.post("/search/address", SearchAddressData))
    .SearchAddressData;
};

export const SearchToken = async (SearchTokenData) => {
  return (await request.post("/search/token", SearchTokenData)).SearchTokenData;
};

export const SearchNametag = async (SearchNametag) => {
  return (await request.post("/search/nametag", SearchNametag)).SearchNametag;
};
