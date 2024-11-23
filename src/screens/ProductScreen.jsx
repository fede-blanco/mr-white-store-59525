import { StyleSheet, Text, View, Pressable, Image, useWindowDimensions, FlatList, ScrollView, ActivityIndicator } from "react-native"
import { colors } from "../global/colors.js"
import Icon from 'react-native-vector-icons/MaterialIcons';
import products from "../data/products.json"
import { useState, useEffect } from "react"
import MontserratText from "../components/MontserratText.jsx"
import { useSelector, useDispatch } from "react-redux"
import { addItem } from "../features/cart/cartSlice.js";
import { useGetProductQuery } from "../services/shopService.js";



const ProductScreen = ({ route, navigation }) => {

  // const [productFound, setProductFound] = useState({})
  //Ahora el productId conseguido de "params" es el que se utilizará para realizar las acciones
  // const {productId} = route.params
  const { width, height } = useWindowDimensions()

  const productId = useSelector(state => state.shopReducer.value.productSelectedId)
  console.log("productId", productId);

  const dispatch = useDispatch()

  const { data: productFound, error, isLoading } = useGetProductQuery(productId);
  console.log(`ProductFound: --->\n\n `, productFound);
  
  

  
  // console.log("*****   Producto seleccionado    ****");
  // for( const prop in productFound) {
  //   console.log(`${prop}:  ${productFound[prop]}`);
  // }
  // console.log("*************************************");
 
  // useEffect(() => {
  //   setProductFound(products.find(product => product.id === productId))
  // }, [productId])
  
  return (
    <>
    {
      isLoading
      ?
      <ActivityIndicator size="large" color={colors.verdeNeon} />
      :
      error
      ?
      <Text>Error al cargar el producto</Text>
      :
      <ScrollView >
      <Pressable
        onPress={() => navigation.goBack()}
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
          <Text style={{ fontSize: 24, color: colors.grisOscuro }}>Atrás</Text>
        </View>
      </Pressable>
      <View style={styles.productContainer}>
        <Text style={styles.textBrand}>{productFound.brand}</Text>
        <Text style={styles.textTitle}>{productFound.title}</Text>
        <Text style={styles.shortDescriptionStyles}>{productFound.shortDescription}</Text>
        <Image
            source={{ uri: productFound.mainImage}}
            alt={productFound.title}
            width={width}
            height={width*.75}
            resizeMode="contain"
        />
        <Text style={styles.longDescription}>{productFound.longDescription}</Text>
        <View>
          <View style={styles.tagListStyles}>
            {
              productFound.tags?.map(tag=><Text key={`${tag}-${Math.random()}`} style={styles.tagBadge}>{tag}</Text>)
            }
          </View>
          {
            productFound.discount > 0 && <Text style={styles.discountText}>Descuento: ${productFound.discount}</Text>
          }
          {
            productFound.stock <= 0 && <Text style={{color:'red', fontSize: 20, fontWeight: "500"}}>Sin stock</Text>
          }
          <Text style={styles.priceText}>$ {productFound.price}</Text>
          <Pressable style={styles.addToCartButton} onPress={()=> dispatch(addItem({...productFound, quantity: 1}))}>
            <Text style={styles.textAddToCart}>Agregar al carrito</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
    }
    </>

  )
}

export default ProductScreen

const styles = StyleSheet.create({
  goBack: {
    paddingLeft: 10,
    color: colors.grisOscuro,
  },
  productContainer: {
    paddingHorizontal: 11,
    paddingBottom: 11,
  },
  textTitle: {
    fontSize: 24,
    fontWeight:"700",
    marginBottom: 5,
  },
  textBrand: {
    color: colors.grisOscuro,
    fontWeight: "700",
    fontSize: 18,
  },
  shortDescriptionStyles: {
    fontWeight: "500",
    marginBottom: 11,
    fontSize: 16,
  },
  longDescription: {
    fontSize: 16,
    marginBottom: 20,
  },
  tagBadge: {
    fontWeight: 'bold',
    fontSize: 14,
    borderWidth: 2,
    borderRadius: 15,
    paddingRight: 10,
    paddingLeft: 15,
    paddingVertical: 5,
    backgroundColor: colors.dorado,

  },
  tagListStyles: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  discountText: {
    backgroundColor: colors.verde,
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignSelf: 'flex-start',
    borderRadius: 10,
    fontSize: 16,
    fontWeight: "600",
  },
  priceText: {
    fontFamily: 'Montserrat',
    fontWeight: '800',
    fontSize: 36,
    marginBottom: 20,
    alignSelf: "flex-end",
    marginRight: 11,
    color: colors.grisOscuro
  },
  addToCartButton: {
    alignSelf: "center",
    backgroundColor: colors.morado,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 20,
    width: "100%",
  },
  textAddToCart: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "500",
    alignSelf: "center",
  },

})
