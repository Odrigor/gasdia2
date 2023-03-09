import React from 'react';

const FormClientes = () => {
  return (
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
              <span className="details">rut</span>
              <input type="text" placeholder="rut sin puntos y con guion" required />
            </div>
            <div className="input-box">
              <span className="details">Email</span>
              <input type="text" placeholder="email" required />
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
              <span className="details">numero de direcion</span>
              <input type="text" placeholder="numero de casa o depto" required />
            </div>
            <div className="input-box">
              <span className="details">informacion extra ubicacion</span>
              <input type="text" placeholder="ej1:casa reja verde, ej2:depto pizo 3" required />
            </div>
          </div>
          <div className="gender-details">
            <input type="radio" name="gender" id="dot-1" />
            <input type="radio" name="gender" id="dot-2" />
            <input type="radio" name="gender" id="dot-3" />
            <span className="gender-title">Gender</span>
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
                <span className="gender">15 $20.990</span>
              </label>
              <label htmlFor="dot-4">
                <span className="dot four" />
                <span className="gender">45 $83.990</span>
              </label>
            </div>
          </div>
          <div className="button">
            <input type="submit" value="Verificar informacion y compartir ubicacion" />
            <input type="submit" value="Hacer pedido" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormClientes;