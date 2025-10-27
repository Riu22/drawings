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
        ctx.beginPath();document.addEventListener('DOMContentLoaded', () => {
            const canvas = document.getElementById('drawingCanvas');
            if (!canvas) return;
            const ctx = canvas.getContext('2d');

            // Botones de herramientas
            const circleBtn = document.getElementById('circleBtn');
            const squareBtn = document.getElementById('squareBtn');
            const triangleBtn = document.getElementById('triangleBtn');
            const freeDrawBtn = document.getElementById('freeDrawBtn');
            const toolButtons = [circleBtn, squareBtn, triangleBtn, freeDrawBtn];

            // Variables de estado para el dibujo
            let isDrawing = false;
            let currentColor = document.getElementById('colorPicker')?.value || '#000000';
            let currentMode = 'freeDraw';
            const shapeSize = 50;

            // Marcar dibujo libre como herramienta inicial
            freeDrawBtn.classList.add('selected');

            // Redimensionar el canvas al tamaño de su contenedor y actualizar estilos
            function resizeCanvas() {
                const parent = canvas.parentElement;
                canvas.width = parent.clientWidth;
                canvas.height = parent.clientHeight;
                ctx.strokeStyle = currentColor;
                ctx.fillStyle = currentColor;
            }

            // Escuchar cambios externos en el color
            document.addEventListener('drawingColorChange', (event) => {
                currentColor = event.detail.color;
                ctx.strokeStyle = currentColor;
                ctx.fillStyle = currentColor;
            });

            // Seleccionar una herramienta de dibujo
            function selectTool(button, mode) {
                currentMode = mode;
                toolButtons.forEach(btn => btn.classList.remove('selected'));
                button.classList.add('selected');
                // Detener cualquier trazo de dibujo libre en curso
                isDrawing = false;
                ctx.beginPath();
            }

            // Asignar eventos a los botones de herramientas
            circleBtn.addEventListener('click', () => selectTool(circleBtn, 'circle'));
            squareBtn.addEventListener('click', () => selectTool(squareBtn, 'square'));
            triangleBtn.addEventListener('click', () => selectTool(triangleBtn, 'triangle'));
            freeDrawBtn.addEventListener('click', () => selectTool(freeDrawBtn, 'freeDraw'));

            // Obtener posición del ratón ajustada a la escala del canvas
            function getMousePos(canvas, evt) {
                const rect = canvas.getBoundingClientRect();
                // Factores de escala para convertir coordenadas del cliente a coordenadas internas del canvas
                const scaleX = canvas.width / rect.width;
                const scaleY = canvas.height / rect.height;

                return {
                    x: (evt.clientX - rect.left) * scaleX,
                    y: (evt.clientY - rect.top) * scaleY
                };
            }

            // Dibujar formas geométricas centradas en la posición del clic
            function drawShape(pos) {
                const { x, y } = pos;
                ctx.fillStyle = currentColor;

                if (currentMode === 'circle') {
                    ctx.beginPath();
                    // Arco centrado en (x,y) con radio shapeSize/2
                    ctx.arc(x, y, shapeSize / 2, 0, Math.PI * 2);
                    ctx.fill();
                } else if (currentMode === 'square') {
                    // fillRect espera la esquina superior izquierda, restamos la mitad del tamaño para centrar
                    ctx.fillRect(x - shapeSize / 2, y - shapeSize / 2, shapeSize, shapeSize);
                } else if (currentMode === 'triangle') {
                    // Triángulo: dibuja un triángulo isósceles centrado en (x,y)
                    // Vértice superior en (x, y - shapeSize/2)
                    // Vértice inferior izquierdo en (x - shapeSize/2, y + shapeSize/2)
                    // Vértice inferior derecho en (x + shapeSize/2, y + shapeSize/2)
                    ctx.beginPath();
                    ctx.moveTo(x, y - shapeSize / 2);                    // vértice superior
                    ctx.lineTo(x - shapeSize / 2, y + shapeSize / 2);    // vértice inferior izquierdo
                    ctx.lineTo(x + shapeSize / 2, y + shapeSize / 2);    // vértice inferior derecho
                    ctx.closePath();                                     // cerrar camino hasta el inicio
                    ctx.fill();
                }
            }

            // Iniciar dibujo: comenzar trazo libre o colocar una forma
            function startDrawing(e) {
                const pos = getMousePos(canvas, e);
                if (currentMode === 'freeDraw') {
                    // Para dibujo libre, activamos el modo dibujo y dibujamos el primer punto
                    isDrawing = true;
                    draw(pos);
                } else {
                    // Para formas, dibujamos una única forma rellena en la posición del clic
                    drawShape(pos);
                }
            }

            // Detener dibujo en modo libre
            function stopDrawing() {
                if (currentMode === 'freeDraw') {
                    isDrawing = false;
                    // beginPath evita que el siguiente trazo se conecte con el anterior
                    ctx.beginPath();
                }
            }

            // Lógica de dibujo continuo para modo libre
            function draw(e) {
                // Si se llama con un evento, calcula la posición; si se llama con un objeto pos, úsalo directamente
                const pos = e.clientX ? getMousePos(canvas, e) : e;
                if (currentMode !== 'freeDraw' || !isDrawing) return;

                ctx.lineWidth = 5;
                ctx.lineCap = 'round';
                ctx.strokeStyle = currentColor;

                // lineTo dibuja una línea desde el punto actual hasta (pos.x, pos.y)
                // stroke() la renderiza. beginPath() seguido de moveTo() evita que el trazo crezca indefinidamente
                ctx.lineTo(pos.x, pos.y);
                ctx.stroke();
                ctx.beginPath();
                // Mover el cursor del trazo al punto actual para que el siguiente lineTo comience desde aquí
                ctx.moveTo(pos.x, pos.y);
            }

            // Eventos del ratón en el canvas
            canvas.addEventListener('mousedown', startDrawing);
            canvas.addEventListener('mouseup', stopDrawing);
            canvas.addEventListener('mousemove', draw);
            canvas.addEventListener('mouseleave', stopDrawing);

            // Manejo de redimensionamiento y configuración inicial
            window.addEventListener('resize', resizeCanvas);
            resizeCanvas();

            // Aplicar color inicial
            ctx.strokeStyle = currentColor;
            ctx.fillStyle = currentColor;
        });
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