const express = require('express');
const asyncHandler = require('express-async-handler');
const { User, Map } = require('../../db/models');
const { resourceNotFound } = require('../../utils/validation');
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

}));

// deleting a specific map
router.delete('/:id(\\d+)', asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const mapToDelete = await Map.findByPk(id);

  if (mapToDelete) {
    await mapToDelete.destroy();
    res.json({ id });
  } else {
    // if a map with that id cannot be found, we want to send the error from resourceNotFound down to our error middleware
    next(resourceNotFound(id));
  }
}));

router.put('/:id(\\d+)', asyncHandler( async (req, res) => {
  const { id } = req.params;
  const { hexagons, startingAttrs } = req.body;

  const mapToEdit = await Map.findByPk(id);

  if (mapToEdit) {
    mapToEdit.hexagons = hexagons;
    mapToEdit.startingAttrs = startingAttrs;
    await mapToEdit.save();
    res.json({ map: mapToEdit });
  } else {
    // if a map with that id cannot be found, we want to send the error from resourceNotFound down to our error middleware
    next(resourceNotFound(id));
  }
}))


module.exports = router;