<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page isELIgnored="false" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Galería de Dibujos</title>
    <%-- Estilos para la estructura principal (sidebar y layout) --%>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/home.css">
    <%-- Estilos específicos para la galería --%>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/gallery.css">
</head>
<body>
    <div class="page-container">
        <%-- Barra lateral de navegación --%>
        <nav class="sidebar">
            <a href="/home" class="brand">Drawings</a>
            <div class="user-info">
                <span>Bienvenido, ${user}!</span>
            </div>
            <a href="/gallery">Gallery</a>
            <a href="/logout">Logout</a>
        </nav>

        <%-- Contenido principal de la página --%>
        <main class="main-content">

            <div class="gallery-header">
                <h1>Galería de Dibujos</h1>
                <p>Explora todas las creaciones de la comunidad.</p>
            </div>

            <%-- Mensaje de error (si existe) --%>
            <c:if test="${not empty sessionScope.error}">
                <div class="error-message">
                    <c:out value="${sessionScope.error}"/>
                </div>
                <c:remove var="error" scope="session"/>
            </c:if>

            <div class="gallery-container">
                <c:forEach var="drawing" items="${drawings}">
                    <a href="${pageContext.request.contextPath}/drawing-detail?id=${drawing.id}" class="drawing-item" style="text-decoration: none; color: inherit;">
                        <img src="${drawing.imageData}" alt="Dibujo de ${drawing.author}">
                        <div class="drawing-info">
                            <h3><c:out value="${drawing.title}"/></h3>
                            <p>Por: <c:out value="${drawing.author}"/></p>
                        </div>
                    </a>
                </c:forEach>
            </div>
        </main>
    </div>
</body>
</html>