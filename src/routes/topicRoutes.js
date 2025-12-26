const express = require('express');
const router = express.Router();
const topicController = require('../controllers/topicController');

// Definimos las rutas

router.get('/topics', topicController.getTopics);
router.patch('/topics/:id/vote', topicController.voteTopic);

module.exports = router;