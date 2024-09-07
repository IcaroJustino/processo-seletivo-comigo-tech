const prisma = require('../prisma/client');


exports.getContacts = async (req, res) => {
    try {
        const contacts = await prisma.contact.findMany();
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch contacts' });
    }
}


exports.getContactById = async (req, res) => {
    const { id } = req.params;

    try {
        const contact = await prisma.contact.findUnique({ where: { id } });

        if (!contact) {
            return res.status(404).json({ error: 'Contact not found' });
        }

        res.json(contact);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch contact' ,error});
    }
}

exports.createContact = async (req, res) => {
    const { typeName} = req.body;

    if (!typeName) {
        return res.status(400).json({ error: 'Tipo de contato é obrigatorio' });
    }

    const Checkexists = await prisma.contact.findFirst({
        where: {
            typeName: typeName
        }
    });

    if (Checkexists) {
        return res.status(400).json({ error: 'Tipo de contato já existe' });
    }

    try {
        const contact = await prisma.contact.create({
            data: {
                typeName
            }
        });
        res.status(201).json(contact);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create contact' });
    }
}

exports.updateContact = async (req, res) => {
    const { id } = req.params;
    const { typeName } = req.body;

    if (!typeName) {
        return res.status(400).json({ error: 'Tipo de contato é obrigatorio' });
    }

    try {
        const contact = await prisma.contact.findUnique({ where: { id } });
        if (!contact) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        const updatedContact = await prisma.contact.update({
            where: { id },
            data: { typeName }
        });

        res.json(updatedContact);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update contact' });
    }
}


exports.deleteContact = async (req, res) => {
    const { id } = req.params;

    try {
        const contact = await prisma.contact.findUnique({ where: { id } });
        if (!contact) {
            return res.status(404).json({ error: 'Contact not found' });
        }

        await prisma.contact.delete({ where: { id } });

        res.json({ message: 'Contact deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete contact' });
    }
}

