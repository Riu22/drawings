package com.drawing.servelt.service;

import com.drawing.servelt.dao.user_dao_impl;

public class register_service {

    private final user_dao_impl user_dao;

    public register_service() {
        this.user_dao = new user_dao_impl();
    }

    public String registerUser(String username, String password) {
        if (username == null || username.isEmpty() || password == null || password.isEmpty()) {
            return "Username and password cannot be empty";
        }
        if (password.length() < 5) {
            return "Password must be at least 5 characters long";
        }
        user_dao.add_user(username, password);
        return null;
    }
}
