<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page isELIgnored="false" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Detalle del Dibujo - ${drawing.title}</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/home.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/details.css">
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
                    <p>Por: ${drawing.author}</p>
                </div>

                <div class="detail-info">
                    <div class="info-item">
                        <label>ID del Dibujo:</label>
                        <span>#${drawing.id}</span>
                    </div>

                    <div class="info-item">
                        <label>Número de Objetos:</label>
                        <span>${drawing.objectCount -1} objetos</span>
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
                    <canvas id="drawingCanvas" style="background-color: #fff;"></canvas>
                </div>

                <div class="action-buttons">
                    <a href="${pageContext.request.contextPath}/gallery" class="btn btn-secondary">
                        Ver Galería Completa
                    </a>

                    <c:if test="${canEdit}">
                        <a href="${pageContext.request.contextPath}/edit-drawing?id=${drawing.id}" class="btn btn-primary">
                            Editar Dibujo
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
                        <a href="#" class="btn btn-primary disabled" title="Solo el autor puede editar">
                            Editar (No disponible)
                        </a>
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