const express = require('express');
const veichleController = require('../controllers/veichleController');
const { authenticateToken } = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/roleMiddleware');
const router = express.Router();


// Somente administradores podem atualizar as opções de contato
router.post('/veichle', authenticateToken, checkRole('ADMIN'),veichleController.createVeichle);
router.get('/veichles', authenticateToken,veichleController.getVeichles);
router.get('/veichle/:id', authenticateToken,veichleController.getveichlebyId);
router.put('/veichle/:id', authenticateToken, checkRole('ADMIN'),veichleController.updateVeichle);
router.delete('/veichle/:id', authenticateToken, checkRole('ADMIN'), veichleController.deleteVeichle);

module.exports = router;
