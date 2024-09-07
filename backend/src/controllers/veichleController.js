const prisma = require('../prisma/client');

exports.getVeichles = async (req, res) => {
    try {
        const veichles = await prisma.veichle.findMany();
        res.json(veichles);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch veichles' });
    }
}


exports.getveichlebyId = async (req, res) => {
    const { id } = req.params;

    try {
        const veichle = await prisma.veichle.findUnique({ where: { id } });

        if (!veichle) {
            return res.status(404).json({ error: 'Veichle not found' });
        }

        res.json(veichle);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch veichle' });
    }
}


exports.createVeichle = async (req, res) => {
    const { plate, model, color } = req.body;

    if (!plate || !model || !color) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const Checkexists = await prisma.veichle.findFirst({
        where: {
            plate
        }
    });

    if (Checkexists) {
        return res.status(400).json({ error: 'Veichle already exists' });
    }

    try {
        const veichle = await prisma.veichle.create({
            data: {
                plate,
                model,
                color
            }
        });
        res.status(201).json(veichle);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create veichle' });
    }
}

exports.updateVeichle = async (req, res) => {
    const { id } = req.params;
    const { plate, model, color } = req.body;

    if (!plate || !model || !color ) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const veichle = await prisma.veichle.findUnique({ where: { id } });
        if (!veichle) {
            return res.status(404).json({ error: 'Veichle not found' });
        }

        const updatedVeichle = await prisma.veichle.update({
            where: { id },
            data: { plate, model, color}
        });

        res.json(updatedVeichle);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update veichle' });
    }
}

exports.deleteVeichle = async (req, res) => {
    const { id } = req.params;

    try {
        const veichle = await prisma.veichle.findUnique({ where: { id } });
        if (!veichle) {
            return res.status(404).json({ error: 'Veichle not found' });
        }

        await prisma.veichle.delete({ where: { id } });
        res.json({ message: 'Veichle deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete veichle' });
    }
}