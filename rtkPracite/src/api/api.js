import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const TestApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api" }),
  keepUnusedDataFor: 5,
  tagTypes: ["Test"],
  endpoints: (builder) => ({
    getCount: builder.query({
      query: ({ name }) => `count/${name}`,
      providesTags: (result, error, arg) => {
        console.log("result, error, arg", result, error, arg);
        return [{ type: "Test", id: arg.name }];
      },
    }),
    setCount: builder.mutation({
      query: ({ name, value, test }) => {
        console.log("name, value, test", name, value, test);
        return {
          url: `count/${name}`,
          method: "POST",
          body: { value, test },
        };
      },
      invalidatesTags: (result, error, arg) => [
        // invalidatesTags 데이터가 수정시 자동으로 바꿔줌
        { type: "Test", id: arg.name },
      ],
    }),
  }),
});
