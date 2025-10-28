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

    private final figura_dao figuraDAO = new figura_dao_impl();
    final private_service privateService = new private_service();


    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        HttpSession session = req.getSession(false);

        if (privateService.isUserLoggedIn(session)) {
            List<figura> drawings = figuraDAO.get_all_figuras();
            req.setAttribute("drawings", drawings);
            System.out.println(drawings);
            req.getRequestDispatcher("/WEB-INF/jsp/gallery.jsp").forward(req, resp);
         } else {
            resp.sendRedirect("/login");
        }
    }
}
