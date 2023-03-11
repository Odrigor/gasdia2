import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LocationCheck from './LocationCheck'
import './styles.css'
import FormClientes from './FormClientes'
import MiPagina from './MiPagina'
import Autocomplete from './autocomplete'
import ValidatePosition from './ValidatePosition'
import SearchAddress2 from './SearchAddress2'

function App() {


  return (

    <Router>
      <Routes>
        <Route path='/' element={<FormClientes></FormClientes>}></Route>
        <Route path='/modal' element={<MiPagina></MiPagina>}></Route>
        <Route path='/lo' element={<LocationCheck></LocationCheck>} ></Route>
        <Route path='/autocomplete' element={<Autocomplete></Autocomplete>}></Route>
        <Route path='/val' element={<ValidatePosition></ValidatePosition>}></Route>
        <Route path='/s' element={<SearchAddress2></SearchAddress2>}></Route>
      </Routes>
    </Router>
  )
}

export default App
