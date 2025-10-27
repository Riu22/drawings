package com.drawing.servelt.dao;

import com.drawing.servelt.model.user;
import java.util.ArrayList;
import java.util.List;

public class user_dao_impl implements user_dao{

    private static final List<user> users;

    static {
        users = new ArrayList<>();
        users.add(new user("jaume", "1234", "Jaume"));
        users.add(new user("admin", "admin", "Admin"));
    }
    
    public boolean checkLogin(String username, String password) {
        for (user u : users) {
            if (u.getUsername().equals(username) && u.getPassword().equals(password)) {
                return true;
            }
        }
        return false;
    }

    public void add_user(String username, String password, String name) {
        users.add(new user(username, password, name));
    }

    public boolean user_exists(String username){
        for (user u : users) {
            if (u.getUsername().equals(username)) {
                return true;
            }
        }
        return false;
    }

}
