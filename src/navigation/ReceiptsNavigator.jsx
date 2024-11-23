import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { ReceiptsScreen } from "../screens/index.js"
import Header from "../components/Header.jsx"


const ReceiptStack = createNativeStackNavigator()

const ReceiptsNavigator = () => {
  return (
    <ReceiptStack.Navigator 
    screenOptions={{
      
      // headerShown: false,
      
      header: ({route}) => <Header route={route.name} category={route.params?.category || ""} tag={""} /> ,
    }}>
      <ReceiptStack.Screen component={ReceiptsScreen} name="recibos" />
    </ReceiptStack.Navigator>
  )
}

export default ReceiptsNavigator