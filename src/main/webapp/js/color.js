document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('drawingCanvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        const parent = canvas.parentElement;
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
    }

    let isDrawing = false;
    let currentColor = '#000000'; 

   
    document.addEventListener('color', event => {
        console.log('Nuevo color seleccionado:', event.detail.color);
        currentColor = event.detail.color;
        ctx.strokeStyle = currentColor;
        ctx.fillStyle = currentColor;
    });

    function startDrawing(e) {
        isDrawing = true;
        draw(e); 
    }

    function stopDrawing() {
        isDrawing = false;
        ctx.beginPath(); 
    }

    function draw(e) {
        if (!isDrawing) return;

        ctx.lineWidth = 5; 
        ctx.lineCap = 'round'; 

        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
    }

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseleave', stopDrawing);

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
});