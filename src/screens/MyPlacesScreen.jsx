import { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, TextInput, Pressable, FlatList } from 'react-native';
// Importo todo (*) de la librería con el nombre "Location" y luego con el puedo acceder a sus métodos
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../global/colors.js';
import Toast from 'react-native-toast-message';
import FlatCard from '../components/FlatCard';
import MapView, {Marker} from 'react-native-maps';


const MyPlacesScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [title, setTitle] = useState("")
  const [places, setPlaces] = useState([])
  // const [places, setPlaces] = useState([{ "id": 1, "title": "Geek Out! Argentina", "coords": {"latitude":-34.555579051686586,"longitude":-58.461540799929494},"address":"Blanco Encalada 2518, C1425 Cdad. Autónoma de Buenos Aires" },{ "id": 2, "title": "Fuera de tiempo", "coords": {"latitude":-34.54776236446238,"longitude":-58.5538693790271},"address":"Blanco Encalada 2518, C1425 Cdad. Autónoma de Buenos Aires" }])
  const [address, setAddress] = useState("")

  // useEffect(() => {

  //   // Función asíncrona autoejecutable que se ejecuta al entrar renderizar la vista
  //   (async () => {

  //     // Obtiene el estado de los permisos de locación adquiridos mediante el hook de la librería Location que pregunta al usuario si permite utilizar la locación del dispositivo
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     // En caso de denegarla devuelve un mensaje de error
  //     if (status !== 'granted') {
  //       setErrorMsg('Permission to access location was denied');
  //       return;
  //     }

  //     // En caso de ser concedida Toma los datos de la locación del dispositivo utilizando un hook de la librería Location y lo almacena en la variable "location"
  //     let location = await Location.getCurrentPositionAsync({});
  //     setLocation(location);

  //   })(); // <-- Se autoejecuta al renderizar

  // }, []);

  // //Setea un texto que utilizará como loader y texto inicial
  // let text = 'Waiting..';
  // //Si hay error le da el valor del texto de error al mensaje
  // if (errorMsg) {
  //   text = errorMsg;
  //   //Si hay location le da el valor obtenido pero pasado  a string (porque devuevle un objeto)
  // } else if (location) {
  //   text = JSON.stringify(location);
  // }

  
  const showToast = (type, message) => {
    //Función que recibe un texto y un tipo y se lo pasa al método "show" de la librería "Toast" para que lo muestre en pantalla.
    Toast.show({
        type: type,
        text1: message,
        visibilityTime: 2000, // Duración en milisegundos
    });
  };


  // Función que obtiene el estado de los permisos y devuevel "true" o "false" dependiendo si se acepta o no
  const getPermissions = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
        return false;
    }
    return true
  }

  const renderPlaceItem = ({ item }) => (
    <FlatCard style={styles.placeContainer}>
        <View style={styles.mapContainer}>
            <MapView
                style={styles.map}
                // se va a utilizar la información que viene dentro de la propiedad "coords" de cada item pasado a la lista
                initialRegion={{
                    latitude: item.coords.latitude,
                    longitude: item.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker coordinate={{ "latitude": item.coords.latitude, "longitude": item.coords.longitude }} title={"Lugar Geek"} />
            </MapView>
        </View>
        <View style={styles.placeDescriptionContainer}>
            <Text style={styles.mapTitle}>{item.title}</Text>
            <Text style={styles.address}>{item.address}</Text>
        </View>
    </FlatCard>
  )
  
  //Función asíncrona que obtiene la locación del dispositivo
  const getLocation = async () => {
    //Utiliza la función getPermissions() para ver si se tienen los permisos necesarios
    const permissionOk = await getPermissions()
    if (!permissionOk) {
      // En caso de no tener permisos setea un mensaje de error
        setErrorMsg('Permission to access location was denied');
    } else {
      // En caso de tener los permisos intenta obtener la posición actual del dispositivo con ayuda del hook de "Location" "getCurrentPositionAsync"
      // lo albergamos en una variable "locationLocal" local
        let locationLocal = await Location.getCurrentPositionAsync({});
        //si hay locationLocal seguimos este camino
        if (locationLocal) {
          console.log(locationLocal); // formato de rta --> {"coords": {"accuracy": 600, "altitude": 0, "altitudeAccuracy": 0, "heading": 0, "latitude": 37.4220936, "longitude": -122.083922, "speed": 0}, "mocked": false, "timestamp": 1730914892759}

            // Hacemos fetch hacia la API de google maps platform y recibimos una respuesta
            // como "key" debo pasarle mi API key desde donde sea que la tenga guardada
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${locationLocal.coords.latitude},${locationLocal.coords.longitude}&key=${process.env.EXPO_PUBLIC_GEOCODING_API_KEY}`
            );
            // parseamos la respuesta a json y lo guardamos en data
            const data = await response.json()
            console.log("data", data)
            //si el status de "data" es OK
            if (data.status === 'OK') {
                // de todo lo que trae data en su propiedad "results" en su primera posición (porque contiene un array) solo indicamos lo que haya en la propiedad "formatted_adress"
                const formattedAddress = data.results[0].formatted_address;
                // seteamos nuestra variable de estado Adress con lo que sacamos de data
                setAddress(formattedAddress)
            } else {
                // mostramos un mensaje de error de geocodificación inversa
                console.log('Error en geocodificación inversa:', data.error_message)
            }
            // mostramos notificación de que se obtubo la ubicación
            showToast("success", "¡Ubicación obtenida!")

        } else {
            setErrorMsg('Error getting location');
            showToast("error", "No se pudo obtener la ubicación")
        }
        console.log(locationLocal.coords) // Formato de rta --> {"accuracy": 600, "altitude": 0, "altitudeAccuracy": 0, "heading": 0, "latitude": 37.4220936, "longitude": -122.083922, "speed": 0}  
        setLocation(locationLocal.coords);
    }
  }



  const savePlace = () => {
    if(location && title){
        //En caso de que haya location y title en el momento de ejecutarse setea el estado a su valor anterior spredeado y le suma on objeto con las propiedades necesarias 
        setPlaces(prevState => [...prevState, { "id": Math.random(), title, "coords": { "latitude": location.latitude, "longitude": location.longitude },"address": address }])
        // Luego de setear la variable places resetea las variables "Title" y "Location"
        setTitle("")
        setLocation("")
    }else{
        // En caso de que no haya alguno de los 2 datos devuelve una notificación
        showToast("error", "No se completaron todos los datos")
    }
  }



  return (
    <View style={styles.container}>
    <Text style={styles.title}>Mis lugares:</Text>
    {/* Input */}
    <View style={styles.inputContainer}>
        <TextInput style={styles.textInput} placeholder="Ingresa un título" onChangeText={(text) => setTitle(text)} value={title} />
        <Pressable onPress={getLocation}><Icon name="location-on" color={colors.naranjaBrillante} size={24} /></Pressable>
        <Pressable onPress={savePlace}><Icon name="add-circle" color={colors.verde} size={32} /></Pressable>
    </View>
    <Text style={styles.subtitle}>Tus lugares favoritos:</Text>
    {/* Lista con los lugares favoritos en tarjetas */}
    <>
    {places.length > 0
    ?
  <FlatList
        data={places}
        keyExtractor={item => item.id}
        renderItem={renderPlaceItem}
    />
    :
    <View style={styles.favoritosEmpty}><Text style={styles.favoritosEmptyText} >Aún no hay lugares favoritos!</Text></View>
  }
    </>
    <Toast />
      {/* <Text style={styles.paragraph}>{text}</Text> */}
    </View>
  );
}

export default MyPlacesScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 18,
  },
  subtitle: {
    fontSize: 16,
    color: colors.grisOscuro
  },
  inputContainer: {
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.grisMedio,
    borderRadius: 20,
    padding: 8,
    width: '80%',
    paddingLeft: 16,
  },
  placesContainer: {
    marginTop: 16
  },
  placeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 16,
    margin: 4,
    marginBottom: 12,
    gap: 24
  },
  mapContainer: {
    width: 120,
    height: 120,
    borderRadius: 75,
    overflow: "hidden",
    elevation: 5,
  },
  map: {
    width: 120,
    height: 120,
  },
  mapTitle: {
    fontWeight: '700'
  },
  address: {

  },
  placeDescriptionContainer: {
    width: '60%',
    padding: 8
  },
  favoritosEmpty:{
      flex:1,
      justifyContent:'center',
      alignItems: 'center'
  },
  favoritosEmptyText:{
      fontSize: 16
  },
});

