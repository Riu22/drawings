<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page isELIgnored="false" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<html>
<head>
    <title>Gallery</title>
    <link rel="stylesheet" href="/css/gallery.css">
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
            <h1>Galería de Dibujos</h1>
            <div class="gallery-container">
                <c:forEach var="drawing" items="${drawings}">
                    <div class="drawing-item">
                        <h2>${drawing.title}</h2>
                        <p>Por: ${drawing.author}</p>
                        <img src="${drawing.json}" alt="${drawing.title}"/>
                    </div>
                </c:forEach>
            </div>
        </main>
    </div>
</body>
</html>
