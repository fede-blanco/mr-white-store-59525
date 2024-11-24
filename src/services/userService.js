import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.EXPO_PUBLIC_BASE_URL }),
  endpoints: (builder) => ({
    // Se hace un PUT para postear la imagen en firebase. Para ello se recibe la imagen y el localId
    // Se realiza PUT y no POST porque post genera un índice para cada cosa agregada (pueden ser varias)
    // y agrega la proxima en cambio PUT no (Modifica el contenido).
    putProfilePicture: builder.mutation({
      query: ({ image, localId }) => ({
        url: `profilePictures/${localId}.json`,
        method: "PUT",
        // como body pasamos un objeto con la propiedad "image" y el valor que viene en la variable
        // "image" recibida por parámetro
        body: {
          image: image,
        },
      }),
    }),
    // Obtenemos la iamgen de perfil de firebase utilizando su "localId"
    getProfilePicture: builder.query({
      query: (localId) => `profilePictures/${localId}.json`,
    }),
  }),
})

export const { usePutProfilePictureMutation, useGetProfilePictureQuery } = userApi
