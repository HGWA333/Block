import SearchComponents from "../Serach/Components";
import { SearchAddress, SearchToken, SearchNametag } from "../../api/index";

const SearchContainer = () => {
  SearchAddress({}).then((SearchAddressData) => {
    console.log(SearchAddressData);
  });

  SearchToken({}).then((SearchToken) => {
    console.log(SearchToken);
  });

  SearchNametag({}).then((SearchNametag) => {
    console.log(SearchNametag);
  });

  return (
    <>
      <SearchComponents>SearchComponents</SearchComponents>
    </>
  );
};

export default SearchContainer;
