<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page isELIgnored="false" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<html>
<head>
    <title>Home</title>
    <link rel="stylesheet" href="/css/home.css">
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
                    <input type="range" id="sizePicker" min="1" max="50" value="5">
                    <button id="clearBtn" class="button-link">Limpiar</button>
                    <button id="undoBtn" class="button-link"> Deshacer</button>
                    <button id="redoBtn" class="button-link"> Rehacer</button>
                    <button id="saveButton" class="button-link">Guardar</button>
                    <div id="objectList"></div>
                </div>
            </div>
        </main>
    </div>

    <script src="https://cdn.jsdelivr.net/gh/mdbassit/Coloris@latest/dist/coloris.min.js"></script>
    <script src="/js/color.js"></script>
    <script src="/js/drawing.js"></script>
    <script src="/js/konami.js"></script>
    <script src="/js/save.js"></script>
</body>
</html>