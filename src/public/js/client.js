const API_URL = '/api/topics';
const COMPONENT_URL = '/api/components/topic-list';

async function actualizarVista() {

    const container = document.getElementById('topics-container');

    // Feed visual
    container.style.opacity = '0.6';
    container.style.pointerEvents = 'none';

    try {
        // Solicita el HTML actualizado al servidor
        const response = await fetch(COMPONENT_URL);
        const html = await response.text();

        if (document.startViewTransition) {
            // El navegador toma una "foto antes y despues" y anima la diferencia
            document.startViewTransition(() => {
                container.innerHTML = html;
            });
        } else {
            container.innerHTML = html;
        }

    } catch (error) {
        console.log("Error actualizando vista", error);
        alert("Hubo un error de conexion");
    } finally {
        // Restaura el estado visual
        container.style.opacity = '1';
        container.style.pointerEvents = 'auto';
    }
}


// CREAR TEMA
document.getElementById('form-tema').addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = document.getElementById('titulo-input');

    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo: input.value })
    });
    input.value = '';
    actualizarVista();
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
    actualizarVista();
}

// VOTAR TEMA
async function votarTema(id) {
    await fetch(`${API_URL}/${id}/vote`, { method: 'PATCH' });
    actualizarVista();
}
// VOTAR LINK
async function votarLink(topicId, linkId) {
    await fetch(`${API_URL}/${topicId}/links/${linkId}/vote`, { method: 'PATCH' });
    actualizarVista();
}
// BORRAR TEMA
async function borrarTema(id) {
    if (!confirm("Borrar tema?")) return;
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    actualizarVista();
}

async function borrarLink(topicId, linkId) {
    if (!confirm("Borrar enlace?")) return
    await fetch(`${API_URL}/${topicId}/links/${linkId}`, { method: 'DELETE' });
    actualizarVista();
}