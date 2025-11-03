package com.drawing.servelt.controller;

import com.drawing.servelt.dao.figura_dao;
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
            if (idParam != null && !idParam.trim().isEmpty()) {
                try {
                    int id = Integer.parseInt(idParam);
                    String current_user = (String) session.getAttribute("user");
                    figura drawing = figuraDAO.get_figura_by_id(id);
                    if (drawing != null){
                        if (drawing.getAuthor().equals(current_user)){
                            figuraDAO.delete_figura(id);
                            System.out.println("dibujo" + id + "eliminado");
                        }else {
                            System.out.println("el usuario" + current_user + "no es el autor del dibujo" + id);
                            session.setAttribute("error", "No tienes permiso para eliminar este dibujo.");
                        }
                    }else {
                        System.out.println("dibujo" + id + "no encontrado");
                        session.setAttribute("error", "Dibujo no encontrado.");
                    }
                } catch (NumberFormatException e) {
                    System.err.println("error al parsear ID: " + e.getMessage());
                    session.setAttribute("error", "ID de dibujo inválido");
                }
            }
        }
        resp.sendRedirect(req.getContextPath() + "/gallery");
    }
}
