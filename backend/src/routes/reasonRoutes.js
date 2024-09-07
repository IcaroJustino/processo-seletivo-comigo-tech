const express = require('express');
const reasonController = require('../controllers/reasonController');
const { authenticateToken } = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/roleMiddleware');
const router = express.Router();


// Somente administradores podem atualizar as opções de contato
router.post('/reason', authenticateToken, checkRole('ADMIN'),reasonController.createReason);
router.get('/reasons', authenticateToken,reasonController.getReasons);
router.get('/reason/:id', authenticateToken,reasonController.getresionById);
router.put('/reason/:id', authenticateToken, checkRole('ADMIN'),reasonController.updateReason);
router.delete('/reason/:id', authenticateToken, checkRole('ADMIN'), reasonController.deleteReason);

module.exports = router;
