
// Secuencia del código Konami: ↑ ↑ ↓ ↓ ← → ← → B A
const secuenciaKonami = [
    'ArrowUp', 
    'ArrowUp', 
    'ArrowDown', 
    'ArrowDown', 
    'ArrowLeft', 
    'ArrowRight', 
    'ArrowLeft', 
    'ArrowRight', 
    'b', 
    'a'
];

let secuenciaActual = [];
let tiempoUltimaTecla = Date.now();
const TIEMPO_RESET = 3000; // 3 segundos para resetear si no se completa

document.addEventListener('keydown', (e) => {
    const tiempoActual = Date.now();
    
    // Resetear si ha pasado mucho tiempo
    if (tiempoActual - tiempoUltimaTecla > TIEMPO_RESET) {
        secuenciaActual = [];
    }
    
    tiempoUltimaTecla = tiempoActual;
    
    // Añadir tecla a la secuencia
    secuenciaActual.push(e.key);
    
    // Mantener solo las últimas teclas necesarias
    if (secuenciaActual.length > secuenciaKonami.length) {
        secuenciaActual.shift();
    }
    
    // Verificar si la secuencia coincide
    if (JSON.stringify(secuenciaActual) === JSON.stringify(secuenciaKonami)) {
        console.log('¡CÓDIGO KONAMI ACTIVADO!');
        dibujarKonami();
        secuenciaActual = []; // Resetear
    }
});

function dibujarKonami() {
    const canvas = document.getElementById('drawingCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Guardar el estado actual del canvas
    ctx.save();
    
    // Configurar el estilo del texto
    ctx.font = 'bold 80px Arial';
    ctx.fillStyle = '#FF0000';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 3;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Calcular posición central
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Efecto de destello
    ctx.shadowColor = '#FF0000';
    ctx.shadowBlur = 20;
    
    // Dibujar el texto
    ctx.strokeText('KONAMI', centerX, centerY);
    ctx.fillText('KONAMI', centerX, centerY);
    
    // Restaurar el estado
    ctx.restore();
    
    // Opcional: hacer que desaparezca después de 2 segundos
    setTimeout(() => {
        // Puedes decidir si limpiar el canvas o dejarlo
        console.log('Efecto Konami completado');
    }, 2000);
}