import { StyleSheet, Text, View } from 'react-native'


// Por props puede recibir estilos agregados nuevos que se agregen a los estilos que ya tiene el componenete por defecto que en este caso es solo el tipo de letra
const MontserratText = ({children,style}) => {
  return (
      <Text style={{...styles.textMontserrat,...style}}>{children}</Text>
  )
}

export default MontserratText

const styles = StyleSheet.create({
    textMontserrat:{
        fontFamily: 'Montserrat'
    }
})

