document.getElementById('saveButton').addEventListener('click', function() {
    const canvas = document.getElementById('drawingCanvas');
    const title = prompt("Por favor, introduce un título para tu dibujo:");
    const object_list = document.getElementById('objectList');

    if (title) {
        const dataURL = canvas.toDataURL();
        const objectCount = object_list.children.length;

        console.log('Enviando dibujo:');
        console.log('- Título:', title);
        console.log('- ImageData length:', dataURL.length);
        console.log('- Object Count:', objectCount);
        console.log('- ImageData preview:', dataURL.substring(0, 50) + '...');

        const formData = new URLSearchParams();
        formData.append('imageData', dataURL);
        formData.append('title', title);
        formData.append('object_count', objectCount); 

        fetch('/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData
          })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error de red o servidor. Estado: ' + response.status);
            }
            return response.text();
        })
        .then(data => {
            console.log('Respuesta del servidor:', data);
            
            if (data && data.includes("Exitoso")) {
                alert('¡Dibujo guardado con éxito!');
            } else {
                alert('Error al guardar el dibujo: ' + data);
            }
        })
        .catch((error) => {
            console.error('Error al guardar los datos:', error);
            alert('Error al guardar el dibujo. Consulta la consola para más detalles.');
        });
    } else {
        alert("El dibujo no se guardó. Debes proporcionar un título.");
    }
});