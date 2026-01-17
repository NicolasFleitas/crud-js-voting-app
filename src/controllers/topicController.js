const LinkModel = require('../models/linkModel');
const TopicModel = require('../models/topicModel');

// Obtiene topics con sus links
const getAllTopicsWithLinks = () => {
    const topics = TopicModel.getAll();
    return topics.map(topic => ({
        ...topic,
        links: LinkModel.getByTopicId(topic.id)
    }));
};

const topicController = {

    // Llama a TopicModel para renderizar la vista
    renderHome: (_req, res) => {
        const topicsWithLinks = getAllTopicsWithLinks();
        // Renderiza la vista
        res.render('index', { topics: topicsWithLinks });
    },

    // Llama a TopicModel para renderizar el partial de topics
    getTopicsHTML: (_req, res) => {
        const topicsWithLinks = getAllTopicsWithLinks();
        // Renderiza el partial
        res.render('partials/topic-list', { topics: topicsWithLinks });
    },

    // Llama a TopicModel para devolver el JSON de la lista
    getTopics: (_req, res) => {
        const topicsWithLinks = getAllTopicsWithLinks();
        res.json(topicsWithLinks);
    },

    // Llama a TopicModel para crear un nuevo topic
    createTopic: (req, res) => {
        const { titulo } = req.body;
        if (!titulo) return res.status(400).json({ error: "Titulo requerido" });

        const newTopic = TopicModel.create(titulo);
        // Devolvemos el topic con un array de links vacio por consistencia
        res.status(201).json({ ...newTopic, links: [] });
    },

    // Llama a TopicModel para eliminar un topic
    deleteTopic: (req, res) => {
        const { id } = req.params;
        const success = TopicModel.delete(id);

        if (success) {
            res.json({ success: true });
        } else {
            res.status(400).json({ error: "Topic no encontrado" });
        }
    },

    // Llama a TopicModel para votar por un topic
    voteTopic: (req, res) => {
        const { id } = req.params;
        const topic = TopicModel.upVote(id);
        if (topic) res.json(topic);
        else res.status(404).json({ error: "Topic no encontrado" });
    }
};

module.exports = topicController;
