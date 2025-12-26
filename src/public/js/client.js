const API_URL = '/api/topics';

// Funcion aux para recargar la pagina tras una accion
const reload = () => window.location.reload();

// CREAR TEMA
document.getElementById('form-tema').addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = document.getElementById('titulo-input');

    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo: input.value })
    });

    reload();
});

//AGREGAR LINK
async function agregarLink(topicId) {
    const input = document.getElementById(`link-input-${topicId}`);
    if (!input.value) return;

    await fetch(`${API_URL}/${topicId}/links`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: input.value })
    });
    reload();
}

// VOTAR TEMA
async function votarTema(id) {
    await fetch(`${API_URL}/${id}/vote`, { method: 'PATCH' });
    reload();
}
// VOTAR LINK
async function votarLink(topicId, linkId) {
    await fetch(`${API_URL}/${topicId}/links/${linkId}/vote`, { method: 'PATCH' });
    reload();
}
// BORRAR TEMA
async function borrarTema(id) {
    if (!confirm("Borrar tema?")) return;
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    reload();
}

async function borrarLink(topicId, linkId) {
    if (!confirm("Borrar enlace?")) return
    await fetch(`${API_URL}/${topicId}/links/${linkId}`, { method: 'DELETE' });
    reload();
}