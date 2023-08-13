import React from 'react';
import { Link } from 'react-router-dom';
import ClientManagement from './ClientManagement';

const ClientList = () => {
  return (
    <div>
      <Link to="/clients">Gerenciar Clientes</Link>
      <ClientManagement />
    </div>
  );
};

export default ClientList;
