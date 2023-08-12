// controllers/userController.js
import {db} from '../db.js';

const userController = {
  getAllUsers: (req, res) => {
    db.query('SELECT * FROM users', (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Error fetching users' });
        return;
      }
      res.json(results);
    });
  },

  getUserById: (req, res) => {
    const userId = req.params.id;
    db.query('SELECT * FROM users WHERE id = ?', [userId], (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Error fetching user' });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      res.json(results[0]);
    });
  },

  createUser: (req, res) => {
    const { username, password } = req.body;
    db.query(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, password],
      (error, results) => {
        if (error) {
          res.status(500).json({ error: 'Error creating user' });
          return;
        }
        res.status(201).json({ id: results.insertId, username });
      }
    );
  },

  updateUser: (req, res) => {
    const userId = req.params.id;
    const { username, password } = req.body;
    db.query(
      'UPDATE users SET username = ?, password = ? WHERE id = ?',
      [username, password, userId],
      (error, results) => {
        if (error) {
          res.status(500).json({ error: 'Error updating user' });
          return;
        }
        res.json({ id: userId, username });
      }
    );
  },

  deleteUser: (req, res) => {
    const userId = req.params.id;
    db.query('DELETE FROM users WHERE id = ?', [userId], (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Error deleting user' });
        return;
      }
      res.json({ message: 'User deleted successfully' });
    });
  },
};

export default userController;
