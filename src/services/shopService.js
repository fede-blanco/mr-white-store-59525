// Se importan los hooks necesarios de la liubrería de toolkit/query
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Se crea y Se exporta una variable que contendrá la api creada con el hook
export const shopApi = createApi({
  reducerPath: "shopApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.EXPO_PUBLIC_BASE_URL }),
  //El builder recibido por parámetro con ayuida de sus métodos va a construir una query en caso de querer buscar
  // algo de la base de datos o una "mutation" en caso de querer modificar algo de la basde de datos
  endpoints: (builder) => ({
    // La propiedad "getCategories" contendrá la url necesaria para obetener todos los resultados de las categorías
    // de la base de datos (base mas quey necesaria)
    getCategories: builder.query({
      // en query va una función flecha (que puede recibir un parámetro para filtrar) que devuevla todo lo que le falta
      // a la url para acceder al lugar específico al que se quiere ir
      query:() => 'categories.json'
    }),
    getProducts: builder.query({
      query:() => 'products.json'
    }),
    getProductsByCategory: builder.query({
      // La query recibe un parametro "category" y lo utiliza para filtrar los que coincidan mediante de filtros en la
      // url (que estan indicados en la documentacion de rtk query)
      query: (category)=>{
          category = category.toLowerCase()
          return(
          `products.json?orderBy="category"&equalTo="${category}"` //Strings literal
      )},
      // Como firebase al hacer filtros devuelve la info dentro de un objeto con propiedades donde las llaves son numeros
      // de orden de firebase y los valores son los objetos en si, se puede utilizar una propiedad "transformResponse" para
      // transformar la respuesta de un objeto con propiedades y valores a un array (que es lo que se necesita para mapear
      // en la FlatList) donde se utilicen esos valores como elementos del array
      transformResponse: (response) => ( 
          response ? Object.values(response): []
      )
    }),
    getProduct: builder.query({
      query: (productId) => {
        console.log("productId shopservice --->", productId);
        
        return (`products.json?orderBy="id"&equalTo=${productId}` //Strings literal) 
          )
      },
      transformResponse: (response) => (
        // En este caso, si hay respuesta se convierte en unarray y se toma el elemento que este en la posición [0] mientras
        // que si no hay respuesta se devuelve "null"
        response ? Object.values(response)[0] : null
      )
    })
  })

})

//exportamos el hook quto creado por el builder para utilizar en otros componentes. Debemos exportarlo con esta forma de nombrarlo
export const {useGetCategoriesQuery, useGetProductsQuery, useGetProductsByCategoryQuery, useGetProductQuery} = shopApi

