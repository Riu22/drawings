package com.drawing.servelt.dao;

interface user_dao{
    boolean checkLogin(String username, String password);
    void add_user(String username, String password, String name);
    boolean user_exists(String username);
}
