import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const FriendsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Friends Screen</Text>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
})
export default FriendsScreen