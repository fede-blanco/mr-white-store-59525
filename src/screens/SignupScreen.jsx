import { StyleSheet, Text, View, TextInput, Pressable, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../global/colors';
import { useState, useEffect } from 'react';
import { useSignupMutation } from '../services/authService.js';
import { setUser } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux';


// Dimensions permite obtener las dimensaiones de la ventana y utilizarlas fuera del componente (como enlos estilos por ejemplo)
// https://reactnative.dev/docs/dimensions
const textInputWidth = Dimensions.get('window').width * 0.7

const SignupScreen = ({navigation}) => {

  //Agrego variables de estado para ir recuperando lo ingresado por el usuario
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    console.log("email state --->\n", email);
    console.log("password state --->\n", password);
    


    // funciones y variables que se desprenden del hook creado para registrarse de rtk query. Triggersignup ejecuta la función y result obtiene un objeto con propiedades e info sobre elk resultado de la misma
    const [triggerSignup, result] = useSignupMutation()
    console.log("\nResult:\n---\n", result, "\n---\n");
    

    const dispatch = useDispatch()

    useEffect(()=>{
        if(result.status==="rejected"){// en caso de que el result.status sea rejected
          console.log("Error al agregar el usuario", result)
          console.log("Error al agregar el usuario", result.error.data.error)
        }else if(result.status==="fulfilled"){ // en caso de que el result.status sea fulfilled
            console.log("Usuario agregado con éxito")
            dispatch(setUser(result.data))
        }
    },[result])

    // Función que se ejecuta al hacer submit en el botón
    const onsubmit = ()=>{
        // enviamos un mensaje por consola con la información del formulario
        console.log("email\n",email,"password\n",password,"confirmPassword\n",confirmPassword)
        // se ejecuta la funcion triggersignup del hook con un objeto con propiedades "email" y "password" como parámetro
        triggerSignup({email,password})
    }

    return (
        <LinearGradient
            colors={['#400962', '#fcae76']}
            start={{ x: 0, y: 0 }} // esquina superior izquierda
            end={{ x: 1, y: 1 }}   // esquina inferior derecha
            style={styles.gradient}
        >
            <Text style={styles.title}>Mundo Geek</Text>
            <Text style={styles.subTitle}>Registrate</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    onChangeText={(text) => setEmail(text)} //Setea el estado
                    placeholderTextColor="#EBEBEB"
                    placeholder="Email"
                    style={styles.textInput}
                />
                <TextInput
                    onChangeText={(text) => setPassword(text)} //Setea el estado
                    placeholderTextColor="#EBEBEB"
                    placeholder='Password'
                    style={styles.textInput}
                    // Cuando se establece secureTextEntry en true, el texto ingresado en el campo se muestra como una serie de puntos (****) en lugar del texto real.
                    secureTextEntry
                />
                {/* <TextInput
                    onChangeText={(text) => setConfirmPassword(text)} //Setea el estado
                    placeholderTextColor="#EBEBEB"
                    placeholder='Repetir password'
                    style={styles.textInput}
                    secureTextEntry
                /> */}
            </View>
            <View style={styles.footTextContainer}>
                <Text style={styles.whiteText}>¿Ya tienes una cuenta?</Text>
                <Pressable onPress={() => navigation.navigate('Login')}>
                    <Text style={
                        {
                            ...styles.whiteText,
                            ...styles.underLineText
                        }
                    }>
                        Iniciar sesión
                    </Text>
                </Pressable>
            </View>

            <Pressable style={styles.btn} onPress={onsubmit}><Text style={styles.btnText}>Crear cuenta</Text></Pressable>

            <View style={styles.guestOptionContainer}>
                <Text style={styles.whiteText}>¿Solo quieres dar un vistazo?</Text>
                <Pressable><Text style={{ ...styles.whiteText, ...styles.strongText }}>Ingresa como invitado</Text></Pressable>
            </View>
        </LinearGradient>
    )
}

export default SignupScreen

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: colors.verdeNeon,
        fontFamily: "PressStart2P",
        fontSize: 24
    },
    subTitle: {
        fontFamily: "Montserrat",
        fontSize: 18,
        color: colors.amarillo,
        fontWeight: '700',
        letterSpacing: 3
    },
    inputContainer: {
        gap: 16,
        margin: 16,
        marginTop: 48,
        alignItems: 'center',

    },
    textInput: {
        padding: 8,
        paddingLeft: 16,
        borderRadius: 16,
        backgroundColor: colors.grisOscuro,
        width: textInputWidth,
        color: colors.blanco,
    },
    footTextContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    whiteText: {
        color: colors.blanco
    },
    underLineText: {
        textDecorationLine: 'underline',
    },
    strongText: {
        fontWeight: '900',
        fontSize: 16
    },
    btn: {
        padding: 16,
        paddingHorizontal: 32,
        backgroundColor: colors.morado,
        borderRadius: 16,
        marginTop: 32
    },
    btnText: {
        color: colors.blanco,
        fontSize: 16,
        fontWeight: '700'
    },
    guestOptionContainer: {
        alignItems: 'center',
        marginTop: 64
    }
})


// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const SignupScreen = () => {
//   return (
//     <View>
//       <Text>SignupScreen</Text>
//     </View>
//   )
// }

// export default SignupScreen

// const styles = StyleSheet.create({})


