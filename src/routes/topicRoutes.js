const express = require('express');
const router = express.Router();
const TopicController = require('../controllers/topicController');
const LinkController = require('../controllers/linkController');

// Ruta para obtener solo el fragmento HTML actualizado
router.get('/components/topic-list', TopicController.getTopicsHTML);

// Rutas de TOPICS

router.get('/topics', TopicController.getTopics);
router.post('/topics', TopicController.createTopic);
router.patch('/topics/:id', TopicController.updateTopic);
router.delete('/topics/:id', TopicController.deleteTopic);
router.patch('/topics/:id/vote', TopicController.voteTopic);

// Rutas de LINKS

router.post('/topics/:id/links', LinkController.addLink);
router.patch('/topics/:id/links/:linkId', LinkController.updateLink);
router.patch('/topics/:id/links/:linkId/vote', LinkController.voteLink);
router.delete('/topics/:id/links/:linkId', LinkController.deleteLink);

module.exports = router;