package com.drawing.servelt.controller;

import com.drawing.servelt.service.private_service;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@WebServlet(value = "/private")
public class private_controller extends HttpServlet {

    private private_service privateService;

    @Override
    public void init() {
        privateService = new private_service();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        HttpSession session = req.getSession();
        String user = session.getAttribute("user").toString();

        if (user != null) {
            // usuari està dins

            req.getRequestDispatcher("/WEB-INF/jsp/private.jsp").forward(req, resp);
        } else {
            // usuari no correcte
            resp.sendRedirect("/login");
        }
    }
}
