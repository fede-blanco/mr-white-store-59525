import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from "@react-navigation/native"
import { StyleSheet } from "react-native"
// Importamos los 2 navigators a los cuales dirigiremos a los usuarios
import TabNavigator from "./TabNavigator.jsx"
import AuthNavigator from "./AuthNavigator.jsx"
import { useEffect, useState } from "react"

// importamos los hooks para obtener la imagen de firebase y para setear el estado
import { useGetProfilePictureQuery } from "../services/userService.js"
import { setProfilePicture, setUser } from "../features/auth/authSlice.js"
import { useDispatch, useSelector } from "react-redux"

//importamos la función que obtiene la sesión almacenada en la base de datos
import { fetchSession } from "../db/index.js"


const MainStack = createNativeStackNavigator()

const MainNavigator = () => {

  // const [user, setUser] = useState("")
  //seteamos que el valor de user sea el email del usuario logueado
  const user = useSelector(state => state.authReducer.value.email)
  console.log("Estado 'user' --> ", user);

  const dispatch = useDispatch()

  //Obtenemos el localId del estado
  const localId = useSelector(state => state.authReducer.value.localId)
  //obtenenos la imagen de firebase utilizando el localId
  const {data:profilePicture,isLoading, error} = useGetProfilePictureQuery(localId)


  useEffect(()=>{
    //En caso de que no haya usuario en nuestro estado global al iniciar
    if(!user){
      //función asíncrona autoejecutable
        (async ()=>{
            try{
                //obtiene los datos de la sesión almacenada en la base de datos
                const session = await fetchSession()
                console.log("Session: ",session)
                //si session, que es un array, tiene length en su interior (osea que tiene algo)
                if(session.length){
                    //console.log("session _array",session)
                    // Damos valor a nuestra variable de estado global de redux con lo que se obtiene de la posición "0" del array "session" que seria ---> [email, localId, token] (osea que quedaría "email" en el 0)
                    dispatch(setUser(session[0]))
                }
            }catch(error){
                console.log("Error al obtener la sesión", error)
            }    
        })()
    }
},[user])




  // Este useeffect se ejecutara cada vez que cambio profile picture
  useEffect(()=>{
    // si hay "profilePicture" devuelta por firebase se setea el estado con esa imagen y sino no
    if(profilePicture){
        dispatch(setProfilePicture(profilePicture.image))
    }
  },[profilePicture])
  

  return (
    // Sacamos el navigationContainer de TabContainer porque ahora sera este el NavigationContainer padre tanto de TabNavigator y todos sus hijos como de AuthNavigator
    <NavigationContainer>
        {
           user ? <TabNavigator /> : <AuthNavigator />
        }
    </NavigationContainer>
  )
}

export default MainNavigator

const styles = StyleSheet.create({})

