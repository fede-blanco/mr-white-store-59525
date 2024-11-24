import { StyleSheet, Text, View, Pressable,Image } from 'react-native'
import { colors } from '../global/colors'
import CameraIcon from '../components/CameraIcon'
import { useSelector, useDispatch } from 'react-redux'
import * as ImagePicker from 'expo-image-picker';
import { setProfilePicture } from '../features/auth/authSlice'
import { usePutProfilePictureMutation } from '../services/userService';

const ProfileScreen = () => {
    
    // Busco todas las variables de estado globales necesarias
    const user = useSelector(state=>state.authReducer.value.email)
    const image = useSelector(state=>state.authReducer.value.profilePicture) // Para luego mostrar dicha imagen
    const localId = useSelector(state=>state.authReducer.value.localId)
    // Inicializo dispatch para poder modificar las variables mediante los métodos
    const dispatch = useDispatch()

    // Se utiliza el hook para tener acceso a al método triggerPutProfilePicture
    const [triggerPutProfilePicture,result] = usePutProfilePictureMutation()

    // Es una función asíncrona que te pedirá por medio de la librería el acceso a la cámara del dispositivo
    const verifyCameraPermissions = async () => {
        const {granted} = await ImagePicker.requestCameraPermissionsAsync()
        if(!granted) return false
        return true
    }

    // Función asíncrona que verifica si se tiene acceso a la cámara y setea una imagen obtenida como formato Base64 en
    // la variable de estado de "profilePicture" de "authSlice"
    const pickImage = async () => {
        // Se crea una variable que determinará si se tienen los permisos para ingresar a la camara.
        const permissionOk = await verifyCameraPermissions()
        if(permissionOk){
            console.log("Permisos concedidos")
            //en caso de tener permisos seleccionamos ina imagen en codigo base64
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [1,1],
                base64: true,
                quality: 0.7
            })
            // result.canceled sería true en caso de que se cierre la camera en vez de tomar una foto y aceptar
            if(!result.canceled){
                // Se setea en el estado
                dispatch(setProfilePicture(`data:image/jpeg;base64,${result.assets[0].base64}`))
                // Se guarda en firebase
                triggerPutProfilePicture({image: `data:image/jpeg;base64,${result.assets[0].base64}`,localId})                
            }
        }else{
            console.log("Permisos denegados")
        }
    }
    
    return (
        <View style={styles.profileContainer}>
            <View style={styles.imageProfileContainer}>
                {
                    image
                        ?
                        <Image source={{ uri: image }} resizeMode='cover' style={styles.profileImage} />
                        :
                        //En caso de que no haya imagen se pone la primera letra del nombre
                        <Text style={styles.textProfilePlaceHolder}>{user.charAt(0).toUpperCase()}</Text>
                }
                {/* Icono que ejecuta la función de elegir una nueva imagen */}
                <Pressable onPress={pickImage} style={({ pressed }) => [{ opacity: pressed ? 0.90 : 1 }, styles.cameraIcon]} >
                    <CameraIcon />
                </Pressable>
            </View>
            <Text style={styles.profileData}>Email: {user}</Text>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    profileContainer: {
        padding: 32,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageProfileContainer: {
        width: 128,
        height: 128,
        borderRadius: 128,
        backgroundColor: colors.morado,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textProfilePlaceHolder: {
        color: colors.blanco,
        fontSize: 48,
    },
    profileData: {
        paddingVertical: 16,
        fontSize: 16
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    profileImage: {
        width: 128,
        height: 128,
        borderRadius: 128
    }
})
