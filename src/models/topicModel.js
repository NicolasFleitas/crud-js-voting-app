// Simulación de BD
let topics = [
    { id: 1, titulo: "¿Node.js es mejor que Python?", votos: 10 },
    { id: 2, titulo: "Aprender Fetch API", votos: 5 },
    { id: 3, titulo: "Arquitectura MVC", votos: 2 }
];

// Funciones para interactuar con los topics
const TopicModel = {
    
    getAll: () => {
        return topics;
    },

    findById: (id) => {
        return topics.find(t => t.id == id);
    },

    upVote: (id) => {
        const topic = topics.find(t => t.id == id);
        if (topic) {
            topic.votos += 1;
            return topic;
        }
        return null;
    }
};

module.exports = TopicModel;