let links = [
    { id: 101, topicId: 1, url: "https://nodejs.org", votos: 3 },
    { id: 102, topicId: 1, url: "https://python.org", votos: 1 },
    { id: 103, topicId: 2, url: "https://flutter.dev", votos: 2 },
    { id: 104, topicId: 2, url: "https://reactnative.dev", votos: 1 },
    { id: 105, topicId: 3, url: "https://unity3d.com", votos: 1 },
    { id: 106, topicId: 4, url: "https://openai.com", votos: 1 },
];

const generateId = () => Date.now() + Math.floor(Math.random() * 1000);

const LinkModel = {
    // Obtiene links de un tema ordenados por votos
    getByTopicId: (topicId) => {
        return links
            .filter(link => link.topicId == topicId)
            .sort((a, b) => b.votos - a.votos);
    },

    // Crea un nuevo link
    create: (topicId, url) => {
        const newLink = {
            id: generateId(),
            topicId: parseInt(topicId),
            url,
            votos: 0
        };
        links.push(newLink);
        return newLink
    },

    // Incrementa votos de un link
    vote: (id) => {
        const link = links.find(l => l.id == id);
        if (link) {
            link.votos += 1;
            return link;
        }
        return null;
    },

    // Elimina un link
    delete: (id) => {
        const initialLength = links.length;
        links = links.filter(l => l.id != id);
        return links.length < initialLength;
    }

};

module.exports = LinkModel;