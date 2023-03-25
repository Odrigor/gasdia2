import React, { useState } from 'react';
import axios from 'axios';

const FormClientes = () => {


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
  return (
    <div className='App'>

<div className="container">
      <div className="title">Pedir gas con Descuento, oferta especial</div>
      <div className="content">
        <form action="#">
          <div className="user-details">
            <div className="input-box">
              <span className="details">Nombre</span>
              <input type="text" placeholder="nombre" required />
            </div>
            <div className="input-box">
              <span className="details">Rut</span>
              <input type="text" placeholder="rut sin puntos y con guion" required />
            </div>
            <div className="input-box">
              <span className="details">Email</span>
              <input type="email" placeholder="email" required />
            </div>
            <div className="input-box">
              <span className="details">Numero de contacto</span>
              <input type="text" placeholder="(+56) tu numero" required />
            </div>
            <div className="input-box">
              <span className="details">Comuna</span>
              <input type="text" placeholder="comuna" required />
            </div>
            <div className="input-box">
              <span className="details">Calle</span>
              <input type="text" placeholder="calle" required />
            </div>
            <div className="input-box">
              <span className="details">Numero de direción</span>
              <input type="text" placeholder="numero de casa o depto" required />
            </div>
            <div className="input-box">
              <span className="details">Información extra ubicación</span>
              <input type="text" placeholder="ej1:casa reja verde, ej2:depto pizo 3" required />
            </div>
          </div>
          <div className="gender-details">
            <input type="radio" name="gender" id="dot-1" />
            <input type="radio" name="gender" id="dot-2" />
            <input type="radio" name="gender" id="dot-3" />
            <span className="gender-title">Producto</span>
            <div className="category">
              <label htmlFor="dot-1">
                <span className="dot one" />
                <span className="gender">5 litros $8.990</span>
              </label>
              <label htmlFor="dot-2">
                <span className="dot two" />
                <span className="gender">11 litros $16.990</span>
              </label>
              <label htmlFor="dot-3">
                <span className="dot three" />
                <span className="gender">15 litros $20.990</span>
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

export default FormClientes;