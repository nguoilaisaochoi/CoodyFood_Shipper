import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const RowComponent = ({ children, styles, justifyContent, button, activeOpacity, onPress, width, noAlign }) => {
  return (
    button ? <TouchableOpacity onPress={onPress} activeOpacity={activeOpacity}
      style={[styless.container, 
      { justifyContent: justifyContent, width: width, alignItems: !noAlign && 'center' }, styles]}>
      {children}
    </TouchableOpacity> :
      <View style={[styless.container,
       { justifyContent: justifyContent, width: width, alignItems: noAlign ? 'stretch' : 'center' }, styles]}>
        {children}
      </View>

  )
}

export default RowComponent

const styless = StyleSheet.create({
  container: {
    flexDirection: 'row',

  },

})