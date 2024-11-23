import { NavigationContainer } from "@react-navigation/native"
import ShopNavigator from "./ShopNavigator.jsx"
import CartNavigator from "./CartNavigator.jsx"
import ReceiptsNavigator from "./ReceiptsNavigator.jsx"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { StyleSheet } from "react-native"
import { colors } from "../global/colors.js"
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from "../components/Header.jsx"
import ProfileNavigator from "./ProfileNavigator.jsx"
import MyPlacesNavigator from "./MyPlacesNavigator.jsx"

// Este en vez de ser un "nativeStackNavigator" es un "BottomTabNavigator"
const Tab = createBottomTabNavigator()

export default function TabNavigator() {
  return (
    // <NavigationContainer>
      <Tab.Navigator
        initialRouteName="tab-shop"
        screenOptions={{
          headerShown: false,
          // header: ({route}) => <Header route={route.name} category={route.params?.category || ""} tag={""} /> ,
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
        }}
      >
        <Tab.Screen
          name="tab-shop"
          options={{ title: "Shop",
            tabBarIcon: ({focused}) => (<Icon name="storefront" size={32} color={focused?colors.grisOscuro:colors.grisMedio}  />)
           }}
          component={ShopNavigator}
        />
        <Tab.Screen
          name="tab-carrito"
          options={{ title: "Carrito",
            tabBarIcon: ({focused}) => (<Icon name="shopping-cart" size={32} color={focused?colors.grisOscuro:colors.grisMedio}  />)
            }}
          component={CartNavigator}
        />
        <Tab.Screen
          name="tab-recibos"
          options={{ title: "Recibos",
            tabBarIcon: ({focused}) => (<Icon name="receipt-long" size={32} color={focused?colors.grisOscuro:colors.grisMedio}  />)
            }}
          component={ReceiptsNavigator}
        />
        <Tab.Screen
          name="tab-perfil"
          options={{ title: "Perfil",
            tabBarIcon: ({focused}) => (<Icon name="account-circle" size={32} color={focused?colors.grisOscuro:colors.grisMedio}  />)
            }}
          component={ProfileNavigator}
        />
        <Tab.Screen
          name="tab-my-places"
          options={{ title: "Mis lugares",
            tabBarIcon: ({focused}) => (<Icon name="location-on" size={32} color={focused?colors.grisOscuro:colors.grisMedio}  />)
            }}
          component={MyPlacesNavigator}
        />
      </Tab.Navigator>
    // </NavigationContainer>
  )
}


const styles = StyleSheet.create({
  tabBar: {
    height: 64,
    backgroundColor: colors.grisClaro,
    // -- Estilos para hacer boton flotante --
    // position: 'absolute',
    // bottom:25,
    // left: 20,
    // right: 20,
    // borderRadius: 10,
    // elevation: 4,
  }
})