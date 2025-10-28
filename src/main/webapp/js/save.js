document.getElementById('saveButton').addEventListener('click', async function () {
    try {
        const canvas = document.getElementById('drawingCanvas');

        if (!canvas || !canvas.getContext) {
            throw new Error('Canvas no encontrado o no soportado');
        }

        const title = prompt("Por favor, introduce un título para tu dibujo:");
        if (!title || title.trim() === '') {
            alert('Por favor, introduce un título válido');
            return;
        }

        // Obtener datos del dibujo como JSON
        const ctx = canvas.getContext('2d');
        const drawing_data = {
            width: canvas.width,
            height: canvas.height,
            imageData: canvas.toDataURL()
        };

        const form_data = new URLSearchParams();
        form_data.append('json', JSON.stringify(drawing_data));  // Convertir a string JSON
        form_data.append('title', title.trim());

        const response = await fetch('save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: form_data
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        console.log('Respuesta del servidor:', await response.text());
        alert('¡Dibujo guardado con éxito!');

    } catch (error) {
        console.error('Error:', error);
        alert(`Error al guardar el dibujo: ${error.message}`);
    }
});
