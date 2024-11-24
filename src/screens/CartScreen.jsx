import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native"
import React from "react"
import FlatCard from "../components/FlatCard.jsx"
import Icon from "react-native-vector-icons/MaterialIcons"
import { colors } from "../global/colors.js"
import { useSelector, useDispatch } from "react-redux"
import { usePostReceiptMutation } from "../services/receiptService.js"

import { clearCart, removeCartItem } from "../features/cart/cartSlice.js"


//paso el navigation como parámetro para utilizarlo para ir a la pagina de recibos una vez generado el pago
const CartScreen = ({navigation}) => {
  // Traigo los items del cart del store de redux
  const cart = useSelector(state => state.cartReducer.value.cartItems)
  // Traigo el total del carrito desde el store de redux
  const total = useSelector(state=>state.cartReducer.value.total)
  // Traigo el largo del carrito desde el store de redux
  const cartLenght = useSelector(state=>state.cartReducer.value.cartLenght)

  // Seteo que el valor de user sea el email del usuario logueado
  const user = useSelector(state => state.authReducer.value.email)

  // Inicializo la variable dispatch para poder utilizar métodos de algun "slice" de redux
  const dispatch = useDispatch()

  // Desestructuramos el resultado devuelto por el hook  de RTK Query
  const [ triggerPost, result ] = usePostReceiptMutation()
  

  const FooterComponent = () => (
    <View style={styles.footerContainer}>
        <Text style={styles.footerTotal}>Total: $ {total} </Text>
        <Pressable style={styles.confirmButton}
          onPress={() => {
            // Se ejecuta el post y mandamos por parametro un objeto con las características que querramos
            triggerPost({cart,user,total, createdAt: Date.now()})
            // Se limpia el carrito
            dispatch(clearCart())
            // El nombre que va es el de la tab-navigation de recibos (no el de recibos directamente)
            navigation.navigate("tab-recibos")
          }}
        >
            <Text style={styles.confirmButtonText}>Confirmar</Text>
        </Pressable>
    </View>
)



  const renderCartItem = ({ item }) => (
    <FlatCard style={styles.cartContainer}>
      <View>
        <Image
          source={{ uri: item.mainImage }}
          style={styles.cartImage}
          resizeMode="cover"
        />
      </View>
      <View style={styles.cartDescription}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.shortDescription}</Text>
        <Text style={styles.price}>Precio unitario: $ {item.price}</Text>
        <Text stlyle={styles.quantity}>Cantidad: {item.quantity}</Text>
        <Text style={styles.total}>Total: $ {item.quantity * item.price}</Text>
        <Pressable style={styles.trashIcon} 
        onPress={()=> dispatch(removeCartItem(item.id))}
        >

        <Icon
          name="delete"
          size={32}
          color="#ff3c3c"
          />
          </Pressable>
      </View>
    </FlatCard>
  )

  return (
    <>
    {
      cartLenght > 0
      ?
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={renderCartItem}
        ListHeaderComponent={
          <Text style={styles.cartScreenTitle}>Tu carrito</Text>
        }
        ListFooterComponent={<FooterComponent />}
      />
      :
      <View style={styles.cartEmpty}><Text style={styles.cartEmptyText} >Aún no hay productos en el carrito</Text></View>
    }
    </>
  )
}

export default CartScreen

const styles = StyleSheet.create({
  cartContainer: {
    flexDirection: "row",
    padding: 20,
    justifyContent: "flex-start",
    margin: 16,
    alignItems: "center",
    gap: 10,
  },
  cartImage: {
    width: 80,
    height: 140,
    objectFit: "contain",
  },
  cartDescription: {
    width: "80%",
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
  },
  description: {
    marginBottom: 16,
  },
  total: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: "700",
  },
  trashIcon: {
    alignSelf: "flex-end",
    marginBottom: -16,
    marginTop: -32,
  },
  footerContainer: {
    padding: 32,
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  footerTotal: {
    fontSize: 28,
    fontWeight: "700",
    marginTop: -18
  },
  confirmButton: {
    padding: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.morado,
    borderRadius: 16,
    marginBottom: 24,
  },
  confirmButtonText: {
    color: colors.blanco,
    fontSize: 16,
    fontWeight: "700",
  },
  cartScreenTitle: {
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
    paddingVertical: 8,
  },
  cartEmpty:{
      flex:1,
      justifyContent:'center',
      alignItems: 'center'
  },
  cartEmptyText:{
      fontSize: 16
  },
})
