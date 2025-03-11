const Track = require('../models/track.js');
const express = require('express');
const router = express.Router();

//== CRUD routes ==============================================

//CREATE - POST - /tracks
router.post('/', async (req, res) => {
    try {
        const createdTrack = await Track.create(req.body);

        res.status(201).json(createdTrack);
    } catch (err) {
        res.status(500).json({ err: err.message });
    };
});

// READ - GET - /tracks

router.get('/', async (req, res) => {
    try {
        const foundTracks = await Track.find();
        res.status(200).json(foundTracks);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});


// SHOW SPECIFIC TRACK - READ - GET - /tracks/:id

router.get('/:id', async (req, res) => {
    try {
        
        const foundTrack = await Track.findById(req.params.id);
        
        if (!foundTrack) {
            res.status(404)
            throw new Error('Pet not found.');
        }

        res.status(200).json(foundTrack);
    } catch (err) {
        if (res.statusCode === 404) {
            res.json({ err: err.message });
        } else {
            res.status(500).json({ err: err.message });
        }
    }
});


// DELETE - /tracks/:id

router.delete('/:id', async (req, res) => {
    try {
        const deletedTrack = await Track.findByIdAndDelete(req.params.id);

        res.status(200).json(`Successfully deleted ${deletedTrack}.`);
    } catch (err) {
        if (res.statusCode === 404) {
            res.json({ err: err.message });
        } else {
            res.status(500).json({ err: err.message });
        }
    };
});

// UPDATE - PUT - /tracks/:id

router.put('/:id', async (req, res) => {
    try {
        
        const updatedTrack = await Track.findByIdAndUpdate(req.params.id, req.body);

        if (!updatedTrack) {
            res.status(404);
            throw new Error('Track not found');
        }

        res.status(200).json(updatedTrack);
    } catch (err) {
        if (res.statusCode === 404) {
            res.json({ err: err.message });
        } else {
            res.status(500).json({ err: err.message });
        }
    }
});


//=============================================================

module.exports = router;