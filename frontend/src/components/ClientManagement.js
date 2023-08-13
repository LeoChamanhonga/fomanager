import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClientManagement = () => {
  const [clients, setClients] = useState([]);
  const [newClientName, setNewClientName] = useState('');

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = () => {
    axios.get('http://localhost:8800/clients')
      .then(response => {
        setClients(response.data);
      })
      .catch(error => {
        console.error('Error fetching clients:', error);
      });
  };

  const handleAddClient = () => {
    if (newClientName.trim() !== '') {
      axios.post('http://localhost:8800/clients', { name: newClientName })
        .then(() => {
          setNewClientName('');
          fetchClients();
        })
        .catch(error => {
          console.error('Error adding client:', error);
        });
    }
  };

  const handleDeleteClient = (clientId) => {
    axios.delete(`http://localhost:8800/clients/${clientId}`)
      .then(() => {
        fetchClients();
      })
      .catch(error => {
        console.error('Error deleting client:', error);
      });
  };

  return (
    <div>
      <h2>Gerenciamento de Clientes</h2>
      <ul>
        {clients.map(client => (
          <li key={client.id}>
            {client.name}{' '}
            <button onClick={() => handleDeleteClient(client.id)}>Excluir</button>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newClientName}
          onChange={e => setNewClientName(e.target.value)}
        />
        <button onClick={handleAddClient}>Adicionar Cliente</button>
        <button onClick={handleAddClient}>Actualizar Cliente</button>
        <button onClick={handleAddClient}>Eliminar Cliente</button>
      </div>
    </div>
  );
};

export default ClientManagement;
