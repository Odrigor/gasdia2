import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './styles.css'
import { SolicitudProvider } from './Context/SolicitudProvider'
import FormularioInteligente from './Pages/FormularioInteligente'

function App() {


  return (
    <SolicitudProvider>

<Router>
      <Routes>
        <Route path='/' element={<FormularioInteligente></FormularioInteligente>}></Route>
      </Routes>
    </Router>

    </SolicitudProvider>
  )
}

export default App
