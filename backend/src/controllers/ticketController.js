const prisma = require('../prisma/client');

const requiredFields = {
    title: 'title',
    description: 'description',
    statusId: 'statusId',
    contactId: 'contactId',
    veichleId: 'veichleId',
    estimatedTime: 'estimatedTime'
};

exports.createTicket = async (req, res) => {
    
    const { title, description, statusId, hasContact, contactId ,reasonId,veichleId,estimatedTime  } = req.body;

    const missingFields = Object.keys(requiredFields).filter(field => !req.body[field]);

    if (missingFields.length > 0) {
        return res.status(400).json({ error: `Missing required fields: [${missingFields.join(' , ')}]` });
    }

    try {
        const ticket = await prisma.ticket.create({
            data: {
                title,
                contactId,
                veichleId,
                reasonId: reasonId || null,
                description,
                statusId,
                userId : req.user.userId,
                hasContact: hasContact|| false,
                estimatedTime
            }
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
            include: { user: {select:{ email :true, name:true} }, status: true, contact: true, veichle: true, reason: true }
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
            where: { id: id, userId: req.user.userId },
            include: { user: {select:{ email :true, name:true} }, status: true, contact: true, veichle: true, reason: true }
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
    const { title, description, statusId } = req.body;
    const userId = req.user.userId;

    if (!title || !description || !statusId) {
        return res.status(400).json({ error: 'Title, description, and status are required' });
    }

    try {
        const ticket = await prisma.ticket.findUnique({ where: { id, userId } });
        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }

        const updatedTicket = await prisma.ticket.update({
            where: { id: id, userId: req.user.userId },
            data: { title, description, statusId}
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
        const ticket = await prisma.ticket.findUnique({ where: { id: id, userId } });
        console.log(ticket)
        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }


        await prisma.ticket.delete({ where: { id: id } });
        res.status(204).send();
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to delete ticket' });
    }
};
