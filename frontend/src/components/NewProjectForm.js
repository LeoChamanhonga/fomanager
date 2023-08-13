import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewProjectForm = () => {
  const [projectName, setProjectName] = useState('');
  const [projectNumber, setProjectNumber] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [clients, setClients] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetchClients();
    fetchLocations();
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

  const fetchLocations = () => {
    axios.get('http://localhost:3000/api/locations')
      .then(response => {
        setLocations(response.data);
      })
      .catch(error => {
        console.error('Error fetching locations:', error);
      });
  };

  const handleCreateProject = () => {
    const newProject = {
      name: projectName,
      number: projectNumber,
      description: projectDescription,
      clientId: selectedClient,
      locationId: selectedLocation,
    };

    // Enviar a requisição POST para criar o novo projeto
    axios.post('http://localhost:8800/projects', newProject)
      .then(response => {
        console.log('Novo projeto criado:', response.data);
        // Você pode adicionar código aqui para redirecionar ou atualizar a lista de projetos
      })
      .catch(error => {
        console.error('Erro ao criar projeto:', error);
      });
  };

  return (
    <div>
      <h2>Criar Novo Projeto</h2>
      <div>
        <label>Nome de Projecto:</label>
        <input
          type="text"
          value={projectName}
          onChange={e => setProjectName(e.target.value)}
        />
      </div>
      <div>
        <label>Numero do Projeto:</label>
        <input
          type="text"
          value={projectNumber}
          onChange={e => setProjectNumber(e.target.value)}
        />
      </div>
      <div>
        <label>Descrição do Projeto:</label>
        <textarea
          value={projectDescription}
          onChange={e => setProjectDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Cliente:</label>
        <select value={selectedClient} onChange={e => setSelectedClient(e.target.value)}>
          <option value="">Selecione um cliente</option>
          {clients.map(client => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Localização:</label>
        <select value={selectedLocation} onChange={e => setSelectedLocation(e.target.value)}>
          <option value="">Selecione uma localização</option>
          {locations.map(location => (
            <option key={location.id} value={location.id}>
              {location.address}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleCreateProject}>Criar Projeto</button>
    </div>
  );
};

export default NewProjectForm;
