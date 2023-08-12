// controllers/categoryController.js
import {db} from '../db.js';

const categoryController = {
  // Obter todas as categorias
  getAllCategories: (req, res) => {
    db.query('SELECT * FROM categories', (error, results) => {
      if (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Error fetching categories' });
        return;
      }
      res.json(results);
    });
  },

  // Obter uma categoria por ID
  getCategoryById: (req, res) => {
    const categoryId = req.params.id;
    db.query('SELECT * FROM categories WHERE id = ?', [categoryId], (error, results) => {
      if (error) {
        console.error('Error fetching category by ID:', error);
        res.status(500).json({ error: 'Error fetching category by ID' });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ error: 'Category not found' });
        return;
      }
      res.json(results[0]);
    });
  },

  // Criar uma nova categoria
  createCategory: (req, res) => {
    const { name } = req.body;
    db.query('INSERT INTO categories (name) VALUES (?)', [name], (error, results) => {
      if (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ error: 'Error creating category' });
        return;
      }
      res.json({ id: results.insertId, name });
    });
  },

  // Atualizar uma categoria existente
  updateCategory: (req, res) => {
    const categoryId = req.params.id;
    const { name } = req.body;
    db.query('UPDATE categories SET name = ? WHERE id = ?', [name, categoryId], (error) => {
      if (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ error: 'Error updating category' });
        return;
      }
      res.json({ id: categoryId, name });
    });
  },

  // Excluir uma categoria
  deleteCategory: (req, res) => {
    const categoryId = req.params.id;
    db.query('DELETE FROM categories WHERE id = ?', [categoryId], (error) => {
      if (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ error: 'Error deleting category' });
        return;
      }
      res.json({ message: 'Category deleted successfully' });
    });
  }
};

export default categoryController;
