package com.drawing.servelt.dao;

interface user_dao{
    boolean checkLogin(String username, String password);
    public void add_user(String username, String password);
}
