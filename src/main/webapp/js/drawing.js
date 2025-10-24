document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('drawingCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Botones de herramientas de dibujo
    const circleBtn = document.getElementById('circleBtn');
    const squareBtn = document.getElementById('squareBtn');
    const triangleBtn = document.getElementById('triangleBtn');
    const freeDrawBtn = document.getElementById('freeDrawBtn');
    const toolButtons = [circleBtn, squareBtn, triangleBtn, freeDrawBtn];

    // Variables de estado
    let isDrawing = false;
    let currentColor = document.getElementById('colorPicker')?.value || '#000000';
    let currentMode = 'freeDraw';
    const shapeSize = 50;

    // Marcar dibujo libre como herramienta inicial
    freeDrawBtn.classList.add('selected');

    // Ajustar el canvas al tamaño de su contenedor
    function resizeCanvas() {
        const parent = canvas.parentElement;
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        ctx.strokeStyle = currentColor;
        ctx.fillStyle = currentColor;
    }

    // Actualizar color cuando el selector de color cambie
    document.addEventListener('drawingColorChange', (event) => {
        currentColor = event.detail.color;
        ctx.strokeStyle = currentColor;
        ctx.fillStyle = currentColor;
    });

    // Cambiar herramienta de dibujo activa
    function selectTool(button, mode) {
        currentMode = mode;
        toolButtons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
        isDrawing = false;
        ctx.beginPath();
    }

    // Asignar eventos a los botones de herramientas
    circleBtn.addEventListener('click', () => selectTool(circleBtn, 'circle'));
    squareBtn.addEventListener('click', () => selectTool(squareBtn, 'square'));
    triangleBtn.addEventListener('click', () => selectTool(triangleBtn, 'triangle'));
    freeDrawBtn.addEventListener('click', () => selectTool(freeDrawBtn, 'freeDraw'));

    // Obtener posición del ratón ajustada al canvas
    function getMousePos(canvas, evt) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        return {
            x: (evt.clientX - rect.left) * scaleX,
            y: (evt.clientY - rect.top) * scaleY
        };
    }

    // Dibujar formas geométricas
    function drawShape(pos) {
        const { x, y } = pos;
        ctx.fillStyle = currentColor;

        if (currentMode === 'circle') {
            ctx.beginPath();
            ctx.arc(x, y, shapeSize / 2, 0, Math.PI * 2);
            ctx.fill();
        } else if (currentMode === 'square') {
            ctx.fillRect(x - shapeSize / 2, y - shapeSize / 2, shapeSize, shapeSize);
        } else if (currentMode === 'triangle') {
            ctx.beginPath();
            ctx.moveTo(x, y - shapeSize / 2);
            ctx.lineTo(x - shapeSize / 2, y + shapeSize / 2);
            ctx.lineTo(x + shapeSize / 2, y + shapeSize / 2);
            ctx.closePath();
            ctx.fill();
        }
    }

    // Iniciar dibujo al hacer clic
    function startDrawing(e) {
        const pos = getMousePos(canvas, e);
        if (currentMode === 'freeDraw') {
            isDrawing = true;
            draw(pos);
        } else {
            drawShape(pos);
        }
    }

    // Detener dibujo al soltar el ratón
    function stopDrawing() {
        if (currentMode === 'freeDraw') {
            isDrawing = false;
            ctx.beginPath();
        }
    }

    // Dibujar línea continua en modo libre
    function draw(e) {
        const pos = e.clientX ? getMousePos(canvas, e) : e;
        if (currentMode !== 'freeDraw' || !isDrawing) return;

        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.strokeStyle = currentColor;
        
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
    }

    // Eventos del ratón en el canvas
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseleave', stopDrawing);

    // Ajustar canvas al cambiar tamaño de ventana
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Aplicar color inicial
    ctx.strokeStyle = currentColor;
    ctx.fillStyle = currentColor;
});