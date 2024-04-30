import { apiSlice } from "./apiSlice"
import { MAIDS_URL } from "../constants"

export const maidsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getMaids: builder.query({
      query: () => ({
        url: MAIDS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getMaidDetails: builder.query({
      query: maidId => ({
        url: `${MAIDS_URL}/${maidId}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
})

export const { useGetMaidsQuery, useGetMaidDetailsQuery } =
  maidsApiSlice