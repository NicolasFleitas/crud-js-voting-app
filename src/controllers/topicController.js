const TopicModel = require('../models/topicModel');
const topicModel = require('../models/topicModel');

const topicController = {
    getTopics: (req, res) => {
        const topics = topicModel.getAll();
        res.json(topics);
    },

    voteTopic: (req,res) => {
        const { id } = req.params;
        const updateTopic = TopicModel.upVote(id);

        if (updateTopic) {
            res.json({
                success: true,
                nuevos_votos: updateTopic.votos,
                id: updateTopic.id
            })
        } else {
            res.status(404).json({ success: false, message: "Topic no encontrado"});
        }
    }
};

module.exports = topicController;
