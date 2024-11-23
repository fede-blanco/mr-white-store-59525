import { Pressable, StyleSheet, Text, View } from 'react-native'
import { colors } from '../global/colors.js'
import MontserratText from './MontserratText.jsx'

//Importo todo lo necesario para el boton de cerrar sesion
import  Icon  from 'react-native-vector-icons/MaterialIcons'
import { useSelector, useDispatch } from 'react-redux'
import { clearUser } from '../features/auth/authSlice' // Reseteamos el usuario del estado global
import { clearSessions } from '../db' // Borramos el usuario de la base de datos

export default function Header({route, tag, category}) {
  console.log("category 1", category || "");

  const user = useSelector(state => state.authReducer.value.email)
  const dispatch = useDispatch()

  // Función de logout personalizada que vacia el estado global del usuario y también lo elimina de la tabla sessions de la base de datos SQLite
  const onLogout = ()=>{
    dispatch(clearUser()) // Resetea propiedades del estado global de Redux
    clearSessions() // Elimina el registro de la sesión de la base de datos
      .then(()=>console.log("Sesión eliminada"))
      .catch((error)=>console.log("Error al eliminar la sesión"))
  }
  
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>Mundo Geek FB</Text>
      <MontserratText style={styles.subtitle}>Conseguí todo lo que necesitás</MontserratText>
      {
        route && tag === "" && category === ""
        ?
        <MontserratText style={styles.routeTitle}>{route.charAt(0).toUpperCase() + route.slice(1)}</MontserratText>
        :
        route && tag === "" && category !== ""
        ?
        <MontserratText style={styles.routeTitle}>{category.charAt(0).toUpperCase() + category.slice(1)}</MontserratText>
        :
        route && tag !== ""
        ?
        <MontserratText style={styles.routeTitle}>{tag.charAt(0).toUpperCase() + tag.slice(1)}</MontserratText>
        :
        null
      }
      {
        user &&  <Pressable onPress={onLogout} style={styles.access}><Icon name="logout" size={24} color="#fff" /></Pressable>
      }

    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 150,
    justifyContent: "center",
    alignItems: "center" ,
    backgroundColor: colors.grisOscuro
  },
  title: {
    fontSize: 24,
    //fontWeight: "bold",
    color: colors.amarillo,
    fontFamily: 'PressStart2P'
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.verdeNeon
  },
  routeTitle: {
    position:"absolute",
    bottom: 0,
    marginBottom: 10,
    fontSize: 24,
    fontWeight: "bold",
    color: colors.blanco
  },
  access:{
    position:"absolute",
    bottom: 0,
    marginBottom: 10,
    right: 0,
    marginRight: 10,
  } 
})