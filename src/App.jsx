import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LocationCheck from './LocationCheck'
import './styles.css'
import From2 from './From2'
import MiPagina from './MiPagina'
import Autocomplete from './autocomplete'
import ValidatePosition from './ValidatePosition'
import SearchAddress2 from './SearchAddress2'
import  Alert2  from './Alertaaa'
import { SolicitudProvider } from './Context/SolicitudProvider'
import LocationComponent from './Components/LocationComponent'
import FormularioInteligente from './FormularioInteligente'

function App() {


  return (
    <SolicitudProvider>

<Router>
      <Routes>
        <Route path='/' element={<FormularioInteligente></FormularioInteligente>}></Route>
        <Route path='/lo' element={<LocationCheck></LocationCheck>} ></Route>
        <Route path='/autocomplete' element={<Autocomplete></Autocomplete>}></Route>
        <Route path='/val' element={<ValidatePosition></ValidatePosition>}></Route>
        <Route path='/s' element={<From2></From2>}></Route>
        <Route path='/alert' element={<Alert2></Alert2>}></Route>
        <Route path='/geolocation' element={<LocationComponent></LocationComponent>}></Route>
      </Routes>
    </Router>

    </SolicitudProvider>
  )
}

export default App
