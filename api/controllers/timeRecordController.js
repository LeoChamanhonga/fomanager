
import {db} from '../db.js';

const timeRecordController = {
  getAllTimeRecords: (req, res) => {
    db.query('SELECT * FROM time_records', (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Error fetching time records' });
        return;
      }
      res.json(results);
    });
  },

  getTimeRecordById: (req, res) => {
    const timeRecordId = req.params.id;
    db.query('SELECT * FROM time_records WHERE id = ?', [timeRecordId], (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Error fetching time record' });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ error: 'Time record not found' });
        return;
      }
      res.json(results[0]);
    });
  },

  createTimeRecord: (req, res) => {
    const { start_time, end_time, hour_type, date, user_id, project_id, category_id } = req.body;
    db.query(
      'INSERT INTO time_records (start_time, end_time, hour_type, date, user_id, project_id, category_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [start_time, end_time, hour_type, date, user_id, project_id, category_id],
      (error, results) => {
        if (error) {
          res.status(500).json({ error: 'Error creating time record' });
          return;
        }
        res.status(201).json({ id: results.insertId, ...req.body });
      }
    );
  },

  updateTimeRecord: (req, res) => {
    const timeRecordId = req.params.id;
    const { start_time, end_time, hour_type, date, user_id, project_id, category_id } = req.body;
    db.query(
      'UPDATE time_records SET start_time = ?, end_time = ?, hour_type = ?, date = ?, user_id = ?, project_id = ?, category_id = ? WHERE id = ?',
      [start_time, end_time, hour_type, date, user_id, project_id, category_id, timeRecordId],
      (error, results) => {
        if (error) {
          res.status(500).json({ error: 'Error updating time record' });
          return;
        }
        res.json({ id: timeRecordId, ...req.body });
      }
    );
  },

  deleteTimeRecord: (req, res) => {
    const timeRecordId = req.params.id;
    db.query('DELETE FROM time_records WHERE id = ?', [timeRecordId], (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Error deleting time record' });
        return;
      }
      res.json({ message: 'Time record deleted successfully' });
    });
  },
};

export default timeRecordController;
