const prisma = require('../prisma/client');

exports.createTicket = async (req, res) => {
    const { title, description, status } = req.body;
    const userId = req.user.userId;

    if (!title || !description || !status) {
        return res.status(400).json({ error: 'Title, description, and status are required' });
    }

    try {
        const ticket = await prisma.ticket.create({
            data: { title, description, status, userId }
        });
        res.status(201).json(ticket);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create ticket' });
    }
};

exports.getTickets = async (req, res) => {
    try {
        const tickets = await prisma.ticket.findMany({
            where: { userId: req.user.userId },
            include: { user: true }
        });
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tickets' });
    }
};

exports.getTicketById = async (req, res) => {
    const { id } = req.params;

    try {
        const ticket = await prisma.ticket.findUnique({
            where: { id: parseInt(id), userId: req.user.userId },
            include: { user: true }
        });

        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }

        res.json(ticket);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch ticket' });
    }
};

exports.updateTicket = async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const userId = req.user.userId;

    if (!title || !description || !status) {
        return res.status(400).json({ error: 'Title, description, and status are required' });
    }

    try {
        const ticket = await prisma.ticket.findUnique({ where: { id: parseInt(id), userId } });
        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }

        const updatedTicket = await prisma.ticket.update({
            where: { id: parseInt(id) },
            data: { title, description, status }
        });

        res.json(updatedTicket);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update ticket' });
    }
};

exports.deleteTicket = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;

    try {
        const ticket = await prisma.ticket.findUnique({ where: { id: parseInt(id), userId } });
        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }

        await prisma.ticket.delete({ where: { id: parseInt(id) } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete ticket' });
    }
};
