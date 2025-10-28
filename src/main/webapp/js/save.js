document.getElementById('saveButton').addEventListener('click', async function() {
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
        const drawingData = {
            width: canvas.width,
            height: canvas.height,
            imageData: canvas.toDataURL()
        };

        const formData = new URLSearchParams();
        formData.append('json', JSON.stringify(drawingData));  // Convertir a string JSON
        formData.append('title', title.trim());

        const response = await fetch('save', {  // Asegúrate que la ruta sea correcta
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        console.log('Respuesta del servidor:', await response.text());  // Log para depuración
        alert('¡Dibujo guardado con éxito!');

    } catch (error) {
        console.error('Error:', error);
        alert(`Error al guardar el dibujo: ${error.message}`);
    }
});
