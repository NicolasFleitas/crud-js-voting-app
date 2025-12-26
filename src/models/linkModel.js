let links = [
    { id: 101, topicId: 1, url: "https://nodejs.org", votos: 3 },
    { id: 102, topicId: 1, url: "https://python.org", votos: 1 }
];

const generateId = () => Date.now() + Math.floor(Math.random() * 1000);

const LinkModel = {
    // Obtener links de un tema especifico ordenados por votos
    getByTopicId: (topicId) => {
        return links
            .filter(link => link.topicId == topicId)
            .sort((a, b) => b.votos - a.votos);
    },

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

    vote: (id) => {
        const link = links.find(l => l.id == id);
        if (link) {
            link.votos += 1;
            return link;
        }
        return null;
    },

    delete: (id) => {
        const initialLength = links.length;
        links = links.filter(l => l.id != id);
        return links.length < initialLength;
    }

};

module.exports = LinkModel;