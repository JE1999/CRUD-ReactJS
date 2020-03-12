import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

//Layout
import Layout from './Layout'

//Components
import Productos from './Pages/Productos'
import ProductoNuevo from './Pages/ProductoNuevo'
import ProductoEditar from './Pages/ProductoEditar'

//Redux
import { Provider } from 'react-redux'
import store from './store'

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Layout>
          <Switch>
            <Route exact path="/" component={Productos} />
            <Route exact path="/producto/nuevo" component={ProductoNuevo} />
            <Route exact path="/producto/editar/:id" component={ProductoEditar} />
          </Switch>
        </Layout>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
