// controllers/projectController.js
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

  createProject: (req, res) => {
    const { name, client_id, location_id } = req.body;
    db.query(
      'INSERT INTO projects (name, client_id, location_id) VALUES (?, ?, ?)',
      [name, client_id, location_id],
      (error, results) => {
        if (error) {
          res.status(500).json({ error: 'Error creating project' });
          return;
        }
        res.status(201).json({ id: results.insertId, name });
      }
    );
  },

  updateProject: (req, res) => {
    const projectId = req.params.id;
    const { name, client_id, location_id } = req.body;
    db.query(
      'UPDATE projects SET name = ?, client_id = ?, location_id = ? WHERE id = ?',
      [name, client_id, location_id, projectId],
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
