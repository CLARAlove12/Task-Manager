const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/task.controller');

router.get('/', TaskController.getAll);
router.get('/:id', TaskController.getOne);
router.post('/', TaskController.create);
router.put('/:id', TaskController.update);
router.delete('/:id', TaskController.remove);

module.exports = router;