import { db } from '../db.js';

const locationsController = {
  // Obter todas as localizações
  getAllLocations: (req, res) => {
    db.query('SELECT * FROM locations', (error, results) => {
      if (error) {
        console.error('Error fetching locations:', error);
        res.status(500).json({ error: 'Error fetching locations' });
        return;
      }
      res.json(results);
    });
  },

  // Obter uma localização por ID
  getLocationById: (req, res) => {
    const locationId = req.params.id;
    db.query('SELECT * FROM locations WHERE id = ?', [locationId], (error, results) => {
      if (error) {
        console.error('Error fetching location by ID:', error);
        res.status(500).json({ error: 'Error fetching location by ID' });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ error: 'Location not found' });
        return;
      }
      res.json(results[0]);
    });
  },

  // Criar uma nova localização
  createLocation: (req, res) => {
    const { latitude, longitude, address } = req.body;
    db.query(
      'INSERT INTO locations (address) VALUES (?)',
      [latitude, longitude, address],
      (error, results) => {
        if (error) {
          console.error('Error creating location:', error);
          res.status(500).json({ error: 'Error creating location' });
          return;
        }
        res.json({ id: results.insertId, address });
      }
    );
  },

  // Atualizar uma localização existente
  updateLocation: (req, res) => {
    const locationId = req.params.id;
    const { latitude, longitude, address } = req.body;
    db.query(
      'UPDATE locations SET address = ? WHERE id = ?',
      [latitude, longitude, address, locationId],
      (error) => {
        if (error) {
          console.error('Error updating location:', error);
          res.status(500).json({ error: 'Error updating location' });
          return;
        }
        res.json({ id: address });
      }
    );
  },

  // Excluir uma localização
  deleteLocation: (req, res) => {
    const locationId = req.params.id;
    db.query('DELETE FROM locations WHERE id = ?', [locationId], (error) => {
      if (error) {
        console.error('Error deleting location:', error);
        res.status(500).json({ error: 'Error deleting location' });
        return;
      }
      res.json({ message: 'Location deleted successfully' });
    });
  },
};

export default locationsController;
