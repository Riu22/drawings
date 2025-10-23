<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page isELIgnored="false" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
    <title>Register Page</title>
    <link rel="stylesheet" type="text/css" href="<c:url value='/css/index.css'/>">
</head>
<body>
    <div class="container">
        <h1>Register</h1>

        <c:if test="${not empty error}">
            <p class="error-message">${error}</p>
        </c:if>

        <form method="post" action="<c:url value="/register" />">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required autocomplete="off">

            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>

            <input type="submit" id="registerButton" value="Register">
        </form>
        <div id="passwordError" class="error-message" style="margin-top: 15px;"></div>

        <div style="margin-top: 20px;">
            <a href="<c:url value='/login'/>" class="button-link" style="background-color: #6c757d;">Volver al Login</a>
        </div>
    </div>
    <script src="<c:url value='/js/index.js'/>"></script>
</body>
</html>
