const express = require('express');
const { authRequired, allow } = require('../middlewares/auth');
const authController = require('../controllers/authController');
const productsController = require('../controllers/productsController');
const eventsController = require('../controllers/eventsController');
const buildsController = require('../controllers/buildsController');
const contactsController = require('../controllers/contactsController');
const usersController = require('../controllers/usersController');
const settingsController = require('../controllers/settingsController');

const router = express.Router();

// Public reads
router.get('/products', productsController.getProducts);
router.get('/events', eventsController.getEvents);
router.get('/builds', buildsController.getBuilds);
router.get('/settings', settingsController.readSettings);

// Public actions
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/contact', contactsController.createContact);

// Admin auth
router.post('/admin/login', authController.adminLogin);
router.get('/admin/me', authRequired, authController.adminMe);

// Admin/employee protected CRUD
router.post('/products', authRequired, allow('products:write'), productsController.saveProducts);
router.post('/events', authRequired, allow('events:write'), eventsController.saveEvents);
router.post('/builds', authRequired, allow('builds:write'), buildsController.saveBuilds);

router.get('/contact', authRequired, allow('contacts:read'), contactsController.getContacts);
router.delete('/contact/:id', authRequired, allow('contacts:write'), contactsController.removeContact);

router.get('/users', authRequired, allow('users:read'), usersController.getUsers);
router.delete('/users/:id', authRequired, allow('users:write'), usersController.removeUser);

router.post('/hero-video', authRequired, allow('settings:write'), settingsController.upload.single('video'), settingsController.uploadHeroVideo);
router.delete('/hero-video', authRequired, allow('settings:write'), settingsController.deleteHeroVideo);

module.exports = router;
