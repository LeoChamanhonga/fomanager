// index.js
import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/api.js';

const app = express();
//const PORT = process.env.PORT || 8800;

app.use(cors());
app.use(express.json());

//app.use('/api', apiRoutes);
app.use('/', apiRoutes);

app.listen(8800);

