import React from "react";
import { api } from "../../api/api";
console.log(api);

const Count = ({ name }) => {
  const query = api.useGetCountQuery({ name });
  const mutation = api.useSetCountMutation();
  const setCount = mutation[0];

  if (query.isLoading) {
    return <>Loading</>;
  }
  console.log("query", query);
  console.log("query.data", query.data);
  console.log("query.isFetching", query.isFetching);
  console.log("mutation[0])", mutation[0]);
  console.log("mutation[1].isLoading", mutation[1].isLoading);
  console.log("setCount", setCount);
  console.log("setCount.name", setCount.name);
  console.log("setCount.value", setCount.value);

  return (
    <div>
      <button
        onClick={async () => {
          await setCount({
            name,
            value: query.data + 100 + `test${name}+100`,
            test: query.data + 5 + "test를 보냈습니다. 확인해주세요",
          });
        }}
      >
        {mutation[1].isLoading ? "updating..." : ""}
        {query.isFetching ? "fetching..." : ""}
        {name} {query.data}
      </button>
    </div>
  );
};

function MainPage() {
  return (
    <>
      <Count name="egoing" />
      <Count name="egoing" />
      <Count name="jane" />
      <Count name="steve" />
    </>
  );
}

export default MainPage;
