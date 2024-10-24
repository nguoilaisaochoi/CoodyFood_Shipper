import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './src/Redux/Store'
import AppNavigation from './src/navigators/AppNavigation'



const App = () => {
  return (
    <>

      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StatusBar barStyle="dark-content" backgroundColor='transparent' translucent />
          <AppNavigation />
          {/* <MapScreen /> */}
        </PersistGate>
      </Provider>

    </>

  )
}

export default App

const styles = StyleSheet.create({})