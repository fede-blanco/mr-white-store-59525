import { configureStore } from "@reduxjs/toolkit"

// Los nombres con sufijo "reducer" se dan aca porque en el archivo se exporta por default
import shopReducer from "../features/shop/shopSlice.js"
import cartReducer from "../features/cart/cartSlice.js"
import authReducer from "../features/auth/authSlice.js"
import { shopApi } from "../services/shopService.js"
import { receiptApi } from "../services/receiptService.js"
import { authApi } from "../services/authService.js"
import { userApi } from "../services/userService.js"

export const store = configureStore({
  reducer: {
    shopReducer,
    cartReducer,
    authReducer,
    //Agregamos el reducer generado asíncronamente como una slice de top-level utilizando varaibles 
    //obtenidas de "shopApi" para indicar tanto el nombre del reducer como el reducer mismo.
    [shopApi.reducerPath]: shopApi.reducer,
    [receiptApi.reducerPath]: receiptApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  // Agregando este intermediador entre nuestra app y base de datos se habilita caching, invalidation,
  // polling y otras funciones de rtk-query.
  middleware: (getDefaultMiddleware) =>
    // en caso de agregar mas apis se deben concatenar
    getDefaultMiddleware()
      .concat(shopApi.middleware)
      .concat(receiptApi.middleware)
      .concat(authApi.middleware)
      .concat(userApi.middleware),
})
