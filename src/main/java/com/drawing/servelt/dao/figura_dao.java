package com.drawing.servelt.dao;

import com.drawing.servelt.model.figura;
import java.util.List;

public interface figura_dao {
    void add_figura(String json, String author, String title);
    List<figura> get_all_figuras();
}
