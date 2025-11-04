package com.drawing.servelt.dao;

import com.drawing.servelt.model.figura;
import java.util.List;

public interface figura_dao {
    void add_figura(String imageData, String author, String title, int objectCount);
    List<figura> get_all_figuras();
    void delete_figura(int id);
    static figura_dao getInstance() {
        return figura_dao_impl.getInstance();
    }
    figura get_figura_by_id(int id);
    void update_figura(figura draw);
}
