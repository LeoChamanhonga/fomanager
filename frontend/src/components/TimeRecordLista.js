import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TimeRecordList = () => {
  const [timeRecords, setTimeRecords] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/time_records')
      .then(response => {
        setTimeRecords(response.data);
      })
      .catch(error => {
        console.error('Error fetching time records:', error);
      });
  }, []);

  return (
    <div>
      <h2>Lista de Registros de Tempo</h2>
      <ul>
        {timeRecords.map(record => (
          <li key={record.id}>{record.start_time} - {record.end_time}</li>
        ))}
      </ul>
    </div>
  );
};

export default TimeRecordList;
