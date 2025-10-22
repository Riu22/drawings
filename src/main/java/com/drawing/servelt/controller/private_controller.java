package com.drawing.servelt.controller;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpSession;

@WebServlet(value = "/private")
public class private_controller extends HttpServlet {
    @Override
    protected void doGet(javax.servlet.http.HttpServletRequest req, javax.servlet.http.HttpServletResponse resp) throws javax.servlet.ServletException, java.io.IOException {
        HttpSession session = req.getSession();
        String user = (String)session.getAttribute("user");
        if (user == null){
            resp.sendRedirect("/login");
            return;
        }
        req.setAttribute("user", user);

        req.getRequestDispatcher("/WEB-INF/jsp/private.jsp")
                .forward(req, resp);

    }

}
