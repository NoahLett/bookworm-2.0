const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

//Update User
router.put('/:id', async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (error) {
                return res.status(500).json(error);
            }
        } 
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json({ message: 'Account has been updated successfully.' })
        } catch (error) {
            return res.status(500).json(error);
        }
    } else {
        return res.status(403).json({ message: 'You are not authorized to make changes to this account.' })
    }
})

//Delete User
router.delete('/:id', async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: 'Account has been deleted successfully.' })
        } catch (error) {
            return res.status(500).json(error);
        }
    } else {
        return res.status(403).json({ message: 'You are not authorized to make changes to this account.' })
    }
})

//Get One User
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, updatedAt, ...others } = user._doc;
        res.status(200).json(others);
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

module.exports = router;
