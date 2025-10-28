package com.drawing.servelt.controller;

import com.drawing.servelt.dao.figura_dao;
import com.drawing.servelt.dao.figura_dao_impl;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@WebServlet("/save")
public class save_controller extends HttpServlet {

    private final figura_dao figuraDAO = new figura_dao_impl();

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String jsonData = req.getParameter("json");
        String title = req.getParameter("title");
        String author = (String) req.getSession().getAttribute("user");

        if (jsonData != null && !jsonData.isEmpty() && title != null && !title.isEmpty()) {
            figuraDAO.add_figura(jsonData, author, title);
            resp.setStatus(HttpServletResponse.SC_OK);
            resp.getWriter().write("{\"message\": \"Drawing saved successfully!\"}");
        } else {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"error\": \"Missing drawing data or title.\"}");
        }
    }
}
