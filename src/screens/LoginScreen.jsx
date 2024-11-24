import { StyleSheet, Text, View, TextInput, Pressable, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../global/colors.js'
import { useState, useEffect } from 'react';
import { setUser } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../services/authService';
import  Icon  from 'react-native-vector-icons/MaterialIcons';
import { clearSessions, insertSession } from '../db/index.js';

const textInputWidth = Dimensions.get('window').width * 0.7

const LoginScreen = ({navigation}) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rememberMe, setRememberMe] = useState(false)

    const dispatch = useDispatch()

    const [triggerLogin, result] = useLoginMutation()

    console.log("\nresult\n", result, "\n\n");
    

    useEffect(()=>{
        if(result.status==="rejected"){
            console.log("Error al iniciar sesión", result)
        }else if(result.status==="fulfilled"){
            console.log("Usuario logueado con éxito")
            //agregamos la info del usuario al estado de usuario global
            dispatch(setUser(result.data))
            // En caso de autenticarse satisfactoriamente y de que "rememberMe" sea true se guarda la info del usuario en SQLite
            if(rememberMe){
              clearSessions().then(() => console.log("\nsesiones eliminadas\n")).catch(error => console.log("\nError al eliminar las sesiones: \n", error))
              insertSession({
                  localId: result.data.localId,
                  email: result.data.email,
                  token: result.data.idToken
                })
                  .then((result) => console.log("Exito al guardar el usuario en la db",result))
                  .catch((error)=>console.log("Error al guardar el usuario en la db",error)
                  )
            }
        }
    },[result, rememberMe])

    const onsubmit = ()=>{
        //console.log(email,password)       
        triggerLogin({email,password})
    }

    return (
        <LinearGradient
            colors={['#400962', '#fcae76']}
            start={{ x: 0, y: 0 }} // esquina superior izquierda
            end={{ x: 1, y: 1 }}   // esquina inferior derecha
            style={styles.gradient}
        >
            <Text style={styles.title}>Mr.White store</Text>
            <Text style={styles.subTitle}>Ingresa</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    onChangeText={(text) => setEmail(text)}
                    placeholderTextColor="#EBEBEB"
                    placeholder="Email"
                    style={styles.textInput}
                />
                <TextInput
                    onChangeText={(text) => setPassword(text)}
                    placeholderTextColor="#EBEBEB"
                    placeholder='Password'
                    style={styles.textInput}
                    secureTextEntry
                />

            </View>

            
            <View style={styles.rememberMeContainer}>
                <Text style={styles.whiteText}>Mantener sesión iniciada</Text>
                {
                    rememberMe
                    ?
                    <Pressable onPress={() => setRememberMe(!rememberMe)}><Icon name="toggle-on" size={48} color={colors.verdeNeon} /></Pressable>
                    :
                    <Pressable onPress={() => setRememberMe(!rememberMe)}><Icon name="toggle-off" size={48} color={colors.grisOscuro} /></Pressable>
                }
            </View>


            <View style={styles.footTextContainer}>
                <Text style={styles.whiteText}>¿No tienes una cuenta?</Text>
                <Pressable onPress={() => navigation.navigate('Signup')}>
                    <Text style={
                        {
                            ...styles.whiteText,
                            ...styles.underLineText
                        }
                    }>
                        Crea una
                    </Text>
                </Pressable>
            </View>

            <Pressable style={styles.btn} onPress={onsubmit}><Text style={styles.btnText}>Iniciar sesión</Text></Pressable>

            <View style={styles.guestOptionContainer}>
                <Text style={styles.whiteText}>¿Solo quieres dar un vistazo?</Text>
                <Pressable onPress={()=>dispatch(setUser({email:"demo@mundogeek.com",token:"demo"}))}>
                  <Text style={{ ...styles.whiteText, ...styles.strongText }}>Ingresa como invitado</Text>
                </Pressable>
            </View>
        </LinearGradient>
    )
}

export default LoginScreen

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
    },
    rememberMeContainer: {
        flexDirection: "row",
        gap: 5,
        justifyContent: "space-around",
        alignItems: "center",
        marginVertical: 8,
      }
})
