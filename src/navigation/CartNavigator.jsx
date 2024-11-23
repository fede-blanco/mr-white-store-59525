import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { CartScreen } from "../screens/index.js"
import Header from "../components/Header.jsx"


const CartStack = createNativeStackNavigator()

const CartNavigator = () => {
  return (
    <CartStack.Navigator 
    screenOptions={{
      
      // headerShown: false,
      
      header: ({route}) => <Header route={route.name} category={route.params?.category || ""} tag={""} /> ,
    }}>
      <CartStack.Screen component={CartScreen} name="carrito" />
    </CartStack.Navigator>
  )
}

export default CartNavigator