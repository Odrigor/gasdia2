import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SolicitudContext } from '../Context/SolicitudContext';

import { Modal, Button } from 'react-bootstrap';
 
const FormularioInteligente = () => {
  //modal
  const [showModal, setShowModal] = useState(true);
  //datos del formulario
  const [nombre, setNombre] = useState('');
  const [rut, setRut] = useState('');
  const [email, setEmail] = useState('');
  const [numero, setNumero] = useState('');
  const [extra, setExtra] = useState('');
  const [producto, setProducto] = useState('');
  const [direccionNumero , setdireccionNumero ] = useState ('');
  const [address, setAddress] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const [latitude2, setLatitude2] = useState(null);
  const [longitude2, setLongitude2] = useState(null);


  const {setSolicitud, solicitud} =  useContext(SolicitudContext);

  const [resultmsj, setresultmsj] = useState('')




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
      toast.error('Rut invalido');
      return;
    }
    if(producto===''){
      toast.error('No se ha seleccionado un producto');
      return;
    }


  

      const arcgisUrl = `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?singleLine=${address}&f=json`;
      axios.get(arcgisUrl)
      .then(response => {
        const location = response.data.candidates[0].location;
        console.log(`Latitude: ${location.y}, Longitude: ${location.x}`);

         if(calculateDistance(location.y, location.x, latitude2, longitude2) < 12000 ) {
          notify('Su pedido esta siendo procesado, espere resuesta');
          axios.post('http://localhost:3000/ingresa', {
            nombre: nombre,
            rut: rut,
            correo: email,
            telefono: numero,
            infoextra: extra,
            id_producto: producto,
            direccion_entrega: address + ' ' + direccionNumero ,
            latitud_pedido: latitude2,
            longitud_pedido: longitude2,
            dias_margen: productosEmpresa[producto-1].dias_margen,
            cantidad: 1,
            entregado: 0
  })
  .then(function (response) {
    if(response.data){
      toast.success('Pedido aprobado');
      setresultmsj('¡Tu pedido está en camino! Queremos agradecerte por elegir nuestro servicio de gas con descuento en línea y esperamos superar tus expectativas. ¡Gracias por ser parte de nuestra familia de clientes satisfechos!')
      setSolicitud(0)
    }
    else{
      console.log('Pedido Rechazado')
      setresultmsj('Su pedido no ha sido ingresado, debido a que aun no han pasado el tiempo suficiente desde su ultimo pedido, para poder volver a comprar con descuento.')
      setSolicitud(0)
    }
  })
  .catch(function (error) {
    console.log(error);
  });
        }
        else{
            setresultmsj('Su pedido NO ha sido ingresado debido a un criterio de geolocalizacion')
            setSolicitud(0)
        }
      })
      .catch(error => {
        console.log(error);
      });
  };


  const handleButtonClick = () => {
    navigator.geolocation.getCurrentPosition(position => {
      setLatitude2(position.coords.latitude);
      setLongitude2(position.coords.longitude);
    });
  };


  const handleAccept = () => {
    // El usuario aceptó los términos y condiciones
    handleButtonClick();
    if (latitude2=== null || longitude2 === null || latitude2=== undefined || longitude2 === undefined) {
      setShowModal(true);
    } else {
      console.log(latitude2)
      console.log(longitude2)
      setShowModal(false);
    }
  };
  
  const handleReject = () => {
    // El usuario rechazó los términos y condiciones
    setShowModal(true);
  };

  return (
    <div className='App'>
    <Modal show={showModal} className='modal-cont'>
        <Modal.Header>
          <Modal.Title>Terminos y condiciones</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-text">
        Gracias por elegir nuestro servicio de pedidos de gas a domicilio. Al aceptar estos términos, aseguramos que su pedido se procesará de forma segura y rápida. Al hacer su pedido, usted acepta proporcionar su ubicación, su número de RUT y su nombre para realizar la validación interna necesaria. Podemos rechazar su pedido en algunos casos, pero le garantizamos un descuento único para su pedido si cumple con los siguientes criterios: 1) la distancia entre el dispositivo y la dirección proporcionada debe ser menor a 1 kilómetro y 2) deben haber pasado al menos 7 días desde su última compra con descuento. De lo contrario, su pedido será rechazado. ¡Gracias de nuevo por elegirnos! Recuerde permitir compartir su ubicación. Considere que si al apretar aceptar ese mensaje sigue saliendo, es porque no tiene permitido compartir su ubicación.
        </Modal.Body>
        <Modal.Footer>
          <Button className="modal-button" variant="secondary" onClick={handleReject}>Rechazar</Button>
          <Button className="modal-button" variant="primary" onClick={handleAccept}>Aceptar</Button>
        </Modal.Footer>
      </Modal>

      {solicitud === 1 ? <>

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
              <input type="radio" name="gender" value="5 litros $8.990" id="dot-1"  />
              <input type="radio" name="gender" value="11 litros $16.990" id="dot-2"  />
              <input type="radio" name="gender" value="15 litros $20.990" id="dot-3" />
              <span className="gender-title">La oferta especial te permite comprar 1 producto por pedido</span>
              <div className="category">
                <label htmlFor="dot-1" onClick={() => setProducto(1)}>
                  <span className="dot one" />
                  <span className="gender">5 litros ${ productosEmpresa.length=== 0 ? null : productosEmpresa[0].precio_original}</span>
                </label>
                <label htmlFor="dot-2" onClick={() => setProducto(2)}>
                  <span className="dot two" />
                  <span className="gender">11 litros ${ productosEmpresa.length === 0 ? null : productosEmpresa[1].precio_original}</span>
                </label>
                <label htmlFor="dot-3" onClick={() => setProducto(3)}>
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
      
      </> : <><div className='container'> <div className="title"> {resultmsj}</div> </div></>}
    </div>
  );
};
export default FormularioInteligente;