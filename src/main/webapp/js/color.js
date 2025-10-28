document.addEventListener('DOMContentLoaded', () => {
     Coloris({
        el: '#colorPicker',
        themeMode: 'dark',
        swatches: [
            '#d62828', '#f77f00', '#fcbf49', '#2a9d8f', '#0077b6', 
            '#8338ec', '#ff006e', '#ffffff', '#8d99ae', '#000000'
        ]
    });

    const color_picker = document.getElementById('colorPicker');
    color_picker.addEventListener('input', (event) => {
        console.log('Nuevo color seleccionado:', event.target.value);
        
        const color_change_event = new CustomEvent('drawingColorChange', { 
            detail: { color: event.target.value } 
        });
        document.dispatchEvent(color_change_event);
    });
});