import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Logon from './pages/Logon'
import Register from './pages/Register'

export default function Routes () {
  return (
    <BrowserRouter>
      <Switch> {/*Switch: Garante que apenas uma rota seja chamada em cada momento*/}
        <Route path="/" exact component={Logon} />     {/*exact: caminho precisa ser exatamente começando com '/' (padrão) */}
        <Route path="/register" component={Register} />
      </Switch>
    </BrowserRouter>
  )
}
