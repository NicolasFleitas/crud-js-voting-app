
const API_URL = '/api/topics';

async function cargarTopics() {
    const container = document.getElementById('topics-container');
    try {
        // Hacemos el FETCH al endpoint de topics  
        const response = await fetch(API_URL);
        const topics = await response.json();

        // Limpia el contenedor
        container.innerHTML = '';

        // Recorremos los topics y creamos el HTML de cada uno
        topics.forEach(topic => {
            let linksHtml = '';
            if (topic.links && topic.links.length > 0) {
                linksHtml = topic.links.map(link => `
                    <li class="link-item">
                        <a href="${link.url}" target="_blank">${link.url}</a>
                        <div class="topic-votes">
                        <span>${link.votos} pts</span>
                        <button class="btn-vote" onclick="votarLink(${topic.id}, ${link.id})">▲</button>
                        <button class="btn-vote" style="color:red; border-color:red" onclick="borrarLink(${topic.id}, ${link.id})">🗑️</button>
                        </div>
                    </li>
                    `).join('');
            } else {
                linksHtml = '<li style="color: #777; padding: 10px 0;">No hay enlaces todavia.</li>';
            }

            // Construyendo la tarjeta completa

            const card = document.createElement('div');
            card.className = 'topic-card';
            card.innerHTML = `
                <div class=topic-header">
                    <h3 class="topic-title">${topic.titulo}</h3>
                    <div class="topic-votes">
                        <strong>${topic.votos}</strong>
                        <button class="btn-vote" onclick="votarTema(${topic.id})">👍Votar Tema</button>
                        <button class="btn-vote" style="color:red; border-color:red" onclick="borrarTema(${topic.id})">🗑️</button>
                    </div>
                </div>

                <ul class="links-list">
                    ${linksHtml}
                </ul>

                <div class="add-link-form">
                    <input type="text" id="link-input-${topic.id}" placeholder="Agregar URL (https://...)" />
                    <button class="btn-small" onclick="agregarLink(${topic.id})">Agregar</button>
                </div>
            `;
            container.appendChild(card);

        });
    }
    catch (error) {
        console.log("Error cargando temas: ", error);
        container.innerHTML = "<p>Error al cargar los datos.</p>";
    }
}

// CREAR TEMA (POST)

document.getElementById('form-tema').addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = document.getElementById('titulo-input');

    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo: input.value })
    });

    input.value = '';
    cargarTopics(); // Recarga para ver el nuevo tema
});

// CREAR LINK (POST)
async function agregarLink(topicId) {
    const input = document.getElementById(`link-input-${topicId}`);
    const url = input.value;

    if (!url) return alert("Escribe una URL");

    await fetch(`${API_URL}/${topicId}/links`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
    });

    cargarTopics();
}

// VOTAR TEMA (PATCH)

async function votarTema(id) {
    await fetch(`${API_URL}/${id}/vote`, { method: 'PATCH' });
    console.log("Votando tema: ", id);
    cargarTopics();
}
// VOTAR LINK (PATCH)
async function votarLink(topicId, linkId) {
    await fetch(`${API_URL}/${topicId}/links/${linkId}/vote`, { method: 'PATCH' });
    cargarTopics();
}

async function borrarTema(id) {
    if (!confirm("Borrar tema?")) return;
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    cargarTopics();
}

async function borrarLink(topicId, linkId) {
    if (!confirm("Borrar enlace?")) return
    await fetch(`${API_URL}/${topicId}/links/${linkId}`, { method: 'DELETE' });
    cargarTopics();
}

// Inicializar
cargarTopics();