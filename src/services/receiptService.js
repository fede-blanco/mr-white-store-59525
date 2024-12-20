import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const receiptApi = createApi({
  reducerPath: "receiptApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.EXPO_PUBLIC_BASE_URL }),
  endpoints: (builder) => ({
    // Se utiliza otro método del builder que es "mutation" para generar cambios en nuestros registros de firebase
    postReceipt: builder.mutation({
      query: ({ ...receipt }) => ({
        //
        url: "receipts.json",
        // Se indica el método que queremos utilizar
        method: "POST",
        // La data es lo que se enviará como body de la petición
        body: receipt,
      }),
    }),
    getReceipts: builder.query({
      query: () => 'receipts.json'
    }),
    getReceiptsByUser: builder.query({
      query: (user) => {
        console.log("user receiptService --->", user)
        return `receipts.json?orderBy="user"&equalTo="${user}"`
      },
      transformResponse: (response) =>
        response ? Object.values(response) : [],
    }),
  }),
})

// Las mutation al exportarse se hace con el sufijo "Mutation" en vez de "Query"
export const { usePostReceiptMutation, useGetReceiptsByUserQuery, useGetReceiptsQuery } = receiptApi
