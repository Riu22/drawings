package com.drawing.servelt.service;

import com.drawing.servelt.dao.user_dao_impl;

public class login_service {

    private final user_dao_impl user_dao;

    public login_service() {
        this.user_dao = new user_dao_impl();
    }

    public boolean checkLogin(String username, String password) {
        if (username == null || username.isEmpty() || password == null || password.isEmpty()) {
            return false;
        }
        return user_dao.checkLogin(username, password);
    }
}
