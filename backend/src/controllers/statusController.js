const prisma = require('../prisma/client');

exports.getstatus = async (req, res) => {
    try {
        const status = await prisma.status.findMany();
        res.json(status);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch status' });
    }
}


exports.createStatus = async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Status is required' });
    }

    const Checkexists = await prisma.status.findFirst({
        where: {
            name
        }
    });

    if (Checkexists) {
        return res.status(400).json({ error: 'Status already exists' });
    }

    try {
        const newStatus = await prisma.status.create({
            data: {
                name
            }
        });
        res.status(201).json(newStatus);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create status' });
    }
}

exports.getstatusById = async (req, res) => {
    const { id } = req.params;

    try {
        const status = await prisma.status.findUnique({ where: { id } });

        if (!status) {
            return res.status(404).json({ error: 'Status not found' });
        }

        res.json(status);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch status' });
    }
}


exports.updateStatus = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }

    try {
        const status = await prisma.status.findUnique({ where: { id } });
        if (!status) {
            return res.status(404).json({ error: 'Status not found' });
        }

        const updatedStatus = await prisma.status.update({
            where: { id },
            data: { name }
        });

        res.json(updatedStatus);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update status' });
    }
}

exports.deleteStatus = async (req, res) => {
    const { id } = req.params;

    try {
        const status = await prisma.status.findUnique({ where: { id } });
        if (!status) {
            return res.status(404).json({ error: 'Status not found' });
        }

        await prisma.status.delete({ where: { id } });

        res.json({ message: 'Status deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete status' });
    }
}