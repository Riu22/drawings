<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page isELIgnored="false" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
    <title>Login</title>
    <link rel="stylesheet" type="text/css" href="<c:url value='/css/index.css'/>">
</head>
<body>
    <div class="container">
        <h1>Login</h1>

        <c:if test="${not empty error}">
            <p class="error-message">${error}</p>
        </c:if>

        <form method="post" action="/login">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required autocomplete="off">

            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>

            <input type="submit" value="Login">
        </form>

        <div style="margin-top: 20px;">
            <a href="<c:url value='/register'/>" class="button-link">Registrar</a>
        </div>
    </div>
</body>
</html>