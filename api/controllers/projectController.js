// controllers/projectController.js
import { validationResult } from 'express-validator';
import {db} from '../db.js';

const projectController = {
  getAllProjects: (req, res) => {
    db.query('SELECT * FROM projects', (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Error fetching projects' });
        return;
      }
      res.json(results);
    });
  },

  getProjectById: (req, res) => {
    const projectId = req.params.id;
    db.query('SELECT * FROM projects WHERE id = ?', [projectId], (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Error fetching project' });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ error: 'Project not found' });
        return;
      }
      res.json(results[0]);
    });
  },
 // Criar um novo projeto com validações
  createProject: (req, res) => {

     // Defina as validações usando express-validator
     const erros = validationResult(req);
     if (!erros.isEmpty()) {
      return res.status(400).json({ erros: erros.array()});
     }


    const { name, number, client_id, location_id } = req.body;


    // Realize a inserção no banco de dados
    db.query(
      'INSERT INTO projects (name, number, client_id, location_id) VALUES (?, ?, ?, ?)',
      [name, number , client_id, location_id],
      (error, results) => {
        if (error) {
          res.status(500).json({ error: 'Erro ao criar. Validar Info' });
          return;
        }
        res.status(201).json({ id: results.insertId, name, number, client_id, location_id});
      }
    );
  },

  updateProject: (req, res) => {
    const projectId = req.params.id;
    const { name, number, client_id, location_id } = req.body;
    db.query(
      'UPDATE projects SET name = ?, number = ?, client_id = ?, location_id = ? WHERE id = ?',
      [name, number, client_id, location_id, projectId],
      (error, results) => {
        if (error) {
          res.status(500).json({ error: 'Error updating project' });
          return;
        }
        res.json({ id: projectId, name });
      }
    );
  },

  deleteProject: (req, res) => {
    const projectId = req.params.id;
    db.query('DELETE FROM projects WHERE id = ?', [projectId], (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Error deleting project' });
        return;
      }
      res.json({ message: 'Project deleted successfully' });
    });
  },
};

export default projectController;
