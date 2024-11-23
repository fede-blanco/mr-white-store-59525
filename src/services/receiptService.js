import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const receiptApi = createApi({
  reducerPath: "receiptApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.EXPO_PUBLIC_BASE_URL}),
  endpoints: (builder) => ({
      //Utilizamos otro método del builder que es "mutation" para generar cambios en nuestros registros de firebase
      postReceipt: builder.mutation({
          query: ({...receipt}) => ({
            //
            url: 'receipts.json',
            // Debemos indicar el método que queremos utilizar
            method: 'POST',
            // la data es lo que se enviará como body de la petición
            body: receipt
          })
      })
  })
})

// las mutation al exportarse se hace con el sufijo "Mutation" en vez de "Query"
export const { usePostReceiptMutation} = receiptApi

