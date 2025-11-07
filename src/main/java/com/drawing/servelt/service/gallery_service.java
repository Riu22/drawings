package com.drawing.servelt.service;

import com.drawing.servelt.dao.figura_dao;
import com.drawing.servelt.model.figura;

import java.util.List;

public class gallery_service {

    private final figura_dao figuraDAO = figura_dao.getInstance();


    public List<figura> get_all_drawings() {
        List<figura> drawings = figuraDAO.get_all_figuras();

        System.out.println("========== GALLERY DEBUG ==========");
        System.out.println("Total drawings: " + drawings.size());
        if (drawings.isEmpty()) {
            System.out.println("LA LISTA ESTÁ VACÍA - No hay dibujos guardados");
        } else {
            for (figura d : drawings) {
                System.out.println("- ID: " + d.getId());
                System.out.println("  Title: " + d.getTitle());
                System.out.println("  Author: " + d.getAuthor());
                System.out.println("  ImageData length: " + d.getImageData().length());
            }
        }
        System.out.println("===================================");

        return drawings;
    }


    public String delete_drawing(int id, String current_user) {
        figura drawing = figuraDAO.get_figura_by_id(id);

        if (drawing == null) {
            System.out.println("Dibujo " + id + " no encontrado");
            return "Dibujo no encontrado.";
        }

        if (!drawing.getAuthor().equals(current_user)) {
            System.out.println("Usuario " + current_user + " intentó eliminar dibujo de " + drawing.getAuthor());
            return "No tienes permiso para eliminar este dibujo.";
        }

        figuraDAO.delete_figura(id);
        System.out.println("✅ Dibujo " + id + " eliminado por " + current_user);
        return null;
    }
}