<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page isELIgnored="false" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<html>
<head>
    <title>Gallery</title>
    <link rel="stylesheet" href="/css/gallery.css">
    <style>
        /* Modal styles */
        .modal {
            display: none; 
            position: fixed; 
            z-index: 1; 
            padding-top: 100px; 
            left: 0;
            top: 0;
            width: 100%; 
            height: 100%; 
            overflow: auto; 
            background-color: rgb(0,0,0); 
            background-color: rgba(0,0,0,0.9); 
        }

        .modal-content {
            margin: auto;
            display: block;
            width: 80%;
            max-width: 700px;
        }

        .close {
            position: absolute;
            top: 15px;
            right: 35px;
            color: #f1f1f1;
            font-size: 40px;
            font-weight: bold;
            transition: 0.3s;
        }

        .close:hover,
        .close:focus {
            color: #bbb;
            text-decoration: none;
            cursor: pointer;
        }
    </style>
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
                        <img src="${drawing.imageData}" alt="${drawing.title}" class="gallery-image" style="width:100%;max-width:300px">
                        <div class="drawing-actions">
                            <form action="${pageContext.request.contextPath}/gallery" method="post" style="display: inline;">
                                <input type="hidden" name="action" value="delete">
                                <input type="hidden" name="id" value="${drawing.id}">
                                <button type="submit">Eliminar</button>
                            </form>
                            <button class="view-btn" data-img-src="${drawing.imageData}">View</button>
                        </div>
                    </div>
                </c:forEach>
            </div>
        </main>
    </div>

    <!-- The Modal -->
    <div id="myModal" class="modal">
        <span class="close">&times;</span>
        <img class="modal-content" id="img01">
    </div>

    <script>
        // Get the modal
        var modal = document.getElementById("myModal");

        // Get the image and insert it inside the modal
        var modalImg = document.getElementById("img01");
        
        // Get all view buttons
        var viewBtns = document.getElementsByClassName("view-btn");

        // Loop through all view buttons and add click event
        for (var i = 0; i < viewBtns.length; i++) {
            viewBtns[i].onclick = function() {
                modal.style.display = "block";
                modalImg.src = this.getAttribute('data-img-src');
            }
        }

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        }
    </script>

</body>
</html>
