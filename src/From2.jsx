import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
const From2 = () => {
  const [nombre, setNombre] = useState('');
  const [rut, setRut] = useState('');
  const [email, setEmail] = useState('');
  const [numero, setNumero] = useState('');
  const [extra, setExtra] = useState('');
  const [producto, setProducto] = useState('');
  const [error, setError] = useState('');
  const [direccionNumero , setdireccionNumero ] = useState ('');

  const [address, setAddress] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [latitude2, setLatitude2] = useState(null);
  const [longitude2, setLongitude2] = useState(null);


  useEffect(() => {
    const intervalId = setInterval(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setLatitude2(position.coords.latitude);
          setLongitude2(position.coords.longitude);
        });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);




  const notify = (msj) => toast(msj);

  const handleAddressChange = (e) => {
    const value = e.target.value;
    setAddress(value);

    if (value.length > 3) {
      axios
        .get('https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest', {
          params: {
            text: value,
            f: 'json',
            token: 'AAPK904d7ea339874c398db5877689b626d88zd9H8gtNj0O3HYtyjzxTNl9hmQYFZgTOXJHyw_gtXMvzDuIOGcM7G8LgYjIGTkn',
            //countryCode: 'CL',
            category: 'Address',
            searchExtent: '-71.0657,-33.736719,-70.312074,-33.148692',
            maxSuggestions: 3
          }
        })
        .then((response) => {
          setSuggestions(response.data.suggestions);
        });
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setAddress(suggestion.text);
    setSuggestions([]);
  };


  const handleSelection = (value) => {
    setProducto(value);
  }


  const [productosEmpresa, setProductosEmpresa] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/productos')
      .then(res => setProductosEmpresa(res.data))
      .catch(err => console.error(err));
  }, []);

  const validarRut = (rutCompleto) => {
    rutCompleto = rutCompleto.replace("‐","-");
    if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( rutCompleto ))
      return false;
    const tmp 	= rutCompleto.split('-');
    let digv	= tmp[1]; 
    const rut 	= tmp[0];
    if ( digv == 'K' ) digv = 'k' ;
    return (dv(rut) == digv );
    };
    const dv = (T) => {
    let M=0,S=1;
    for(;T;T=Math.floor(T/10))
      S=(S+T%10*(9-M++%6))%11;
    return S?S-1:'k';
    };

  
  
    const calculateDistance = (lat1, lon1, lat2, lon2) => {  
      const R = 6371e3; 
      const φ1 = lat1 * Math.PI/180; 
      const φ2 = lat2 * Math.PI/180;
      const Δφ = (lat2-lat1) * Math.PI/180;
      const Δλ = (lon2-lon1) * Math.PI/180;
    
      const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    
      const d = Math.round(R * c);
      return d;
    }

  const handleSubmit = async e => {
    e.preventDefault();


    if (!validarRut(rut)) {
      notify('Rut invalido');
      return;
    }
    if(producto===''){
      notify('No se ha seleccionado un producto');
      return;
    }


  

      const arcgisUrl = `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?singleLine=${address}&f=json`;
      axios.get(arcgisUrl)
      .then(response => {
        const location = response.data.candidates[0].location;
        console.log(`Latitude: ${location.y}, Longitude: ${location.x}`);
        setLatitude(location.y);
        setLongitude(location.x);
    
        console.log(latitude);
        console.log(longitude);
        console.log('La distancia entre los puntos es: ' + calculateDistance(latitude, longitude, latitude2, longitude2));
      })
      .catch(error => {
        console.log(error);
      });

    /*const consulta = await axios.post('url', {
      rut
    });
    if(consulta.data) {
      notify('Pedido ingresado con exito');
    } else {
      notify('No se puede realizar la compra');
    }*/
  };

  return (
    <div className='App'>
<div className="container">
      <div className="title">Pedir gas con Descuento, oferta especial</div>
      <div className="content">
        <form action="#" onSubmit={handleSubmit}>
          <div className="user-details">
            <div className="input-box">
              <span className="details">Nombre</span>
              <input type="text" placeholder="nombre" value={nombre} onChange={e => setNombre(e.target.value)} required />
            </div>
            <div className="input-box">
              <span className="details">Rut</span>
              <input type="text" placeholder="rut sin puntos y con guion" value={rut} onChange={e => setRut(e.target.value)} required />
              {error && <span>{error}</span>}
            </div>
            <div className="input-box">
              <span className="details">Email</span>
              <input type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="input-box">
              <span className="details">Numero de contacto</span>
              <input type="text" placeholder="(+56) tu numero" value={numero} onChange={e => setNumero(e.target.value)} required />
            </div>
            <div className="input-box">
              <span className="details">Direccion</span>
              <input type="text" value={address} onChange={handleAddressChange} placeholder="Direccion" required />
              <ul>
        {suggestions.map((suggestion) => (
          <li key={suggestion.magicKey} onClick={() => handleSuggestionClick(suggestion)}>
            {suggestion.text.slice(0, suggestion.text.indexOf(", Región Metropolitana de Santiago,"))}
          </li>
        ))}
      </ul>
            </div>
            <div className="input-box">
              <span className="details">Numero de direción</span>
              <input type="text" placeholder="numero de casa o depto" value={direccionNumero} onChange={e => setdireccionNumero(e.target.value)} required />
            </div>
            <div className="input-box">
              <span className="details">Información extra ubicación</span>
              <input type="text" placeholder="ej1:casa reja verde, ej2:depto pizo 3" value={extra} onChange={e => setExtra(e.target.value)} />
            </div>
          </div>
          <div className="gender-details">
            <input type="radio" name="gender" value="5 litros $8.990" id="dot-1" onChange={e => setProducto(e.target.value)} />
            <input type="radio" name="gender" value="11 litros $16.990" id="dot-2" onChange={e => setProducto(e.target.value)} />
            <input type="radio" name="gender" value="15 litros $20.990" id="dot-3" onChange={e => setProducto(e.target.value)} />
            <span className="gender-title">Producto</span>
            <div className="category">
              <label htmlFor="dot-1" onClick={() => handleSelection(1)}>
                <span className="dot one" />
                <span className="gender">5 litros ${ productosEmpresa.length=== 0 ? null : productosEmpresa[0].precio_original}</span>
              </label>
              <label htmlFor="dot-2" onClick={() => handleSelection(2)}>
                <span className="dot two" />
                <span className="gender">11 litros ${ productosEmpresa.length === 0 ? null : productosEmpresa[1].precio_original}</span>
              </label>
              <label htmlFor="dot-3" onClick={() => handleSelection(3)}>
                <span className="dot three" />
                <span className="gender">15 litros ${ productosEmpresa.length === 0 ? null : productosEmpresa[2].precio_original}</span>
              </label>
            </div>
          </div>
          <div className="button">
            <input type="submit" value="Ingresar pedido" />
            <ToastContainer />
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};
export default From2;