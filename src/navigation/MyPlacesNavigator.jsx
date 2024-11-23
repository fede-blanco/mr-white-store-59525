import { createNativeStackNavigator } from "@react-navigation/native-stack"
import MyPlacesScreen from "../screens/MyPlacesScreen.jsx"
import Header from "../components/Header.jsx"

const MyPlacesStack = createNativeStackNavigator()

const MyPlacesNavigator = () => (
  <MyPlacesStack.Navigator
    screenOptions={{
      header: ({ route }) => (
        <Header
          route={route.name}
          category={route.params?.category || ""}
          tag={""}
        />
      ),
    }}
  >
    <MyPlacesStack.Screen name="Mis lugares" component={MyPlacesScreen} />
  </MyPlacesStack.Navigator>
)


export default MyPlacesNavigator


