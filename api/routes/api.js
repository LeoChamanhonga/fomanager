// routes/api.js
import express from 'express';
import { check } from 'express-validator';
import userController from '../controllers/userController.js';
import clientController from '../controllers/clientController.js';
import projectController from '../controllers/projectController.js';
import categoryController from '../controllers/categoryController.js';
import employeeController from '../controllers/employeeController.js';
import timeRecordController from '../controllers/timeRecordController.js';
import locationController from '../controllers/locationController.js';

const router = express.Router();

// Rotas para Usuários
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

// Rotas para Clientes
router.get('/clients', clientController.getAllClients);
router.get('/clients/:id', clientController.getClientById);
router.post('/clients', clientController.createClient);
router.put('/clients/:id', clientController.updateClient);
router.delete('/clients/:id', clientController.deleteClient);

// Rotas para Projetos
router.get('/projects', projectController.getAllProjects);
router.get('/projects/:id', projectController.getProjectById);
router.post(
    '/projects',
    [
        // Defina as regras de validação para os campos
        check(name).notEmpty().withMessage('Campo Obrigatorio'),
        check(number).notEmpty().withMessage('ccc'),
        check('client_id').notEmpty().withMessage('cccc'),
        check('location_id').notEmpty().withMessage('gggg'),

    ],
    
    projectController.createProject
);
router.put('/projects/:id', projectController.updateProject);
router.delete('/projects/:id', projectController.deleteProject);

// Rotas para Categorias
router.get('/categories', categoryController.getAllCategories);
router.get('/categories/:id', categoryController.getCategoryById);
router.post('/categories', categoryController.createCategory);
router.put('/categories/:id', categoryController.updateCategory);
router.delete('/categories/:id', categoryController.deleteCategory);

// Rotas para Funcionários
router.get('/employees', employeeController.getAllEmployees);
router.get('/employees/:id', employeeController.getEmployeeById);
router.post('/employees', employeeController.createEmployee);
router.put('/employees/:id', employeeController.updateEmployee);
router.delete('/employees/:id', employeeController.deleteEmployee);

// Rotas para Registros de Tempo
router.get('/time_records', timeRecordController.getAllTimeRecords);
router.get('/time_records/:id', timeRecordController.getTimeRecordById);
router.post('/time_records', timeRecordController.createTimeRecord);
router.put('/time_records/:id', timeRecordController.updateTimeRecord);
router.delete('/time_records/:id', timeRecordController.deleteTimeRecord);

// Rotas para Localizações
router.get('/locations', locationController.getAllLocations);
router.get('/locations/:id', locationController.getLocationById);
router.post('/locations', locationController.createLocation);
router.put('/locations/:id', locationController.updateLocation);
router.delete('/locations/:id', locationController.deleteLocation);

export default router;
