const { Router } = require('express');
const ride = require('../models/rides');
const router = Router();

// @route   GET api/rides
// @desc    Gets all rides
// @access  Private
router.get('/', async (req, res, next) => {
  try {
    const rides = await ride.find();
    res.json(rides);
  } catch (error) {
    next(error);
  }
});

// @route   POST api/rides/new
// @desc    Creates a new ride
// @access  Private
router.post('/new', async (req, res, next) => {
  try {
    const rides = new ride(req.body);
    const createdRide = await rides.save();
    res.json(createdRide);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
});

module.exports = router;
