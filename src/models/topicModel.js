// Simulación de BD
let topics = [
    { id: 1, titulo: "¿Node.js es mejor que Python?", votos: 10 },
    { id: 2, titulo: "Recursos para Fetch API", votos: 5 }
];

const generateId = () => Date.now();

// Funciones para interactuar con los topics
const TopicModel = {

    getAll: () => {
        return topics.sort((a, b) => b.votos - a.votos);
    },

    create: (titulo) => {
        const newTopic = {
            id: generateId(),
            titulo,
            votos: 0
        };
        topics.push(newTopic);
        return newTopic;
    },

    delete: (id) => {
        const initialLength = topics.length;
        topics = topics.filter(t => t.id != id);
        return topics.length < initialLength; // Retorna true si borro algo
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