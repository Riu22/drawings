package com.drawing.servelt.controller;

import com.drawing.servelt.dao.figura_dao;
import com.drawing.servelt.dao.figura_dao_impl;
import com.drawing.servelt.model.figura;
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

    private final figura_dao figuraDAO = figura_dao.getInstance();
    final private_service privateService = new private_service();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        HttpSession session = req.getSession(false);

        if (privateService.isUserLoggedIn(session)) {
            // Obtener usuario de la sesión
            String username = (String) session.getAttribute("user");
            req.setAttribute("user", username);

            List<figura> drawings = figuraDAO.get_all_figuras();

            // ========== DEBUG ==========
            System.out.println("========== GALLERY DEBUG ==========");
            System.out.println("Total drawings: " + drawings.size());
            if (drawings.isEmpty()) {
                System.out.println("⚠️ LA LISTA ESTÁ VACÍA - No hay dibujos guardados");
            } else {
                for (figura d : drawings) {
                    System.out.println("- ID: " + d.getId());
                    System.out.println("  Title: " + d.getTitle());
                    System.out.println("  Author: " + d.getAuthor());
                    System.out.println("  ImageData length: " + d.getImageData().length());
                }
            }
            System.out.println("===================================");
            // ========== FIN DEBUG ==========

            req.setAttribute("drawings", drawings);
            req.getRequestDispatcher("/WEB-INF/jsp/gallery.jsp").forward(req, resp);
        } else {
            resp.sendRedirect("/login");
        }
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
            if (idParam != null) {
                try {
                    int id = Integer.parseInt(idParam);
                    // Ajusta el nombre del método DAO si es distinto en tu proyecto
                    figuraDAO.delete_figura(id);
                } catch (NumberFormatException e) {

                }// ignorar o loguear
            }
        }
        resp.sendRedirect(req.getContextPath() + "/gallery");
    }
}
