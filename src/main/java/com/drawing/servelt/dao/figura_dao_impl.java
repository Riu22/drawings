package com.drawing.servelt.dao;

import com.drawing.servelt.model.figura;
import java.util.ArrayList;
import java.util.List;

public class figura_dao_impl implements figura_dao {

    private static final List<figura> drawings = new ArrayList<>();
    private int idCounter = 0;

    @Override
    public void add_figura(String json, String author, String title) {
        System.out.println("Añadiendo figura - JSON: " + json);
        System.out.println("Autor: " + author);
        System.out.println("Título: " + title);

        figura newDrawing = new figura(json, author, title, idCounter);
        drawings.add(newDrawing);
        idCounter++;

        System.out.println("Tamaño actual de la lista: " + drawings.size());
    }

    @Override
    public List<figura> get_all_figuras() {
        return new ArrayList<>(drawings);
    }

}
