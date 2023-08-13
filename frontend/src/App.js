import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ClientList from './components/ClientLis.js';
import ProjectList from './components/ProjectList.js';
import CategoryList from './components/CategoryList.js';
import EmployeeList from './components/EmployeeList.js';
import TimeRecordList from './components/TimeRecordLista.js';
import ClientManagement from './components/ClientManagement';
import HomeContainer from './components/HomeContainer.js';
import NewProjectForm from './components/NewProjectForm.js';

const App = () => {
  const [menuItems] = useState([
    { path: '/', label: 'Home' },
    { path: '/clients', label: 'Clientes' },
    { path: '/projects', label: 'Projetos' },
    { path: '/categories', label: 'Categorias' },
    { path: '/employees', label: 'Funcionários' },
    { path: '/time_records', label: 'Registros de Tempo' },
  ]);

  return (
    <Router>
      <div>
        <nav>
          <ul>
            {menuItems.map(item => (
              <li key={item.path}>
                <Link to={item.path}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <Routes>
          <Route path="/clients" element={<ClientList />} />
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/time_records" element={<TimeRecordList />} />
          <Route path="/" element={<HomeContainer />} />
          <Route path="/projects/new" element={<NewProjectForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
