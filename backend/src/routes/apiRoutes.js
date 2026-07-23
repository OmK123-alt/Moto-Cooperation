const express = require('express');
const { authRequired, allow } = require('../middlewares/auth');
const authController = require('../controllers/authController');
const productsController = require('../controllers/productsController');
const eventsController = require('../controllers/eventsController');
const buildsController = require('../controllers/buildsController');
const contactsController = require('../controllers/contactsController');
const usersController = require('../controllers/usersController');
const settingsController = require('../controllers/settingsController');
const { asyncHandler } = require('../utils/asyncHandler');

const router = express.Router();

// Public reads
router.get('/products', asyncHandler(productsController.getProducts));
router.get('/events', asyncHandler(eventsController.getEvents));
router.get('/builds', asyncHandler(buildsController.getBuilds));
router.get('/settings', asyncHandler(settingsController.readSettings));

// Public actions
router.post('/register', asyncHandler(authController.register));
router.post('/login', asyncHandler(authController.login));
router.post('/contact', asyncHandler(contactsController.createContact));

// Admin auth
router.post('/admin/login', asyncHandler(authController.adminLogin));
router.get('/admin/me', authRequired, asyncHandler(authController.adminMe));

// Admin/employee protected CRUD
router.post('/products', authRequired, allow('products:write'), asyncHandler(productsController.saveProducts));
router.post('/events', authRequired, allow('events:write'), asyncHandler(eventsController.saveEvents));
router.post('/builds', authRequired, allow('builds:write'), asyncHandler(buildsController.saveBuilds));

router.get('/contact', authRequired, allow('contacts:read'), asyncHandler(contactsController.getContacts));
router.delete('/contact/:id', authRequired, allow('contacts:write'), asyncHandler(contactsController.removeContact));

router.get('/users', authRequired, allow('users:read'), asyncHandler(usersController.getUsers));
router.delete('/users/:id', authRequired, allow('users:write'), asyncHandler(usersController.removeUser));

router.post('/hero-video', authRequired, allow('settings:write'), settingsController.upload.single('video'), asyncHandler(settingsController.uploadHeroVideo));
router.delete('/hero-video', authRequired, allow('settings:write'), asyncHandler(settingsController.deleteHeroVideo));

module.exports = router;
