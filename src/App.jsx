import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './styles.css'
import { SolicitudProvider } from './Context/SolicitudProvider'
import { UserProvider } from './Context/UserProvider'
import FormularioInteligente from './Pages/FormularioInteligente'
import Pedidos from './Pages/Pedidos'
import LoginPage from './Pages/LoginPage'



function App() {


  return (
    <SolicitudProvider>
    <UserProvider>

<Router>
      <Routes>
        <Route path='/' element={<FormularioInteligente></FormularioInteligente>}></Route>
        <Route path='/pedidos' element={<Pedidos></Pedidos>}></Route>
        <Route path='/login' element={<LoginPage></LoginPage>}></Route>
      </Routes>
    </Router>
    </UserProvider>
    </SolicitudProvider>
  )
}

export default App
