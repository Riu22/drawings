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
    const tool_buttons = [circle_btn, square_btn, triangle_btn, free_draw_btn].filter(Boolean);

    // Botones de deshacer/rehacer
    const undo_btn = document.getElementById('undoBtn');
    const redo_btn = document.getElementById('redoBtn');
    const clear_btn = document.getElementById('clearBtn');

    // Lista de objetos
    const object_list_container = document.getElementById('objectList');

    // Variables de estado
    let is_drawing = false;
    let current_color = document.getElementById('colorPicker')?.value || '#000000';
    let current_mode = 'freeDraw';
    let selected_object = null;
    let dragging_object = false;
    let drag_offset = { x: 0, y: 0 };
    let current_path = null; // Para almacenar el trazo actual

    // Almacenar objetos dibujados
    let objects = [];
    let object_id_counter = 0;

    // Historial para deshacer/rehacer
    let history = [];
    let history_step = -1;
    const max_history = 50;

    // --- Funciones para guardar y cargar configuración ---
    function save_editor_state() {
        const editor_state = {
            color: current_color,
            size: size_picker ? size_picker.value : 5,
            mode: current_mode
        };
        // No usar localStorage en artifacts
        // localStorage.setItem('drawingEditorConfig', JSON.stringify(editor_state));
    }

    function load_editor_state() {
        // No usar localStorage en artifacts
        current_color = document.getElementById('colorPicker')?.value || '#000000';
        current_mode = 'freeDraw';
        if (size_picker) {
            size_picker.value = 5;
        }
        select_tool(free_draw_btn, 'freeDraw');
        save_editor_state();
    }

    // Limpiar canvas y objetos
    function clear_canvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        objects = [];
        selected_object = null;
        update_object_list();
        save_history();
    }

    // Guardar estado en historial
    function save_history() {
        history_step++;
        if (history_step < history.length) {
            history.length = history_step;
        }
        
        history.push({
            objects: JSON.parse(JSON.stringify(objects))
        });
        
        if (history.length > max_history) {
            history.shift();
            history_step--;
        }
        
        update_undo_redo_buttons();
    }

    // Restaurar estado del historial
    function restore_from_history(state) {
        objects = JSON.parse(JSON.stringify(state.objects));
        selected_object = null;
        update_object_list();
        redraw_canvas();
    }

    // Deshacer
    function undo() {
        if (history_step > 0) {
            history_step--;
            restore_from_history(history[history_step]);
            update_undo_redo_buttons();
        }
    }

    // Rehacer
    function redo() {
        if (history_step < history.length - 1) {
            history_step++;
            restore_from_history(history[history_step]);
            update_undo_redo_buttons();
        }
    }

    // Actualizar botones deshacer/rehacer
    function update_undo_redo_buttons() {
        if (undo_btn) {
            undo_btn.disabled = history_step <= 0;
        }
        if (redo_btn) {
            redo_btn.disabled = history_step >= history.length - 1;
        }
    }

    // Eventos para deshacer/rehacer
    if (undo_btn) undo_btn.addEventListener('click', undo);
    if (redo_btn) redo_btn.addEventListener('click', redo);
    if (clear_btn) clear_btn.addEventListener('click', clear_canvas);

    // Atajos de teclado
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            if (e.key === 'z' || e.key === 'Z') {
                e.preventDefault();
                if (e.shiftKey) {
                    redo();
                } else {
                    undo();
                }
            } else if (e.key === 'y' || e.key === 'Y') {
                e.preventDefault();
                redo();
            }
        }
    });

    // Redimensionar canvas
    function resize_canvas() {
        const parent = canvas.parentElement;
        if (!parent) return;

        canvas.width = parent.clientWidth || canvas.width;
        canvas.height = parent.clientHeight || canvas.height;
        
        redraw_canvas();
    }

    // Escuchar cambios externos en el color
    document.addEventListener('drawingColorChange', (event) => {
        current_color = event.detail.color;
        
        // Si hay un objeto seleccionado, cambiar su color
        if (selected_object) {
            selected_object.color = current_color;
            redraw_canvas();
            update_object_list();
            save_history();
        }
        
        ctx.strokeStyle = current_color;
        ctx.fillStyle = current_color;
        save_editor_state();
    });

    // Seleccionar herramienta
    function select_tool(button, mode) {
        current_mode = mode;
        tool_buttons.forEach(btn => { if (btn) btn.classList.remove('selected'); });
        if (button) {
            button.classList.add('selected');
        } else if (free_draw_btn) {
            free_draw_btn.classList.add('selected');
        }
        is_drawing = false;
        selected_object = null;
        redraw_canvas();
        save_editor_state();
    }

    // Asignar eventos a botones de herramientas
    if (circle_btn) circle_btn.addEventListener('click', () => select_tool(circle_btn, 'circle'));
    if (square_btn) square_btn.addEventListener('click', () => select_tool(square_btn, 'square'));
    if (triangle_btn) triangle_btn.addEventListener('click', () => select_tool(triangle_btn, 'triangle'));
    if (free_draw_btn) free_draw_btn.addEventListener('click', () => select_tool(free_draw_btn, 'freeDraw'));

    // Listener para cambio de tamaño
    if (size_picker) {
        size_picker.addEventListener('input', () => {
            // Si hay un objeto seleccionado, cambiar su tamaño
            if (selected_object) {
                selected_object.size = parseInt(size_picker.value);
                redraw_canvas();
                update_object_list();
                save_history();
            }
            save_editor_state();
        });
    }

    // Obtener posición del ratón
    function get_mouse_pos(canvas, evt) {
        const rect = canvas.getBoundingClientRect();
        const scale_x = canvas.width / rect.width;
        const scale_y = canvas.height / rect.height;

        return {
            x: (evt.clientX - rect.left) * scale_x,
            y: (evt.clientY - rect.top) * scale_y
        };
    }

    // Crear y añadir una forma
    function add_shape(pos) {
        const { x, y } = pos;
        const shape_size = size_picker ? parseInt(size_picker.value) : 5;
        
        const new_object = {
            id: object_id_counter++,
            type: current_mode,
            x: x,
            y: y,
            size: shape_size,
            color: current_color
        };
        
        objects.push(new_object);
        redraw_canvas();
        update_object_list();
        save_history();
    }

    // Dibujar un objeto individual
    function draw_object(obj, highlight = false) {
        ctx.fillStyle = obj.color;
        ctx.strokeStyle = obj.color;

        if (obj.type === 'circle') {
            ctx.beginPath();
            ctx.arc(obj.x, obj.y, obj.size / 2, 0, Math.PI * 2);
            ctx.fill();
            
            if (highlight) {
                ctx.strokeStyle = '#00ff00';
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        } else if (obj.type === 'square') {
            ctx.fillRect(obj.x - obj.size / 2, obj.y - obj.size / 2, obj.size, obj.size);
            
            if (highlight) {
                ctx.strokeStyle = '#00ff00';
                ctx.lineWidth = 2;
                ctx.strokeRect(obj.x - obj.size / 2, obj.y - obj.size / 2, obj.size, obj.size);
            }
        } else if (obj.type === 'triangle') {
            const altura_total = Math.sqrt(Math.pow(obj.size, 2) - Math.pow(obj.size / 2, 2));
            const altura_base = altura_total / 3;
            const altura_punta = altura_total - altura_base;
            
            ctx.beginPath();
            ctx.moveTo(obj.x, obj.y - altura_punta);
            ctx.lineTo(obj.x - obj.size / 2, obj.y + altura_base);
            ctx.lineTo(obj.x + obj.size / 2, obj.y + altura_base);
            ctx.closePath();
            ctx.fill();
            
            if (highlight) {
                ctx.strokeStyle = '#00ff00';
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        } else if (obj.type === 'freeDraw') {
            // Dibujar trazo libre
            if (obj.points && obj.points.length > 0) {
                ctx.strokeStyle = obj.color;
                ctx.lineWidth = obj.size;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                
                ctx.beginPath();
                ctx.moveTo(obj.points[0].x, obj.points[0].y);
                
                for (let i = 1; i < obj.points.length; i++) {
                    ctx.lineTo(obj.points[i].x, obj.points[i].y);
                }
                
                ctx.stroke();
                
                if (highlight) {
                    // Dibujar puntos de control para indicar selección
                    ctx.fillStyle = '#00ff00';
                    obj.points.forEach(point => {
                        ctx.beginPath();
                        ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
                        ctx.fill();
                    });
                }
            }
        }
    }

    // Redibujar todo el canvas
    function redraw_canvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        objects.forEach(obj => {
            const is_selected = selected_object && obj.id === selected_object.id;
            draw_object(obj, is_selected);
        });
    }

    // Detectar si un clic está sobre un objeto
    function get_object_at_position(pos) {
        // Recorrer en orden inverso para seleccionar el objeto más reciente
        for (let i = objects.length - 1; i >= 0; i--) {
            const obj = objects[i];
            
            if (obj.type === 'freeDraw') {
                // Para trazos libres, verificar proximidad a cualquier punto
                if (obj.points && obj.points.length > 0) {
                    const threshold = obj.size + 5;
                    for (let point of obj.points) {
                        const dx = pos.x - point.x;
                        const dy = pos.y - point.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        if (distance <= threshold) {
                            return obj;
                        }
                    }
                }
            } else {
                const dx = pos.x - obj.x;
                const dy = pos.y - obj.y;
                
                if (obj.type === 'circle') {
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance <= obj.size / 2) {
                        return obj;
                    }
                } else if (obj.type === 'square') {
                    if (Math.abs(dx) <= obj.size / 2 && Math.abs(dy) <= obj.size / 2) {
                        return obj;
                    }
                } else if (obj.type === 'triangle') {
                    const altura_total = Math.sqrt(Math.pow(obj.size, 2) - Math.pow(obj.size / 2, 2));
                    const altura_base = altura_total / 3;
                    const altura_punta = altura_total - altura_base;
                    
                    const x1 = obj.x, y1 = obj.y - altura_punta;
                    const x2 = obj.x - obj.size / 2, y2 = obj.y + altura_base;
                    const x3 = obj.x + obj.size / 2, y3 = obj.y + altura_base;
                    
                    const denominator = ((y2 - y3) * (x1 - x3) + (x3 - x2) * (y1 - y3));
                    const a = ((y2 - y3) * (pos.x - x3) + (x3 - x2) * (pos.y - y3)) / denominator;
                    const b = ((y3 - y1) * (pos.x - x3) + (x1 - x3) * (pos.y - y3)) / denominator;
                    const c = 1 - a - b;
                    
                    if (a >= 0 && b >= 0 && c >= 0) {
                        return obj;
                    }
                }
            }
        }
        return null;
    }

    // Seleccionar un objeto
    function select_object(obj) {
        selected_object = obj;
        
        if (obj) {
            const color_picker = document.getElementById('colorPicker');
            if (color_picker) {
                color_picker.value = obj.color;
                current_color = obj.color;
                ctx.strokeStyle = current_color;
                ctx.fillStyle = current_color;
                
                const color_change_event = new CustomEvent('drawingColorChange', { 
                    detail: { color: obj.color } 
                });
                document.dispatchEvent(color_change_event);
            }
            
            if (size_picker) {
                size_picker.value = obj.size;
            }
            
            // Cambiar al modo de la herramienta del objeto seleccionado
            const button_map = {
                'circle': circle_btn,
                'square': square_btn,
                'triangle': triangle_btn,
                'freeDraw': free_draw_btn
            };
            
            const tool_btn = button_map[obj.type];
            if (tool_btn) {
                current_mode = obj.type;
                tool_buttons.forEach(btn => { if (btn) btn.classList.remove('selected'); });
                tool_btn.classList.add('selected');
            }
        }
        
        redraw_canvas();
        update_object_list();
    }

    // Eliminar un objeto
    function delete_object(obj) {
        const index = objects.findIndex(o => o.id === obj.id);
        if (index !== -1) {
            objects.splice(index, 1);
            
            if (selected_object && selected_object.id === obj.id) {
                selected_object = null;
            }
            
            redraw_canvas();
            update_object_list();
            save_history();
        }
    }

    // Actualizar lista de objetos en el DOM
    function update_object_list() {
        if (!object_list_container) return;
        
        object_list_container.innerHTML = '<h3>Objectes</h3>';
        
        if (objects.length === 0) {
            const empty_msg = document.createElement('p');
            empty_msg.style.color = '#999';
            empty_msg.style.fontSize = '0.9em';
            empty_msg.textContent = 'No hi ha objectes';
            object_list_container.appendChild(empty_msg);
            return;
        }
        
        objects.forEach((obj, index) => {
            const item = document.createElement('div');
            item.className = 'object-item';
            if (selected_object && obj.id === selected_object.id) {
                item.classList.add('selected');
            }
            
            const type_name = obj.type === 'circle' ? 'Cercle' : 
                            obj.type === 'square' ? 'Quadrat' : 
                            obj.type === 'triangle' ? 'Triangle' : 'Traç';
            
            item.innerHTML = `
                <div class="object-info">
                    <span>${type_name} #${obj.id}</span>
                    <span style="color: ${obj.color}; font-size: 1.2em;">●</span>
                    <small style="color: #666;">Mida: ${obj.size}</small>
                </div>
                <button class="delete-btn" title="Eliminar objecte">✕</button>
            `;
            
            const info_div = item.querySelector('.object-info');
            info_div.addEventListener('click', (e) => {
                e.stopPropagation();
                select_object(obj);
            });
            
            const delete_btn = item.querySelector('.delete-btn');
            delete_btn.addEventListener('click', (e) => {
                e.stopPropagation();
                delete_object(obj);
            });
            
            object_list_container.appendChild(item);
        });
    }

    // Iniciar dibujo o selección
    function start_drawing(e) {
        const pos = get_mouse_pos(canvas, e);
        
        const clicked_object = get_object_at_position(pos);
        
        if (clicked_object) {
            select_object(clicked_object);
            dragging_object = true;
            
            // Para trazos libres, guardar el offset del primer punto
            if (clicked_object.type === 'freeDraw' && clicked_object.points.length > 0) {
                drag_offset.x = pos.x - clicked_object.points[0].x;
                drag_offset.y = pos.y - clicked_object.points[0].y;
            } else {
                drag_offset.x = pos.x - clicked_object.x;
                drag_offset.y = pos.y - clicked_object.y;
            }
        } else {
            selected_object = null;
            
            if (current_mode === 'freeDraw') {
                is_drawing = true;
                current_path = {
                    id: object_id_counter++,
                    type: 'freeDraw',
                    color: current_color,
                    size: size_picker ? parseInt(size_picker.value) : 5,
                    points: [{ x: pos.x, y: pos.y }]
                };
            } else {
                add_shape(pos);
            }
        }
    }

    // Detener dibujo
    function stop_drawing() {
        if (current_mode === 'freeDraw' && is_drawing && current_path) {
            is_drawing = false;
            
            // Guardar el trazo como objeto
            if (current_path.points.length > 1) {
                objects.push(current_path);
                update_object_list();
                save_history();
            }
            
            current_path = null;
        }
        
        if (dragging_object) {
            dragging_object = false;
            save_history();
        }
    }

    // Mover objeto o dibujar
    function handle_mouse_move(e) {
        const pos = get_mouse_pos(canvas, e);
        
        if (dragging_object && selected_object) {
            if (selected_object.type === 'freeDraw') {
                // Mover todo el trazo
                const delta_x = pos.x - drag_offset.x - selected_object.points[0].x;
                const delta_y = pos.y - drag_offset.y - selected_object.points[0].y;
                
                selected_object.points.forEach(point => {
                    point.x += delta_x;
                    point.y += delta_y;
                });
            } else {
                selected_object.x = pos.x - drag_offset.x;
                selected_object.y = pos.y - drag_offset.y;
            }
            redraw_canvas();
        } else if (current_mode === 'freeDraw' && is_drawing && current_path) {
            // Añadir punto al trazo actual
            current_path.points.push({ x: pos.x, y: pos.y });
            
            // Dibujar el trazo en tiempo real
            redraw_canvas();
            draw_object(current_path, false);
        }
    }

    // Eventos del ratón
    canvas.addEventListener('mousedown', start_drawing);
    canvas.addEventListener('mouseup', stop_drawing);
    canvas.addEventListener('mousemove', handle_mouse_move);
    canvas.addEventListener('mouseleave', stop_drawing);

    // Configuración inicial
    window.addEventListener('resize', resize_canvas);
    
    const parent = canvas.parentElement;
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;
    load_editor_state();

    ctx.strokeStyle = current_color;
    ctx.fillStyle = current_color;
    
    // Guardar estado inicial vacío en historial
    save_history();
    update_object_list();
});