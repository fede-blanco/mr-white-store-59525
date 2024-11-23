import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({baseUrl: process.env.EXPO_PUBLIC_BASE_AUTH_URL}),
  endpoints: (builder) => ({
      signup: builder.mutation({
        query: ({...auth}) => ({
          // url para registrarse
          url: `accounts:signUp?key=${process.env.EXPO_PUBLIC_API_KEY}` ,
          method: 'POST',
          body: auth,
        })
      }),
      login: builder.mutation({
        query: ({...auth}) => ({
          // url para inciar sesión con contraseña
          url: `accounts:signInWithPassword?key=${process.env.EXPO_PUBLIC_API_KEY}` ,
          method: 'POST',
          body: auth,
        })
      })
  })
})


// Exportamos los 2 hooks para poder utilizarlos en nuestros componentes
export const { useSignupMutation, useLoginMutation } = authApi

