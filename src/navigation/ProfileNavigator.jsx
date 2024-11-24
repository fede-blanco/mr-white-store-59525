import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { ProfileScreen } from "../screens/index.js"
import Header from "../components/Header.jsx"

const ProfileStack = createNativeStackNavigator()

const ProfileNavigator = () => (
  <ProfileStack.Navigator
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
    <ProfileStack.Screen name="Perfil" component={ProfileScreen} />
  </ProfileStack.Navigator>
)


export default ProfileNavigator


