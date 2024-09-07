const express = require('express');
const statusController = require('../controllers/statusController');
const { authenticateToken } = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/roleMiddleware');
const router = express.Router();


// Somente administradores podem atualizar as opções de contato
router.post('/status', authenticateToken, checkRole('ADMIN'),statusController.createStatus);
router.get('/status', authenticateToken,statusController.getstatus);
router.get('/status/:id', authenticateToken,statusController.getstatusById);
router.put('/status/:id', authenticateToken, checkRole('ADMIN'),statusController.updateStatus);
router.delete('/status/:id', authenticateToken, checkRole('ADMIN'), statusController.deleteStatus);

module.exports = router;
