import { createSlice } from "@reduxjs/toolkit";
import { calculate_total_price } from "../../utils/functions.js";

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    value: {
      cartItems: [],
      user: "demo",
      total: 0,
      cartLenght: 0, // Para verificar si el carritoe stá vacío
      updateAt: Date.now().toLocaleString() //unix Timestamp
    }
  },
  reducers: {
    addItem:(state,action) => {
      //verificamos si el producto seleccionado (pasado por el action.payload) es igual a alguno de los productos que ya estén en el carrito comparando sus "id".
      // Si lo encuentra lo guarda en la variable y sino devuelve null/undefined 
      const productInCart = state.value.cartItems.find(item=>item.id===action.payload.id)
      
      if(!productInCart){
          //si el producto no estaba en el carrito lo agrega en el mismo
          state.value.cartItems.push(action.payload) //action.payload es el producto
      }else{
          // si el producto ya estaba en el carrito hace un map de los items que haya en el y cuando encuentre el que es de igual "id" modifica su propiedad quantity y devuelve el item y sino simplemente devuelve el item
          state.value.cartItems.map(item=>{
              if(item.id===action.payload.id){
                  item.quantity += 1
                  return item
              }
              return item
          })
      }

      //calculo el total con la función importada de utils que suma los precios de todos los elementos del carrito
      const total = calculate_total_price(state.value.cartItems)

      //tomo el state.value actual y le modifico las propiedades total y updateAt por el horario actual
      state.value = {
          ...state.value,
          total, 
          updatedAt: new Date().toLocaleString()
      }
      // sumo 1 al numero de elementos del carrito al agregra un producto
      state.value.cartLenght += 1
    },
    removeItem:(state,action) => {
      state.value.cartItems = state.value.cartItems.filter(item=item.id!==action.payload)
      state.value.total = calculate_total_price(state.value.cartItems)
      state.value.cartLenght -= 1
    },
    clearCart: (state) => {
      state.value.cartItems=[]
      state.value.total=null
      state.value.cartLenght = 0
    }
  }
})

export const {addItem, removeItem, clearCart} = cartSlice.actions

//exporto por default la función "reducer" de la slice creada
export default cartSlice.reducer


