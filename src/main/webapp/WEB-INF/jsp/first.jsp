<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page isELIgnored="false" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<html>
<head>
    <title>Welcome!</title>
    <link rel="stylesheet" type="text/css" href="<c:url value='/css/index.css'/>">
</head>

<body>
    <div class="container">
        <h1>¡Bienvenido a la Aplicación!</h1>
        <a href="<c:url value='/login'/>" class="button-link">Login</a>
        <a href="<c:url value='/register'/>" class="button-link">Register</a>
    </div>
</body>
</html>