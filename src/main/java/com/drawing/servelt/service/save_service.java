package com.drawing.servelt.service;

import com.drawing.servelt.dao.figura_dao;

public class save_service {

    private final figura_dao figuraDAO = figura_dao.getInstance();

    public boolean save_drawing(String imageData, String title, String author, int object_count) {
        if (!is_valid_drawing_data(imageData, title, author)) {
            System.out.println("Intento de guardar dibujo con datos inválidos");
            return false;
        }

        figuraDAO.add_figura(imageData, author, title,object_count);
        System.out.println("Dibujo '" + title + "' guardado por " + author);
        return true;
    }

    private boolean is_valid_drawing_data(String imageData, String title, String author) {
        return imageData != null && !imageData.trim().isEmpty()
                && title != null && !title.trim().isEmpty()
                && author != null && !author.trim().isEmpty();
    }
}