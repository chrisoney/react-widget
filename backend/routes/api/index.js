const express = require('express');
const router = express.Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const mapsRouter = require('./maps.js');

router.post('/test', (req, res) => {
  res.json({ success: 'meep' })
})

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/maps', mapsRouter);

module.exports = router;