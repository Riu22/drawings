document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('drawingCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Botones de herramientas
    const circle_btn = document.getElementById('circleBtn');
    const square_btn = document.getElementById('squareBtn');
    const triangle_btn = document.getElementById('triangleBtn');
    const free_draw_btn = document.getElementById('freeDrawBtn');
    const size_picker = document.getElementById('sizePicker');
    const tool_buttons = [circle_btn, square_btn, triangle_btn, free_draw_btn];

    // Botones de deshacer/rehacer (añadir estos botones en tu HTML)
    const undo_btn = document.getElementById('undoBtn');
    const redo_btn = document.getElementById('redoBtn');
    const clear_btn = document.getElementById('clearBtn');


    // Variables de estado para el dibujo
    let is_drawing = false;
    let current_color = document.getElementById('colorPicker')?.value || '#000000';
    let current_mode = 'freeDraw';

    // Historial para deshacer/rehacer**
    let history = [];
    let history_step = -1;
    const max_history = 50; // Límite de pasos guardados

    // Marcar dibujo libre como herramienta inicial
    free_draw_btn.classList.add('selected');

    // Funciones para guardar y cargar desde localStorage
    function save_canvas_state() {
        localStorage.setItem('savedDrawing', canvas.toDataURL());
    }

    function load_canvas_state() {
        const data_url = localStorage.getItem('savedDrawing');
        if (data_url) {
            const img = new Image();
            img.onload = function() {
                ctx.drawImage(img, 0, 0);
                save_history(); // Guardar el estado inicial en el historial
            };
            img.src = data_url;
        } else {
            save_history(); // Guardar canvas vacío como primer estado
        }
    }

    function clear_canvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        save_history(); // Guardar en historial al limpiar
    }

    //Guardar estado en el historial
    function save_history() {
        // Eliminar estados futuros si estamos en medio del historial
        history_step++;
        if (history_step < history.length) {
            history.length = history_step;
        }
        
        // Guardar el estado actual
        history.push(canvas.toDataURL());
        
        // Limitar el tamaño del historial
        if (history.length > max_history) {
            history.shift();
            history_step--;
        }
        
        update_undo_redo_buttons();
        save_canvas_state();
    }

    //Restaurar un estado del historial
    function restore_from_history(data_url) {
        const img = new Image();
        img.onload = function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
        };
        img.src = data_url;
    }

    //Deshacer
    function undo() {
        if (history_step > 0) {
            history_step--;
            restore_from_history(history[history_step]);
            update_undo_redo_buttons();
            save_canvas_state();
        }
    }

    //Rehacer
    function redo() {
        if (history_step < history.length - 1) {
            history_step++;
            restore_from_history(history[history_step]);
            update_undo_redo_buttons();
            save_canvas_state();
        }
    }

    //Actualizar estado de botones
    function update_undo_redo_buttons() {
        if (undo_btn) {
            undo_btn.disabled = history_step <= 0;
        }
        if (redo_btn) {
            redo_btn.disabled = history_step >= history.length - 1;
        }
    }

    //Eventos para deshacer/rehacer
    if (undo_btn) {
        undo_btn.addEventListener('click', undo);
    }
    if (redo_btn) {
        redo_btn.addEventListener('click', redo);
    }
    if (clear_btn) {
        clear_btn.addEventListener('click', clear_canvas);
    }



    //Atajos de teclado Ctrl+Z y Ctrl+Y**
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            if (e.key === 'z' || e.key === 'Z') {
                e.preventDefault();
                if (e.shiftKey) {
                    redo(); // Ctrl+Shift+Z = Rehacer
                } else {
                    undo(); // Ctrl+Z = Deshacer
                }
            } else if (e.key === 'y' || e.key === 'Y') {
                e.preventDefault();
                redo(); // Ctrl+Y = Rehacer
            }
        }
    });

    // Redimensionar el canvas al tamaño de su contenedor y actualizar estilos
    function resize_canvas() {
        const parent = canvas.parentElement;
        const temp_image_data = ctx.getImageData(0, 0, canvas.width, canvas.height);
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        ctx.putImageData(temp_image_data, 0, 0);
        ctx.strokeStyle = current_color;
        ctx.fillStyle = current_color;
    }

    // Escuchar cambios externos en el color
    document.addEventListener('drawingColorChange', (event) => {
        current_color = event.detail.color;
        ctx.strokeStyle = current_color;
        ctx.fillStyle = current_color;
    });

    // Seleccionar una herramienta de dibujo
    function select_tool(button, mode) {
        current_mode = mode;
        tool_buttons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
        is_drawing = false;
        ctx.beginPath();
    }

    // Asignar eventos a los botones de herramientas
    circle_btn.addEventListener('click', () => select_tool(circle_btn, 'circle'));
    square_btn.addEventListener('click', () => select_tool(square_btn, 'square'));
    triangle_btn.addEventListener('click', () => select_tool(triangle_btn, 'triangle'));
    free_draw_btn.addEventListener('click', () => select_tool(free_draw_btn, 'freeDraw'));

    // Obtener posición del ratón ajustada a la escala del canvas
    function get_mouse_pos(canvas, evt) {
        const rect = canvas.getBoundingClientRect();
        const scale_x = canvas.width / rect.width;
        const scale_y = canvas.height / rect.height;

        return {
            x: (evt.clientX - rect.left) * scale_x,
            y: (evt.clientY - rect.top) * scale_y
        };
    }

    // Dibujar formas geométricas centradas en la posición del clic
    function draw_shape(pos) {
        const { x, y } = pos;
        const shape_size = size_picker ? parseInt(size_picker.value) : 5; // Obtener tamaño actual
        ctx.fillStyle = current_color;

        if (current_mode === 'circle') {
            ctx.beginPath();
            ctx.arc(x, y, shape_size / 2, 0, Math.PI * 2);
            ctx.fill();
        } else if (current_mode === 'square') {
            ctx.fillRect(x - shape_size / 2, y - shape_size / 2, shape_size, shape_size);
        }  else if (current_mode === 'triangle') {
            const height = (shape_size * Math.sqrt(3)) / 2;
            
            ctx.beginPath();
            ctx.moveTo(x, y - height / 2);
            ctx.lineTo(x - shape_size / 2, y + height / 2);
            ctx.lineTo(x + shape_size / 2, y + height / 2);
            ctx.closePath();
            ctx.fill();
        }
        
        // Guardar en historial después de dibujar forma
        save_history();
    }

    // Iniciar dibujo: comenzar trazo libre o colocar una forma
    function start_drawing(e) {
        const pos = get_mouse_pos(canvas, e);
        if (current_mode === 'freeDraw') {
            is_drawing = true;
            draw(pos);
        } else {
            draw_shape(pos);
        }
    }

    // Detener dibujo en modo libre
    function stop_drawing() {
        if (current_mode === 'freeDraw' && is_drawing) {
            is_drawing = false;
            ctx.beginPath();
            save_canvas_state();
            save_history(); // Guardar en historial al terminar trazo
        }
    }

    // Lógica de dibujo continuo para modo libre
    function draw(e) {
        const pos = e.clientX ? get_mouse_pos(canvas, e) : e;
        if (current_mode !== 'freeDraw' || !is_drawing) return;

        ctx.lineWidth = size_picker ? parseInt(size_picker.value) : 5;
        ctx.lineCap = 'round';
        ctx.strokeStyle = current_color;

        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
    }

    // Eventos del ratón en el canvas
    canvas.addEventListener('mousedown', start_drawing);
    canvas.addEventListener('mouseup', stop_drawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseleave', stop_drawing);

    // Manejo de redimensionamiento y configuración inicial
    window.addEventListener('resize', resize_canvas);
    
    // Primera configuración
    const parent = canvas.parentElement;
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;
    load_canvas_state();

    // Aplicar color inicial
    ctx.strokeStyle = current_color;
    ctx.fillStyle = current_color;
});