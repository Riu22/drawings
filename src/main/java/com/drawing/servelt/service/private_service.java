package com.drawing.servelt.service;

import javax.servlet.http.HttpSession;

public class private_service {

    public boolean isUserLoggedIn(HttpSession session) {
        if (session == null) {
            return false;
        }
        String user = (String) session.getAttribute("user");
        return user != null;
    }
}
