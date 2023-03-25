import React, { useState,useEffect, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import From2 from './From2';

import { SolicitudContext } from './Context/SolicitudContext';

function MiPagina() {
  const [showModal, setShowModal] = useState(true);
  const [LatitudDispositivo, setLatitudDispositivo] = useState();
  const [LongitudDispositivo, setLongitudDispositivo] = useState();

  const {setSolicitud, solicitud} =  useContext(SolicitudContext);

  const handleButtonClick = () => {
    navigator.geolocation.getCurrentPosition(position => {
      setLatitudDispositivo(position.coords.latitude);
      setLongitudDispositivo(position.coords.longitude);
    });
  };


  const handleAccept = () => {
    // El usuario aceptó los términos y condiciones
    handleButtonClick();
    if (LatitudDispositivo=== undefined || LongitudDispositivo === undefined) {
      console.log(LatitudDispositivo)
      console.log(LongitudDispositivo)
      setShowModal(true);
    } else {
      setShowModal(false);
      console.log(LatitudDispositivo)
      console.log(LongitudDispositivo)
    }
  };
  
  const handleReject = () => {
    // El usuario rechazó los términos y condiciones
    setShowModal(false);
  };

  return (
    <>
      <Modal show={showModal} className='modal-cont'>
        <Modal.Header>
          <Modal.Title>Terminos y condiciones</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        Gracias por elegir nuestro servicio de pedidos de gas a domicilio. 
        Al aceptar estos términos, aseguramos que su pedido se procesará de forma segura y rápida. Al hacer su pedido, usted acepta proporcionar su ubicación, su número de rut y su nombre para realizar la validación interna necesaria. Podemos rechazar su pedido en algunos casos, pero le garantizamos un descuento único para su pedido. ¡Gracias de nuevo por elegirnos!, Recuerde permitir compartir su ubicación
        Considere que si al apretar aceptar ese mensaje sigue saliendo, es porque no tiene permitido compartir su ubicacion en todo momento que este esta pagina activada
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleReject}>Rechazar</Button>
          <Button variant="primary" onClick={handleAccept}>Aceptar</Button>
        </Modal.Footer>
      </Modal>



      {solicitud===0 ? <From2></From2> : <><p>Mensaje enviado</p></>}
    </>
  );
}

export default MiPagina;