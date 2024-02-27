const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

//Update User
router.put('/:id', async (req, res) => {
    if (req.body.userId === req.params.id || req.user.isAdmin) {
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


//Get One User


//

module.exports = router;
