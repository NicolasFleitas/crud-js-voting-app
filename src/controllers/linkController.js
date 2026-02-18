const LinkModel = require('../models/linkModel');
const TopicModel = require('../models/topicModel');

const LinkController = {
    addLink: (req, res) => {
        const { id } = req.params; // Este es el topicId que viene en la URL
        const { url } = req.body;

        if (!url) return res.status(400).json({ error: "URL requerida" });

        // Validacion de integridad. Verifica si existe el topic para add link.
        const topic = TopicModel.getAll().find(t => t.id == id);

        if (!topic) {
            return res.status(400).json({ error: "El tema no existe" });
        }

        const newLink = LinkModel.create(id, url);
        res.status(201).json(newLink);
    },

    voteLink: (req, res) => {
        const { linkId } = req.params;
        const updatedLink = LinkModel.vote(linkId);

        if (updatedLink) {
            res.json(updatedLink);
        } else {
            res.status(404).json({ error: "Link no encontrado" });
        }
    },

    deleteLink: (req, res) => {
        const { linkId } = req.params;
        const success = LinkModel.delete(linkId);

        if (success) {
            res.json({ success: true });
        } else {
            res.status(404).json({ error: "No se pudo eliminar el link" });
        }
    },

    updateLink: (req, res) => {
        const { linkId } = req.params;
        const { url } = req.body;
        if (!url) return res.status(400).json({ error: "URL requerida" });

        const updatedLink = LinkModel.update(linkId, url);
        if (updatedLink) res.json(updatedLink);
        else res.status(404).json({ error: "Link no encontrado" });
    }
};

module.exports = LinkController;