const LinkModel = require('../models/linkModel');
const TopicModel = require('../models/topicModel');

const topicController = {

    // metodo para renderizar la vista

    renderHome: (req, res) => {
        const topics = TopicModel.getAll();
        const topicWithLinks = topics.map(topic => ({
            ...topic,
            links: LinkModel.getByTopicId(topic.id)
        }));
        // Enviamos y injectamos el objeto topics
        res.render('index', { topics: topicWithLinks });
    },

    getTopics: (req, res) => {

        const topics = TopicModel.getAll();
        // Une topics con sus links correspondientes
        const topicWithLinks = topics.map(topic => {
            return {
                ...topic,
                links: LinkModel.getByTopicId(topic.id)
            }
        });

        res.json(topicWithLinks);
    },

    createTopic: (req, res) => {
        const { titulo } = req.body;
        if (!titulo) return res.status(400).json({ error: "Titulo requerido" });

        const newTopic = TopicModel.create(titulo);
        // Devolvemos el topic con un array de links vacio por consistencia
        res.status(201).json({ ...newTopic, links: [] });
    },

    deleteTopic: (req, res) => {
        const { id } = req.params;
        const success = TopicModel.delete(id);

        if (success) {
            // Aca se podria llamar a LinkModel para borrar links huerfanos
            res.json({ success: true });
        } else {
            res.status(400).json({ error: "Topic no encontrado" });
        }
    },

    voteTopic: (req, res) => {
        const { id } = req.params;
        const topic = TopicModel.upVote(id);
        if (topic) res.json(topic);
        else res.status(404).json({ error: "Topic no encontrado" });
    }
};

module.exports = topicController;
