package com.drawing.servelt.controller;

import com.drawing.servelt.model.figura;
import com.drawing.servelt.service.draw_details_service;
import com.drawing.servelt.service.private_service;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@WebServlet("/drawing-detail")
public class draw_details extends HttpServlet {

    private final draw_details_service detailService = new draw_details_service();
    private final private_service privateService = new private_service();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        HttpSession session = req.getSession(false);

        if (!privateService.isUserLoggedIn(session)) {
            resp.sendRedirect("/login");
            return;
        }

        String idParam = req.getParameter("id");

        if (idParam == null || idParam.trim().isEmpty()) {
            session.setAttribute("error", "ID de dibujo no proporcionado");
            resp.sendRedirect(req.getContextPath() + "/gallery");
            return;
        }

        try {
            int id = Integer.parseInt(idParam);
            figura drawing = detailService.get_drawing_details(id);

            if (drawing == null) {
                session.setAttribute("error", "Dibujo no encontrado");
                resp.sendRedirect(req.getContextPath() + "/gallery");
                return;
            }

            // Verificar si el usuario puede editar
            String username = (String) session.getAttribute("user");
            boolean canEdit = detailService.can_edit(drawing, username);

            // Pasar datos a la vista
            req.setAttribute("drawing", drawing);
            req.setAttribute("canEdit", canEdit);
            req.setAttribute("user", username);

            req.getRequestDispatcher("/WEB-INF/jsp/draw_details.jsp")
                    .forward(req, resp);

        } catch (NumberFormatException e) {
            System.err.println("error al parsear ID: " + e.getMessage());
            session.setAttribute("error", "ID de dibujo inválido");
            resp.sendRedirect(req.getContextPath() + "/gallery");
        }
    }
}