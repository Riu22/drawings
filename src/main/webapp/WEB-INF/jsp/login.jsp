<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page isELIgnored="false" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
    <title>First JSP Page</title>
<body>
    <h1>Login</h1>
    <form method="post" action="/login">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required autocomplete="off"><br><br>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required><br><br>
        <input type="submit" value="Login">
    </form>
    <c:if test="${not empty error}">
        <h3 style="color:red;">${error}</h3>
    </c:if>
    <a href="/register"><button >Registrar</button></a>
</body>
</html>