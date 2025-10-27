document.getQuerySelector('#saveButton').addEventListener('click', function() {
    const dataToSave = {
        name: document.getQuerySelector('#nameInput').value,
    }
    fetch('/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSave)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Datos guardados:', data);
    })
    .catch((error) => {
        console.error('Error al guardar los datos:', error);
    
    });
});