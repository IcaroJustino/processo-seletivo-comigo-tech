const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../prisma/client');
const logger = require('../logger');

const JWT_SECRET = process.env.JWT_SECRET;  // Idealmente, usar variável de ambiente

exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
        logger.error('Name, email, and password are required');
        return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        logger.error('User already exists');
        return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: role || 'ATTENDANT' // O cargo padrão é atendente
            }
        });
        logger.info(`User created`);
        res.status(201).json(user);
    } catch (error) {
        logger.error('Failed to create user', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
};


exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        logger.error('Name, email, and password are required');
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            logger.error('User not found');
            return res.status(400).json({ error: 'User not found' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            logger.error('Invalid credentials');
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.id, email: user.email, role : user.role }, JWT_SECRET, { expiresIn: '24h' });
        logger.info(`User logged in: ${user.email}`);
        res.json({ token });
    } catch (error) {
        logger.error('Failed to login', error);
        res.status(500).json({ error: 'Failed to login' });
    }
};
