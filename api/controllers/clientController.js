// controllers/clientController.js
import {db} from '../db.js';

const clientController = {
  // Obter todos os clientes
  getAllClients: (req, res) => {
    db.query('SELECT * FROM clients', (error, results) => {
      if (error) {
        console.error('Error fetching clients:', error);
        res.status(500).json({ error: 'Error fetching clients' });
        return;
      }
      res.json(results);
    });
  },

  // Obter um cliente por ID
  getClientById: (req, res) => {
    const clientId = req.params.id;
    db.query('SELECT * FROM clients WHERE id = ?', [clientId], (error, results) => {
      if (error) {
        console.error('Error fetching client by ID:', error);
        res.status(500).json({ error: 'Error fetching client by ID' });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ error: 'Client not found' });
        return;
      }
      res.json(results[0]);
    });
  },

  // Criar um novo cliente
  createClient: (req, res) => {
    const { name, contact_email } = req.body;
    db.query('INSERT INTO clients (name, contact_email) VALUES (?, ?)', [name, contact_email], (error, results) => {
      if (error) {
        console.error('Error creating client:', error);
        res.status(500).json({ error: 'Error creating client' });
        return;
      }
      res.json({ id: results.insertId, name, contact_email });
    });
  },

  // Atualizar um cliente existente
  updateClient: (req, res) => {
    const clientId = req.params.id;
    const { name, contact_email } = req.body;
    db.query('UPDATE clients SET name = ?, contact_email = ? WHERE id = ?', [name, contact_email, clientId], (error) => {
      if (error) {
        console.error('Error updating client:', error);
        res.status(500).json({ error: 'Error updating client' });
        return;
      }
      res.json({ id: clientId, name, contact_email });
    });
  },

  // Excluir um cliente
  deleteClient: (req, res) => {
    const clientId = req.params.id;
    db.query('DELETE FROM clients WHERE id = ?', [clientId], (error) => {
      if (error) {
        console.error('Error deleting client:', error);
        res.status(500).json({ error: 'Error deleting client' });
        return;
      }
      res.json({ message: 'Client deleted successfully' });
    });
  }
};

export default clientController;
