import React, { useState } from 'react';
import EditAdmin from './EditAdmin';
import EditGeneralUsers from './EditGeneralUsers';
import NewUser from './NewUser';

const GestionUsuarios = () => {
  const [vistaActual, setVistaActual] = useState(null);

  return (
    <>
      <h2>Gestión de Usuarios</h2>
      
      <button onClick={() => setVistaActual('editarCredenciales')}>Editar Credenciales Administrador</button>
      <button onClick={() => setVistaActual('gestionUsuarios')}>Gestión Usuarios General</button>
      <button onClick={() => setVistaActual('añadirUsuario')}>Añadir Usuario</button>

      {vistaActual === 'editarCredenciales' && <EditAdmin />}
      {vistaActual === 'gestionUsuarios' && <EditGeneralUsers />}
      {vistaActual === 'añadirUsuario' && <NewUser />}
    </>
  );
};

export default GestionUsuarios;