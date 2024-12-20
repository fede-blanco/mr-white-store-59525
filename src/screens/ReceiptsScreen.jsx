import { StyleSheet, Text, FlatList, View } from "react-native"
import FlatCard from "../components/FlatCard"
import { useSelector } from "react-redux"
import {
  useGetReceiptsByUserQuery,
} from "../services/receiptService.js"

const ReceiptsScreen = () => {
  // Se setea que el valor de user sea el email del usuario logueado
  const user = useSelector((state) => state.authReducer.value.email)

  const {
    data: receiptsByUser,
    errorReceiptsByUser,
    isLoadingReceiptsByUser,
  } = useGetReceiptsByUserQuery(user)
  console.log(
    "Estado 'receiptsFilteredByUser' ReceiptsScreen --> ",
    receiptsByUser
  )

  const renderReceiptItem = ({ item }) => {

    // Se crea el objeto options con los formatos configurados para que nos de lahora como queremos
    dateOptions = {
      year: "numeric", // Muestra el año
      month: "2-digit", // Muestra el mes en formato de 2 dígitos
      day: "2-digit", // Muestra el día en formato de 2 dígitos
      hour: "2-digit", // Muestra las horas en formato de 2 dígitos
      minute: "2-digit", // Muestra los minutos en formato de 2 dígitos
      hour12: false, // Usa formato de 24 horas (puedes cambiar a true para 12 horas)
    }

    return (
      <FlatCard style={styles.receiptContainer}>
        <Text><Text style={styles.title}>Usuario: </Text>{item.user}</Text>
        <Text>
          <Text style={styles.date}>Fecha:{" "}</Text>
          
          {new Date(item.createdAt).toLocaleString("es-Ar", dateOptions)} Hs.
        </Text>
        <Text style={styles.total}>Articulos: </Text>
        {item.cart.map((item) => (
          <Text key={item.id}>
            {" "}
            <Text style={{ fontWeight: "bold" }}>{item.quantity}</Text>{" "}
            {" x "} 
            {item.title}
          </Text>
        ))}
        <Text>
          <Text style={styles.total}>Total: </Text>
          ${item.total} - </Text>
      </FlatCard>
    )
  }

  return (
    
    <>
    {
      receiptsByUser === undefined || receiptsByUser.length < 1
      ?
      <View style={styles.receiptEmpty}><Text style={styles.receiptEmptyText} >Aún no hay recibos de compra!</Text></View>
      :
      <FlatList
      data={receiptsByUser}
      keyExtractor={(item) => item.createdAt}
      renderItem={renderReceiptItem}
    />
    }
    </>
  )
}

export default ReceiptsScreen

const styles = StyleSheet.create({
  receiptContainer: {
    padding: 20,
    justifyContent: "flex-start",
    margin: 16,
    gap: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
  },
  date: {
    fontSize: 16,
    fontWeight: "700",
  },
  total: {
    fontSize: 16,
    fontWeight: "700",
  },
  receiptEmpty:{
      flex:1,
      justifyContent:'center',
      alignItems: 'center'
  },
  receiptEmptyText:{
      fontSize: 16
  },
})
