const express = require('express');
const contactController = require('../controllers/contactController');
const { authenticateToken } = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/roleMiddleware');
const router = express.Router();


// Somente administradores podem atualizar as opções de contato
router.post('/contact', authenticateToken, checkRole('ADMIN'),contactController.createContact);
router.get('/contacts', authenticateToken,contactController.getContacts);
router.get('/contact/:id', authenticateToken,contactController.getContactById);
router.put('/contact/:id', authenticateToken, checkRole('ADMIN'),contactController.updateContact);
router.delete('/contact/:id', authenticateToken, checkRole('ADMIN'), contactController.deleteContact);

module.exports = router;
