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
        resp.setCharacterEncoding("UTF-8");

        String imageData = req.getParameter("imageData");
        String title = req.getParameter("title");
        String author = (String) req.getSession().getAttribute("user");
        String object_count_str = req.getParameter("object_count");
        int object_count = 0;
        try {
            if (object_count_str != null) {
                object_count = Integer.parseInt(object_count_str);
            }
        } catch (NumberFormatException e) {
            System.err.println("Error al parsear object_count: " + e.getMessage());
        }
        boolean success = saveService.save_drawing(imageData, title, author, object_count);

        if (success) {
            resp.getWriter().write("Guardado Exitoso");
        } else {
            resp.getWriter().write("Error al guardar el dibujo.");
        }
    }
}