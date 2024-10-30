const express = require('express');
const router = express.Router();
const User = require('../Model/User');

// Create - add a new user
router.post('/api/users', async(req, res) =>{
    try {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            age: req.body.age
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch(error) {
        res.status(500).json({message: 'Error creating user', error: error.message});
    }
});

// Get user
router.get('/api/users', async(req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch(error) {
        res.status(500).json({message: 'Error fetching users', error: error.message});
    }
});

// get user by id
router.get('/api/users/:id', async(req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user) return res.status(404).json({message: 'User not found'});
        res.status(200).json(user);
    } catch(error) {
        res.status(500).json({message: 'Error fetching user', error: error.message});
    }
});

// update user
router.put('/api/users/:id', async(req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id,
        {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        }, {new: true});

        if(!updatedUser) return res.status(404).json({message: 'User not found'});
        res.status(200).json(updatedUser);
    } catch(error) {
        res.status(500).json({message: 'Error updating user', error: error.message});
    }
});
//  delete user
router.delete('/api/users/:id', async(req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if(!deletedUser) return res.status(404).json({message: 'User not found'});
        res.status(204).json();
    } catch(error) {
        res.status(500).json({message: 'Error deleting user', error: error.message});
    }
});

module.exports = router;