document.getElementById('saveButton').addEventListener('click', function() {
    const canvas = document.getElementById('drawingCanvas');
    const title = prompt("Por favor, introduce un título para tu dibujo:");

    if (title) {
        const dataURL = canvas.toDataURL();
        const formData = new URLSearchParams();
        formData.append('imageData', dataURL);
        formData.append('title', title);

        // ========== DEBUG ==========
        console.log('Enviando dibujo:');
        console.log('- Título:', title);
        console.log('- ImageData length:', dataURL.length);
        console.log('- ImageData preview:', dataURL.substring(0, 50) + '...');
        // ===========================

        fetch('/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData
        })
        .then(response => {
            console.log('Status:', response.status); // DEBUG
            return response.json();
        })
        .then(data => {
            console.log('Respuesta del servidor:', data);
            alert('Dibujo guardado con éxito');
        })
        .catch((error) => {
            console.error('Error al guardar los datos:', error);
            alert('Error al guardar el dibujo.');
        });
    } else {
        console.log('No se introdujo título');
    }
});