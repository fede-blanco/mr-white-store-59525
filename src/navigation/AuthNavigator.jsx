import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from "react-native"
// Importo las screens desde el índice de screens que creamos en la carpeta "screens"
import { LoginScreen, SignupScreen } from '../screens/index.js'

//Creo el stack de vistas de autenticación
const AuthStack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{headerShown:false}}>
        <AuthStack.Screen name="Login" component={LoginScreen} />
        <AuthStack.Screen name="Signup" component={SignupScreen} />
    </AuthStack.Navigator>
  )
}

export default AuthNavigator

const styles = StyleSheet.create({})

