package com.drawing.servelt.dao;

import com.drawing.servelt.model.figura;
import java.util.ArrayList;
import java.util.List;

public class figura_dao_impl implements figura_dao {

    private static final figura_dao_impl INSTANCE = new figura_dao_impl();

    private final List<figura> drawings = new ArrayList<>();
    private int idCounter = 0;

    // Constructor privado para evitar múltiples instancias
    private figura_dao_impl() {}

    // Método para obtener la única instancia
    public static figura_dao_impl getInstance() {
        return INSTANCE;
    }

    @Override
    public void add_figura(String imageData, String author, String title) {
        int id = idCounter++;
        figura newDrawing = new figura(imageData, author, title, id);
        drawings.add(newDrawing);
        System.out.println("✅ Dibujo guardado: " + title + " - Total: " + drawings.size());
    }

    @Override
    public  List<figura> get_all_figuras() {
        System.out.println("📋 Recuperando " + drawings.size() + " dibujos");
        return new ArrayList<>(drawings);
    }

    @Override
    public void delete_figura(int id) {
        drawings.removeIf(drawing -> drawing.getId() == id);
    }
}