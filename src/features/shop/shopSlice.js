import { createSlice } from "@reduxjs/toolkit";
import categories from '../../data/categories.json'
import products from '../../data/products.json'

// Creo y exporto la slice con la función "createSlice" importada de redux/toolkit y le doy los valores iniciales del estado
export const shopSlice = createSlice({
  name: 'shop',
  initialState: {
    value: {
      categorySelected: "",
      productSelectedId: null,
    }
  },
  reducers: {
      // setCategory es una función que recibe el estado actual y una "action" que utilizará para modificar el estado
      setCategory: (state, action) => {
        // Cuando se ejecute le dará como valor a "state.value.categorySelected" lo que venga en el payload del "action"
        state.value.categorySelected = action.payload
      },
      setProductSelectedId: (state,action) => {
        // Cuando se ejecute le dará como valor a "state.value.productSelectedId" lo que venga en el payload del "action"
        state.value.productSelectedId = action.payload
      }
  }
})

export const {setCategory, setProductSelectedId} = shopSlice.actions

// Exporto por default la función "reducer" de la slice creada
export default shopSlice.reducer




