import { createSlice } from "@reduxjs/toolkit";

// Creo y exporto la slice con la función "createSlice" importada de redux/toolkit y le doy los valores iniciales del estado
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    value: {
      email: null,
      token: null,
      localId: "",
      profilePicture: "" //Es string porque se guardará en formato Base64
    }
  },
  reducers: {
    setUser: (state,action) => {
      // seteamos los valores con lo que viene en action.payload (que es la respuesta de auth)
      state.value.email = action.payload.email
      state.value.token = action.payload.idToken
      state.value.localId = action.payload.localId
    },
    clearUser: (state,action) => {
      state.value.email = null
      state.value.token = null
      state.value.localId = null
      state.value.profilePicture = null
    },
    setProfilePicture: (state,action) => {
        state.value.profilePicture = action.payload
    } 
  }
})

export const {setUser, clearUser, setProfilePicture} = authSlice.actions


//exporto por default la función "reducer" de la slice creada
export default authSlice.reducer




