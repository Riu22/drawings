<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page isELIgnored="false" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<html>
<head>
    <title>Home</title> 
    <link rel="stylesheet" href="/css/home.css"> 
    <%-- 1. Añadir el CSS de Coloris --%>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/mdbassit/Coloris@latest/dist/coloris.min.css"/>
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
            <div class="main-container">
                <div class="canvas-container">
                    <canvas id="drawingCanvas"></canvas>
                </div>
                <div class="controls-container">
                    <button id="circleBtn" class="button-link">Círculo</button>
                    <button id="squareBtn" class="button-link">Cuadrado</button>
                    <button id="triangleBtn" class="button-link">Triángulo</button>
                    <button id="freeDrawBtn" class="button-link">Dibujo Libre</button>
                    <input type="text" id="colorPicker" data-coloris value="#000000">
                </div>
            </div>
        </main>
    </div>

    <script src="https://cdn.jsdelivr.net/gh/mdbassit/Coloris@latest/dist/coloris.min.js"></script>
    <script>
        Coloris({
            el: '#colorPicker',
            themeMode: 'dark' 
        });
    </script>
    <script src="/js/color.js"></script>
    <script src="/js/canvas.js"></script>
</body>
</html>