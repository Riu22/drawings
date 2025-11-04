package com.drawing.servelt.service;

import com.drawing.servelt.dao.figura_dao;
import com.drawing.servelt.model.figura;

public class draw_details_service {
    private final figura_dao figuraDao = figura_dao.getInstance();

    public figura get_drawing_details(int id){
            figura draw = figuraDao.get_figura_by_id(id);
            if (draw == null){
                System.out.println("Dibujo " + id + " no encontrado");
                return null;
            } else {
                System.out.println("Dibujo " + id + " encontrado");
                return draw;
            }
    }

    public boolean can_edit(figura draw, String username){
        if(draw == null ||username ==null){
            return false;
        }
        return draw.getAuthor().equals(username);
    }
}
