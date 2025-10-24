package com.drawing.servelt.service;

import com.drawing.servelt.dao.user_dao_impl;

public class register_service {

    private final user_dao_impl userDao;

    public register_service() {
        this.userDao = new user_dao_impl();
    }

    public String registerUser(String username, String password, String name) {
        if (username == null || username.isEmpty() || password == null || password.isEmpty() || name == null || name.isEmpty()) {
            return "Username, password and name cannot be empty";
        }
        if (password.length() < 5) {
            return "Password must be at least 5 characters long";
        }
        userDao.add_user(username, password, name);
        return null;
    }
}
