package com.drawing.servelt.dao;

import com.drawing.servelt.model.user;
import java.util.ArrayList;
import java.util.List;

public class user_dao {

    private static List<user> users;

    static {
        users = new ArrayList<>();
        users.add(new user("user", "password"));
        users.add(new user("jaume", "1234"));
        users.add(new user("admin", "admin"));
    }
    
    public boolean checkLogin(String username, String password) {
        for (user u : users) {
            if (u.getName().equals(username) && u.getPassword().equals(password)) {
                return true;
            }
        }
        return false;
    }

    public void add_user(String username, String password) {
        users.add(new user(username, password));
    }

}
