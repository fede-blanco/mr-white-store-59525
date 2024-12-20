import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CategoriesScreen, ProductsScreen, ProductScreen } from '../screens/index.js'
import Header from '../components/Header.jsx';

const ShopStack = createNativeStackNavigator();

const ShopNavigator = () => {
  return (
      <ShopStack.Navigator
      screenOptions={{
        header: ({route}) => <Header route={route.name} category={route.params?.category || ""} tag={""} />,
    }}
      >
          <ShopStack.Screen name="Categorías" 
          options={{title:"Categorías"}}
          component={CategoriesScreen} />
          <ShopStack.Screen name="Productos" component={ProductsScreen} />
          <ShopStack.Screen name="Detalle de producto" component={ProductScreen} />
      </ShopStack.Navigator>
  )
}

export default ShopNavigator


