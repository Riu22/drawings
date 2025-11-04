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
            padding-top: 50px;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0,0,0,0.9);
        }

        .modal-content-wrapper {
            margin: auto;
            display: block;
            width: 90%;
            max-width: 800px;
            text-align: center;
        }

        #modalCanvas {
            border: 2px solid #fff;
            background: white;
            max-width: 100%;
            height: auto;
        }

        .close {
            position: absolute;
            top: 15px;
            right: 35px;
            color: #f1f1f1;
            font-size: 40px;
            font-weight: bold;
            transition: 0.3s;
            cursor: pointer;
        }

        .close:hover,
        .close:focus {
            color: #bbb;
            text-decoration: none;
        }

        .modal-info {
            color: #ccc;
            font-size: 16px;
            margin-bottom: 15px;
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
                <c:if test="${not empty sessionScope.error}">
                    <div style="background-color: #f44336; color: white; padding: 15px; margin-bottom: 20px; border-radius: 5px;">
                        ${sessionScope.error}
                    </div>
                    <c:remove var="error" scope="session"/>
                </c:if>
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
                           <a href="${pageContext.request.contextPath}/drawing-detail?id=${drawing.id}" class="btn">    Ver Detalles</a>
                        </div>
                    </div>
                </c:forEach>
            </div>
        </main>
    </div>

 

    <script>
        var modal = document.getElementById("myModal");
        var modalCanvas = document.getElementById("modalCanvas");
        var modalTitle = document.getElementById("modalTitle");
        var modalAuthor = document.getElementById("modalAuthor");
        var ctx = modalCanvas.getContext("2d");
        var viewBtns = document.getElementsByClassName("view-btn");
        var span = document.getElementsByClassName("close")[0];

        // Add click event to all view buttons
        for (var i = 0; i < viewBtns.length; i++) {
            viewBtns[i].onclick = function() {
                var imgSrc = this.getAttribute('data-img-src');
                var title = this.getAttribute('data-title');
                var author = this.getAttribute('data-author');

                // Show modal
                modal.style.display = "block";
                modalTitle.textContent = title;
                modalAuthor.textContent = "Por: " + author;

                // Load image and draw on canvas
                var img = new Image();
                img.onload = function() {
                    // Set canvas size to image size
                    modalCanvas.width = img.width;
                    modalCanvas.height = img.height;

                    // Draw image on canvas
                    ctx.clearRect(0, 0, modalCanvas.width, modalCanvas.height);
                    ctx.drawImage(img, 0, 0);
                };
                img.src = imgSrc;
            }
        }

        // Close modal when clicking X
        span.onclick = function() {
            modal.style.display = "none";
        }

        // Close modal when clicking outside
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    </script>

</body>
</html>