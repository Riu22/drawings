<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page isELIgnored="false" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<html>
<head>
    <title>Private Area</title>
    <link rel="stylesheet" href="/css/index.css">
    <link rel="stylesheet" href="/css/private.css">
</head>
<body>
    <div class="page-container">
        <nav class="sidebar">
            <a href="/private" class="brand">Drawings</a>
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
                    <input type="color" id="colorPicker">
                </div>
            </div>
        </main>
    </div>

    <script src="/js/private.js"></script>
</body>
</html>