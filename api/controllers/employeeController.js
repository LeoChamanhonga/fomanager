// controllers/employeeController.js
import {db} from '../db.js';

const employeeController = {
  // Obter todos os funcionários
  getAllEmployees: (req, res) => {
    db.query('SELECT * FROM employees', (error, results) => {
      if (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ error: 'Error fetching employees' });
        return;
      }
      res.json(results);
    });
  },

  // Obter um funcionário por ID
  getEmployeeById: (req, res) => {
    const employeeId = req.params.id;
    db.query('SELECT * FROM employees WHERE id = ?', [employeeId], (error, results) => {
      if (error) {
        console.error('Error fetching employee by ID:', error);
        res.status(500).json({ error: 'Error fetching employee by ID' });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ error: 'Employee not found' });
        return;
      }
      res.json(results[0]);
    });
  },

  // Criar um novo funcionário
  createEmployee: (req, res) => {
    const { name, email, category_id } = req.body;
    db.query('INSERT INTO employees (name, email, category_id) VALUES (?, ?, ?)', [name, email, category_id], (error, results) => {
      if (error) {
        console.error('Error creating employee:', error);
        res.status(500).json({ error: 'Error creating employee' });
        return;
      }
      res.json({ id: results.insertId, name, email, category_id });
    });
  },

  // Atualizar um funcionário existente
  updateEmployee: (req, res) => {
    const employeeId = req.params.id;
    const { name, email, category_id } = req.body;
    db.query('UPDATE employees SET name = ?, email = ?, category_id = ? WHERE id = ?', [name, email, category_id, employeeId], (error) => {
      if (error) {
        console.error('Error updating employee:', error);
        res.status(500).json({ error: 'Error updating employee' });
        return;
      }
      res.json({ id: employeeId, name, email, category_id });
    });
  },

  // Excluir um funcionário
  deleteEmployee: (req, res) => {
    const employeeId = req.params.id;
    db.query('DELETE FROM employees WHERE id = ?', [employeeId], (error) => {
      if (error) {
        console.error('Error deleting employee:', error);
        res.status(500).json({ error: 'Error deleting employee' });
        return;
      }
      res.json({ message: 'Employee deleted successfully' });
    });
  }
};

export default employeeController;
