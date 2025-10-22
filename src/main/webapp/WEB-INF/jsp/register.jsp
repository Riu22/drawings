<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page isELIgnored="false" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
    <title>Register Page</title>
</head>
<body>
    <h1>Register</h1>

    <c:if test="${not empty error}">
        <p style="color:red;">${error}</p>
    </c:if>

    <form method="post" action="<c:url value="/register" />">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required autocomplete="off"><br><br>

        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required><br><br>

        <input type="submit" value="Register">
    </form>
</body>
</html>
