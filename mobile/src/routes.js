import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'  // navegação em pilha

const AppStack = createStackNavigator()  //criação da navegação

import Incidents from './pages/Incidents'
import Detail from './pages/Detail'

export default function Routes () {
  return (
    <NavigationContainer>
      {/*headerShown: cabeçalho não aparece por padrão - criação de um próprio*/}
      <AppStack.Navigator screenOptions={{ headerShown: false }}>
        <AppStack.Screen name="Incidents" component={Incidents} />
        <AppStack.Screen name="Detail" component={Detail} />
      </AppStack.Navigator>

    </NavigationContainer>
  )
}
