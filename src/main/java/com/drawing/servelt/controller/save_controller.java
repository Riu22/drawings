package com.drawing.servelt.controller;

import com.drawing.servelt.service.save_service;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/save")
public class save_controller extends HttpServlet {

    private final save_service saveService = new save_service();

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setContentType("application/x-www-form-urlencoded");
        resp.setCharacterEncoding("UTF-8");

        String imageData = req.getParameter("imageData");
        String title = req.getParameter("title");
        String author = (String) req.getSession().getAttribute("user");

        boolean success = saveService.save_drawing(imageData, title, author);

        if (success) {
            resp.getWriter().write("{\"message\": \"Drawing saved successfully!\"}");
        } else {
            resp.getWriter().write("{\"error\": \"Missing drawing data or title.\"}");
        }
    }
}