import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native"
import products from "../data/products.json"
import FlatCard from "../components/FlatCard.jsx"
import { colors } from "../global/colors.js"
import MontserratText from "../components/MontserratText.jsx"
import { useEffect, useState } from "react"
import Icon from "react-native-vector-icons/MaterialIcons"
import Search from "../components/Search.jsx"

import { useSelector, useDispatch } from "react-redux"
import { setProductSelectedId } from "../features/shop/shopSlice.js"

import { useGetProductsByCategoryQuery } from "../services/shopService.js"


const ProductsScreen = ({ navigation, route }) => {
  // const [productsTagFiltered, setProductsTagFiltered ] = useState([])
  const [productsFiltered, setProductsFiltered] = useState([])
  const [search, setSearch] = useState("")
  // const [widthState, setWidthState] = useState("")
  
  //creamos la variable "dispatch" de la cual luego utilizaremos todos los métodos que contiene
  const dispatch = useDispatch()
  
  
  const {width, height} = useWindowDimensions()
  // useEffect(() => {
  //   setWidthState(width)

  // }, [])



  // console.log("route", route);

  const categorySelected = useSelector(
    (state) => state.shopReducer.value.categorySelected
  )
  // const productsFilteredByCategory = useSelector(state => state.shopReducer.value.productsFilteredByCategory)

  // traemos la información utilizando el hook de RTK Query que devuelve 3 elementos.
  // la información almacenada en la base de datos devuelta por la petición se aloja en "data" la cual podemos renombrar para que se plique a todas las existencias de "productsFilteredByCategory" ya utilizadas.
  const {
    data: productsFilteredByCategory,
    error,
    isLoading,
  } = useGetProductsByCategoryQuery(categorySelected.toLowerCase())

  // console.log("categorySelected:", categorySelected)
  // console.log("productsFilteredByCategory:", productsFilteredByCategory)

  useEffect(() => {
    setProductsFiltered(productsFilteredByCategory)
    if (search) {
      setProductsFiltered(
        productsFilteredByCategory.filter((product) =>
          product.title.toLowerCase().includes(search.toLowerCase())
        )
      )
    }
    // Agregamos @productsFilteredByCategory@ al array de dependencias para que se vuelva a renderizar al conseguir los datos
  }, [search, productsFilteredByCategory])

  // useEffect(() => {
  //   console.log("tag: ",tag);
  //     // console.log("productsTagFiltered:");
  // // productsTagFiltered.forEach(product => {
  // //   console.log(`${product.title}:  ${product.tags}`);
  // // });

  //   const tagFilteredProducts = []

  //   products.forEach(product => {
  //     if(product.tags.includes(tag)){
  //       tagFilteredProducts.push(product)
  //     }
  //   })
  //   setProductsTagFiltered(tagFilteredProducts)

  // },[tag,setTag])

  const renderProductItem = ({ item }) => {
    return (
      <FlatCard style={styles.productContainer} id={item.id}>
        <View>
          <Image
            source={{ uri: item.mainImage }}
            style={styles.productImage}
            resizeMode="contain"
          />
        </View>
        <View>
          <MontserratText style={styles.productTitle(width)}>
            {item.title}
          </MontserratText>
          <Text style={styles.shortDescriptionStyles(width)}>
            {item.shortDescription}
          </Text>
          <FlatList
            data={item.tags}
            keyExtractor={() => Math.random()}
            renderItem={({ item }) => (
              <Text style={styles.tagBadge}>{item}</Text>
            )}
            style={styles.tagFlatListStyles}
          />
          {item.discount > 0 && (
            <Text style={styles.discountText}>Descuento: ${item.discount}</Text>
          )}
          {item.stock <= 0 && <Text style={{ color: "red" }}>Sin stock</Text>}
          <Text style={styles.priceText}>${item.price}</Text>
          <View style={styles.verMasBtnStyles}>
            <Pressable
              style={styles.verMasPressableStyles}
              onPress={() => {
                dispatch(setProductSelectedId(item.id))
                navigation.navigate("Detalle de producto", {
                  productId: item.id,
                  category: item.category,
                })
              }}
            >
              <Text style={styles.verMasStyles}>Ver mas...</Text>
            </Pressable>
          </View>
        </View>
      </FlatCard>
    )
  }

  return (
    <>
      {
      isLoading ? (

        <ActivityIndicator size="large" color={colors.verdeNeon} />

      ) : error ? (

        <Text>Error al cargar las categorías</Text>

      ) : (

        <>
          <Pressable
            onPress={() => {
              // setCategory("")
              // setTag("")
              navigation.goBack()
            }}
            style={{ width: "30%" }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 10,
                width: "auto",
              }}
            >
              <Icon name="arrow-back-ios" size={24} style={styles.goBack} />
              <Text style={{ fontSize: 24, color: colors.grisOscuro }}>
                Atrás
              </Text>
            </View>
          </Pressable>

          <Search setSearch={setSearch} />

          {/* {
        tag !== ""
        ?
      <FlatList
      data={productsTagFiltered}
      keyExtractor={(item) => item.id}
      renderItem={renderProductItem}
      style={styles.mainFlatListStyles}
      />
        : */}
          <FlatList
            data={productsFiltered}
            keyExtractor={(item) => item.id}
            renderItem={renderProductItem}
            style={styles.mainFlatListStyles}
          />
          {/* } */}
        </>
      
      )}
    </>
  )
}

export default ProductsScreen

const styles = StyleSheet.create({
  productContainer: {
    flexDirection: "row",
    padding: 20,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 20,
  },
  productImage: {
    width: 100,
    height: 100,
  },
  productTitle: (width) => ({
    fontFamily: "Montserrat",
    width: width * 0.6,
    fontWeight: "bold",
    fontSize: 18,
  }),
  mainFlatListStyles: {
    // marginTop: 10,
    paddingTop: 11,
  },
  tagBadge: {
    fontWeight: "bold",
    fontSize: 12,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: colors.dorado,
  },
  tagFlatListStyles: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 10,
  },
  shortDescriptionStyles: (width) => ({
    width: width * 0.6,
  }),
  discountText: {
    backgroundColor: colors.verde,
    paddingHorizontal: 8,
    paddingVertical: 5,
    alignSelf: "flex-start",
    borderRadius: 10,
    fontWeight: "500",
  },
  priceText: {
    fontFamily: "Montserrat",
    fontWeight: "800",
    fontSize: 20,
    marginVertical: 5,
    color: colors.negro,
  },
  goBack: {
    paddingLeft: 10,
    color: colors.grisOscuro,
  },
  verMasStyles: {
    color: "#fff",
    fontWeight: "500",
  },
  verMasBtnStyles: {
    width: 230,
    marginTop: -35,
  },
  verMasPressableStyles: {
    alignSelf: "flex-end",
    backgroundColor: colors.naranjaBrillante,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
})
