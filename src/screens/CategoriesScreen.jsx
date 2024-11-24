import { StyleSheet, Text, FlatList,Image, Pressable, useWindowDimensions, ActivityIndicator } from 'react-native'
//import categories from "../data/categories.json" //Importado directamente del .json
import { useDispatch } from 'react-redux' // Importamos métodos para acceder al estado de redux y para modificarlo
//importo setCategory que es un método reducer para modificar la propiedad "category" del estado
import { setCategory } from '../features/shop/shopSlice.js'
import FlatCard from '../components/FlatCard'
import { colors } from '../global/colors.js'
import { useEffect, useState } from 'react'

//Importamos el hook personalizado de RTK Query
import { useGetCategoriesQuery } from '../services/shopService.js'

const CategoriesScreen = ({navigation}) => {
  // Traemos la información utilizando el hook de RTK Query que devuelve 3 elementos.
  // La información almacenada en la base de datos devuelta por la petición se aloja en "data" la cual podemos renombrar
  // para que se plique a todas las existencias de "categories" ya utilizadas.
  const { data: categories, error, isLoading } = useGetCategoriesQuery()
  
  //creamos la variable "dispatch" de la cual luego utilizaremos todos los métodos que contiene
  const dispatch = useDispatch()

  //Se obtienen el alto y ancho de pantalla con un hook nativo de "react-native"
  const {width, height} = useWindowDimensions()
  //Variable de estado que indica si se esta en modo horizontal o vertical
  const [isPortrait, setIsPortrait] = useState(true)
  
  useEffect(() => {
    if(width > height){
      setIsPortrait(false)
    } else {
      setIsPortrait(true)
    }
  }, [width, height])
  
  
    const renderCategoryItem = ({item,index}) =>{
        return(
          // En este caso el titulo de estos items son los nombres de las categorias
          // A la funcion "navigation.navigate" se le pasa como primer parámetro la ruta a la que se quiere que navege
          // de las definidas en "ShopNavigator.jsx" (y luego de eso se le podría pasar un objeto con props)
          <Pressable onPress={
            ()=>{
              //lo que se mande como parámetro en el setCategory será el "action.payload" que recibe el reducer para trabajar
              dispatch(setCategory(item.title))
              //en el navigation ya no seríaimprescindible pasar el parámetro del objeto con opciones dado que podríamos
              // tomar ese mismo date del estado en donde lo necesitemos
              navigation.navigate('Productos')
          }
          }>
            <FlatCard style={
              //Uso de operador ternario condicion?si verdadero:si falso
              index%2==0
              ?
              {...styles.categoryItemContainer, ... styles.row}
              :
              {...styles.categoryItemContainer, ... styles.rowReverse}
            }> 
                <Image
                    source={{uri:item.image}}
                    style={styles.image}
                    resizeMode='contain'
                    />
                <Text style={styles.categoryTitle}>{item.title}</Text>
            </FlatCard>
        </Pressable>
        )
    }

    return (
      <>
      {
        isLoading
        ?
        <ActivityIndicator size="large" color={colors.verdeNeon}/>
        :
        error
        ?
        <Text>Error al cargar las categorías</Text>
        :
        <FlatList
        data={categories}
        keyExtractor={item=>item.id}
        renderItem={renderCategoryItem}
        style={styles.flatListStyles}
        />
      }
      </>
    )
}

export default CategoriesScreen

const styles = StyleSheet.create({
    categoryItemContainer: {
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 10,
        marginVertical: 5,
        padding: 30,
      },
      categoryTitle: {
        fontSize: 24,
        fontWeight: "bold",
      },
    image:{
        width:150,
        height:80
    },
    row:{
        flexDirection: 'row'
    },
    rowReverse:{
        flexDirection:'row-reverse'
    },
    flatListStyles:{ 
      marginTop: 10,
    }
})