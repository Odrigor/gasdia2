import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import FormClientes from './FormClientes';

function MiPagina() {
  const [showModal, setShowModal] = useState(true);

  const handleAccept = () => {
    // El usuario aceptó los términos y condiciones
    setShowModal(false);
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleReject}>Rechazar</Button>
          <Button variant="primary" onClick={handleAccept}>Aceptar</Button>
        </Modal.Footer>
      </Modal>

      <FormClientes></FormClientes>
    </>
  );
}

export default MiPagina;