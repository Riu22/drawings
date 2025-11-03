package com.drawing.servelt.controller;

import com.drawing.servelt.model.figura;
import com.drawing.servelt.service.gallery_service;
import com.drawing.servelt.service.private_service;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;

@WebServlet("/gallery")
public class gallery_controller extends HttpServlet {

    private final gallery_service galleryService = new gallery_service();
    private final private_service privateService = new private_service();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        HttpSession session = req.getSession(false);

        if (!privateService.isUserLoggedIn(session)) {
            resp.sendRedirect("/login");
            return;
        }

        String username = (String) session.getAttribute("user");
        req.setAttribute("user", username);

        List<figura> drawings = galleryService.get_all_drawings();
        req.setAttribute("drawings", drawings);

        req.getRequestDispatcher("/WEB-INF/jsp/gallery.jsp").forward(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        HttpSession session = req.getSession(false);

        if (!privateService.isUserLoggedIn(session)) {
            resp.sendRedirect("/login");
            return;
        }

        String action = req.getParameter("action");

        if ("delete".equals(action)) {
            String idParam = req.getParameter("id");

            if (idParam != null && !idParam.trim().isEmpty()) {
                try {
                    int id = Integer.parseInt(idParam);
                    String currentUser = (String) session.getAttribute("user");

                    String errorMessage = galleryService.delete_drawing(id, currentUser);

                    if (errorMessage != null) {
                        session.setAttribute("error", errorMessage);
                    }

                } catch (NumberFormatException e) {
                    System.err.println("Error al parsear ID: " + e.getMessage());
                    session.setAttribute("error", "ID de dibujo inválido");
                }
            }
        }

        resp.sendRedirect(req.getContextPath() + "/gallery");
    }
}