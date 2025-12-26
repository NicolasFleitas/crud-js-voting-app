// 1. Función para obtener y mostrar los topics

async function cargarTopics() {
    const container = document.getElementById('topics-container');   
    try {
        // Hacemos el FETCH al endpoint de topics  
        const response = await fetch('/api/topics');
        const topics = await response.json();

        // Limpia el mensaje de "Cargando..."
        container.innerHTML = '';

        // Recorremos los topics y creamos el HTML de cada uno
        topics.forEach(topic => {
            const card = document.createElement('div');
            card.className = 'topic-card';

            // Usamos Template Strings para insertar los datos
            card.innerHTML = `
                <h2>${topic.titulo}</h2>
                <div class="actions">
                    <p>Votos: 
                        <span id="votos-${topic.id}" class="voto-numero">${topic.votos}</span>
                    </p>
                    <button onclick="votar(${topic.id})" class="btn-votar">👍Votar</button>
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

// 2. Función para votar (Interactúa con el DOM y la API)
async function votar(id) {
    try {
        // Opción A: FETCH (Método PATCH)
        const response = await fetch(`/api/topics/${id}/vote`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'}
        });

        if (response.ok) {
            const data = await response.json();
            // 3. ACTUALIZACION DEL DOM
            const contadorElemento = document.getElementById(`votos-${id}`);
            // Animacion visual (cambiar de color)
            contadorElemento.style.color = "#2ecc71";
            contadorElemento.innerText = data.nuevos_votos;

            setTimeout(() => {
                contadorElemento.style.color = ''; // volver al color original
            }, 500);
        } else {
            alert("Hubo un error al registrar el voto");
        }

    } catch (error) {
        console.log("Error al votar", error);
    }
}

// Iniciamos la carga al abrir la páginna
document.addEventListener('DOMContentLoaded', cargarTopics);