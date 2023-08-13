import React, { useState, useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom'; // Importar o Link e Routes do React Router
import axios from 'axios';
import NewProjectForm from './NewProjectForm.js'; // Importar o componente NewProjectForm

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    axios.get('http://localhost:3000/api/projects')
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
      });
  };

  const handleEditProject = (projectId) => {
    // Implementar ação de edição do projeto com o ID fornecido
    console.log(`Editar projeto com ID ${projectId}`);
  };

  const handleDeleteProject = (projectId) => {
    // Implementar ação de exclusão do projeto com o ID fornecido
    console.log(`Excluir projeto com ID ${projectId}`);
  };

  return (
    <div>
      <h2>Lista de Projetos</h2>
      <Link to="/projects/new">Novo Projeto</Link>
      <ul>
        {projects.map(project => (
          <li key={project.id}>
            {project.name}
            <button onClick={() => handleEditProject(project.id)}>Editar</button>
            <button onClick={() => handleDeleteProject(project.id)}>Excluir</button>
          </li>
        ))}
      </ul>

      <Routes>
        <Route path="/projects/new" element={<NewProjectForm />} /> 
      </Routes>
    </div>
  );
};

export default ProjectList;
