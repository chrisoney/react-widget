const express = require('express');
const asyncHandler = require('express-async-handler');
const { User, Map } = require('../../db/models');
const router = express.Router();

// new map
router.post('/', asyncHandler(async (req, res) => {
  const { startingAttrs, userId } = req.body;
  const newMap = await Map.create({
    userId,
    hexagons: "[{ x: 0, y: 0, color: 'blue' }]",
    startingAttrs,
  })

  res.json({ map: newMap });
}))


// getting a specific map
router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
  const { id } = req.params;

  const map = await Map.findByPk(id);

  res.json({ map })

}))


module.exports = router;