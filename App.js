import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CategoriesScreen from './src/screens/CategoriesScreen.jsx';
import Header from './src/components/Header.jsx';
import ProductsScreen from './src/screens/ProductsScreen.jsx';
import ProductScreen from './src/screens/ProductScreen.jsx';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

import ShopNavigator from './src/navigation/ShopNavigator.jsx';
import TabNavigator from './src/navigation/TabNavigator.jsx';
import MainNavigator from './src/navigation/MainNavigator.jsx';


//Importamos los componentes de Redux
import { store } from './src/app/store.js';
import { Provider } from 'react-redux';


//Importamos función de la definición de la base de datos para poder ejecutarla
import { createSessionsTable } from './src/db/index.js';

// LLamo a la función que crea una tabla para las sesiones en caso de que no exista
createSessionsTable()
  // Si se ejecuta exitosamente devuelve result
  .then((result)=>console.log("Tabla creada o inicializada con éxito: ", result))
  // Si no se ejecuta exitosamente devuelve error
  .catch((error)=>console.log("Error al crear la tabla Sessions: ", error))


//Previene que se oculte la splashScreen antes de que se terminen de cargar los recursos (fuentes)
SplashScreen.preventAutoHideAsync();


export default function App() {

  //El hook devuelve un "loaded o un "error"
  const [loaded, error] = useFonts({
    'Montserrat': require('./assets/fonts/Montserrat-Variable.ttf'),
    'PressStart2P': require('./assets/fonts/PressStart2P-Static.ttf')
  });

  // const [category, setCategory] = useState("")
  // const [tag, setTag] = useState("")
  // const [productId, setProductId] = useState(null)

  // console.log("category de App:", category);
  // console.log("tag de App:", tag);
  

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  //En el caso de que no haya ninguno retornamos null (que seria no retornar nada al respecto)
  if (!loaded && !error) {
    return null;
  }


  return (
    <Provider store={store}>
      <MainNavigator />
      {/* <TabNavigator /> */}
      <StatusBar style="light" />
    </Provider>
  );
}

const styles = StyleSheet.create({ });
