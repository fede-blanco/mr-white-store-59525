import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { colors } from '../global/colors.js'

const Search = ({setSearch}) => {
  return (
    <TextInput
      placeholder="Busca un producto"
      onChangeText={(text)=>setSearch(text)}
      style={styles.searchInput}
    />
  )
}

export default Search

const styles = StyleSheet.create({
  searchInput:{
    margin: 5,
    borderWidth: 1,
    borderColor: colors.grisMedio,
    borderRadius: 15,
    paddingVertical: 5,
    paddingLeft: 10,
  },
})