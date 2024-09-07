const express = require('express');
const ticketController = require('../controllers/ticketController');
const { authenticateToken } = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/roleMiddleware');
const router = express.Router();

router.post('/ticket', authenticateToken, ticketController.createTicket);
router.get('/tickets', authenticateToken, ticketController.getTickets);
router.get('/ticket/:id', authenticateToken, ticketController.getTicketById);
router.put('/ticket/:id', authenticateToken, ticketController.updateTicket);


// Somente administradores podem excluir tickets
router.delete('/ticket/:id', authenticateToken, checkRole('ADMIN'), ticketController.deleteTicket);

module.exports = router;
