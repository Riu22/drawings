package com.drawing.servelt.controller;

import com.drawing.servelt.dao.user_dao;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(value = "/register")
public class register_controller extends HttpServlet {

    private user_dao user_dao;

    @Override
    public void init() throws ServletException {
        user_dao = new user_dao();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.getRequestDispatcher("/WEB-INF/jsp/register.jsp").forward(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String username = req.getParameter("username");
        String password = req.getParameter("password");

        if (username == null || username.isEmpty() || password == null || password.isEmpty()) {
            req.setAttribute("error", "Username and password cannot be empty");
            req.getRequestDispatcher("/WEB-INF/jsp/register.jsp").forward(req, resp);
        } else if (password.length() < 5) {
            req.setAttribute("error", "Password must be at least 5 characters long");
            req.getRequestDispatcher("/WEB-INF/jsp/register.jsp").forward(req, resp);
        } else {
            user_dao.add_user(username, password);
            resp.sendRedirect("/login");
        }
    }
}
