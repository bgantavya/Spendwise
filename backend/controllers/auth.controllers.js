const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.models');

const SignIn = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(username)
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'User not found.' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials.' });

        const secret = process.env.JWT_SECRET;
        if (!secret) {
            console.error('JWT_SECRET is not defined');
            return res.status(500).json({ message: 'Server configuration error.' });
        }
        const token = jwt.sign({ userId: user._id }, secret);
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Server error: ' + err.message });
    }
};

const SignUp = async (req, res) => {
    const { firstName, lastName, email, username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword,firstName, lastName, email });
        await user.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (err) {
        res.status(400).json({ message: 'Error registering user: ' + err.message });
    }
};

const VerifyUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ user: { username: user.username } });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user status.' });
    }
};

module.exports = { SignIn, SignUp, VerifyUser };