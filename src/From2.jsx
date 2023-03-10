import React, { useState, useEffect } from 'react';
import axios from 'axios';
 
const From2 = () => {
  const [nombre, setNombre] = useState('');
  const [rut, setRut] = useState('');
  const [email, setEmail] = useState('');
  const [numero, setNumero] = useState('');
  const [comuna, setComuna] = useState('');
  const [calle, setCalle] = useState('');
  const [direccion, setDireccion] = useState('');
  const [extra, setExtra] = useState('');
  const [producto, setProducto] = useState('');
  const [error, setError] = useState('');


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
  
  const handleSubmit = async e => {
    e.preventDefault();
    if (!validarRut(rut)) {
      alert('Rut invalido');
      return;
    }
    setError('');
    const consulta = await axios.post('url', {
      rut
    });
    if(consulta.data) {
      alert('Pedido ingresado con exito');
    } else {
      alert('No se puede realizar la compra');
    }
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
              <span className="details">Comuna</span>
              <input type="text" placeholder="comuna" value={comuna} onChange={e => setComuna(e.target.value)} required />
            </div>
            <div className="input-box">
              <span className="details">Calle</span>
              <input type="text" placeholder="calle" value={calle} onChange={e => setCalle(e.target.value)} required />
            </div>
            <div className="input-box">
              <span className="details">Numero de direción</span>
              <input type="text" placeholder="numero de casa o depto" value={direccion} onChange={e => setDireccion(e.target.value)} required />
            </div>
            <div className="input-box">
              <span className="details">Información extra ubicación</span>
              <input type="text" placeholder="ej1:casa reja verde, ej2:depto pizo 3" value={extra} onChange={e => setExtra(e.target.value)} required />
            </div>
          </div>
          <div className="gender-details">
            <input type="radio" name="gender" value="5 litros $8.990" id="dot-1" onChange={e => setProducto(e.target.value)} />
            <input type="radio" name="gender" value="11 litros $16.990" id="dot-2" onChange={e => setProducto(e.target.value)} />
            <input type="radio" name="gender" value="15 litros $20.990" id="dot-3" onChange={e => setProducto(e.target.value)} />
            <span className="gender-title">Producto</span>
            <div className="category">
              <label htmlFor="dot-1">
                <span className="dot one" />
                <span className="gender">5 litros ${ productosEmpresa.length=== 0 ? null : productosEmpresa[0].precio_original}</span>
              </label>
              <label htmlFor="dot-2">
                <span className="dot two" />
                <span className="gender">11 litros ${ productosEmpresa.length === 0 ? null : productosEmpresa[1].precio_original}</span>
              </label>
              <label htmlFor="dot-3">
                <span className="dot three" />
                <span className="gender">15 litros ${ productosEmpresa.length === 0 ? null : productosEmpresa[2].precio_original}</span>
              </label>
            </div>
          </div>
          <div className="button">
            <input type="submit" value="Ingresar pedido" />
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};
export default From2;