<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page isELIgnored="false" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<html>
<head>
    <title>Detalle del Dibujo - ${drawing.title}</title>
    <link rel="stylesheet" href="/css/gallery.css">
    <style>
        .detail-container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 20px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .detail-header {
            border-bottom: 2px solid #4CAF50;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }

        .detail-header h1 {
            margin: 0 0 10px 0;
            color: #333;
        }

        .detail-info {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            margin-bottom: 30px;
        }

        .info-item {
            padding: 15px;
            background: #f5f5f5;
            border-radius: 5px;
            border-left: 4px solid #4CAF50;
        }

        .info-item label {
            display: block;
            font-weight: bold;
            color: #555;
            margin-bottom: 5px;
            font-size: 14px;
        }

        .info-item span {
            display: block;
            color: #333;
            font-size: 16px;
        }

        .drawing-canvas-container {
            text-align: center;
            margin: 30px 0;
            padding: 20px;
            background: #fafafa;
            border-radius: 10px;
        }

        .drawing-canvas-container canvas {
            border: 2px solid #ddd;
            max-width: 100%;
            height: auto;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .action-buttons {
            display: flex;
            gap: 15px;
            justify-content: center;
            margin-top: 30px;
        }

        .btn {
            padding: 12px 30px;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
            transition: all 0.3s;
        }

        .btn-primary {
            background: #4CAF50;
            color: white;
        }

        .btn-primary:hover {
            background: #45a049;
        }

        .btn-secondary {
            background: #2196F3;
            color: white;
        }

        .btn-secondary:hover {
            background: #0b7dda;
        }

        .btn-danger {
            background: #f44336;
            color: white;
        }

        .btn-danger:hover {
            background: #da190b;
        }

        .btn:disabled {
            background: #ccc;
            cursor: not-allowed;
        }

        .back-link {
            display: inline-block;
            margin-bottom: 20px;
            color: #2196F3;
            text-decoration: none;
        }

        .back-link:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="page-container">
        <nav class="sidebar">
            <a href="/home" class="brand">Drawings</a>
            <div class="user-info">
                <span>Bienvenido, ${user}!</span>
            </div>
            <a href="/gallery">Gallery</a>
            <a href="/logout">Logout</a>
        </nav>

        <main class="main-content">
            <div class="detail-container">
                <a href="${pageContext.request.contextPath}/gallery" class="back-link">← Volver a la galería</a>

                <div class="detail-header">
                    <h1>${drawing.title}</h1>
                    <p style="color: #666;">Por: ${drawing.author}</p>
                </div>

                <div class="detail-info">
                    <div class="info-item">
                        <label>ID del Dibujo:</label>
                        <span>#${drawing.id}</span>
                    </div>

                    <div class="info-item">
                        <label>Número de Objetos:</label>
                        <span>${drawing.objectCount} objetos</span>
                    </div>

                    <div class="info-item">
                        <label>Fecha de Creación:</label>
                        <span>${drawing.formattedCreationDate}</span>
                    </div>

                    <div class="info-item">
                        <label>Última Modificación:</label>
                        <span>${drawing.formattedModificationDate}</span>
                    </div>
                </div>

                <div class="drawing-canvas-container">
                    <h3>Vista del Dibujo</h3>
                    <canvas id="drawingCanvas"></canvas>
                </div>

                <div class="action-buttons">
                    <a href="${pageContext.request.contextPath}/gallery" class="btn btn-secondary">
                        Ver Galería Completa
                    </a>

                    <c:if test="${canEdit}">
                        <a href="${pageContext.request.contextPath}/edit-drawing?id=${drawing.id}" class="btn btn-primary">
                            ✏️ Editar Dibujo
                        </a>

                        <form action="${pageContext.request.contextPath}/gallery" method="post" style="display: inline;">
                            <input type="hidden" name="action" value="delete">
                            <input type="hidden" name="id" value="${drawing.id}">
                            <button type="submit" class="btn btn-danger" onclick="return confirm('¿Estás seguro de que quieres eliminar este dibujo?')">
                                🗑️ Eliminar
                            </button>
                        </form>
                    </c:if>

                    <c:if test="${!canEdit}">
                        <button class="btn btn-primary" disabled title="Solo el autor puede editar">
                            ✏️ Editar (No disponible)
                        </button>
                    </c:if>
                </div>
            </div>
        </main>
    </div>

    <script>
        // Cargar y mostrar el dibujo en el canvas
        var canvas = document.getElementById('drawingCanvas');
        var ctx = canvas.getContext('2d');
        var imageData = '${drawing.imageData}';

        var img = new Image();
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
        };
        img.src = imageData;
    </script>
</body>
</html>