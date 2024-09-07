const prisma = require('../prisma/client');


exports.getReasons = async (req, res) => {
    try {
        const reasons = await prisma.ticketReason.findMany();
        res.json(reasons);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch reasons' });
    }
}


exports.createReason = async (req, res) => {
    const { reason,description} = req.body;

    if (!reason || !description) {
        return res.status(400).json({ error: 'Reason and description are required fields' });
    }

    const Checkexists = await prisma.ticketReason.findFirst({
        where: {
            reason
        }
    });

    if (Checkexists) {
        return res.status(400).json({ error: 'Motivo já existe' });
    }

    try {
        const newReason = await prisma.ticketReason.create({
            data: {
            reason,
            description
            }
        });
        res.status(201).json(newReason);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create reason' ,});
    }
}

exports.getresionById = async (req, res) => {
    const { id } = req.params;

    try {
        const reason = await prisma.ticketReason.findUnique({ where: { id } });

        if (!reason) {
            return res.status(404).json({ error: 'Reason not found' });
        }

        res.json(reason);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch reason' });
    }
}

exports.updateReason = async (req, res) => {
    const { id } = req.params;
    const { reason, description } = req.body;

    if (!reason || !description) {
        return res.status(400).json({ error: 'Reason and description are required fields' });
    }

    try {
        const reason = await prisma.ticketReason.update({
            where: { id },
            data: { reason, description }
        });

        res.json(reason);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update reason' });
    }
}

exports.deleteReason = async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.ticketReason.delete({ where: { id } });
        res.json({ message: 'Reason deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete reason' });
    }
}
