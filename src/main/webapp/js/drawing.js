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
    // Filtrar posibles botones nulos para evitar accesos a propiedades de null
    const tool_buttons = [circle_btn, square_btn, triangle_btn, free_draw_btn].filter(Boolean);

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

    // --- Funciones para guardar y cargar la configuración del editor en localStorage ---
    function save_editor_state() {
        const editor_state = {
            color: current_color,
            size: size_picker ? size_picker.value : 5, // Valor por defecto si size_picker no existe
            mode: current_mode
        };
        localStorage.setItem('drawingEditorConfig', JSON.stringify(editor_state));
    }

    function load_editor_state() {
        const saved_config = localStorage.getItem('drawingEditorConfig');
        if (saved_config) {
            const config = JSON.parse(saved_config);
            
            // Restaurar color
            current_color = config.color || '#000000';
            if (document.getElementById('colorPicker')) {
                document.getElementById('colorPicker').value = current_color;
                // Disparar evento personalizado para que otros componentes (como color.js) actualicen su estado
                const color_change_event = new CustomEvent('drawingColorChange', { 
                    detail: { color: current_color } 
                });
                document.dispatchEvent(color_change_event);
            }

            // Restaurar tamaño
            if (size_picker) {
                size_picker.value = config.size || 5; // Valor por defecto si no se encuentra o es inválido
            }

            // Restaurar modo y seleccionar el botón correspondiente
            current_mode = config.mode || 'freeDraw';
            const button_to_select = tool_buttons.find(btn => btn.id === `${current_mode}Btn`);
            if (button_to_select) {
                select_tool(button_to_select, current_mode);
            } else {
                // Si el modo guardado no es válido o el botón no se encuentra, usar freeDraw por defecto
                select_tool(free_draw_btn, 'freeDraw');
            }
        } else {
            // Si no hay configuración guardada, aplicar valores iniciales por defecto y guardarlos
            current_color = document.getElementById('colorPicker')?.value || '#000000';
            current_mode = 'freeDraw';
            if (size_picker) {
                size_picker.value = 5; // Tamaño por defecto
            }
            select_tool(free_draw_btn, 'freeDraw'); // Seleccionar herramienta por defecto
            save_editor_state();
        }
    }

    // Limpiar el canvas y guardar en historial
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
        }
    }

    //Rehacer
    function redo() {
        if (history_step < history.length - 1) {
            history_step++;
            restore_from_history(history[history_step]);
            update_undo_redo_buttons();
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
        if (!parent) return;

        // Intentamos preservar el contenido del canvas. Usar toDataURL + drawImage
        // es más seguro que getImageData/putImageData cuando cambia tamaño.
        let dataUrl = null;
        try {
            dataUrl = canvas.toDataURL();
        } catch (err) {
            // Si falla (canvas tainted u otro), continuamos y limpiaremos el canvas
            dataUrl = null;
        }

        canvas.width = parent.clientWidth || canvas.width;
        canvas.height = parent.clientHeight || canvas.height;

        if (dataUrl) {
            const img = new Image();
            img.onload = function() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                ctx.strokeStyle = current_color;
                ctx.fillStyle = current_color;
            };
            img.src = dataUrl;
        } else {
            // No había datos preservables
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = current_color;
            ctx.fillStyle = current_color;
        }
    }

    // Escuchar cambios externos en el color
    document.addEventListener('drawingColorChange', (event) => {
        current_color = event.detail.color;
        ctx.strokeStyle = current_color;
        ctx.fillStyle = current_color;
        save_editor_state(); // Guardar el cambio de color
    });

    // Seleccionar una herramienta de dibujo
    function select_tool(button, mode) {
        current_mode = mode;
        // Proteger contra botones nulos
        tool_buttons.forEach(btn => { if (btn) btn.classList.remove('selected'); });
        if (button) { // Asegurarse de que el botón existe antes de añadir la clase
            button.classList.add('selected');
        } else if (free_draw_btn) {
            // Fallback si el botón no se encuentra (ej. modo inválido cargado)
            free_draw_btn.classList.add('selected');
        }
        is_drawing = false;
        ctx.beginPath();
        save_editor_state(); // Guardar el cambio de modo
    }

    // Asignar eventos a los botones de herramientas (protegidos si faltan en el DOM)
    if (circle_btn) circle_btn.addEventListener('click', () => select_tool(circle_btn, 'circle'));
    if (square_btn) square_btn.addEventListener('click', () => select_tool(square_btn, 'square'));
    if (triangle_btn) triangle_btn.addEventListener('click', () => select_tool(triangle_btn, 'triangle'));
    if (free_draw_btn) free_draw_btn.addEventListener('click', () => select_tool(free_draw_btn, 'freeDraw'));

    // Añadir listener para el cambio de tamaño
    if (size_picker) {
        size_picker.addEventListener('input', save_editor_state); // Guardar el cambio de tamaño
    }

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
            save_history(); // Guardar en historial al terminar trazo
        }
    }

    // Lógica de dibujo continuo para modo libre
    function draw(e) {
        const pos = (typeof e.clientX !== 'undefined') ? get_mouse_pos(canvas, e) : e;
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
    load_editor_state(); // Cargar la configuración del editor al inicio

    // Aplicar color inicial
    ctx.strokeStyle = current_color;
    ctx.fillStyle = current_color;
});