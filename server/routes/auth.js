const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');


//Register New User
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(409).json({ message: 'Username or email already exists.' })
        }
    } catch (error) {
        console.log(error);
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        const user = await newUser.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Oops! Something went wrong!' });
    }
});

//Sign In
router.post('/sign-in', async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const user = await User.findOne({ username });
        !user && res.status(404).json({ message: 'User not found.' });

        const validPassword = await bcrypt.compare(password, user.password);
        !validPassword && res.status(401).json({ message: 'Invalid credentials.' })

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Oops! Something went wrong!' });
    }
})

module.exports = router;
